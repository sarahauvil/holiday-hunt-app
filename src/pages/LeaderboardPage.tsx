import { Link } from 'react-router-dom'
import { Leaderboard } from '../components/Leaderboard'
import { MarketFrame } from '../components/MarketFrame'
import { useTeam } from '../context/TeamContext'

export function LeaderboardPage() {
  const { team } = useTeam()

  return (
    <MarketFrame scene="rhine" objectPosition="center 45%">
      <div className="w-full max-w-3xl space-y-6 rounded-3xl border border-gold/30 bg-[#0a1520]/90 p-6 backdrop-blur-md md:p-8">
        <div>
          <p className="text-lg text-gold">Race along the Rhine</p>
          <h1 className="font-display text-4xl text-snow md:text-5xl">Leaderboard</h1>
          <p className="mt-2 text-snow/80">
            Ranked by charms collected, then by who lit the fireplace first.
          </p>
        </div>
        <Leaderboard highlightTeamId={team?.id} />
        <p className="text-center text-sm text-snow/60">
          <Link to="/hub" className="text-gold hover:underline">
            Back to the market
          </Link>
        </p>
      </div>
    </MarketFrame>
  )
}
