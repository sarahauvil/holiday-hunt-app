import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore'
import { stations } from '../data/stations'
import { getDb, isFirebaseConfigured } from './firebase'
import {
  SESSION_KEY,
  type LeaderboardEntry,
  type Session,
  type Team,
  type TeamMember,
} from './types'

const DEMO_TEAMS_KEY = 'holiday-hunt-demo-teams'
const DEMO_CHANNEL = 'holiday-hunt-demo'

function randomId(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12)
}

function generateCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return code
}

function charmCount(team: Pick<Team, 'charms'>): number {
  return Object.values(team.charms).filter(Boolean).length
}

function toLeaderboardEntry(team: Team): LeaderboardEntry {
  return {
    id: team.id,
    name: team.name,
    code: team.code,
    charmCount: charmCount(team),
    completedAt: team.completedAt,
    finalUnlocked: team.finalUnlocked,
  }
}

function sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    if (b.charmCount !== a.charmCount) return b.charmCount - a.charmCount
    if (a.finalUnlocked !== b.finalUnlocked) return a.finalUnlocked ? -1 : 1
    if (a.completedAt && b.completedAt) return a.completedAt - b.completedAt
    if (a.completedAt) return -1
    if (b.completedAt) return 1
    return a.name.localeCompare(b.name)
  })
}

/* -------------------- Session helpers -------------------- */

export function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Session
  } catch {
    return null
  }
}

export function saveSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

export function usingDemoMode(): boolean {
  return !isFirebaseConfigured
}

/* -------------------- Demo (localStorage) backend -------------------- */

type DemoStore = Record<string, Team>

function readDemoStore(): DemoStore {
  try {
    const raw = localStorage.getItem(DEMO_TEAMS_KEY)
    return raw ? (JSON.parse(raw) as DemoStore) : {}
  } catch {
    return {}
  }
}

function writeDemoStore(store: DemoStore): void {
  localStorage.setItem(DEMO_TEAMS_KEY, JSON.stringify(store))
  try {
    const bc = new BroadcastChannel(DEMO_CHANNEL)
    bc.postMessage({ type: 'update' })
    bc.close()
  } catch {
    // BroadcastChannel may be unavailable
  }
  window.dispatchEvent(new Event('holiday-hunt-demo-update'))
}

function demoFindByCode(code: string): Team | null {
  const store = readDemoStore()
  const normalized = code.trim().toUpperCase()
  return Object.values(store).find((t) => t.code === normalized) ?? null
}

async function demoCreateTeam(name: string, displayName: string): Promise<{ team: Team; session: Session }> {
  const store = readDemoStore()
  let code = generateCode()
  while (Object.values(store).some((t) => t.code === code)) {
    code = generateCode()
  }
  const teamId = randomId()
  const memberId = randomId()
  const member: TeamMember = {
    id: memberId,
    displayName: displayName.trim(),
    joinedAt: Date.now(),
  }
  const team: Team = {
    id: teamId,
    name: name.trim(),
    code,
    createdAt: Date.now(),
    completedAt: null,
    charms: {},
    finalUnlocked: false,
    members: [member],
  }
  store[teamId] = team
  writeDemoStore(store)
  const session: Session = { teamId, memberId, displayName: member.displayName, code }
  saveSession(session)
  return { team, session }
}

async function demoJoinTeam(code: string, displayName: string): Promise<{ team: Team; session: Session }> {
  const team = demoFindByCode(code)
  if (!team) throw new Error('No team found with that code. Check with your group and try again.')
  const store = readDemoStore()
  const memberId = randomId()
  const member: TeamMember = {
    id: memberId,
    displayName: displayName.trim(),
    joinedAt: Date.now(),
  }
  team.members = [...team.members, member]
  store[team.id] = team
  writeDemoStore(store)
  const session: Session = {
    teamId: team.id,
    memberId,
    displayName: member.displayName,
    code: team.code,
  }
  saveSession(session)
  return { team, session }
}

function demoSubscribeTeam(teamId: string, cb: (team: Team | null) => void): Unsubscribe {
  const emit = () => {
    const store = readDemoStore()
    cb(store[teamId] ?? null)
  }
  emit()
  const onStorage = (e: StorageEvent) => {
    if (e.key === DEMO_TEAMS_KEY) emit()
  }
  const onCustom = () => emit()
  window.addEventListener('storage', onStorage)
  window.addEventListener('holiday-hunt-demo-update', onCustom)
  let bc: BroadcastChannel | null = null
  try {
    bc = new BroadcastChannel(DEMO_CHANNEL)
    bc.onmessage = () => emit()
  } catch {
    bc = null
  }
  return () => {
    window.removeEventListener('storage', onStorage)
    window.removeEventListener('holiday-hunt-demo-update', onCustom)
    bc?.close()
  }
}

function demoSubscribeLeaderboard(cb: (entries: LeaderboardEntry[]) => void): Unsubscribe {
  const emit = () => {
    const store = readDemoStore()
    cb(sortLeaderboard(Object.values(store).map(toLeaderboardEntry)))
  }
  emit()
  const onStorage = (e: StorageEvent) => {
    if (e.key === DEMO_TEAMS_KEY) emit()
  }
  const onCustom = () => emit()
  window.addEventListener('storage', onStorage)
  window.addEventListener('holiday-hunt-demo-update', onCustom)
  let bc: BroadcastChannel | null = null
  try {
    bc = new BroadcastChannel(DEMO_CHANNEL)
    bc.onmessage = () => emit()
  } catch {
    bc = null
  }
  return () => {
    window.removeEventListener('storage', onStorage)
    window.removeEventListener('holiday-hunt-demo-update', onCustom)
    bc?.close()
  }
}

async function demoUnlockCharm(teamId: string, stationId: string): Promise<void> {
  const store = readDemoStore()
  const team = store[teamId]
  if (!team) throw new Error('Team not found')
  team.charms = { ...team.charms, [stationId]: true }
  store[teamId] = team
  writeDemoStore(store)
}

async function demoSubmitFinal(teamId: string): Promise<void> {
  const store = readDemoStore()
  const team = store[teamId]
  if (!team) throw new Error('Team not found')
  if (charmCount(team) < stations.length) {
    throw new Error('Collect all charms before submitting the final code.')
  }
  team.finalUnlocked = true
  team.completedAt = team.completedAt ?? Date.now()
  store[teamId] = team
  writeDemoStore(store)
}

/* -------------------- Firebase backend -------------------- */

type FirestoreTeam = Omit<Team, 'members'> & { members?: TeamMember[] }

function fromFirestore(id: string, data: FirestoreTeam): Team {
  return {
    id,
    name: data.name,
    code: data.code,
    createdAt: data.createdAt,
    completedAt: data.completedAt ?? null,
    charms: data.charms ?? {},
    finalUnlocked: Boolean(data.finalUnlocked),
    members: data.members ?? [],
  }
}

async function firebaseCreateTeam(
  name: string,
  displayName: string,
): Promise<{ team: Team; session: Session }> {
  const db = getDb()
  if (!db) throw new Error('Firebase is not configured')

  let code = generateCode()
  // Rare collision — retry a few times
  for (let attempt = 0; attempt < 5; attempt++) {
    const existing = await getDocs(query(collection(db, 'teams'), where('code', '==', code)))
    if (existing.empty) break
    code = generateCode()
  }

  const teamId = randomId()
  const memberId = randomId()
  const member: TeamMember = {
    id: memberId,
    displayName: displayName.trim(),
    joinedAt: Date.now(),
  }
  const team: Team = {
    id: teamId,
    name: name.trim(),
    code,
    createdAt: Date.now(),
    completedAt: null,
    charms: {},
    finalUnlocked: false,
    members: [member],
  }
  await setDoc(doc(db, 'teams', teamId), team)
  const session: Session = { teamId, memberId, displayName: member.displayName, code }
  saveSession(session)
  return { team, session }
}

async function firebaseJoinTeam(
  code: string,
  displayName: string,
): Promise<{ team: Team; session: Session }> {
  const db = getDb()
  if (!db) throw new Error('Firebase is not configured')
  const normalized = code.trim().toUpperCase()
  const snap = await getDocs(query(collection(db, 'teams'), where('code', '==', normalized)))
  if (snap.empty) throw new Error('No team found with that code. Check with your group and try again.')
  const teamDoc = snap.docs[0]
  const team = fromFirestore(teamDoc.id, teamDoc.data() as FirestoreTeam)
  const memberId = randomId()
  const member: TeamMember = {
    id: memberId,
    displayName: displayName.trim(),
    joinedAt: Date.now(),
  }
  const members = [...team.members, member]
  await updateDoc(doc(db, 'teams', team.id), { members })
  team.members = members
  const session: Session = {
    teamId: team.id,
    memberId,
    displayName: member.displayName,
    code: team.code,
  }
  saveSession(session)
  return { team, session }
}

function firebaseSubscribeTeam(teamId: string, cb: (team: Team | null) => void): Unsubscribe {
  const db = getDb()
  if (!db) {
    cb(null)
    return () => undefined
  }
  return onSnapshot(doc(db, 'teams', teamId), (snap) => {
    if (!snap.exists()) {
      cb(null)
      return
    }
    cb(fromFirestore(snap.id, snap.data() as FirestoreTeam))
  })
}

function firebaseSubscribeLeaderboard(cb: (entries: LeaderboardEntry[]) => void): Unsubscribe {
  const db = getDb()
  if (!db) {
    cb([])
    return () => undefined
  }
  return onSnapshot(collection(db, 'teams'), (snap) => {
    const entries = snap.docs.map((d) =>
      toLeaderboardEntry(fromFirestore(d.id, d.data() as FirestoreTeam)),
    )
    cb(sortLeaderboard(entries))
  })
}

async function firebaseUnlockCharm(teamId: string, stationId: string): Promise<void> {
  const db = getDb()
  if (!db) throw new Error('Firebase is not configured')
  const ref = doc(db, 'teams', teamId)
  const snap = await getDoc(ref)
  if (!snap.exists()) throw new Error('Team not found')
  const data = snap.data() as FirestoreTeam
  const charms = { ...(data.charms ?? {}), [stationId]: true }
  await updateDoc(ref, { charms })
}

async function firebaseSubmitFinal(teamId: string): Promise<void> {
  const db = getDb()
  if (!db) throw new Error('Firebase is not configured')
  const ref = doc(db, 'teams', teamId)
  const snap = await getDoc(ref)
  if (!snap.exists()) throw new Error('Team not found')
  const data = snap.data() as FirestoreTeam
  const count = charmCount({ charms: data.charms ?? {} })
  if (count < stations.length) {
    throw new Error('Collect all charms before submitting the final code.')
  }
  await updateDoc(ref, {
    finalUnlocked: true,
    completedAt: data.completedAt ?? Date.now(),
  })
}

/* -------------------- Public API -------------------- */

export async function createTeam(
  name: string,
  displayName: string,
): Promise<{ team: Team; session: Session }> {
  if (!name.trim() || !displayName.trim()) {
    throw new Error('Team name and your name are required.')
  }
  return isFirebaseConfigured
    ? firebaseCreateTeam(name, displayName)
    : demoCreateTeam(name, displayName)
}

export async function joinTeam(
  code: string,
  displayName: string,
): Promise<{ team: Team; session: Session }> {
  if (!code.trim() || !displayName.trim()) {
    throw new Error('Join code and your name are required.')
  }
  return isFirebaseConfigured
    ? firebaseJoinTeam(code, displayName)
    : demoJoinTeam(code, displayName)
}

export function subscribeTeam(teamId: string, cb: (team: Team | null) => void): Unsubscribe {
  return isFirebaseConfigured ? firebaseSubscribeTeam(teamId, cb) : demoSubscribeTeam(teamId, cb)
}

export function subscribeLeaderboard(cb: (entries: LeaderboardEntry[]) => void): Unsubscribe {
  return isFirebaseConfigured
    ? firebaseSubscribeLeaderboard(cb)
    : demoSubscribeLeaderboard(cb)
}

export async function unlockCharm(teamId: string, stationId: string): Promise<void> {
  return isFirebaseConfigured
    ? firebaseUnlockCharm(teamId, stationId)
    : demoUnlockCharm(teamId, stationId)
}

export async function submitFinal(teamId: string): Promise<void> {
  return isFirebaseConfigured ? firebaseSubmitFinal(teamId) : demoSubmitFinal(teamId)
}

export function teamCharmCount(team: Team): number {
  return charmCount(team)
}

export function allCharmsCollected(team: Team): boolean {
  return charmCount(team) >= stations.length
}
