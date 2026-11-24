import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Link, Navigate } from 'react-router-dom'
import { CharmProgress } from '../components/CharmProgress'
import { PaintedScene } from '../components/PaintedScene'
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
      <section className="relative flex min-h-screen w-full flex-1 flex-col items-center justify-center overflow-hidden px-5 py-24 md:px-10">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[#1a100c]" />
          <PaintedScene src="/images/leaderboard-santa.jpg" objectPosition="left center" />
          <div className="absolute inset-0 bg-[#0a1520]/55" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a1520] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a1520]/80 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-3xl space-y-6">
          <WinCelebration team={team} rank={rank} />
          <div className="text-center">
            <Link to="/leaderboard" className="text-gold hover:underline">
              See the live leaderboard
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative flex min-h-screen w-full flex-1 items-end overflow-hidden md:items-center md:justify-end">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[#12161c]" />
        <PaintedScene src="/images/final-hearth-cold.jpg" objectPosition="left center" />
        {/* Soften right for the panel; leave the cold unlit hearth open on the left */}
        <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-[#0a1520]/93 via-[#0a1520]/50 to-transparent md:w-[58%]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a1520] to-transparent md:h-32" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a1520]/80 to-transparent" />
      </div>

      <motion.div
        className="relative z-10 mb-10 ml-5 mr-5 w-full max-w-xl rounded-3xl border border-snow/20 bg-[#0a1520]/88 px-6 py-8 shadow-2xl backdrop-blur-md md:mb-0 md:ml-auto md:mr-10 md:max-w-lg md:px-8 md:py-9 lg:mr-16 lg:max-w-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-lg text-gold md:text-xl">Final challenge · Köln</p>
        <h1 className="font-display mt-2 text-4xl leading-tight text-snow md:text-5xl">
          Warm up the hearth
        </h1>
        <p className="mt-3 text-base leading-relaxed text-snow/85 md:text-lg">
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
      </motion.div>
    </section>
  )
}
