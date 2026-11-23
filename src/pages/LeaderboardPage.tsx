import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Leaderboard } from '../components/Leaderboard'
import { PaintedScene } from '../components/PaintedScene'
import { useTeam } from '../context/TeamContext'

export function LeaderboardPage() {
  const { team } = useTeam()

  return (
    <section className="relative flex min-h-screen w-full flex-1 items-end overflow-hidden md:items-center md:justify-end">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[#1a100c]" />
        <PaintedScene src="/images/leaderboard-santa-option-c.jpg" objectPosition="left center" />
        {/* Soften right side for the panel; leave Santa & scroll open on the left */}
        <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-[#0a1520]/93 via-[#0a1520]/45 to-transparent md:w-[58%]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a1520] to-transparent md:h-32" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a1520]/80 to-transparent" />
      </div>

      <motion.div
        className="relative z-10 mb-10 ml-5 mr-5 w-full max-w-xl rounded-3xl border border-gold/30 bg-[#0a1520]/88 px-6 py-8 shadow-2xl backdrop-blur-md md:mb-0 md:ml-auto md:mr-10 md:max-w-lg md:px-8 md:py-9 lg:mr-16 lg:max-w-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-lg text-gold md:text-xl">Checking the list twice</p>
        <h1 className="font-display mt-1 text-4xl leading-tight text-snow md:text-5xl lg:text-6xl">
          Leaderboard
        </h1>
        <p className="mt-3 text-base leading-relaxed text-snow/85 md:text-lg">
          Ranked by charms collected, then by who lit the fireplace first.
        </p>
        <div className="mt-6">
          <Leaderboard highlightTeamId={team?.id} />
        </div>
        <p className="mt-6 text-center text-sm text-snow/60">
          <Link to="/hub" className="text-gold hover:underline">
            Back to the market
          </Link>
        </p>
      </motion.div>
    </section>
  )
}
