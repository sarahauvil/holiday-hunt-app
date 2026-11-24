import { Link } from 'react-router-dom'
import type { Station } from '../data/stations'

/** Visual themes for Weihnachtsmarkt stalls — one unique look per station. */
export type StallVariantId =
  | 'lights'
  | 'wreath'
  | 'nye'
  | 'cny'
  | 'redShingles'
  | 'stone'
  | 'diwali'
  | 'shogatsu'
  | 'brassKeys'

export const stallVariantByStation: Record<string, StallVariantId> = {
  ghostwriter: 'lights',
  myorders: 'wreath',
  gap: 'nye',
  forge: 'stone',
  orbit: 'cny',
  llm: 'redShingles',
  pilot: 'diwali',
  elevit: 'shogatsu',
  keys: 'brassKeys',
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
  nye: {
    bodyFrom: '#1a1040',
    bodyTo: '#0a0818',
    border: 'rgba(240,195,60,0.55)',
    borderUnlocked: 'rgba(240,195,60,0.9)',
    accent: '#f0c33c',
  },
  cny: {
    bodyFrom: '#8b1a1a',
    bodyTo: '#4a0c0c',
    border: 'rgba(240,195,60,0.6)',
    borderUnlocked: 'rgba(255,220,100,0.95)',
    accent: '#f0c33c',
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
  diwali: {
    bodyFrom: '#4a1a5c',
    bodyTo: '#1a0a28',
    border: 'rgba(255,160,40,0.55)',
    borderUnlocked: 'rgba(255,200,80,0.9)',
    accent: '#ff9f1c',
  },
  shogatsu: {
    bodyFrom: '#f5f0e6',
    bodyTo: '#d9d0c0',
    border: 'rgba(180,40,40,0.55)',
    borderUnlocked: 'rgba(180,40,40,0.85)',
    accent: '#c41e1e',
  },
  brassKeys: {
    bodyFrom: '#3a2a12',
    bodyTo: '#1a1408',
    border: 'rgba(212,180,92,0.55)',
    borderUnlocked: 'rgba(240,195,60,0.9)',
    accent: '#d4b45c',
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
    case 'nye':
      return (
        <svg viewBox="0 0 200 56" className="block h-auto w-full" preserveAspectRatio="none">
          <path d="M4 50 L100 6 L196 50 Z" fill="#1a1040" stroke="#f0c33c" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M20 48 L100 14 L180 48 Z" fill="#2a1860" />
          {/* Fireworks bursts */}
          {[
            [36, 22],
            [100, 12],
            [164, 22],
          ].map(([cx, cy], i) => (
            <g key={i} opacity="0.95">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <path
                  key={deg}
                  d={`M${cx} ${cy} l${Math.cos((deg * Math.PI) / 180) * 8} ${Math.sin((deg * Math.PI) / 180) * 8}`}
                  stroke={i === 1 ? '#f0c33c' : i === 0 ? '#e85d4c' : '#7ec8e3'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ))}
              <circle cx={cx} cy={cy} r="2" fill="#fff8f0" />
            </g>
          ))}
          <rect x="28" y="34" width="144" height="12" rx="2" fill="#0a0818" opacity="0.85" />
          <text
            x="100"
            y="43.5"
            textAnchor="middle"
            fontSize="8"
            fontFamily="Georgia, serif"
            fontWeight="700"
            fill="#f0c33c"
          >
            Happy New Year
          </text>
        </svg>
      )
    case 'cny':
      return (
        <svg viewBox="0 0 200 56" className="block h-auto w-full" preserveAspectRatio="none">
          <path d="M6 50 L100 4 L194 50 Z" fill="#8b1a1a" stroke="#f0c33c" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M22 48 L100 14 L178 48 Z" fill="#a82828" />
          {/* Hanging lanterns */}
          {[40, 70, 100, 130, 160].map((x, i) => (
            <g key={x}>
              <path d={`M${x} 18 v6`} stroke="#f0c33c" strokeWidth="1.2" />
              <ellipse cx={x} cy={30} rx="8" ry="10" fill={i % 2 === 0 ? '#c41e1e' : '#f0c33c'} stroke="#1B2A4A" strokeWidth="1.2" />
              <path d={`M${x - 5} 38 Q${x} 42 ${x + 5} 38`} fill="#c41e1e" stroke="#1B2A4A" strokeWidth="0.8" />
              <rect x={x - 3} y={22} width="6" height="3" fill="#f0c33c" />
            </g>
          ))}
          <text x="100" y="12" textAnchor="middle" fontSize="10" fill="#f0c33c" fontFamily="Georgia, serif">
            福
          </text>
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
    case 'diwali':
      return (
        <svg viewBox="0 0 200 54" className="block h-auto w-full" preserveAspectRatio="none">
          <path d="M4 48 L100 5 L196 48 Z" fill="#5c1a7a" stroke="#ff9f1c" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M20 46 L100 14 L180 46 Z" fill="#7a2a9a" />
          {/* Rangoli-inspired ridge dots */}
          {[50, 70, 90, 110, 130, 150].map((x, i) => (
            <circle key={x} cx={x} cy={16 + (i % 2) * 3} r="3" fill={['#ff9f1c', '#e85d4c', '#f0c33c', '#2f8f4e'][i % 4]} />
          ))}
          {/* Candle flames along eaves */}
          {[35, 55, 75, 95, 115, 135, 155, 175].map((x) => (
            <g key={x}>
              <rect x={x - 1.5} y={36} width="3" height="8" fill="#f5e6c8" stroke="#1B2A4A" strokeWidth="0.6" />
              <ellipse cx={x} cy={34} rx="2.2" ry="3.5" fill="#ffb347" />
            </g>
          ))}
        </svg>
      )
    case 'shogatsu':
      return (
        <svg viewBox="0 0 200 56" className="block h-auto w-full" preserveAspectRatio="none">
          <path d="M6 50 L100 6 L194 50 Z" fill="#f5f0e6" stroke="#c41e1e" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M22 48 L100 16 L178 48 Z" fill="#ebe4d6" />
          {/* Shimekazari rope across near the roof */}
          <path
            d="M24 28 Q60 36 100 30 Q140 24 176 32"
            fill="none"
            stroke="#2F8F4E"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M24 28 Q60 36 100 30 Q140 24 176 32"
            fill="none"
            stroke="#FFF8F0"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="4 5"
          />
          {/* Shide zigzags */}
          {[50, 80, 100, 120, 150].map((x) => (
            <path
              key={x}
              d={`M${x} 30 l-3 5 3 5 -3 5 3 5`}
              fill="none"
              stroke="#FFF8F0"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          ))}
          {/* Bitter orange at center */}
          <circle cx="100" cy="28" r="6" fill="#E8782A" stroke="#1B2A4A" strokeWidth="1.4" />
          <path d="M100 22c0-3 2-4 3-4" stroke="#2F8F4E" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'brassKeys':
      return (
        <svg viewBox="0 0 200 52" className="block h-auto w-full" preserveAspectRatio="none">
          <path d="M6 48 L100 6 L194 48 Z" fill="#8a6a28" stroke="#f0c33c" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M22 46 L100 14 L178 46 Z" fill="#b8923a" />
          {/* Keyhole ornament at peak */}
          <circle cx="100" cy="24" r="7" fill="#1a1408" stroke="#f0c33c" strokeWidth="1.8" />
          <circle cx="100" cy="22" r="2.8" fill="#f0c33c" />
          <path d="M100 24.5 v7" stroke="#f0c33c" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M100 6 L100 14" stroke="#f0c33c" strokeWidth="2" strokeLinecap="round" />
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
    nye: {
      background: 'repeating-linear-gradient(90deg, #1a1040 0 10px, #f0c33c 10px 20px)',
      border: 'rgba(240,195,60,0.55)',
    },
    cny: {
      background: 'repeating-linear-gradient(90deg, #c41e1e 0 12px, #f0c33c 12px 24px)',
      border: 'rgba(240,195,60,0.55)',
    },
    redShingles: {
      background: 'repeating-linear-gradient(90deg, #8b1a1a 0 10px, #f5e6c8 10px 20px)',
      border: 'rgba(180,50,40,0.45)',
    },
    stone: null,
    diwali: {
      background: 'repeating-linear-gradient(90deg, #7a2a9a 0 8px, #ff9f1c 8px 16px, #e85d4c 16px 24px)',
      border: 'rgba(255,160,40,0.55)',
    },
    shogatsu: {
      background: 'repeating-linear-gradient(90deg, #c41e1e 0 14px, #f5f0e6 14px 28px)',
      border: 'rgba(180,40,40,0.45)',
    },
    brassKeys: {
      background: 'repeating-linear-gradient(90deg, #8a6a28 0 12px, #f0c33c 12px 24px)',
      border: 'rgba(240,195,60,0.55)',
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
    case 'nye':
      return (
        <div
          className="pointer-events-none absolute inset-0 rounded-b-xl opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(240,195,60,0.35), transparent 35%), radial-gradient(circle at 80% 20%, rgba(126,200,227,0.3), transparent 30%), radial-gradient(circle at 50% 80%, rgba(232,93,76,0.25), transparent 40%)',
          }}
        />
      )
    case 'cny':
      return (
        <>
          <span className="pointer-events-none absolute left-2 top-2 text-[11px] text-gold" aria-hidden>
            福
          </span>
          <span className="pointer-events-none absolute right-2 top-2 text-[11px] text-gold" aria-hidden>
            福
          </span>
          <div className="pointer-events-none absolute inset-x-2 bottom-1.5 flex justify-center gap-1" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block h-3 w-2.5 rounded-b-full border border-[#1B2A4A]/40"
                style={{ background: i === 1 ? '#f0c33c' : '#c41e1e' }}
              />
            ))}
          </div>
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
    case 'diwali':
      return (
        <>
          <div
            className="pointer-events-none absolute inset-0 rounded-b-xl opacity-50"
            aria-hidden
            style={{
              backgroundImage:
                'radial-gradient(circle at 15% 80%, rgba(255,179,71,0.55), transparent 25%), radial-gradient(circle at 50% 85%, rgba(255,159,28,0.45), transparent 28%), radial-gradient(circle at 85% 80%, rgba(232,93,76,0.4), transparent 25%)',
            }}
          />
          <div className="pointer-events-none absolute inset-x-2 bottom-1.5 flex justify-between" aria-hidden>
            {Array.from({ length: 7 }, (_, i) => (
              <span
                key={i}
                className="inline-block w-1.5 rounded-sm bg-[#f5e6c8]"
                style={{ height: unlocked ? 10 + (i % 3) * 2 : 8 }}
              />
            ))}
          </div>
        </>
      )
    case 'shogatsu':
      return (
        <>
          <div
            className="pointer-events-none absolute inset-x-3 top-1 h-1.5 rounded-full"
            style={{
              background: 'repeating-linear-gradient(90deg, #2F8F4E 0 6px, #FFF8F0 6px 10px)',
            }}
            aria-hidden
          />
          <span
            className="pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-[#c41e1e]/70"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#c41e1e]/70"
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
    case 'brassKeys':
      return (
        <div
          className="pointer-events-none absolute inset-0 rounded-b-xl opacity-[0.14]"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(240,195,60,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(212,180,92,0.28), transparent 45%)',
          }}
        />
      )
    default:
      return null
  }
}

function textClasses(variant: StallVariantId): { title: string; owners: string; locked: string } {
  if (variant === 'shogatsu') {
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
  | 'nyeParty'
  | 'nutcracker'
  | 'sheepGoat'
  | 'elf'
  | 'diwaliHost'
  | 'kimono'
  | 'diana'

export const shopkeeperByStation: Record<string, ShopkeeperId> = {
  ghostwriter: 'ghost',
  myorders: 'mrsClaus',
  gap: 'nyeParty',
  forge: 'nutcracker',
  orbit: 'sheepGoat',
  llm: 'elf',
  pilot: 'diwaliHost',
  elevit: 'kimono',
  keys: 'diana',
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
    case 'nyeParty':
      return (
        <svg {...common}>
          <StallCounter />
          <RestingArms />
          {/* Party hat */}
          <path d="M42 2 L52 18 L32 18 Z" fill="#7EC8E3" stroke={shopInk} strokeWidth="2" strokeLinejoin="round" />
          <circle cx="42" cy="3" r="2.5" fill={shopGold} stroke={shopInk} strokeWidth="1.4" />
          <path d="M32 18h20" stroke={shopRed} strokeWidth="3" strokeLinecap="round" />
          <circle cx="42" cy="20" r="8" fill={shopSkin} stroke={shopInk} strokeWidth="2" />
          <ellipse cx="39" cy="19.5" rx="1.3" ry="1.6" fill={shopInk} />
          <ellipse cx="45" cy="19.5" rx="1.3" ry="1.6" fill={shopInk} />
          <path d="M39.5 24c1.2 1.2 3.8 1.2 5 0" stroke={shopInk} strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="36" cy="22" rx="1.7" ry="1" fill={shopPink} opacity="0.9" />
          <ellipse cx="48" cy="22" rx="1.7" ry="1" fill={shopPink} opacity="0.9" />
          {/* Tuxedo / sparkly jacket */}
          <path
            d="M32 28c2-3.5 6-5.5 10-5.5s8 2 10 5.5v16H32V28z"
            fill="#1B2A4A"
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M40 28v16M44 28v16" stroke={shopCream} strokeWidth="1.5" />
          <path d="M42 28 L38 34 L42 33 L46 34 Z" fill={shopRed} stroke={shopInk} strokeWidth="1.2" />
          <circle cx="36" cy="32" r="1.2" fill={shopGold} />
          <circle cx="48" cy="34" r="1.2" fill={shopGold} />
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
    case 'sheepGoat':
      return (
        <svg {...common}>
          <StallCounter />
          <RestingArms fill="#E8E0D4" />
          {/* Horns */}
          <path d="M32 14c-6-8-10-4-8 0" fill="none" stroke={shopBrown} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M52 14c6-8 10-4 8 0" fill="none" stroke={shopBrown} strokeWidth="2.4" strokeLinecap="round" />
          {/* Fluffy head */}
          <circle cx="36" cy="16" r="4" fill="#E8E0D4" stroke={shopInk} strokeWidth="1.6" />
          <circle cx="48" cy="16" r="4" fill="#E8E0D4" stroke={shopInk} strokeWidth="1.6" />
          <circle cx="42" cy="14" r="4" fill="#E8E0D4" stroke={shopInk} strokeWidth="1.6" />
          <ellipse cx="42" cy="22" rx="11" ry="10" fill="#E8E0D4" stroke={shopInk} strokeWidth="2" />
          <ellipse cx="38" cy="21" rx="1.5" ry="1.8" fill={shopInk} />
          <ellipse cx="46" cy="21" rx="1.5" ry="1.8" fill={shopInk} />
          <ellipse cx="42" cy="26" rx="4" ry="3" fill="#F2C9A8" stroke={shopInk} strokeWidth="1.4" />
          <path d="M40 27c1 .7 3 .7 4 0" stroke={shopInk} strokeWidth="1.2" strokeLinecap="round" />
          {/* Red CNY scarf / body */}
          <path
            d="M31 34c2-2.5 6-4 11-4s9 1.5 11 4v10H31V34z"
            fill={shopRed}
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M31 36h22" stroke={shopGold} strokeWidth="3" strokeLinecap="round" />
          <text x="42" y="43" textAnchor="middle" fontSize="5" fill={shopGold} fontWeight="700">
            福
          </text>
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
    case 'diwaliHost':
      return (
        <svg {...common}>
          <StallCounter />
          <RestingArms />
          {/* Colorful turban / festive headwrap */}
          <path
            d="M30 14c0-6 5-10 12-10s12 4 12 10c-3-1-7-2-12-2s-9 1-12 2z"
            fill="#7A2A9A"
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M30 14h24" stroke="#FF9F1C" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="54" cy="12" r="2.5" fill={shopGold} stroke={shopInk} strokeWidth="1.3" />
          <circle cx="42" cy="20" r="8" fill={shopSkin} stroke={shopInk} strokeWidth="2" />
          <ellipse cx="39" cy="19.5" rx="1.3" ry="1.6" fill={shopInk} />
          <ellipse cx="45" cy="19.5" rx="1.3" ry="1.6" fill={shopInk} />
          <path d="M39.5 24c1.2 1.2 3.8 1.2 5 0" stroke={shopInk} strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="36" cy="22" rx="1.7" ry="1" fill={shopPink} opacity="0.9" />
          <ellipse cx="48" cy="22" rx="1.7" ry="1" fill={shopPink} opacity="0.9" />
          {/* Bright festive kurta */}
          <path
            d="M32 28c2-3.5 6-5.5 10-5.5s8 2 10 5.5v16H32V28z"
            fill="#E85D4C"
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M36 30h12v3H36z" fill="#FF9F1C" stroke={shopInk} strokeWidth="1.2" />
          <circle cx="42" cy="36" r="2" fill={shopGold} stroke={shopInk} strokeWidth="1.2" />
          {/* Diya on counter */}
          <ellipse cx="62" cy="42" rx="5" ry="2.5" fill="#E8A838" stroke={shopInk} strokeWidth="1.3" />
          <ellipse cx="62" cy="38" rx="2" ry="3" fill="#FFB347" stroke={shopInk} strokeWidth="1.1" />
        </svg>
      )
    case 'kimono':
      return (
        <svg {...common}>
          <StallCounter />
          <RestingArms />
          {/* Hair with ornament */}
          <circle cx="42" cy="12" r="9" fill="#1B2A4A" stroke={shopInk} strokeWidth="2" />
          <circle cx="50" cy="10" r="3" fill={shopRed} stroke={shopInk} strokeWidth="1.4" />
          <circle cx="42" cy="18" r="7.5" fill={shopSkin} stroke={shopInk} strokeWidth="2" />
          <ellipse cx="39" cy="17.5" rx="1.2" ry="1.5" fill={shopInk} />
          <ellipse cx="45" cy="17.5" rx="1.2" ry="1.5" fill={shopInk} />
          <path d="M39.5 22c1.2 1.1 3.8 1.1 5 0" stroke={shopInk} strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="36.5" cy="20" rx="1.6" ry="1" fill={shopPink} opacity="0.9" />
          <ellipse cx="47.5" cy="20" rx="1.6" ry="1" fill={shopPink} opacity="0.9" />
          {/* Kimono / yukata with collar V */}
          <path
            d="M30 28c2-3 6-5 12-5s10 2 12 5v16H30V28z"
            fill="#2F6B8F"
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M42 25 L36 44M42 25 L48 44" stroke={shopCream} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M30 36h24" stroke={shopRed} strokeWidth="3.5" strokeLinecap="round" />
          {/* Small daidai on counter */}
          <circle cx="62" cy="40" r="4" fill="#E8782A" stroke={shopInk} strokeWidth="1.3" />
          <path d="M62 36c0-2 1.5-3 2-3" stroke={shopGreen} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )
    case 'diana':
      return (
        <svg {...common}>
          <StallCounter />
          <RestingArms />
          {/* Long blonde hair — back layer behind shoulders */}
          <path
            d="M28 14c0-8 6-13 14-13s14 5 14 13v28c-3-2-8-3-14-3s-11 1-14 3V14z"
            fill="#F0D28A"
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M28 22c2 8 3 16 2 22M56 22c-2 8-3 16-2 22"
            stroke="#E8C46A"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Face */}
          <circle cx="42" cy="18" r="8" fill={shopSkin} stroke={shopInk} strokeWidth="2" />
          {/* Blue eyes */}
          <ellipse cx="39" cy="17.5" rx="1.5" ry="1.8" fill="#4A90D9" stroke={shopInk} strokeWidth="1.1" />
          <ellipse cx="45" cy="17.5" rx="1.5" ry="1.8" fill="#4A90D9" stroke={shopInk} strokeWidth="1.1" />
          <circle cx="39.4" cy="17" r="0.55" fill={shopCream} />
          <circle cx="45.4" cy="17" r="0.55" fill={shopCream} />
          <path d="M39.5 22c1.2 1.2 3.8 1.2 5 0" stroke={shopInk} strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="36" cy="20" rx="1.7" ry="1" fill={shopPink} opacity="0.9" />
          <ellipse cx="48" cy="20" rx="1.7" ry="1" fill={shopPink} opacity="0.9" />
          {/* Bangs */}
          <path
            d="M34 12c2-3 5-4 8-4s6 1 8 4c-2 1-5 2-8 2s-6-1-8-2z"
            fill="#F5DC9A"
            stroke={shopInk}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Holiday sweater */}
          <path
            d="M32 28c2-3 6-5 10-5s8 2 10 5v16H32V28z"
            fill={shopRed}
            stroke={shopInk}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M32 32h20" stroke={shopGreen} strokeWidth="3.5" />
          <path d="M32 36h20" stroke={shopCream} strokeWidth="2" />
          <path d="M34 34h2M38 34h2M42 34h2M46 34h2M50 34h2" stroke={shopGold} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M36 38h12" stroke={shopGreen} strokeWidth="2.5" />
          <circle cx="42" cy="40.5" r="1.6" fill={shopGold} stroke={shopInk} strokeWidth="1" />
          {/* Brass key on counter */}
          <circle cx="62" cy="40" r="3.2" fill={shopGold} stroke={shopInk} strokeWidth="1.4" />
          <circle cx="62" cy="40" r="1.3" fill={shopCream} />
          <rect x="61.2" y="42.5" width="1.8" height="7" rx="0.6" fill={shopGold} stroke={shopInk} strokeWidth="1.1" />
          <path d="M63 46h3M63 48.5h2.5" stroke={shopInk} strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      )
  }
}

function StallShopkeeper({ stationId, completed }: { stationId: string; completed: boolean }) {
  const id = shopkeeperByStation[stationId] ?? 'nyeParty'
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
  const variant = stallVariantByStation[station.id] ?? 'nye'
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

        {variant !== 'shogatsu' && variant !== 'wreath' && variant !== 'cny' && (
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
            completed && variant === 'shogatsu'
              ? { color: '#8b1a1a' }
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
