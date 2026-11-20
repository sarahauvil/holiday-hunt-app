import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MarketFrame } from '../components/MarketFrame'
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

  if (createdCode) {
    return (
      <MarketFrame scene="square" objectPosition="center 40%">
        <div className="w-full max-w-lg rounded-3xl border border-gold/35 bg-[#0a1520]/90 p-8 text-center backdrop-blur-md">
          <p className="text-lg text-gold">Share on Teams</p>
          <h1 className="font-display mt-2 text-4xl text-snow">Your join code</h1>
          <p className="font-display mt-6 text-5xl tracking-[0.35em] text-gold">{createdCode}</p>
          <p className="mt-4 text-snow/80">
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
      </MarketFrame>
    )
  }

  return (
    <MarketFrame scene="square" objectPosition="center 35%">
      <div className="w-full max-w-lg rounded-3xl border border-gold/35 bg-[#0a1520]/90 p-8 backdrop-blur-md">
        <p className="text-lg text-gold">Weihnachtsmarkt crews</p>
        <h1 className="font-display text-4xl text-snow">Create a team</h1>
        <p className="mt-2 text-snow/90">
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
      </div>
    </MarketFrame>
  )
}
