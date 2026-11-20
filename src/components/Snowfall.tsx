import { useMemo } from 'react'
import { motion } from 'framer-motion'

type Flake = {
  id: number
  left: string
  size: number
  duration: number
  delay: number
  opacity: number
}

export function Snowfall({ count = 36 }: { count?: number }) {
  const flakes = useMemo<Flake[]>(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        left: `${(id * 17 + 7) % 100}%`,
        size: 3 + (id % 5),
        duration: 10 + (id % 8) * 1.4,
        delay: (id % 10) * 0.7,
        opacity: 0.25 + (id % 5) * 0.1,
      })),
    [count],
  )

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {flakes.map((flake) => (
        <motion.span
          key={flake.id}
          className="absolute top-[-10px] rounded-full bg-snow"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
          }}
          animate={{ y: ['0vh', '110vh'], x: [0, 12, -8, 0] }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
