import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { PaintedScene } from '../components/PaintedScene'
import { useTeam } from '../context/TeamContext'
import { joinTeam } from '../lib/teams'

export function JoinTeam() {
  const navigate = useNavigate()
  const { setSession } = useTeam()
  const [code, setCode] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const { session } = await joinTeam(code, displayName)
      setSession(session)
      navigate('/hub')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not join team')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="relative flex min-h-screen w-full flex-1 items-end overflow-hidden md:items-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[#0d1c28]" />
        <PaintedScene src="/images/market-square.jpg" objectPosition="center 40%" />
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
        <p className="text-lg text-gold md:text-xl">Meet at the stall</p>
        <h1 className="font-display mt-1 text-4xl leading-tight text-snow md:text-5xl">
          Join a team
        </h1>
        <p className="mt-3 text-base leading-relaxed text-snow/90 md:text-lg">
          Enter the 6-character code from your Teams call and join the Köln hunt.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm text-snow/70">Join code</span>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="mt-1 w-full rounded-xl border border-snow/20 bg-navy/60 px-4 py-3 tracking-[0.3em] text-gold outline-none focus:border-gold"
              placeholder="PINE42"
              maxLength={8}
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
            {busy ? 'Joining…' : 'Join hunt'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-snow/60">
          Need to start a team?{' '}
          <Link to="/create" className="text-gold hover:underline">
            Create one
          </Link>
        </p>
      </motion.div>
    </section>
  )
}
