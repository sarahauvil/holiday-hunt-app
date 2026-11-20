import { motion } from 'framer-motion'
import { stations } from '../data/stations'
import type { Team } from '../lib/types'
import { CharmIcon } from './CharmIcon'

export function CharmProgress({ team }: { team: Team }) {
  const collected = stations.filter((s) => team.charms[s.id]).length

  return (
    <div className="w-full">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="text-xl text-gold">Market charms</p>
        <p className="font-sans text-sm text-snow/70">
          {collected} / {stations.length}
        </p>
      </div>
      <div className="panel flex flex-wrap items-center justify-center gap-2 rounded-2xl border-gold/30 px-3 py-3">
        {stations.map((station, i) => {
          const got = Boolean(team.charms[station.id])
          return (
            <motion.div
              key={station.id}
              initial={false}
              animate={got ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.45 }}
              title={got ? `${station.charmLabel} unlocked` : 'Locked'}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-snow/15 bg-evergreen/40"
            >
              <CharmIcon charm={station.charm} collected={got} size={26} />
              {i < stations.length - 1 && (
                <span className="absolute -right-2 top-1/2 hidden h-px w-2 bg-gold/40 sm:block" />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
