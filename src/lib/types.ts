export type TeamMember = {
  id: string
  displayName: string
  joinedAt: number
}

export type Team = {
  id: string
  name: string
  code: string
  createdAt: number
  completedAt: number | null
  charms: Record<string, boolean>
  finalUnlocked: boolean
  members: TeamMember[]
}

export type LeaderboardEntry = {
  id: string
  name: string
  code: string
  charmCount: number
  completedAt: number | null
  finalUnlocked: boolean
}

export const SESSION_KEY = 'holiday-hunt-session'

export type Session = {
  teamId: string
  memberId: string
  displayName: string
  code: string
}
