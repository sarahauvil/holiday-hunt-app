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

/** Sticker-style shopkeepers — one unique keeper per station, shown in the stall window. */
const shopInk = '#1B2A4A'
const shopCream = '#FFF8F0'
const shopRed = '#E23B3B'
const shopGreen = '#2F8F4E'
const shopGold = '#F0C33C'
const shopPink = '#F5A8A8'
const shopSkin = '#F2C9A8'
const shopBrown = '#8B5A2B'
const shopGinger = '#C48A4A'

type ShopkeeperId =
  | 'ghost'
  | 'mrsClaus'
  | 'bavarian'
  | 'nutcracker'
  | 'angel'
  | 'elf'
  | 'reindeer'
  | 'gingerbread'

export const shopkeeperByStation: Record<string, ShopkeeperId> = {
  ghostwriter: 'ghost',
  myorders: 'mrsClaus',
  gap: 'bavarian',
  forge: 'nutcracker',
  orbit: 'angel',
  llm: 'elf',
  pilot: 'reindeer',
  elevit: 'gingerbread',
}

/** Shared stall counter — shopkeepers lean their arms across this. */
function StallCounter() {
  return (
    <>
      <rect x="4" y="44" width="76" height="8" rx="1.5" fill="#6B4423" stroke={shopInk} strokeWidth="1.8" />
      <rect x="4" y="44" width="76" height="2.5" fill="#8B5A2B" opacity="0.85" />
      <path d="M6 46.5h72" stroke="#3D2410" strokeWidth="0.8" opacity="0.35" />
    </>
  )
}

/** Arms resting across the counter; right arm waves on stall hover (`.group:hover`). */
function RestingArms({ fill = shopSkin }: { fill?: string }) {
  return (
    <>
      {/* Left arm stays on the table */}
      <path
        d="M30 34 C22 34 14 36 8 42 L10 45 C16 40 24 38 32 38 Z"
        fill={fill}
        stroke={shopInk}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <ellipse cx="9" cy="44" rx="4.5" ry="2.8" fill={fill} stroke={shopInk} strokeWidth="1.7" />
      {/* Right arm — waves on hover */}
      <g className="shopkeeper-wave-arm">
        <path
          d="M54 34 C62 34 70 36 76 42 L74 45 C68 40 60 38 52 38 Z"
          fill={fill}
          stroke={shopInk}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <ellipse cx="75" cy="44" rx="4.5" ry="2.8" fill={fill} stroke={shopInk} strokeWidth="1.7" />
      </g>
    </>
  )
}

function ShopkeeperSvg({ id }: { id: ShopkeeperId }) {
  // ~30% larger than prior h-11/h-12; wider canvas so arms span the stall table
  const common = {
    viewBox: '0 0 84 54',
    className: 'shopkeeper-svg h-[3.6rem] w-auto max-w-full overflow-visible sm:h-[4rem]',
    'aria-hidden': true as const,
  }

  switch (id) {
    case 'ghost':
      return (
        <svg {...common}>
          <StallCounter />
          <RestingArms fill={shopCream} />
          <path
            d="M30 22c0-8 5-14 12-14s12 6 12 14v18c0 1-.7 1.3-1.3.7L49 36l-3 4c-.5.7-1.4.7-1.9 0L42 36l-2.1 4c-.5.7-1.4.7-1.9 0L36 36l-3.7 4.7c-.6.6-1.3.3-1.3-.7V22z"
            fill={shopCream}
            stroke={shopInk}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <ellipse cx="38" cy="24" rx="1.8" ry="2.2" fill={shopInk} />
          <ellipse cx="46" cy="24" rx="1.8" ry="2.2" fill={shopInk} />
          <path d="M39 29c1.2 1.6 3.8 1.6 5 0" stroke={shopInk} strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="35.5" cy="27.5" rx="2" ry="1.2" fill={shopPink} opacity="0.9" />
          <ellipse cx="48.5" cy="27.5" rx="2" ry="1.2" fill={shopPink} opacity="0.9" />
          <path
            d="M32 16c1.5-8 7-11 14-10 1 4-.5 9-2.5 12"
            fill={shopRed}
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="47" cy="9" r="3.2" fill={shopCream} stroke={shopInk} strokeWidth="1.8" />
          <path
            d="M29 17c0-2.5 4-4.5 13-4.5s13 2 13 4.5v2c0 1.2-4 2.5-13 2.5S29 20.2 29 19v-2z"
            fill={shopCream}
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'mrsClaus':
      return (
        <svg {...common}>
          <StallCounter />
          <RestingArms />
          <circle cx="42" cy="12" r="9" fill="#E8E4DC" stroke={shopInk} strokeWidth="2" />
          <circle cx="42" cy="6" r="4.5" fill="#E8E4DC" stroke={shopInk} strokeWidth="1.8" />
          <circle cx="42" cy="18" r="8" fill={shopSkin} stroke={shopInk} strokeWidth="2" />
          <ellipse cx="38.5" cy="17.5" rx="1.3" ry="1.6" fill={shopInk} />
          <ellipse cx="45.5" cy="17.5" rx="1.3" ry="1.6" fill={shopInk} />
          <path d="M39.5 22c1 1.2 3 1.2 4 0" stroke={shopInk} strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="36" cy="20.5" rx="1.8" ry="1.1" fill={shopPink} opacity="0.9" />
          <ellipse cx="48" cy="20.5" rx="1.8" ry="1.1" fill={shopPink} opacity="0.9" />
          <circle cx="38.5" cy="17.5" r="3" fill="none" stroke={shopInk} strokeWidth="1.4" />
          <circle cx="45.5" cy="17.5" r="3" fill="none" stroke={shopInk} strokeWidth="1.4" />
          <path d="M41.5 17.5h1" stroke={shopInk} strokeWidth="1.4" />
          <path
            d="M32 28c2-4 6-6 10-6s8 2 10 6v16H32V28z"
            fill={shopRed}
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M36 30h12v12H36z"
            fill={shopCream}
            stroke={shopInk}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M42 30v12" stroke={shopRed} strokeWidth="1.6" />
          <circle cx="42" cy="36" r="2" fill={shopGold} stroke={shopInk} strokeWidth="1.2" />
        </svg>
      )
    case 'bavarian':
      return (
        <svg {...common}>
          <StallCounter />
          <RestingArms />
          <ellipse cx="42" cy="10" rx="11" ry="4" fill="#2A3A5C" stroke={shopInk} strokeWidth="2" />
          <path
            d="M31 10c0-6 5-10 11-10s11 4 11 10"
            fill="#3A4A6C"
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="8" r="2.2" fill={shopGold} stroke={shopInk} strokeWidth="1.3" />
          <circle cx="42" cy="18" r="7.5" fill={shopSkin} stroke={shopInk} strokeWidth="2" />
          <ellipse cx="39" cy="17.5" rx="1.3" ry="1.6" fill={shopInk} />
          <ellipse cx="45" cy="17.5" rx="1.3" ry="1.6" fill={shopInk} />
          <path d="M39.5 22c1.2 1.3 3.8 1.3 5 0" stroke={shopInk} strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="36" cy="20" rx="1.7" ry="1" fill={shopPink} opacity="0.85" />
          <ellipse cx="48" cy="20" rx="1.7" ry="1" fill={shopPink} opacity="0.85" />
          <path
            d="M36 24c2-2 5-2 6-1 1-1 4-1 6 1"
            fill="none"
            stroke={shopInk}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M32 28c2-3.5 6-5.5 10-5.5s8 2 10 5.5v16H32V28z"
            fill="#5C3D1E"
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M36 30h12v4H36z" fill="#1E3A6E" stroke={shopInk} strokeWidth="1.4" />
          <path d="M42 34v10" stroke={shopGold} strokeWidth="2" strokeLinecap="round" />
          <circle cx="42" cy="36" r="1.5" fill={shopGold} stroke={shopInk} strokeWidth="1" />
        </svg>
      )
    case 'nutcracker':
      return (
        <svg {...common}>
          <StallCounter />
          <RestingArms fill="#1E3A6E" />
          <rect x="34" y="1" width="16" height="11" rx="1.5" fill={shopRed} stroke={shopInk} strokeWidth="2" />
          <rect x="32" y="10.5" width="20" height="3.5" fill={shopGold} stroke={shopInk} strokeWidth="1.6" />
          <rect x="34" y="14" width="16" height="13" rx="2" fill={shopSkin} stroke={shopInk} strokeWidth="2" />
          <rect x="37" y="18" width="4" height="3" rx="0.5" fill={shopInk} />
          <rect x="43" y="18" width="4" height="3" rx="0.5" fill={shopInk} />
          <rect x="38" y="23" width="8" height="2.5" rx="0.5" fill={shopCream} stroke={shopInk} strokeWidth="1.2" />
          <path d="M37 26h10" stroke={shopInk} strokeWidth="2" strokeLinecap="round" />
          <path
            d="M32 28h20v16c0 1-1 2-2 2H34c-1 0-2-1-2-2V28z"
            fill="#1E3A6E"
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <rect x="38" y="30" width="8" height="10" rx="1" fill={shopGold} stroke={shopInk} strokeWidth="1.4" />
          <path d="M42 30v10" stroke={shopInk} strokeWidth="1.2" />
        </svg>
      )
    case 'angel':
      return (
        <svg {...common}>
          <StallCounter />
          <ellipse
            cx="22"
            cy="28"
            rx="9"
            ry="13"
            fill={shopCream}
            stroke={shopInk}
            strokeWidth="2"
            transform="rotate(-18 22 28)"
          />
          <ellipse
            cx="62"
            cy="28"
            rx="9"
            ry="13"
            fill={shopCream}
            stroke={shopInk}
            strokeWidth="2"
            transform="rotate(18 62 28)"
          />
          <RestingArms />
          <ellipse cx="42" cy="6" rx="8" ry="3" fill="none" stroke={shopGold} strokeWidth="2.2" />
          <circle cx="42" cy="14" r="8" fill="#F5D76E" stroke={shopInk} strokeWidth="2" />
          <circle cx="42" cy="16" r="7" fill={shopSkin} stroke={shopInk} strokeWidth="2" />
          <ellipse cx="39" cy="15.5" rx="1.2" ry="1.5" fill={shopInk} />
          <ellipse cx="45" cy="15.5" rx="1.2" ry="1.5" fill={shopInk} />
          <path d="M39.5 20c1.2 1.2 3.8 1.2 5 0" stroke={shopInk} strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="36.5" cy="18.5" rx="1.6" ry="1" fill={shopPink} opacity="0.85" />
          <ellipse cx="47.5" cy="18.5" rx="1.6" ry="1" fill={shopPink} opacity="0.85" />
          <path
            d="M32 26c2-3 6-5 10-5s8 2 10 5v18H32V26z"
            fill="#B8D9F0"
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M42 26v18" stroke={shopGold} strokeWidth="1.8" opacity="0.7" />
        </svg>
      )
    case 'elf':
      return (
        <svg {...common}>
          <StallCounter />
          <RestingArms />
          <path
            d="M42 1 L54 20 L30 20 Z"
            fill={shopGreen}
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="42" cy="3" r="2.5" fill={shopRed} stroke={shopInk} strokeWidth="1.5" />
          <path d="M30 20h24" stroke={shopCream} strokeWidth="3" strokeLinecap="round" />
          <path
            d="M29 24 L24 20 L29 28 Z"
            fill={shopSkin}
            stroke={shopInk}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M55 24 L60 20 L55 28 Z"
            fill={shopSkin}
            stroke={shopInk}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="42" cy="24" r="8" fill={shopSkin} stroke={shopInk} strokeWidth="2" />
          <ellipse cx="39" cy="23" rx="1.3" ry="1.6" fill={shopInk} />
          <ellipse cx="45" cy="23" rx="1.3" ry="1.6" fill={shopInk} />
          <path d="M39.5 28c1.2 1.3 3.8 1.3 5 0" stroke={shopInk} strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="36" cy="26" rx="1.7" ry="1" fill={shopPink} opacity="0.9" />
          <ellipse cx="48" cy="26" rx="1.7" ry="1" fill={shopPink} opacity="0.9" />
          <path
            d="M32 34c1.5-3 5-5 10-5s8.5 2 10 5v10H32V34z"
            fill={shopRed}
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Cocoa mug on the counter */}
          <rect x="58" y="36" width="8" height="8" rx="1.2" fill={shopCream} stroke={shopInk} strokeWidth="1.5" />
          <ellipse cx="62" cy="36" rx="4" ry="1.8" fill={shopBrown} stroke={shopInk} strokeWidth="1.2" />
          <path d="M66 38h3v4h-3" fill="none" stroke={shopInk} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'reindeer':
      return (
        <svg {...common}>
          <StallCounter />
          <RestingArms fill={shopGinger} />
          <path
            d="M32 12c-4-8-8-6-6-2m6 2c2-6 0-10-4-8"
            fill="none"
            stroke={shopBrown}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M52 12c4-8 8-6 6-2m-6 2c-2-6 0-10 4-8"
            fill="none"
            stroke={shopBrown}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <ellipse cx="30" cy="18" rx="4" ry="5" fill={shopGinger} stroke={shopInk} strokeWidth="1.8" />
          <ellipse cx="54" cy="18" rx="4" ry="5" fill={shopGinger} stroke={shopInk} strokeWidth="1.8" />
          <ellipse cx="42" cy="22" rx="11" ry="10" fill={shopGinger} stroke={shopInk} strokeWidth="2" />
          <ellipse cx="38" cy="20" rx="1.5" ry="1.8" fill={shopInk} />
          <ellipse cx="46" cy="20" rx="1.5" ry="1.8" fill={shopInk} />
          <ellipse cx="42" cy="26" rx="5" ry="4" fill="#E8C9A0" stroke={shopInk} strokeWidth="1.6" />
          <circle cx="42" cy="25" r="2.2" fill={shopRed} stroke={shopInk} strokeWidth="1.4" />
          <path d="M40 28c1 .8 3 .8 4 0" stroke={shopInk} strokeWidth="1.3" strokeLinecap="round" />
          <path
            d="M31 34c2-2.5 6-4 11-4s9 1.5 11 4v10H31V34z"
            fill={shopGreen}
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M31 36h22" stroke={shopRed} strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    case 'gingerbread':
      return (
        <svg {...common}>
          <StallCounter />
          {/* Left arm on counter */}
          <path
            d="M42 30 C28 30 16 34 8 42 L10 45 C18 38 30 36 42 36 Z"
            fill={shopGinger}
            stroke={shopInk}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <ellipse cx="9" cy="44" rx="5" ry="3" fill={shopGinger} stroke={shopInk} strokeWidth="2" />
          <path d="M12 42c8-4 20-6 30-6" stroke={shopCream} strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Right arm waves on hover */}
          <g className="shopkeeper-wave-arm">
            <path
              d="M42 30 C56 30 68 34 76 42 L74 45 C66 38 54 36 42 36 Z"
              fill={shopGinger}
              stroke={shopInk}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <ellipse cx="75" cy="44" rx="5" ry="3" fill={shopGinger} stroke={shopInk} strokeWidth="2" />
            <path d="M42 36c10 0 22 2 30 6" stroke={shopCream} strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
          <circle cx="42" cy="12" r="9" fill={shopGinger} stroke={shopInk} strokeWidth="2.2" />
          <circle cx="38.5" cy="10.5" r="1.6" fill={shopInk} />
          <circle cx="45.5" cy="10.5" r="1.6" fill={shopInk} />
          <path
            d="M37.5 15c1.5 2 5.5 2 7 0"
            fill="none"
            stroke={shopCream}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="35" cy="13" r="1.5" fill={shopPink} opacity="0.9" />
          <circle cx="49" cy="13" r="1.5" fill={shopPink} opacity="0.9" />
          <path
            d="M32 24c0-3 4.5-5 10-5s10 2 10 5v12c0 1-1 2-2 2H34c-1 0-2-1-2-2V24z"
            fill={shopGinger}
            stroke={shopInk}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="42" cy="26" r="2" fill={shopRed} stroke={shopInk} strokeWidth="1.3" />
          <circle cx="42" cy="31.5" r="2" fill={shopGreen} stroke={shopInk} strokeWidth="1.3" />
          <path d="M34 24h16" stroke={shopCream} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
  }
}

function StallShopkeeper({ stationId, completed }: { stationId: string; completed: boolean }) {
  const id = shopkeeperByStation[stationId] ?? 'bavarian'
  return (
    <div
      className={`relative z-[1] -mb-0.5 flex justify-center px-1 pt-0.5 transition ${
        completed ? 'opacity-90 brightness-[0.95] saturate-[0.9]' : ''
      }`}
      aria-hidden
    >
      {/* Soft stall-window glow behind the keeper */}
      <div
        className="pointer-events-none absolute inset-x-[8%] top-1 bottom-0 rounded-t-full opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 50% 80%, rgba(245,215,110,0.45) 0%, transparent 70%)',
        }}
      />
      <ShopkeeperSvg id={id} />
    </div>
  )
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

        {/* Shopkeeper stands in the stall window — under roof/awning, above title */}
        <StallShopkeeper stationId={station.id} completed={completed} />

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
