import { useMemo, useState, type DragEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { publicAsset } from './PaintedScene'

const GRID = 3
const PIECE_COUNT = GRID * GRID
const PLACEHOLDER_MESSAGE = 'Thank you for all your hard work and happy 2027!'
/** Default art: snowman landscape + thank-you text (swap via imageSrc later). */
const DEFAULT_PUZZLE_IMAGE = '/images/finale-puzzle-snowman.jpg'

function shuffleIds(): number[] {
  const ids = Array.from({ length: PIECE_COUNT }, (_, i) => i)
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[ids[i], ids[j]] = [ids[j], ids[i]]
  }
  // Avoid starting already solved
  if (ids.every((id, i) => id === i)) {
    ;[ids[0], ids[1]] = [ids[1], ids[0]]
  }
  return ids
}

function PieceFace({
  index,
  imageSrc,
}: {
  index: number
  imageSrc?: string
}) {
  const row = Math.floor(index / GRID)
  const col = index % GRID

  const src = imageSrc ? publicAsset(imageSrc) : publicAsset(DEFAULT_PUZZLE_IMAGE)

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#1a2a3a]"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: `${GRID * 100}% ${GRID * 100}%`,
        backgroundPosition: `${(col / (GRID - 1)) * 100}% ${(row / (GRID - 1)) * 100}%`,
        backgroundRepeat: 'no-repeat',
      }}
      aria-label={PLACEHOLDER_MESSAGE}
    >
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/25" />
    </div>
  )
}

function SparklySnow() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 56 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + (i % 7) * 5) % 100}%`,
        delay: (i % 12) * 0.12,
        duration: 2.4 + (i % 6) * 0.35,
        size: 3 + (i % 5),
        gold: i % 3 === 0,
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
      {flakes.map((flake) => (
        <motion.span
          key={flake.id}
          className="absolute top-0 rounded-full"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            background: flake.gold ? '#F0C33C' : '#FFF8F0',
            boxShadow: flake.gold
              ? '0 0 8px 2px rgba(240,195,60,0.85)'
              : '0 0 6px 2px rgba(255,248,240,0.9)',
          }}
          initial={{ y: -12, opacity: 0, scale: 0.4 }}
          animate={{
            y: ['0%', '110%'],
            opacity: [0, 1, 1, 0.7, 0],
            scale: [0.5, 1.2, 0.9, 1.3, 0.6],
            x: [0, (flake.id % 2 === 0 ? 1 : -1) * (8 + (flake.id % 5) * 4)],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

/**
 * Final win-screen drag-and-drop puzzle (3×3).
 * Pass `imageSrc` later to swap the placeholder thank-you card for real puzzle art.
 */
export function FinalePuzzle({ imageSrc }: { imageSrc?: string }) {
  const [tray, setTray] = useState<number[]>(() => shuffleIds())
  const [slots, setSlots] = useState<(number | null)[]>(() => Array(PIECE_COUNT).fill(null))
  const [dragging, setDragging] = useState<number | null>(null)
  const [solved, setSolved] = useState(false)

  function placePiece(pieceId: number, slotIndex: number) {
    if (solved) return

    const fromSlot = slots.findIndex((id) => id === pieceId)
    if (fromSlot === slotIndex) return

    const nextSlots = [...slots]
    const displaced = nextSlots[slotIndex]

    if (fromSlot >= 0) {
      nextSlots[slotIndex] = pieceId
      nextSlots[fromSlot] = displaced
    } else {
      nextSlots[slotIndex] = pieceId
      setTray((t) => {
        const without = t.filter((id) => id !== pieceId)
        return displaced != null ? [...without, displaced] : without
      })
    }

    setSlots(nextSlots)
    if (nextSlots.every((id, i) => id === i)) setSolved(true)
  }

  function onDragStart(e: DragEvent, pieceId: number) {
    if (solved) {
      e.preventDefault()
      return
    }
    e.dataTransfer.setData('text/plain', String(pieceId))
    e.dataTransfer.effectAllowed = 'move'
    setDragging(pieceId)
  }

  function onDropSlot(e: DragEvent, slotIndex: number) {
    e.preventDefault()
    if (solved) return
    const raw = e.dataTransfer.getData('text/plain')
    const pieceId = raw !== '' ? Number(raw) : dragging
    if (pieceId == null || Number.isNaN(pieceId)) return
    placePiece(pieceId, slotIndex)
    setDragging(null)
  }

  function resetPuzzle() {
    setTray(shuffleIds())
    setSlots(Array(PIECE_COUNT).fill(null))
    setSolved(false)
    setDragging(null)
  }

  return (
    <div className="relative mx-auto mt-8 w-full max-w-md text-left">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-lg text-gold">Final flourish</p>
          <p className="text-sm text-snow/75">
            Drag the 9 snowman pieces into place to finish decorating.
          </p>
        </div>
        {!solved && (
          <button
            type="button"
            onClick={resetPuzzle}
            className="shrink-0 text-xs font-semibold text-gold/80 underline-offset-2 hover:underline"
          >
            Shuffle
          </button>
        )}
      </div>

      <div className="relative">
        <div
          className={`grid aspect-square grid-cols-3 gap-1.5 rounded-2xl border p-2 transition ${
            solved ? 'border-gold/70 bg-[#0b3d2e]/50 shadow-[0_0_28px_rgba(240,195,60,0.35)]' : 'border-gold/30 bg-[#0a1520]/70'
          }`}
          onDragOver={(e) => e.preventDefault()}
        >
          {slots.map((pieceId, slotIndex) => (
            <div
              key={slotIndex}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDropSlot(e, slotIndex)}
              className={`relative aspect-square overflow-hidden rounded-md border ${
                pieceId == null
                  ? 'border-dashed border-snow/25 bg-navy/40'
                  : 'border-gold/40 bg-[#0a1520]'
              }`}
            >
              {pieceId != null && (
                <div
                  draggable={!solved}
                  onDragStart={(e) => onDragStart(e, pieceId)}
                  onDragEnd={() => setDragging(null)}
                  className={`h-full w-full cursor-grab active:cursor-grabbing ${solved ? 'cursor-default' : ''}`}
                >
                  <PieceFace index={pieceId} imageSrc={imageSrc} />
                </div>
              )}
            </div>
          ))}
        </div>

        <AnimatePresence>
          {solved && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SparklySnow />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!solved && (
        <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-5 md:grid-cols-9">
          {tray.map((pieceId) => (
            <div
              key={pieceId}
              draggable
              onDragStart={(e) => onDragStart(e, pieceId)}
              onDragEnd={() => setDragging(null)}
              className="aspect-square cursor-grab overflow-hidden rounded-md border border-gold/35 bg-[#0a1520] shadow-md active:cursor-grabbing"
            >
              <PieceFace index={pieceId} imageSrc={imageSrc} />
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {solved && (
          <motion.p
            className="mt-4 text-center font-display text-xl text-gold md:text-2xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Puzzle complete — happy 2027!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
