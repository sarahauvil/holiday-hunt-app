import { motion } from 'framer-motion'
import { stations } from '../data/stations'
import type { Team } from '../lib/types'
import { CharmIcon } from './CharmIcon'

export function CharmProgress({ team }: { team: Team }) {
  const collected = stations.filter((s) => team.charms[s.id]).length

  return (
    <div className="w-full">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="text-shadow-readable text-xl text-gold">Market charms</p>
        <p className="text-shadow-readable font-sans text-sm font-medium text-snow/90">
          {collected} / {stations.length}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {stations.map((station, i) => {
          const got = Boolean(team.charms[station.id])
          return (
            <motion.div
              key={station.id}
              initial={false}
              animate={got ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.45 }}
              title={got ? `${station.charmLabel} unlocked` : 'Locked'}
              className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-[0_2px_10px_rgba(5,12,22,0.55)] ${
                got
                  ? 'border-gold/70 bg-[#FFF8F0]'
                  : 'border-snow/35 bg-[#FFF8F0]/92'
              }`}
            >
              <CharmIcon charm={station.charm} collected={got} size={32} />
              {i < stations.length - 1 && (
                <span className="absolute -right-2.5 top-1/2 hidden h-px w-2.5 bg-gold/50 sm:block" aria-hidden />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
