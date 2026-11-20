import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clearSession,
  loadSession,
  subscribeTeam,
  usingDemoMode,
} from '../lib/teams'
import type { Session, Team } from '../lib/types'

type TeamContextValue = {
  session: Session | null
  team: Team | null
  loading: boolean
  demoMode: boolean
  setSession: (session: Session | null) => void
  leaveTeam: () => void
}

const TeamContext = createContext<TeamContextValue | null>(null)

export function TeamProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(() => loadSession())
  const [team, setTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(Boolean(loadSession()))

  useEffect(() => {
    if (!session?.teamId) {
      setTeam(null)
      setLoading(false)
      return
    }
    setLoading(true)
    const unsub = subscribeTeam(session.teamId, (next) => {
      setTeam(next)
      setLoading(false)
    })
    return unsub
  }, [session?.teamId])

  const value = useMemo<TeamContextValue>(
    () => ({
      session,
      team,
      loading,
      demoMode: usingDemoMode(),
      setSession: (s) => setSessionState(s),
      leaveTeam: () => {
        clearSession()
        setSessionState(null)
        setTeam(null)
      },
    }),
    [session, team, loading],
  )

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
}

export function useTeam(): TeamContextValue {
  const ctx = useContext(TeamContext)
  if (!ctx) throw new Error('useTeam must be used within TeamProvider')
  return ctx
}
