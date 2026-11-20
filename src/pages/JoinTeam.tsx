import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MarketFrame } from '../components/MarketFrame'
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
    <MarketFrame scene="square" objectPosition="70% 40%">
      <div className="w-full max-w-lg rounded-3xl border border-gold/35 bg-[#0a1520]/90 p-8 backdrop-blur-md">
        <p className="text-lg text-gold">Meet at the stall</p>
        <h1 className="font-display text-4xl text-snow">Join a team</h1>
        <p className="mt-2 text-snow/90">
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
      </div>
    </MarketFrame>
  )
}
