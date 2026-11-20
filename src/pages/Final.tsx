import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CharmProgress } from '../components/CharmProgress'
import { MarketFrame } from '../components/MarketFrame'
import { WinCelebration } from '../components/WinCelebration'
import { useTeam } from '../context/TeamContext'
import { checkFinalPassphrase, FINAL_RIDDLE } from '../data/stations'
import { allCharmsCollected, submitFinal, subscribeLeaderboard } from '../lib/teams'

export function Final() {
  const { session, team, loading } = useTeam()
  const [guess, setGuess] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [rank, setRank] = useState<number | null>(null)

  useEffect(() => {
    if (!team) return
    return subscribeLeaderboard((entries) => {
      const index = entries.findIndex((e) => e.id === team.id)
      setRank(index >= 0 ? index + 1 : null)
    })
  }, [team?.id])

  if (!session) return <Navigate to="/" replace />
  if (loading || !team) {
    return <p className="text-center text-snow/60">Loading…</p>
  }

  const ready = allCharmsCollected(team)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!checkFinalPassphrase(guess)) {
      setError('Close — after a long market stroll, where do you warm up?')
      return
    }
    setBusy(true)
    try {
      await submitFinal(team!.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit')
    } finally {
      setBusy(false)
    }
  }

  if (team.finalUnlocked) {
    return (
      <section className="space-y-6">
        <WinCelebration team={team} rank={rank} />
        <div className="text-center">
          <Link to="/leaderboard" className="text-gold hover:underline">
            See the live leaderboard
          </Link>
        </div>
      </section>
    )
  }

  return (
    <MarketFrame scene="dom" objectPosition="center 30%">
      <div className="w-full max-w-xl rounded-3xl border border-gold/30 bg-[#0a1520]/90 p-8 backdrop-blur-md">
        <p className="text-lg text-gold">Final challenge · Köln</p>
        <h1 className="font-display mt-2 text-4xl text-snow">Warm up the hearth</h1>
        <p className="mt-3 text-snow/80">
          Collect every charm from the market stalls, then answer the riddle to stop the clock.
        </p>
        <div className="mt-6">
          <CharmProgress team={team} />
        </div>

        {!ready ? (
          <p className="mt-6 rounded-xl border border-dashed border-snow/20 p-4 text-sm text-snow/65">
            More stalls await. Keep exploring from the{' '}
            <Link to="/hub" className="text-gold hover:underline">
              market hub
            </Link>
            .
          </p>
        ) : (
          <>
            <p className="mt-8 text-xl text-gold">{FINAL_RIDDLE}</p>
            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <input
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                className="w-full rounded-xl border border-snow/20 bg-navy/60 px-4 py-3 tracking-wide text-snow outline-none focus:border-gold"
                placeholder="One word…"
                required
              />
              {error && <p className="text-sm text-holly">{error}</p>}
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-xl bg-gold px-6 py-3 font-semibold text-navy disabled:opacity-60"
              >
                {busy ? 'Lighting…' : 'Light the fireplace'}
              </button>
            </form>
          </>
        )}
      </div>
    </MarketFrame>
  )
}
