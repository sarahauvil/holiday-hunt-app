import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { PaintedScene } from '../components/PaintedScene'
import { useTeam } from '../context/TeamContext'
import { createTeam } from '../lib/teams'

export function CreateTeam() {
  const navigate = useNavigate()
  const { setSession } = useTeam()
  const [teamName, setTeamName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [createdCode, setCreatedCode] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const { session, team } = await createTeam(teamName, displayName)
      setSession(session)
      setCreatedCode(team.code)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create team')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="relative flex min-h-screen w-full flex-1 items-end overflow-hidden md:items-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[#0d1c28]" />
        <PaintedScene src="/images/market-dom.jpg" objectPosition="center 42%" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1520]/92 via-[#0a1520]/55 to-transparent md:w-[58%]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0a1520] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a1520]/80 to-transparent" />
      </div>

      <motion.div
        className="relative z-10 mb-10 ml-5 mr-5 w-full max-w-lg rounded-3xl border border-gold/30 bg-[#0a1520]/88 px-6 py-8 shadow-2xl backdrop-blur-md md:mb-0 md:ml-10 md:mr-0 md:px-10 md:py-10 lg:ml-16"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {createdCode ? (
          <div className="text-center">
            <p className="text-lg text-gold md:text-xl">Share on Teams</p>
            <h1 className="font-display mt-1 text-4xl leading-tight text-snow md:text-5xl">
              Your join code
            </h1>
            <p className="font-display mt-6 text-5xl tracking-[0.35em] text-gold">{createdCode}</p>
            <p className="mt-4 text-base leading-relaxed text-snow/80 md:text-lg">
              Paste this code into your Teams call — meet your crew by the Glühwein stall.
            </p>
            <button
              type="button"
              onClick={() => navigate('/hub')}
              className="mt-8 rounded-xl bg-holly px-6 py-3 font-semibold text-snow"
            >
              Enter the market
            </button>
          </div>
        ) : (
          <>
            <p className="text-lg text-gold md:text-xl">Weihnachtsmarkt crews</p>
            <h1 className="font-display mt-1 text-4xl leading-tight text-snow md:text-5xl">
              Create a team
            </h1>
            <p className="mt-3 text-base leading-relaxed text-snow/90 md:text-lg">
              Pick a festive team name, then share the join code on your Teams call.
            </p>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm text-snow/70">Team name</span>
                <input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-snow/20 bg-navy/60 px-4 py-3 text-snow outline-none focus:border-gold"
                  placeholder="e.g. Dom Detectives"
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm text-snow/70">Your name</span>
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-snow/20 bg-navy/60 px-4 py-3 text-snow outline-none focus:border-gold"
                  placeholder="First name is fine"
                  required
                />
              </label>
              {error && <p className="text-sm text-holly">{error}</p>}
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-xl bg-holly px-6 py-3 font-semibold text-snow disabled:opacity-60"
              >
                {busy ? 'Creating…' : 'Create team'}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-snow/60">
              Already have a code?{' '}
              <Link to="/join" className="text-gold hover:underline">
                Join instead
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </section>
  )
}
