import { useEffect, useState } from 'react'
import { stations } from '../data/stations'
import { subscribeLeaderboard } from '../lib/teams'
import type { LeaderboardEntry } from '../lib/types'

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
            <th className="px-4 py-3 font-semibold">#</th>
            <th className="px-4 py-3 font-semibold">Team</th>
            <th className="px-4 py-3 font-semibold">Charms</th>
            <th className="px-4 py-3 font-semibold">Finished</th>
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
                <td className="px-4 py-3 text-lg text-gold">{index + 1}</td>
                <td className="px-4 py-3">
                  <span className="font-semibold">{entry.name}</span>
                  {entry.finalUnlocked && (
                    <span className="ml-2 text-xs text-ember">FIREPLACE lit</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {entry.charmCount}/{stations.length}
                </td>
                <td className="px-4 py-3 text-snow/70">{formatTime(entry.completedAt)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
