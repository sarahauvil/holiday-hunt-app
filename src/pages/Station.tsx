import { useState, type FormEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CharmIcon } from '../components/CharmIcon'
import { MediaSlot } from '../components/MediaSlot'
import { PaintedScene } from '../components/PaintedScene'
import { useTeam } from '../context/TeamContext'
import { checkStationAnswer, getStation } from '../data/stations'
import { unlockCharm } from '../lib/teams'

export function Station() {
  const { stationId } = useParams()
  const { session, team, loading } = useTeam()
  const station = stationId ? getStation(stationId) : undefined
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [justUnlocked, setJustUnlocked] = useState(false)
  const [busy, setBusy] = useState(false)

  if (!session) return <Navigate to="/" replace />
  if (!station) {
    return (
      <p className="text-center">
        Station not found. <Link to="/hub" className="text-gold">Back to hub</Link>
      </p>
    )
  }
  if (loading || !team) {
    return <p className="text-center text-snow/60">Loading station…</p>
  }

  const collected = Boolean(team.charms[station.id])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!station || !team) return
    setError(null)
    if (!checkStationAnswer(station, answer)) {
      setError('Not quite — peek at the hint and try again.')
      return
    }
    setBusy(true)
    try {
      await unlockCharm(team.id, station.id)
      setJustUnlocked(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not unlock charm')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <Link to="/hub" className="text-sm text-gold hover:underline">
        ← Back to the market
      </Link>

      <header className="relative overflow-hidden rounded-3xl border border-gold/25 p-6 md:p-8">
        <PaintedScene src="/images/market-square.jpg" objectPosition="center 35%" className="opacity-45" />
        <div className="pointer-events-none absolute inset-0 bg-[#0a1520]/78" />
        <div className="relative z-10">
        <p className="text-lg text-gold">Market stall · {station.owners}</p>
        <h1 className="font-display mt-1 text-4xl text-snow md:text-5xl">{station.title}</h1>
        <p className="mt-3 text-snow/85">{station.blurb}</p>
        <div className="mt-4 flex items-center gap-3 text-sm text-snow/70">
          <CharmIcon charm={station.charm} collected={collected} size={36} />
          <span>
            Charm: <strong className="text-gold">{station.charmLabel}</strong>
            {collected ? ' — unlocked for your team!' : ' — solve the challenge to unlock'}
          </span>
        </div>
        </div>
      </header>

      <div className="rounded-3xl border border-snow/10 bg-navy/40 p-6">
        <h2 className="text-2xl text-snow">Explore</h2>
        <p className="mb-4 mt-1 text-sm text-snow/60">
          Add video, PDF, Word, or PowerPoint under{' '}
          <code className="text-gold">public/stations/{station.id}/</code> later.
        </p>
        <MediaSlot
          video={station.assets.video}
          pdf={station.assets.pdf}
          docx={station.assets.docx}
          pptx={station.assets.pptx}
        />
      </div>

      <div className="rounded-3xl border border-gold/30 bg-evergreen/30 p-6">
        <h2 className="text-2xl text-snow">Challenge</h2>
        <p className="mt-2 text-snow/80">{station.challenge.prompt}</p>
        <p className="mt-1 text-sm text-snow/50">Hint: {station.challenge.hint}</p>

        {collected || justUnlocked ? (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-gold/40 bg-navy/50 p-6 text-center"
            >
              <motion.div
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <CharmIcon charm={station.charm} size={64} />
              </motion.div>
              <p className="text-xl text-gold">
                {station.charmLabel} charm unlocked!
              </p>
              <Link to="/hub" className="text-sm text-snow/70 hover:text-gold">
                Return to the market
              </Link>
            </motion.div>
          </AnimatePresence>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="flex-1 rounded-xl border border-snow/20 bg-navy/60 px-4 py-3 text-snow outline-none focus:border-gold"
              placeholder="Your answer"
              required
            />
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-holly px-6 py-3 font-semibold text-snow disabled:opacity-60"
            >
              {busy ? 'Unlocking…' : 'Unlock charm'}
            </button>
          </form>
        )}
        {error && <p className="mt-2 text-sm text-holly">{error}</p>}
      </div>
    </section>
  )
}
