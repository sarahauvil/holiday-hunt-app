import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import type { Station } from '../data/stations'
import { CharmIcon } from './CharmIcon'

export function StationOrnament({
  station,
  collected,
  style,
}: {
  station: Station
  collected: boolean
  style?: CSSProperties
}) {
  return (
    <motion.div
      className="absolute z-10"
      style={style}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.96 }}
    >
      <Link
        to={`/station/${station.id}`}
        className="group flex w-[7.5rem] flex-col items-center gap-1.5 text-center"
      >
        <span
          className={`relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full border-[3px] shadow-xl transition ${
            collected
              ? 'border-gold bg-[#FFF8F0] shadow-[0_0_18px_rgba(212,180,92,0.45)]'
              : 'border-[#f5f0e6]/90 bg-[#FFF8F0]/85 shadow-black/40'
          }`}
        >
          <span className="absolute -top-2 h-2 w-3 rounded-sm bg-gold" />
          <CharmIcon charm={station.charm} collected size={42} />
          {collected && (
            <motion.span
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-holly text-[10px] font-bold text-snow"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              ✓
            </motion.span>
          )}
        </span>
        <span className="rounded-lg bg-[#0a1f16]/88 px-2 py-1 text-shadow-readable">
          <span className="block text-[15px] leading-tight text-snow group-hover:text-gold">
            {station.title}
          </span>
          <span className="block text-xs text-snow/80">{station.owners}</span>
        </span>
      </Link>
    </motion.div>
  )
}

/** Positions tuned for the Köln market scene (tree + pyramid area) */
export const ornamentLayout: Record<string, { left: string; top: string }> = {
  ghostwriter: { left: '12%', top: '22%' },
  myorders: { left: '72%', top: '20%' },
  gap: { left: '48%', top: '12%' },
  forge: { left: '6%', top: '52%' },
  orbit: { left: '78%', top: '48%' },
  llm: { left: '28%', top: '58%' },
  pilot: { left: '58%', top: '55%' },
  elevit: { left: '42%', top: '72%' },
}
