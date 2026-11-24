import { useId } from 'react'
import { motion } from 'framer-motion'
import type { Team } from '../lib/types'
import { FinalePuzzle } from './FinalePuzzle'
import { PaintedScene } from './PaintedScene'

const FLAME_EASE = 'easeInOut' as const

const embers = [
  { id: 0, x: 132, delay: 0, duration: 2.4, drift: -8 },
  { id: 1, x: 148, delay: 0.4, duration: 2.1, drift: 6 },
  { id: 2, x: 160, delay: 0.9, duration: 2.8, drift: -4 },
  { id: 3, x: 172, delay: 0.2, duration: 2.3, drift: 10 },
  { id: 4, x: 186, delay: 1.1, duration: 2.6, drift: -6 },
  { id: 5, x: 155, delay: 1.6, duration: 2.0, drift: 3 },
]

function FireplaceSvg() {
  // Unique ids so CSS filter on a wrapper never collides with page-level SVG defs,
  // and nested filter-on-filter blanks out in Safari/Chromium.
  const uid = useId().replace(/:/g, '')
  const ids = {
    paintWarp: `fp-warp-${uid}`,
    softEdge: `fp-soft-${uid}`,
    flameBlur: `fp-flame-${uid}`,
    glowBlur: `fp-glow-${uid}`,
    floorGlow: `fp-floor-${uid}`,
    hearthGlow: `fp-hearth-${uid}`,
    emberCore: `fp-ember-${uid}`,
    stoneFace: `fp-stone-${uid}`,
    stoneInner: `fp-inner-${uid}`,
    mantelWood: `fp-mantel-${uid}`,
    mantelHighlight: `fp-mhl-${uid}`,
    fireboxDark: `fp-box-${uid}`,
    logBark: `fp-log-${uid}`,
    mugBody: `fp-mug-${uid}`,
    fireboxClip: `fp-clip-${uid}`,
  }

  return (
    // CSS drop-shadow lives on the wrapper — applying filter on the <svg> root
    // plus internal SVG filters can blank the graphic in some browsers.
    <div className="fireplace-glow mx-auto w-full max-w-md">
      <svg
        viewBox="0 0 320 240"
        className="fireplace-svg mx-auto block h-auto w-full"
        role="img"
        aria-label="A decorated holiday fireplace with garland, stockings, gifts, and cocoa"
        overflow="visible"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Displacement-only warp — soft-light noise filled the whole filter region
              as a grey rectangle and could hide content when nested with other filters. */}
          <filter id={ids.paintWarp} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="warp" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="warp"
              scale="1.2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id={ids.softEdge} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="0.75" />
          </filter>
          <filter id={ids.flameBlur} x="-45%" y="-45%" width="190%" height="190%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="1.8" />
          </filter>
          <filter id={ids.glowBlur} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="7" />
          </filter>

          <linearGradient id={ids.floorGlow} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#E07A3D" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#D4A04A" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F5E6C8" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={ids.hearthGlow} cx="50%" cy="75%" r="55%">
            <stop offset="0%" stopColor="#FFE08A" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#E07A3D" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#B91C1C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1A100C" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={ids.emberCore} cx="50%" cy="80%" r="45%">
            <stop offset="0%" stopColor="#FFF6D0" />
            <stop offset="40%" stopColor="#FFB347" />
            <stop offset="100%" stopColor="#E25822" stopOpacity="0.15" />
          </radialGradient>
          <linearGradient id={ids.stoneFace} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B4A32" />
            <stop offset="45%" stopColor="#4A3222" />
            <stop offset="100%" stopColor="#2E1C12" />
          </linearGradient>
          <linearGradient id={ids.stoneInner} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3A2818" />
            <stop offset="50%" stopColor="#1A120C" />
            <stop offset="100%" stopColor="#2A1810" />
          </linearGradient>
          <linearGradient id={ids.mantelWood} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B6340" />
            <stop offset="40%" stopColor="#6B4A32" />
            <stop offset="100%" stopColor="#4A3222" />
          </linearGradient>
          <linearGradient id={ids.mantelHighlight} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C4A078" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#6B4A32" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={ids.fireboxDark} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A100C" />
            <stop offset="55%" stopColor="#0C0806" />
            <stop offset="100%" stopColor="#2A1408" />
          </linearGradient>
          <linearGradient id={ids.logBark} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7A5238" />
            <stop offset="50%" stopColor="#5C4030" />
            <stop offset="100%" stopColor="#3A2818" />
          </linearGradient>
          <linearGradient id={ids.mugBody} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF8F0" />
            <stop offset="100%" stopColor="#D4C8B8" />
          </linearGradient>
          <clipPath id={ids.fireboxClip}>
            <rect x="88" y="110" width="144" height="74" rx="5" />
          </clipPath>
        </defs>

        {/* Structure — painted warp only (no nested blur filters) */}
        <g filter={`url(#${ids.paintWarp})`}>
          <motion.ellipse
            cx="160"
            cy="208"
            rx="128"
            ry="26"
            fill={`url(#${ids.floorGlow})`}
            animate={{ opacity: [0.4, 0.62, 0.45, 0.58, 0.4], rx: [124, 132, 126, 130, 124] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: FLAME_EASE }}
          />

          <path
            d="M48 72 C46 70 50 66 58 66 L262 66 C270 66 274 70 272 74 L274 198 C274 204 268 208 260 208 L60 208 C52 208 46 204 46 198 Z"
            fill={`url(#${ids.stoneFace})`}
          />
          <path
            d="M56 78 C54 76 58 74 64 74 L256 74 C262 74 266 76 264 80 L266 196 C266 200 262 202 256 202 L64 202 C58 202 54 200 54 196 Z"
            fill={`url(#${ids.stoneInner})`}
            opacity="0.9"
          />
          <motion.path
            d="M88 110 L88 184 L64 196 L64 100 Z"
            fill="#E07A3D"
            animate={{ opacity: [0.08, 0.2, 0.1, 0.18, 0.08] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: FLAME_EASE }}
          />
          <motion.path
            d="M232 110 L232 184 L256 196 L256 100 Z"
            fill="#E07A3D"
            animate={{ opacity: [0.08, 0.2, 0.1, 0.18, 0.08] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: FLAME_EASE, delay: 0.2 }}
          />
          <path
            d="M58 112 Q160 108 262 112 M58 148 Q160 152 262 148 M126 78 Q124 140 128 200 M194 78 Q196 140 192 200"
            stroke="#2A1810"
            strokeWidth="1.15"
            fill="none"
            opacity="0.32"
          />
          <path
            d="M60 110 Q160 114 260 110 M128 80 Q126 140 130 198"
            stroke="#A88860"
            strokeWidth="0.55"
            fill="none"
            opacity="0.22"
          />

          <path
            d="M34 58 C34 54 38 52 44 52 L276 52 C282 52 286 54 286 58 L286 74 C286 76 284 78 280 78 L40 78 C36 78 34 76 34 74 Z"
            fill={`url(#${ids.mantelWood})`}
          />
          <path d="M38 54 L282 54 L280 64 L40 64 Z" fill={`url(#${ids.mantelHighlight})`} />
          <rect x="32" y="76" width="256" height="5" rx="1" fill="#2A1810" opacity="0.65" />
          <path
            d="M50 62 Q160 58 270 62 M55 68 Q160 72 265 68"
            stroke="#3A2818"
            strokeWidth="0.7"
            fill="none"
            opacity="0.25"
          />

          <rect x="88" y="110" width="144" height="74" rx="5" fill={`url(#${ids.fireboxDark})`} />
          <motion.rect
            x="90"
            y="112"
            width="140"
            height="70"
            rx="4"
            fill="none"
            stroke="#E07A3D"
            strokeWidth="1.5"
            animate={{ opacity: [0.15, 0.4, 0.2, 0.35, 0.15] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: FLAME_EASE }}
          />

          {/* Logs */}
          <rect
            x="108"
            y="168"
            width="44"
            height="11"
            rx="4"
            fill={`url(#${ids.logBark})`}
            transform="rotate(-9 130 173)"
          />
          <rect
            x="112"
            y="170"
            width="36"
            height="3"
            rx="1"
            fill="#8B6340"
            opacity="0.35"
            transform="rotate(-9 130 171)"
          />
          <rect
            x="158"
            y="170"
            width="46"
            height="11"
            rx="4"
            fill={`url(#${ids.logBark})`}
            transform="rotate(11 181 175)"
          />
          <ellipse cx="154" cy="176" rx="10" ry="5" fill="#3A2818" opacity="0.5" />
          <motion.ellipse
            cx="160"
            cy="174"
            rx="36"
            ry="6"
            fill="#E07A3D"
            animate={{ opacity: [0.15, 0.35, 0.2, 0.3, 0.15] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: FLAME_EASE }}
          />

          {/* Mantel garland — evergreen swag with berries & lights */}
          <path
            d="M42 52 Q80 38 120 48 Q160 34 200 48 Q240 38 278 52"
            fill="none"
            stroke="#0B3D2E"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M42 52 Q80 40 120 50 Q160 36 200 50 Q240 40 278 52"
            fill="none"
            stroke="#1A6B4A"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {[
            [52, 48],
            [68, 42],
            [88, 46],
            [108, 44],
            [128, 40],
            [148, 38],
            [168, 40],
            [188, 44],
            [208, 46],
            [228, 42],
            [248, 46],
            [266, 48],
          ].map(([lx, ly], i) => (
            <g key={`leaf-${i}`}>
              <ellipse
                cx={lx}
                cy={ly + (i % 2 === 0 ? 4 : -2)}
                rx="5"
                ry="3"
                fill={i % 3 === 0 ? '#0B3D2E' : '#2F8F4E'}
                transform={`rotate(${i % 2 === 0 ? -35 : 40} ${lx} ${ly})`}
              />
              <ellipse
                cx={lx + 3}
                cy={ly + (i % 2 === 0 ? -3 : 5)}
                rx="4"
                ry="2.4"
                fill="#1A6B4A"
                transform={`rotate(${i % 2 === 0 ? 25 : -30} ${lx + 3} ${ly})`}
              />
            </g>
          ))}
          {/* Berry clusters */}
          {[58, 95, 135, 175, 215, 255].map((bx, i) => (
            <g key={`berry-${i}`}>
              <circle cx={bx} cy={44 + (i % 2)} r="2.4" fill="#B91C1C" />
              <circle cx={bx + 3.5} cy={46 + (i % 2)} r="2.2" fill="#E04545" />
              <circle cx={bx + 1.5} cy={41.5 + (i % 2)} r="2" fill="#C41E1E" />
            </g>
          ))}
          {/* Twinkling garland lights */}
          {[62, 102, 142, 182, 222, 262].map((gx, i) => (
            <motion.circle
              key={`light-${i}`}
              cx={gx}
              cy={50}
              r="2.6"
              fill={['#F0C33C', '#FFF8F0', '#E07A3D', '#F0C33C', '#FFF8F0', '#E04545'][i]}
              animate={{ opacity: [0.35, 1, 0.45, 1, 0.35], scale: [0.85, 1.25, 0.9, 1.2, 0.85] }}
              transition={{ duration: 1.6 + (i % 3) * 0.25, repeat: Infinity, ease: FLAME_EASE, delay: i * 0.18 }}
            />
          ))}

          {/* Left mantel: gift stack + candy cane */}
          <rect x="44" y="36" width="18" height="16" rx="1.5" fill="#B91C1C" />
          <path d="M44 42h18M53 36v16" stroke="#F0C33C" strokeWidth="2.2" />
          <rect x="52" y="28" width="14" height="12" rx="1.2" fill="#0B3D2E" />
          <path d="M52 33h14M59 28v12" stroke="#FFF8F0" strokeWidth="1.8" />
          <path
            d="M40 34 C36 28 34 22 38 18 C40 22 44 26 46 30"
            fill="none"
            stroke="#E04545"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M40 34 C36 28 34 22 38 18 C40 22 44 26 46 30"
            fill="none"
            stroke="#FFF8F0"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="3.5 3.5"
          />

          {/* Center-left: gold candle */}
          <rect x="118" y="30" width="7" height="22" rx="1.5" fill="#FFF8F0" />
          <rect x="118" y="30" width="7" height="4" fill="#C4A35A" />
          <motion.ellipse
            cx="121.5"
            cy="26"
            rx="3"
            ry="5"
            fill="#FFE08A"
            animate={{ opacity: [0.55, 1, 0.65, 0.95, 0.55], ry: [4.2, 5.5, 4.5, 5.2, 4.2] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: FLAME_EASE }}
          />
          <motion.ellipse
            cx="121.5"
            cy="24"
            rx="1.4"
            ry="2.4"
            fill="#FFF6D0"
            animate={{ opacity: [0.7, 1, 0.75], ry: [2, 2.8, 2] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: FLAME_EASE, delay: 0.1 }}
          />

          {/* Center-right: red candle */}
          <rect x="196" y="28" width="7" height="24" rx="1.5" fill="#B91C1C" />
          <rect x="196" y="28" width="7" height="3" fill="#F0C33C" />
          <motion.ellipse
            cx="199.5"
            cy="24"
            rx="3"
            ry="5"
            fill="#FFB347"
            animate={{ opacity: [0.5, 1, 0.6, 0.95, 0.5], ry: [4, 5.6, 4.4, 5.3, 4] }}
            transition={{ duration: 1.55, repeat: Infinity, ease: FLAME_EASE, delay: 0.25 }}
          />

          {/* Pine cone + ornament ball on mantel */}
          <ellipse cx="140" cy="48" rx="6" ry="8" fill="#5C4030" />
          <path d="M136 44h8M135 48h10M136 52h8" stroke="#3A2818" strokeWidth="1" opacity="0.55" />
          <circle cx="180" cy="44" r="7" fill="#1A6B4A" />
          <circle cx="180" cy="42" r="4.5" fill="#2F8F4E" opacity="0.7" />
          <path d="M180 37v-5" stroke="#F0C33C" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="180" cy="31" r="2" fill="#F0C33C" />

          {/* Stockings — plain flat colors */}
          <path
            d="M78 76 v36 c0 4 2 8 7 10 c6 3 12 1 14 -4 c2 -4 1 -8 -2 -10 v-32z"
            fill="#C41E1E"
          />
          <rect x="76" y="72" width="22" height="9" rx="2.5" fill="#FFF8F0" />

          <path
            d="M148 76 v34 c0 4 2 8 7 10 c6 3 12 1 14 -4 c2 -4 1 -8 -2 -10 v-30z"
            fill="#1E3A6E"
          />
          <rect x="146" y="72" width="22" height="9" rx="2.5" fill="#FFF8F0" />

          <path
            d="M218 76 v36 c0 4 2 8 7 10 c6 3 12 1 14 -4 c2 -4 1 -8 -2 -10 v-32z"
            fill="#0B3D2E"
          />
          <rect x="216" y="72" width="22" height="9" rx="2.5" fill="#FFF8F0" />

          {/* Right mantel: cocoa + holly sprig */}
          <rect x="248" y="38" width="22" height="20" rx="4" fill={`url(#${ids.mugBody})`} />
          <path
            d="M270 46 h6 c4.5 0 4.5 11 0 11h-6"
            stroke="#D4C8B8"
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse cx="259" cy="40" rx="9" ry="3.2" fill="#5C4030" />
          <ellipse cx="259" cy="39" rx="6.5" ry="1.8" fill="#3A2818" opacity="0.5" />
          <motion.path
            d="M254 32 Q256 24 258 32"
            stroke="#F5E6C8"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            animate={{ opacity: [0.25, 0.75, 0.25], y: [0, -3, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: FLAME_EASE }}
          />
          <motion.path
            d="M259 30 Q261 21 263 30"
            stroke="#F5E6C8"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            animate={{ opacity: [0.15, 0.65, 0.15], y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: FLAME_EASE, delay: 0.35 }}
          />
          <motion.path
            d="M264 32 Q266 25 268 32"
            stroke="#F5E6C8"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            animate={{ opacity: [0.2, 0.55, 0.2], y: [0, -2.5, 0] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: FLAME_EASE, delay: 0.7 }}
          />
          {/* Holly by mug */}
          <ellipse cx="242" cy="48" rx="6" ry="3.5" fill="#0B3D2E" transform="rotate(-25 242 48)" />
          <ellipse cx="246" cy="50" rx="5.5" ry="3" fill="#1A6B4A" transform="rotate(20 246 50)" />
          <circle cx="244" cy="46" r="1.8" fill="#E04545" />
          <circle cx="247" cy="47.5" r="1.5" fill="#B91C1C" />
          <circle cx="242" cy="48.5" r="1.4" fill="#C41E1E" />

          {/* Celebratory sparkles around the hearth */}
          {[
            [68, 38],
            [248, 24],
            [100, 28],
            [220, 22],
            [160, 18],
            [50, 90],
            [270, 100],
          ].map(([sx, sy], i) => (
            <motion.g
              key={`spark-${i}`}
              animate={{ opacity: [0.15, 0.95, 0.2, 0.85, 0.15], scale: [0.7, 1.2, 0.8, 1.15, 0.7] }}
              transition={{ duration: 1.8 + (i % 4) * 0.2, repeat: Infinity, ease: FLAME_EASE, delay: i * 0.22 }}
              style={{ transformOrigin: `${sx}px ${sy}px` }}
            >
              <path
                d={`M${sx} ${sy - 5} L${sx + 1.2} ${sy - 1.2} L${sx + 5} ${sy} L${sx + 1.2} ${sy + 1.2} L${sx} ${sy + 5} L${sx - 1.2} ${sy + 1.2} L${sx - 5} ${sy} L${sx - 1.2} ${sy - 1.2} Z`}
                fill={i % 2 === 0 ? '#F0C33C' : '#FFF8F0'}
              />
            </motion.g>
          ))}
        </g>

        {/* Fire layer OUTSIDE paint warp — nested SVG filters under warp blanked flames */}
        <g clipPath={`url(#${ids.fireboxClip})`}>
          <motion.ellipse
            cx="160"
            cy="168"
            rx="58"
            ry="38"
            fill={`url(#${ids.hearthGlow})`}
            filter={`url(#${ids.glowBlur})`}
            animate={{
              opacity: [0.55, 0.9, 0.65, 0.95, 0.55],
              ry: [34, 42, 36, 40, 34],
              rx: [54, 60, 56, 62, 54],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: FLAME_EASE }}
          />

          <motion.ellipse
            cx="160"
            cy="172"
            rx="42"
            ry="14"
            fill={`url(#${ids.emberCore})`}
            animate={{ opacity: [0.75, 1, 0.8, 0.95, 0.75], rx: [40, 44, 41, 43, 40] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: FLAME_EASE }}
          />

          <motion.path
            d="M116 176 C120 142 136 118 160 128 C184 118 200 142 204 176 Z"
            fill="#C41E1E"
            opacity="0.55"
            filter={`url(#${ids.flameBlur})`}
            animate={{
              d: [
                'M116 176 C120 142 136 118 160 128 C184 118 200 142 204 176 Z',
                'M116 176 C118 136 138 108 160 120 C182 106 202 138 204 176 Z',
                'M116 176 C122 148 134 124 160 134 C186 122 198 146 204 176 Z',
                'M116 176 C120 142 136 118 160 128 C184 118 200 142 204 176 Z',
              ],
              opacity: [0.45, 0.75, 0.55, 0.45],
            }}
            transition={{ duration: 2.1, repeat: Infinity, ease: FLAME_EASE }}
          />

          <motion.path
            d="M126 176 C130 144 142 120 160 132 C178 118 190 146 194 176 Z"
            fill="#E07A3D"
            filter={`url(#${ids.flameBlur})`}
            animate={{
              d: [
                'M126 176 C130 144 142 120 160 132 C178 118 190 146 194 176 Z',
                'M126 176 C128 136 144 110 160 124 C176 108 192 140 194 176 Z',
                'M126 176 C132 150 140 128 160 138 C180 126 188 150 194 176 Z',
                'M126 176 C130 144 142 120 160 132 C178 118 190 146 194 176 Z',
              ],
              opacity: [0.85, 1, 0.9, 0.95, 0.85],
            }}
            transition={{ duration: 1.35, repeat: Infinity, ease: FLAME_EASE }}
          />

          <motion.path
            d="M132 174 Q136 138 146 152 Q150 126 158 174"
            fill="#FFE08A"
            opacity="0.9"
            filter={`url(#${ids.softEdge})`}
            animate={{
              d: [
                'M132 174 Q136 138 146 152 Q150 126 158 174',
                'M132 174 Q134 128 145 144 Q148 114 158 174',
                'M132 174 Q138 146 147 156 Q152 132 158 174',
                'M132 174 Q136 138 146 152 Q150 126 158 174',
              ],
              opacity: [0.75, 1, 0.8, 0.75],
            }}
            transition={{ duration: 1.05, repeat: Infinity, ease: FLAME_EASE }}
          />

          <motion.path
            d="M146 174 Q152 120 160 138 Q168 112 174 174"
            fill="#FFF6D0"
            filter={`url(#${ids.softEdge})`}
            animate={{
              d: [
                'M146 174 Q152 120 160 138 Q168 112 174 174',
                'M146 174 Q150 108 160 128 Q170 102 174 174',
                'M146 174 Q154 128 160 142 Q166 118 174 174',
                'M146 174 Q152 120 160 138 Q168 112 174 174',
              ],
              opacity: [0.9, 1, 0.92, 0.9],
            }}
            transition={{ duration: 0.95, repeat: Infinity, ease: FLAME_EASE }}
          />

          <motion.path
            d="M162 174 Q168 128 174 146 Q180 118 188 174"
            fill="#FFB347"
            opacity="0.85"
            filter={`url(#${ids.softEdge})`}
            animate={{
              d: [
                'M162 174 Q168 128 174 146 Q180 118 188 174',
                'M162 174 Q170 114 175 136 Q184 108 188 174',
                'M162 174 Q166 138 173 150 Q178 126 188 174',
                'M162 174 Q168 128 174 146 Q180 118 188 174',
              ],
              opacity: [0.7, 0.95, 0.75, 0.7],
            }}
            transition={{ duration: 1.15, repeat: Infinity, ease: FLAME_EASE, delay: 0.15 }}
          />

          {embers.map((e) => (
            <motion.circle
              key={e.id}
              cx={e.x}
              cy={168}
              r={1.6 + (e.id % 3) * 0.4}
              fill={e.id % 2 === 0 ? '#FFE08A' : '#E07A3D'}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                y: [0, -28 - (e.id % 4) * 6, -48 - (e.id % 3) * 8],
                x: [0, e.drift * 0.4, e.drift],
                opacity: [0, 0.95, 0],
                scale: [0.6, 1.15, 0.3],
              }}
              transition={{
                duration: e.duration,
                repeat: Infinity,
                delay: e.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

function Confetti() {
  const colors = ['#C4A35A', '#B91C1C', '#E8F1F5', '#E07A3D', '#0B3D2E', '#F0C33C', '#2F8F4E', '#FFF8F0']
  const bits = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    left: `${(i * 7.3 + (i % 5) * 3) % 100}%`,
    color: colors[i % colors.length],
    delay: (i % 12) * 0.1,
    duration: 2.8 + (i % 5) * 0.35,
    x: (i % 2 === 0 ? 1 : -1) * (18 + (i % 7) * 12),
    shape: i % 4, // 0 square, 1 tall ribbon, 2 circle, 3 wide ribbon
    size: 6 + (i % 4) * 2,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {bits.map((bit) => (
        <motion.span
          key={bit.id}
          className="absolute top-0"
          style={{
            left: bit.left,
            background: bit.color,
            width: bit.shape === 1 ? 3 : bit.shape === 3 ? bit.size + 4 : bit.size,
            height: bit.shape === 1 ? bit.size + 6 : bit.shape === 3 ? 3 : bit.size,
            borderRadius: bit.shape === 2 ? '999px' : bit.shape === 0 ? '2px' : '1px',
            boxShadow: bit.shape === 2 ? `0 0 6px ${bit.color}` : undefined,
          }}
          initial={{ y: -30, opacity: 0, rotate: 0 }}
          animate={{
            y: '110vh',
            opacity: [0, 1, 1, 0.8, 0],
            x: [0, bit.x * 0.4, bit.x],
            rotate: [0, 180, 400 + (bit.id % 3) * 90],
          }}
          transition={{ duration: bit.duration, delay: bit.delay, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.8 }}
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
      <PaintedScene src="/images/market-square.jpg" objectPosition="center 40%" className="opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-[#0a1520]/72" />
      <Confetti />
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 14 }}
      >
        <motion.p
          className="text-xl text-gold"
          animate={{ opacity: [0.75, 1, 0.85, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          Frohes Fest aus Köln!
        </motion.p>
        <h1 className="font-display mt-2 text-4xl text-snow md:text-6xl">
          You decorated the FIREPLACE!
        </h1>
        <p className="mx-auto mt-2 text-sm font-medium tracking-wide text-gold/90">
          Mantel lit · stockings stuffed · one last puzzle
        </p>
        <p className="mx-auto mt-3 max-w-md text-snow/85">
          {team.name} toured every stall and lit the hearth. Glühwein is on us (figuratively).
        </p>
        <div className="mt-6">
          <FireplaceSvg />
        </div>
        {/* Final task: drag-and-drop puzzle — pass imageSrc later for real art */}
        <FinalePuzzle />
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
