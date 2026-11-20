import { motion } from 'framer-motion'
import type { Team } from '../lib/types'

function FireplaceSvg() {
  return (
    <svg
      viewBox="0 0 320 240"
      className="mx-auto w-full max-w-md drop-shadow-2xl"
      role="img"
      aria-label="A cozy holiday fireplace with stockings and cocoa"
    >
      <defs>
        <linearGradient id="glow" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#E07A3D" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#C4A35A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#E8F1F5" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="fire" cx="50%" cy="70%" r="50%">
          <stop offset="0%" stopColor="#FFE08A" />
          <stop offset="45%" stopColor="#E07A3D" />
          <stop offset="100%" stopColor="#B91C1C" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Room glow */}
      <ellipse cx="160" cy="200" rx="130" ry="28" fill="url(#glow)" opacity="0.55" />

      {/* Mantel & surround */}
      <rect x="48" y="70" width="224" height="130" rx="8" fill="#3A2818" />
      <rect x="64" y="86" width="192" height="98" rx="6" fill="#1A120C" />
      <rect x="40" y="60" width="240" height="18" rx="4" fill="#5C4030" />

      {/* Firebox */}
      <rect x="88" y="110" width="144" height="74" rx="4" fill="#0F1C2E" />
      <motion.ellipse
        cx="160"
        cy="160"
        rx="48"
        ry="32"
        fill="url(#fire)"
        animate={{ ry: [30, 36, 28, 34, 30], opacity: [0.85, 1, 0.9, 1, 0.85] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M140 168 Q150 130 160 150 Q170 125 180 168"
        fill="#FFE08A"
        opacity="0.85"
        animate={{ d: [
          'M140 168 Q150 130 160 150 Q170 125 180 168',
          'M140 168 Q148 120 160 145 Q172 118 180 168',
          'M140 168 Q150 130 160 150 Q170 125 180 168',
        ] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />

      {/* Logs */}
      <rect x="110" y="168" width="40" height="10" rx="3" fill="#5C4030" transform="rotate(-8 130 173)" />
      <rect x="160" y="170" width="42" height="10" rx="3" fill="#6B4A32" transform="rotate(10 181 175)" />

      {/* Stockings */}
      <path d="M90 78 v36 c0 10 14 12 14 0 v-36z" fill="#B91C1C" />
      <rect x="88" y="74" width="18" height="8" rx="2" fill="#E8F1F5" />
      <path d="M210 78 v36 c0 10 14 12 14 0 v-36z" fill="#0B3D2E" />
      <rect x="208" y="74" width="18" height="8" rx="2" fill="#C4A35A" />

      {/* Cocoa mug on mantel */}
      <rect x="248" y="42" width="22" height="20" rx="3" fill="#E8F1F5" />
      <path d="M270 48 h6 c4 0 4 10 0 10h-6" stroke="#E8F1F5" strokeWidth="3" fill="none" />
      <ellipse cx="259" cy="44" rx="9" ry="3" fill="#5C4030" />
      <motion.path
        d="M254 36 Q256 28 258 36"
        stroke="#E8F1F5"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
        animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M260 34 Q262 26 264 34"
        stroke="#E8F1F5"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
        animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -3, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}
      />

      {/* Tiny star sparkles */}
      <motion.circle
        cx="70"
        cy="40"
        r="3"
        fill="#C4A35A"
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="250"
        cy="30"
        r="2.5"
        fill="#E8F1F5"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 1.6, repeat: Infinity, delay: 0.5 }}
      />
    </svg>
  )
}

function Confetti() {
  const bits = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${(i * 13) % 100}%`,
    color: ['#C4A35A', '#B91C1C', '#E8F1F5', '#E07A3D', '#0B3D2E'][i % 5],
    delay: (i % 8) * 0.12,
    x: (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 10),
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {bits.map((bit) => (
        <motion.span
          key={bit.id}
          className="absolute top-0 h-2 w-2 rounded-sm"
          style={{ left: bit.left, background: bit.color }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: '100vh', opacity: [0, 1, 1, 0], x: bit.x, rotate: 360 }}
          transition={{ duration: 3.2, delay: bit.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export function WinCelebration({
  team,
  rank,
}: {
  team: Team
  rank: number | null
}) {
  const elapsed =
    team.completedAt && team.createdAt
      ? Math.round((team.completedAt - team.createdAt) / 1000)
      : null

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold/40 p-6 text-center shadow-2xl shadow-gold/10 md:p-10">
      <img
        src="/images/market-square.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#0a1520]/75" />
      <Confetti />
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 14 }}
      >
        <p className="text-xl text-gold">Frohes Fest aus Köln!</p>
        <h1 className="font-display mt-2 text-4xl text-snow md:text-6xl">
          You found the FIREPLACE!
        </h1>
        <p className="mx-auto mt-3 max-w-md text-snow/85">
          {team.name} toured every stall and lit the hearth. Glühwein is on us (figuratively).
        </p>
        <div className="mt-6">
          <FireplaceSvg />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-snow/80">
          {rank != null && (
            <p>
              Rank <span className="font-display text-xl text-gold">#{rank}</span>
            </p>
          )}
          {elapsed != null && (
            <p>
              Time{' '}
              <span className="font-display text-xl text-gold">
                {Math.floor(elapsed / 60)}m {elapsed % 60}s
              </span>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
