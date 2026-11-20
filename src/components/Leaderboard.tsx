import { useEffect, useState } from 'react'
import { stations } from '../data/stations'
import { subscribeLeaderboard } from '../lib/teams'
import type { LeaderboardEntry } from '../lib/types'
import { TeamMascot } from './TeamMascot'

function formatTime(ms: number | null): string {
  if (!ms) return '—'
  return new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export function Leaderboard({ highlightTeamId }: { highlightTeamId?: string }) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])

  useEffect(() => subscribeLeaderboard(setEntries), [])

  if (entries.length === 0) {
    return (
      <p className="text-snow/60">No teams on the board yet — create one to start the race.</p>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gold/25 bg-navy/50">
      <table className="w-full text-left text-sm">
        <thead className="bg-evergreen/60 text-gold">
          <tr>
            <th className="px-3 py-3 font-semibold sm:px-4">#</th>
            <th className="px-3 py-3 font-semibold sm:px-4">Team</th>
            <th className="px-3 py-3 font-semibold sm:px-4">Charms</th>
            <th className="px-3 py-3 font-semibold sm:px-4">Finished</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => {
            const highlight = entry.id === highlightTeamId
            return (
              <tr
                key={entry.id}
                className={
                  highlight
                    ? 'bg-gold/15 text-snow'
                    : index % 2 === 0
                      ? 'bg-transparent'
                      : 'bg-snow/5'
                }
              >
                <td className="px-3 py-3 text-lg text-gold sm:px-4">{index + 1}</td>
                <td className="px-3 py-3 sm:px-4">
                  <span className="inline-flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-[#FFF8F0]/95 shadow-sm">
                      <TeamMascot
                        teamId={entry.id}
                        teamCode={entry.code}
                        teamName={entry.name}
                        size={30}
                      />
                    </span>
                    <span>
                      <span className="font-semibold">{entry.name}</span>
                      {entry.finalUnlocked && (
                        <span className="ml-2 text-xs text-ember">FIREPLACE lit</span>
                      )}
                    </span>
                  </span>
                </td>
                <td className="px-3 py-3 sm:px-4">
                  {entry.charmCount}/{stations.length}
                </td>
                <td className="px-3 py-3 text-snow/70 sm:px-4">{formatTime(entry.completedAt)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
