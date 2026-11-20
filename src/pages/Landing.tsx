import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CharmIcon } from '../components/CharmIcon'
import { PaintedScene } from '../components/PaintedScene'

export function Landing() {
  return (
    <section className="relative flex min-h-screen w-full flex-1 items-end overflow-hidden md:items-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[#0d1c28]" />
        <PaintedScene src="/images/market-rhine.jpg" objectPosition="center 40%" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1520]/92 via-[#0a1520]/55 to-transparent md:w-[58%]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0a1520] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a1520]/80 to-transparent" />
      </div>

      <motion.div
        className="relative z-10 mb-10 ml-5 mr-5 max-w-xl rounded-3xl border border-gold/30 bg-[#0a1520]/88 px-6 py-8 shadow-2xl backdrop-blur-md md:mb-0 md:ml-10 md:mr-0 md:max-w-lg md:px-10 md:py-10 lg:ml-16 lg:max-w-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xl text-gold md:text-2xl">Frohe Weihnachten aus Köln</p>
        <h1 className="font-display mt-2 text-5xl leading-tight text-snow md:text-7xl lg:text-8xl">
          Holiday Hunt
        </h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-snow/90 md:text-xl">
          Stroll a digital Weihnachtsmarkt of Consumer Health IT initiatives —
          race in small teams, unlock charms by the Dom glow, and find the fireplace.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/create"
            className="inline-flex items-center gap-2.5 rounded-xl bg-holly px-5 py-3 font-bold text-snow shadow-lg shadow-holly/35 transition hover:bg-holly/90"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-snow/15">
              <CharmIcon charm="candycane" size={38} />
            </span>
            Create a team
          </Link>
          <Link
            to="/join"
            className="inline-flex items-center gap-2.5 rounded-xl border border-gold/60 bg-[#0a1520]/80 px-5 py-3 font-bold text-gold transition hover:bg-[#0a1520]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
              <CharmIcon charm="holly" size={38} />
            </span>
            Join with a code
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
