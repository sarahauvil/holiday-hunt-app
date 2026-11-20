import { Link } from 'react-router-dom'
import type { Station } from '../data/stations'

/** Visual themes for Weihnachtsmarkt stalls — one unique look per station. */
export type StallVariantId =
  | 'lights'
  | 'wreath'
  | 'timber'
  | 'bavarian'
  | 'redShingles'
  | 'stone'
  | 'slateSnow'
  | 'gingerbread'

export const stallVariantByStation: Record<string, StallVariantId> = {
  ghostwriter: 'lights',
  myorders: 'wreath',
  gap: 'timber',
  forge: 'stone',
  orbit: 'bavarian',
  llm: 'redShingles',
  pilot: 'slateSnow',
  elevit: 'gingerbread',
}

type StallPalette = {
  bodyFrom: string
  bodyTo: string
  border: string
  borderUnlocked: string
  plank?: string
  accent?: string
}

const palettes: Record<StallVariantId, StallPalette> = {
  lights: {
    bodyFrom: '#1a3a2e',
    bodyTo: '#0c241c',
    border: 'rgba(212,180,92,0.45)',
    borderUnlocked: 'rgba(212,180,92,0.8)',
    accent: '#f5d76e',
  },
  wreath: {
    bodyFrom: '#3a1a1a',
    bodyTo: '#1a0c0c',
    border: 'rgba(180,60,50,0.55)',
    borderUnlocked: 'rgba(212,180,92,0.8)',
    accent: '#2d6b3a',
  },
  timber: {
    bodyFrom: '#5c3d1e',
    bodyTo: '#2a1a0c',
    border: 'rgba(160,110,50,0.65)',
    borderUnlocked: 'rgba(212,180,92,0.85)',
    plank: 'repeating-linear-gradient(180deg, transparent 0 10px, rgba(0,0,0,0.35) 10px 11px)',
  },
  bavarian: {
    bodyFrom: '#f2e8d5',
    bodyTo: '#d9c9a8',
    border: 'rgba(90,50,30,0.55)',
    borderUnlocked: 'rgba(180,40,40,0.75)',
  },
  redShingles: {
    bodyFrom: '#2a2040',
    bodyTo: '#14101f',
    border: 'rgba(180,50,40,0.5)',
    borderUnlocked: 'rgba(212,180,92,0.8)',
  },
  stone: {
    bodyFrom: '#4a4e52',
    bodyTo: '#2a2e32',
    border: 'rgba(140,140,145,0.55)',
    borderUnlocked: 'rgba(212,180,92,0.8)',
  },
  slateSnow: {
    bodyFrom: '#1e3a4a',
    bodyTo: '#0f222e',
    border: 'rgba(70,120,90,0.55)',
    borderUnlocked: 'rgba(212,180,92,0.8)',
    accent: '#3d7a4a',
  },
  gingerbread: {
    bodyFrom: '#6b3a1e',
    bodyTo: '#3d200f',
    border: 'rgba(245,230,200,0.45)',
    borderUnlocked: 'rgba(245,220,170,0.85)',
    accent: '#f5e6c8',
  },
}

function CompletedRoofBadge() {
  return (
    <svg viewBox="0 0 36 36" className="h-8 w-8 drop-shadow-md" aria-hidden>
      <circle cx="18" cy="18" r="16" fill="#0b3d2e" stroke="#d4b45c" strokeWidth="2.5" />
      <circle cx="18" cy="18" r="12" fill="#c41e1e" />
      <path
        d="M11 18.5 L15.5 23 L25 13"
        fill="none"
        stroke="#f5fafc"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StallRoof({ variant }: { variant: StallVariantId }) {
  switch (variant) {
    case 'lights':
      return (
        <svg viewBox="0 0 200 52" className="block h-auto w-full" preserveAspectRatio="none">
          <path d="M4 48 L100 6 L196 48 Z" fill="#1a3d2e" stroke="#d4b45c" strokeWidth="2" strokeLinejoin="round" />
          <path d="M20 46 L100 14 L180 46 Z" fill="#2a5a42" opacity="0.85" />
          <path d="M100 6 L100 14" stroke="#d4b45c" strokeWidth="2" strokeLinecap="round" />
          {/* String lights along eaves */}
          <path d="M22 44 Q60 38 100 42 Q140 46 178 44" fill="none" stroke="#1a1208" strokeWidth="1.2" />
          {[28, 48, 68, 88, 108, 128, 148, 168].map((x, i) => (
            <circle key={x} cx={x} cy={42 + (i % 2)} r="2.4" fill={['#f5d76e', '#e85d4c', '#7ec8e3', '#f5d76e'][i % 4]} />
          ))}
        </svg>
      )
    case 'wreath':
      return (
        <svg viewBox="0 0 200 56" className="block h-auto w-full" preserveAspectRatio="none">
          <path d="M8 50 L100 4 L192 50 Z" fill="#6b1e1e" stroke="#d4b45c" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M24 48 L100 14 L176 48 Z" fill="#8b2a2a" opacity="0.9" />
          {/* Wreath at peak */}
          <circle cx="100" cy="22" r="11" fill="none" stroke="#2d6b3a" strokeWidth="5" />
          <circle cx="100" cy="22" r="11" fill="none" stroke="#1e4a28" strokeWidth="2" opacity="0.5" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180
            return (
              <circle
                key={deg}
                cx={100 + Math.cos(rad) * 11}
                cy={22 + Math.sin(rad) * 11}
                r="2"
                fill="#c41e1e"
              />
            )
          })}
          <path d="M100 30 L96 38 L104 38 Z" fill="#d4b45c" />
        </svg>
      )
    case 'timber':
      return (
        <svg viewBox="0 0 200 50" className="block h-auto w-full" preserveAspectRatio="none">
          {/* Broader, flatter timber roof */}
          <path d="M2 48 L100 8 L198 48 Z" fill="#4a2e14" stroke="#c4a06a" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M16 46 L100 16 L184 46 Z" fill="#6b4423" />
          {/* Plank lines on roof */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1={30 + i * 14}
              y1={44 - i * 5}
              x2={170 - i * 14}
              y2={44 - i * 5}
              stroke="#3d2817"
              strokeWidth="1"
              opacity="0.45"
            />
          ))}
          <path d="M100 8 L100 16" stroke="#c4a06a" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    case 'bavarian':
      return (
        <svg viewBox="0 0 200 54" className="block h-auto w-full" preserveAspectRatio="none">
          {/* Steeper Alpine gable */}
          <path d="M10 50 L100 2 L190 50 Z" fill="#5c2a1a" stroke="#3d1a0e" strokeWidth="2" strokeLinejoin="round" />
          <path d="M26 48 L100 12 L174 48 Z" fill="#7a3a22" />
          {/* White snow edge */}
          <path d="M10 50 L100 2 L190 50" fill="none" stroke="#f5fafc" strokeWidth="3" opacity="0.7" />
          <path d="M100 2 L100 12" stroke="#d4b45c" strokeWidth="2" />
          {/* Small dormer bump */}
          <path d="M78 28 L100 16 L122 28 L122 36 L78 36 Z" fill="#8b4518" stroke="#3d1a0e" strokeWidth="1" />
          <rect x="92" y="26" width="16" height="10" fill="#4a7ab5" opacity="0.85" />
        </svg>
      )
    case 'redShingles':
      return (
        <svg viewBox="0 0 200 52" className="block h-auto w-full" preserveAspectRatio="none">
          <path d="M4 48 L100 6 L196 48 Z" fill="#8b1a1a" stroke="#d4b45c" strokeWidth="2" strokeLinejoin="round" />
          {/* Scalloped shingle rows */}
          {[0, 1, 2, 3].map((row) => {
            const y = 18 + row * 8
            const count = 9 - row
            const startX = 100 - count * 9
            return Array.from({ length: count }, (_, i) => (
              <path
                key={`${row}-${i}`}
                d={`M${startX + i * 18} ${y} Q${startX + i * 18 + 9} ${y + 7} ${startX + i * 18 + 18} ${y}`}
                fill="none"
                stroke="#5c1010"
                strokeWidth="1.4"
                opacity="0.7"
              />
            ))
          })}
          <path d="M20 46 L100 14 L180 46 Z" fill="#a82828" opacity="0.35" />
          <path d="M100 6 L100 14" stroke="#d4b45c" strokeWidth="2" />
        </svg>
      )
    case 'stone':
      return (
        <svg viewBox="0 0 200 50" className="block h-auto w-full" preserveAspectRatio="none">
          {/* Lower, heavier stone roof */}
          <path d="M6 46 L100 10 L194 46 Z" fill="#5a5e62" stroke="#8a8e92" strokeWidth="2" strokeLinejoin="round" />
          <path d="M22 44 L100 18 L178 44 Z" fill="#6a6e72" opacity="0.9" />
          {/* Irregular stone blocks on roof face */}
          <rect x="50" y="28" width="22" height="10" rx="1" fill="#4a4e52" stroke="#7a7e82" strokeWidth="0.8" opacity="0.8" />
          <rect x="74" y="26" width="28" height="12" rx="1" fill="#55595d" stroke="#7a7e82" strokeWidth="0.8" opacity="0.75" />
          <rect x="104" y="28" width="24" height="10" rx="1" fill="#4e5256" stroke="#7a7e82" strokeWidth="0.8" opacity="0.8" />
          <rect x="60" y="36" width="26" height="8" rx="1" fill="#52565a" stroke="#7a7e82" strokeWidth="0.8" opacity="0.7" />
          <rect x="90" y="36" width="30" height="8" rx="1" fill="#484c50" stroke="#7a7e82" strokeWidth="0.8" opacity="0.7" />
          <path d="M100 10 L100 18" stroke="#a0a4a8" strokeWidth="2" />
        </svg>
      )
    case 'slateSnow':
      return (
        <svg viewBox="0 0 200 54" className="block h-auto w-full" preserveAspectRatio="none">
          <path d="M4 48 L100 5 L196 48 Z" fill="#2a3a4a" stroke="#8a9aaa" strokeWidth="2" strokeLinejoin="round" />
          <path d="M18 46 L100 14 L182 46 Z" fill="#3a4a5a" />
          {/* Slate tile grid */}
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4, 5].map((col) => {
              const x = 40 + col * 20 + (row % 2) * 10
              const y = 20 + row * 9
              if (x < 35 || x > 155) return null
              return (
                <rect
                  key={`${row}-${col}`}
                  x={x}
                  y={y}
                  width="18"
                  height="8"
                  fill="none"
                  stroke="#1a2a3a"
                  strokeWidth="0.7"
                  opacity="0.55"
                />
              )
            }),
          )}
          {/* Snow cap on ridge */}
          <path
            d="M70 18 Q85 8 100 5 Q115 8 130 18 Q118 14 100 12 Q82 14 70 18 Z"
            fill="#f5fafc"
            opacity="0.92"
          />
          <circle cx="88" cy="12" r="2.5" fill="#fff" opacity="0.9" />
          <circle cx="112" cy="13" r="2" fill="#fff" opacity="0.85" />
        </svg>
      )
    case 'gingerbread':
      return (
        <svg viewBox="0 0 200 54" className="block h-auto w-full" preserveAspectRatio="none">
          <path d="M6 48 L100 4 L194 48 Z" fill="#5c2e14" stroke="#f5e6c8" strokeWidth="3" strokeLinejoin="round" />
          <path d="M22 46 L100 14 L178 46 Z" fill="#7a3e1a" />
          {/* Icing drip along eaves */}
          <path
            d="M22 44 Q40 50 55 44 Q70 50 85 44 Q100 50 115 44 Q130 50 145 44 Q160 50 178 44"
            fill="none"
            stroke="#f5e6c8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Candy dots on ridge */}
          {[70, 85, 100, 115, 130].map((x, i) => (
            <circle key={x} cx={x} cy={12 + (i % 2)} r="2.5" fill={i % 2 === 0 ? '#c41e1e' : '#2d6b3a'} />
          ))}
          <path d="M100 4 L100 12" stroke="#f5e6c8" strokeWidth="2.5" />
        </svg>
      )
  }
}

function StallAwning({ variant }: { variant: StallVariantId }) {
  const styles: Record<StallVariantId, { background: string; border: string } | null> = {
    lights: {
      background: 'repeating-linear-gradient(90deg, #1a3d2e 0 12px, #d4b45c 12px 24px)',
      border: 'rgba(212,180,92,0.5)',
    },
    wreath: {
      background: 'repeating-linear-gradient(90deg, #c41e1e 0 14px, #f5fafc 14px 28px)',
      border: 'rgba(212,180,92,0.4)',
    },
    timber: null, // no fabric awning — timber eaves only
    bavarian: {
      background: 'repeating-linear-gradient(90deg, #1e3a6e 0 12px, #f5fafc 12px 24px)',
      border: 'rgba(90,50,30,0.4)',
    },
    redShingles: {
      background: 'repeating-linear-gradient(90deg, #8b1a1a 0 10px, #f5e6c8 10px 20px)',
      border: 'rgba(180,50,40,0.45)',
    },
    stone: null,
    slateSnow: {
      background: 'repeating-linear-gradient(90deg, #3d7a4a 0 12px, #f5fafc 12px 24px)',
      border: 'rgba(70,120,90,0.5)',
    },
    gingerbread: {
      background: 'repeating-linear-gradient(90deg, #c41e1e 0 10px, #f5e6c8 10px 20px)',
      border: 'rgba(245,230,200,0.5)',
    },
  }

  const style = styles[variant]
  if (!style) return null

  return (
    <div
      className="absolute inset-x-[8%] bottom-0 flex h-2.5 overflow-hidden rounded-b-sm border border-t-0"
      style={{ background: style.background, borderColor: style.border }}
    />
  )
}

function StallBodyDecor({ variant, unlocked }: { variant: StallVariantId; unlocked: boolean }) {
  switch (variant) {
    case 'timber':
      return (
        <div
          className="pointer-events-none absolute inset-0 rounded-b-xl opacity-[0.28]"
          aria-hidden
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, transparent 0 11px, rgba(0,0,0,0.5) 11px 12px)',
          }}
        />
      )
    case 'bavarian':
      return (
        <>
          {/* Half-timber beams */}
          <div className="pointer-events-none absolute inset-0 rounded-b-xl" aria-hidden>
            <div className="absolute inset-y-0 left-[18%] w-[3px] bg-[#3d1a0e]/55" />
            <div className="absolute inset-y-0 right-[18%] w-[3px] bg-[#3d1a0e]/55" />
            <div className="absolute inset-x-0 top-[42%] h-[3px] bg-[#3d1a0e]/45" />
            <div className="absolute left-[18%] top-0 h-[42%] w-[64%] border-b-[3px] border-[#3d1a0e]/35" />
          </div>
          {/* Painted shutters hint */}
          <div
            className="pointer-events-none absolute bottom-2 left-2 h-5 w-3 rounded-sm border border-[#3d1a0e]/40"
            style={{ background: 'linear-gradient(90deg, #1e3a6e 0 45%, #f5fafc 45% 55%, #1e3a6e 55%)' }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-2 right-2 h-5 w-3 rounded-sm border border-[#3d1a0e]/40"
            style={{ background: 'linear-gradient(90deg, #1e3a6e 0 45%, #f5fafc 45% 55%, #1e3a6e 55%)' }}
            aria-hidden
          />
        </>
      )
    case 'stone':
      return (
        <div
          className="pointer-events-none absolute inset-0 rounded-b-xl opacity-[0.35]"
          aria-hidden
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 48%, rgba(0,0,0,0.35) 49%, transparent 51%),
              linear-gradient(0deg, transparent 40%, rgba(0,0,0,0.3) 41%, transparent 43%),
              linear-gradient(0deg, transparent 72%, rgba(0,0,0,0.25) 73%, transparent 75%)
            `,
            backgroundSize: '28px 100%, 100% 100%, 100% 100%',
          }}
        />
      )
    case 'slateSnow':
      return (
        <>
          <div
            className="pointer-events-none absolute bottom-2 left-2 h-5 w-2.5 rounded-sm"
            style={{ background: unlocked ? '#3d7a4a' : '#2a5a38' }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-2 right-2 h-5 w-2.5 rounded-sm"
            style={{ background: unlocked ? '#3d7a4a' : '#2a5a38' }}
            aria-hidden
          />
        </>
      )
    case 'gingerbread':
      return (
        <>
          {/* Icing corner swirls */}
          <span
            className="pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-[#f5e6c8]/80"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#f5e6c8]/80"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-3 bottom-1.5 h-1 rounded-full bg-[#f5e6c8]/35"
            aria-hidden
          />
        </>
      )
    case 'lights':
      return (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-80"
          style={{
            background:
              'repeating-linear-gradient(90deg, #f5d76e 0 6px, #e85d4c 6px 12px, #7ec8e3 12px 18px)',
          }}
          aria-hidden
        />
      )
    case 'wreath':
      return (
        <>
          <span className="pointer-events-none absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-gold/70" aria-hidden />
          <span className="pointer-events-none absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-gold/70" aria-hidden />
        </>
      )
    case 'redShingles':
      return (
        <div
          className="pointer-events-none absolute inset-0 rounded-b-xl opacity-[0.1]"
          aria-hidden
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0 16px, rgba(255,255,255,0.4) 16px 17px)',
          }}
        />
      )
    default:
      return null
  }
}

function textClasses(variant: StallVariantId): { title: string; owners: string; locked: string } {
  // Bavarian cream body needs dark text for readability
  if (variant === 'bavarian') {
    return {
      title: 'text-[#2a1810] group-hover:text-[#6b1e1e]',
      owners: 'text-[#3d2817]/80',
      locked: 'text-[#8b3a22]',
    }
  }
  return {
    title: 'text-snow group-hover:text-gold',
    owners: 'text-snow/75',
    locked: 'text-ember',
  }
}

/** Clickable Weihnachtsmarkt stall card for the hub station grid.
 *  `unlocked` = team finished the stall challenge (`team.charms[stationId]`). */
export function StallTile({ station, unlocked }: { station: Station; unlocked: boolean }) {
  const variant = stallVariantByStation[station.id] ?? 'timber'
  const palette = palettes[variant]
  const text = textClasses(variant)
  const completed = unlocked

  return (
    <Link
      to={`/station/${station.id}`}
      className={`group relative flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${
        completed ? 'opacity-[0.92]' : ''
      }`}
      aria-label={`${station.title} — ${completed ? `Finished · ${station.charmLabel} unlocked` : 'Visit stall'}`}
      data-stall-variant={variant}
      data-stall-completed={completed ? 'true' : 'false'}
    >
      {/* Roof + optional awning */}
      <div className="relative z-10 mx-[6%] -mb-px" aria-hidden>
        <div
          className={`drop-shadow-md transition group-hover:drop-shadow-[0_4px_8px_rgba(212,180,92,0.35)] ${
            completed ? 'brightness-[0.92] saturate-[0.85]' : ''
          }`}
        >
          <StallRoof variant={variant} />
        </div>
        <StallAwning variant={variant} />
        {completed && (
          <span className="absolute -right-1 -top-2 z-20 sm:-right-2 sm:-top-3">
            <CompletedRoofBadge />
          </span>
        )}
      </div>

      {/* Stall body */}
      <div
        className="relative flex flex-1 flex-col overflow-hidden rounded-b-xl border-x-2 border-b-2 px-3.5 pb-3 pt-3.5 transition"
        style={{
          borderColor: completed ? 'rgba(212,180,92,0.9)' : palette.border,
          background: `linear-gradient(to bottom, ${palette.bodyFrom}, ${palette.bodyTo})`,
          boxShadow: completed
            ? 'inset 0 1px 0 rgba(212,180,92,0.35), 0 0 0 1px rgba(212,180,92,0.2)'
            : 'inset 0 1px 0 rgba(212,180,92,0.1)',
        }}
      >
        <StallBodyDecor variant={variant} unlocked={unlocked} />

        {completed && (
          <div
            className="pointer-events-none absolute inset-0 rounded-b-xl bg-[#0a1520]/28"
            aria-hidden
          />
        )}

        {variant !== 'gingerbread' && variant !== 'wreath' && variant !== 'bavarian' && (
          <>
            <span
              className="pointer-events-none absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-gold/60"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-gold/60"
              aria-hidden
            />
          </>
        )}

        <p className={`relative font-display text-xl leading-tight transition ${text.title}`}>
          {station.title}
        </p>
        <p className={`relative mt-0.5 text-sm ${text.owners}`}>{station.owners}</p>
        <p
          className={`relative mt-2 inline-flex items-center gap-1.5 text-sm font-semibold ${
            completed ? 'text-gold' : text.locked
          }`}
          style={
            completed && variant === 'bavarian'
              ? { color: '#8b1a1a' }
              : completed && variant === 'gingerbread'
                ? { color: '#f5e6c8' }
                : undefined
          }
        >
          {completed ? (
            <>
              <span
                className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-holly text-[10px] leading-none text-snow"
                aria-hidden
              >
                ✓
              </span>
              Done · {station.charmLabel}
            </>
          ) : (
            'Visit stall →'
          )}
        </p>
      </div>
    </Link>
  )
}
