import type { CharmId } from '../data/stations'

/** Flat sticker style: thick navy outline, solid fills, soft highlights. */
const ink = '#1B2A4A'
const red = '#E23B3B'
const green = '#2F8F4E'
const leaf = '#3FA85A'
const brown = '#A66B3A'
const ginger = '#C48A4A'
const gold = '#F0C33C'
const cream = '#FFF8F0'
const cocoa = '#6B3E24'
const glass = '#B8D9F0'
const ghostFill = '#F4F7FB'
const bark = '#8B5A2B'
const ember = '#E8782A'
const berry = '#C41E3A'

export function CharmIcon({
  charm,
  size = 34,
  collected = true,
}: {
  charm: CharmId
  size?: number
  collected?: boolean
}) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 48 48',
    fill: 'none',
    style: { opacity: collected ? 1 : 0.35 },
    'aria-hidden': true as const,
  }

  switch (charm) {
    case 'ghost':
      return (
        <svg {...common}>
          {/* Cute Christmas ghost with Santa hat + rosy cheeks */}
          <path
            d="M12 22c0-8 5.5-14 12-14s12 6 12 14v14c0 1.2-.8 1.6-1.6.9L31 46l-3.2-4.2c-.6-.8-1.6-.8-2.2 0L24 46l-1.6-4.2c-.6-.8-1.6-.8-2.2 0L17 46l-3.4-5.1c-.8.7-1.6.3-1.6-.9V22z"
            fill={ghostFill}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <ellipse cx="19.5" cy="26" rx="2.2" ry="2.8" fill={ink} />
          <ellipse cx="28.5" cy="26" rx="2.2" ry="2.8" fill={ink} />
          <circle cx="20" cy="25.2" r="0.7" fill={cream} />
          <circle cx="29" cy="25.2" r="0.7" fill={cream} />
          <path d="M21 31c1.5 2 4.5 2 6 0" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="17" cy="30" rx="2.2" ry="1.4" fill="#F5A8A8" opacity="0.85" />
          <ellipse cx="31" cy="30" rx="2.2" ry="1.4" fill="#F5A8A8" opacity="0.85" />
          <path
            d="M14 16c2-10 8-14 16-12 1 5-1 11-3 14"
            fill={red}
            stroke={ink}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <circle cx="31" cy="8" r="4.2" fill={cream} stroke={ink} strokeWidth="2.4" />
          <path
            d="M10 18c0-3 5-5.5 14-5.5s14 2.5 14 5.5v3c0 1.5-5 3-14 3s-14-1.5-14-3v-3z"
            fill={cream}
            stroke={ink}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'gift':
      return (
        <svg {...common}>
          <rect
            x="9"
            y="20"
            width="30"
            height="22"
            rx="3"
            fill={red}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <rect
            x="8"
            y="14"
            width="32"
            height="8"
            rx="2"
            fill={cream}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M22 14h4v28h-4z" fill={gold} stroke={ink} strokeWidth="2.2" />
          <path d="M8 22h32v4H8z" fill={gold} stroke={ink} strokeWidth="2.2" />
          <path
            d="M18 14c-1-5 3-7 6-4 3-3 7-1 6 4"
            fill={green}
            stroke={ink}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M20 12c2 1 4 1 8 0" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="24" cy="11" r="1.6" fill={red} stroke={ink} strokeWidth="1.6" />
        </svg>
      )
    case 'reindeer':
      return (
        <svg {...common}>
          <path
            d="M13 16c-3-5-1-10 3-10 2.5 0 3.5 2.5 3.5 5"
            stroke={ink}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M35 16c3-5 1-10-3-10-2.5 0-3.5 2.5-3.5 5"
            stroke={ink}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path d="M16 12c0-3.5 2.5-6 5-6M32 12c0-3.5-2.5-6-5-6" stroke={ink} strokeWidth="2.6" strokeLinecap="round" />
          <path d="M14 11h4M30 11h4" stroke={gold} strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="24" cy="29" rx="13" ry="14" fill={brown} stroke={ink} strokeWidth="2.8" />
          <ellipse cx="24" cy="34" rx="7" ry="5" fill="#8B552E" stroke={ink} strokeWidth="1.8" />
          <circle cx="18.5" cy="26" r="2.2" fill={ink} />
          <circle cx="29.5" cy="26" r="2.2" fill={ink} />
          <circle cx="19.2" cy="25.2" r="0.7" fill={cream} />
          <circle cx="30.2" cy="25.2" r="0.7" fill={cream} />
          <circle cx="24" cy="33" r="4.5" fill={red} stroke={ink} strokeWidth="2.4" />
          <circle cx="22.5" cy="31.5" r="1.2" fill={cream} />
          <path d="M16 20c2 1 3 1 4 0M28 20c2 1 3 1 4 0" stroke="#8B552E" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
        </svg>
      )
    case 'yulelog':
      return (
        <svg {...common}>
          {/* Yule log cake with bark rings, cream swirl, holly */}
          <ellipse cx="24" cy="36" rx="16" ry="5" fill="#5C3A1E" stroke={ink} strokeWidth="2.6" />
          <path
            d="M8 28c0-6 7-12 16-12s16 6 16 12v6c0 4-7 8-16 8s-16-4-16-8v-6z"
            fill={bark}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <ellipse cx="24" cy="28" rx="16" ry="6" fill="#C48A4A" stroke={ink} strokeWidth="2.6" />
          <ellipse cx="24" cy="28" rx="10" ry="3.5" fill={cream} stroke={ink} strokeWidth="1.8" />
          <ellipse cx="24" cy="28" rx="5" ry="1.6" fill="#E8D4B8" />
          <path
            d="M14 22c4-2 8-3 12-2 3 1 6 3 8 5"
            stroke={cream}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path d="M16 30c3 1 6 2 10 1M20 34c2 .5 4 .5 6 0" stroke={ink} strokeWidth="1.6" strokeLinecap="round" opacity="0.25" />
          <ellipse cx="18" cy="18" rx="4" ry="2.5" fill={leaf} stroke={ink} strokeWidth="2" transform="rotate(-20 18 18)" />
          <ellipse cx="24" cy="16" rx="4" ry="2.5" fill={green} stroke={ink} strokeWidth="2" transform="rotate(10 24 16)" />
          <ellipse cx="30" cy="18" rx="4" ry="2.5" fill={leaf} stroke={ink} strokeWidth="2" transform="rotate(25 30 18)" />
          <circle cx="22" cy="19" r="1.8" fill={berry} stroke={ink} strokeWidth="1.6" />
          <circle cx="26" cy="18" r="1.8" fill={berry} stroke={ink} strokeWidth="1.6" />
          <circle cx="24" cy="21" r="1.6" fill={berry} stroke={ink} strokeWidth="1.6" />
          <circle cx="34" cy="26" r="2" fill={ember} stroke={ink} strokeWidth="1.6" opacity="0.9" />
        </svg>
      )
    case 'snowglobe':
      return (
        <svg {...common}>
          <path
            d="M11 39h26c0 3.5-5 5.5-13 5.5S11 42.5 11 39z"
            fill={red}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M9 34h30v6H9z" fill={red} stroke={ink} strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M12 36h24" stroke={gold} strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="21" r="15" fill={glass} stroke={ink} strokeWidth="2.8" />
          <ellipse cx="24" cy="30" rx="11" ry="4.5" fill={cream} stroke={ink} strokeWidth="2" />
          <path d="M20 28l4-8 4 8H20z" fill={green} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
          <rect x="22.5" y="28" width="3" height="3" fill={brown} stroke={ink} strokeWidth="1.4" />
          <circle cx="16" cy="16" r="1.2" fill={cream} />
          <circle cx="30" cy="14" r="1.4" fill={cream} />
          <circle cx="22" cy="12" r="1" fill={cream} />
          <circle cx="28" cy="20" r="1.1" fill={cream} />
          <circle cx="15" cy="22" r="0.9" fill={cream} />
          <path d="M14 18c2-2 3-1 3 0M27 13c2-1 3 0 2.5 1.5" stroke={cream} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'cocoa':
      return (
        <svg {...common}>
          <path
            d="M11 17h23v19c0 5-4.5 9-11.5 9S11 41 11 36V17z"
            fill={cream}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M13 21h19v7c0 2.5-3.5 4.5-9.5 4.5S13 30.5 13 28v-7z"
            fill={cocoa}
            stroke={ink}
            strokeWidth="2"
          />
          <circle cx="17" cy="24" r="1.4" fill="#4A2A18" />
          <circle cx="23" cy="23" r="1.2" fill="#4A2A18" />
          <circle cx="28" cy="25" r="1.3" fill="#4A2A18" />
          <path
            d="M34 21c5.5 0 8 3.5 8 8s-2.5 8-8 8"
            stroke={ink}
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M34 24c3.5 0 5 2 5 5s-1.5 5-5 5" stroke={gold} strokeWidth="2" strokeLinecap="round" />
          <path d="M19 9c0 3.5 1.2 6 1.2 8M26 8c0 3.5 1.2 6 1.2 8" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M22.5 10c0 2.5.6 4 .6 5.5" stroke={ink} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
          <ellipse cx="22.5" cy="20" rx="6" ry="2" fill="#E8D4B8" opacity="0.7" />
        </svg>
      )
    case 'hat':
      return (
        <svg {...common}>
          <path
            d="M13 29c2.5-13 9-21 19-23 2.5 6.5-1 15-4.5 21"
            fill={red}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <circle cx="33.5" cy="9.5" r="5.5" fill={cream} stroke={ink} strokeWidth="2.6" />
          <circle cx="32" cy="8" r="1.5" fill={cream} opacity="0.7" />
          <path
            d="M7 31c0-4.5 6.5-8 17-8s17 3.5 17 8v4.5c0 2.5-6.5 4.5-17 4.5S7 38 7 35.5V31z"
            fill={cream}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M10 33c4 1 10 1.5 14 1.5s10-.5 14-1.5" stroke={ink} strokeWidth="1.6" strokeLinecap="round" opacity="0.2" />
        </svg>
      )
    case 'gingerbread':
      return (
        <svg {...common}>
          <path
            d="M24 7c3.5 0 6 2.5 6 6v3.5l6.5 3.5v5.5l-6.5-1.2v5.5l4.5 9H29l-2.5-5.5L24 35.8l-2.5-5.5H16l4.5-9v-5.5l-6.5 1.2v-5.5L20.5 16.5V13c0-3.5 2.5-6 6-6z"
            fill={ginger}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <circle cx="20.5" cy="15" r="1.8" fill={ink} />
          <circle cx="27.5" cy="15" r="1.8" fill={ink} />
          <circle cx="21.2" cy="14.3" r="0.55" fill={cream} />
          <circle cx="28.2" cy="14.3" r="0.55" fill={cream} />
          <path d="M20.5 19.5c2 2.2 5 2.2 7 0" stroke={cream} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="24" cy="24.5" r="1.6" fill={ink} />
          <circle cx="24" cy="29.5" r="1.6" fill={ink} />
          <path
            d="M14.5 22.5c2.5 0 3.5 1.2 3.5 2.5M33.5 22.5c-2.5 0-3.5 1.2-3.5 2.5M16.5 35c2.5-1 3.5 0 4.5 1.2M31.5 35c-2.5-1-3.5 0-4.5 1.2"
            stroke={cream}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'candycane': {
      /** Crossed X: green (hook left, behind) + red (hook right, front). */
      const greenCane =
        'M38.5 41 L21 15.5 C17.5 8.5 8.5 8.5 7.5 16.5 C7 21 10.5 23.5 14.5 21.5'
      const redCane =
        'M9.5 41 L27 15.5 C30.5 8.5 39.5 8.5 40.5 16.5 C41 21 37.5 23.5 33.5 21.5'
      return (
        <svg {...common}>
          {/* Green cane — bottom-right → top-left, behind */}
          <path
            d={greenCane}
            stroke={ink}
            strokeWidth="10.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d={greenCane}
            stroke={cream}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d={greenCane}
            stroke={leaf}
            strokeWidth="7"
            strokeLinecap="butt"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray="3.6 3.8"
            pathLength="100"
          />
          {/* Red cane — bottom-left → top-right, in front (navy outline separates at cross) */}
          <path
            d={redCane}
            stroke={ink}
            strokeWidth="10.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d={redCane}
            stroke={cream}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d={redCane}
            stroke={red}
            strokeWidth="7"
            strokeLinecap="butt"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray="3.6 3.8"
            pathLength="100"
          />
        </svg>
      )
    }
    case 'holly': {
      /** Flat holly sprig: 3 toothed leaves + 3 berries (matches join-button reference). */
      const forest = '#2F7A42'
      const vein = '#7BAF7E'
      const berryHi = '#F8A0A0'
      // Shared leaf pointing down from base (24,10) → tip (24,38); rotated for fan
      const leafDown =
        'M24 10 L28.5 14.5 L33 12 L31.5 18.5 L38 22 L33 26 L37.5 33 L30 30.5 L31.5 39 L24 33.5 L16.5 39 L18 30.5 L10.5 33 L15 26 L10 22 L16.5 18.5 L15 12 L19.5 14.5 Z'
      const veinDown = 'M21.8 12.5 L24 35.5 L26.2 12.5 Z'
      const leafProps = {
        fill: forest,
        stroke: ink,
        strokeWidth: 2.4,
        strokeLinejoin: 'round' as const,
      }
      return (
        <svg {...common}>
          {/* Leaves — upper-right, bottom-left, bottom-right */}
          <g transform="translate(24 17) rotate(-52) translate(-24 -10)">
            <path d={leafDown} {...leafProps} />
            <path d={veinDown} fill={vein} />
          </g>
          <g transform="translate(24 17) rotate(42) translate(-24 -10)">
            <path d={leafDown} {...leafProps} />
            <path d={veinDown} fill={vein} />
          </g>
          <g transform="translate(24 17) rotate(-128) translate(-24 -10)">
            <path d={leafDown} {...leafProps} />
            <path d={veinDown} fill={vein} />
          </g>
          {/* Berries — triangular cluster at leaf junction */}
          <circle cx="20.5" cy="15.5" r="5.1" fill={red} stroke={ink} strokeWidth="2.2" />
          <circle cx="27.8" cy="15" r="5.1" fill={red} stroke={ink} strokeWidth="2.2" />
          <circle cx="24.2" cy="20.2" r="4.5" fill={red} stroke={ink} strokeWidth="2.2" />
          <circle cx="18.5" cy="13.6" r="1.2" fill={berryHi} />
          <circle cx="25.8" cy="13.1" r="1.2" fill={berryHi} />
          <circle cx="22.5" cy="18.5" r="1.05" fill={berryHi} />
        </svg>
      )
    }
    case 'keys':
      return (
        <svg {...common}>
          {/* Crossed brass keys */}
          <g transform="rotate(-28 24 24)">
            <circle cx="16" cy="14" r="7" fill={gold} stroke={ink} strokeWidth="2.6" />
            <circle cx="16" cy="14" r="3.2" fill={cream} stroke={ink} strokeWidth="1.8" />
            <rect x="14.2" y="20" width="3.6" height="18" rx="1.5" fill={gold} stroke={ink} strokeWidth="2.2" />
            <path d="M18 32h5M18 36h4" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
          </g>
          <g transform="rotate(32 24 24)">
            <circle cx="32" cy="14" r="7" fill="#D4A04A" stroke={ink} strokeWidth="2.6" />
            <circle cx="32" cy="14" r="3.2" fill={cream} stroke={ink} strokeWidth="1.8" />
            <rect x="30.2" y="20" width="3.6" height="18" rx="1.5" fill="#D4A04A" stroke={ink} strokeWidth="2.2" />
            <path d="M34 32h5M34 36h4" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
          </g>
        </svg>
      )
    case 'balldrop':
      return (
        <svg {...common}>
          {/* Times Square–style New Year ball */}
          <path d="M24 6v6" stroke={gold} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M18 8h12" stroke={gold} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="24" cy="24" r="13" fill="#B8D9F0" stroke={ink} strokeWidth="2.8" />
          <circle cx="24" cy="24" r="13" fill="none" stroke={gold} strokeWidth="1.6" opacity="0.7" />
          {[0, 45, 90, 135].map((deg) => (
            <path
              key={deg}
              d="M24 11.5 L24 36.5"
              stroke={cream}
              strokeWidth="1.4"
              opacity="0.55"
              transform={`rotate(${deg} 24 24)`}
            />
          ))}
          <circle cx="24" cy="24" r="4" fill={gold} stroke={ink} strokeWidth="1.8" />
          <circle cx="18" cy="18" r="1.6" fill={cream} />
          <circle cx="30" cy="20" r="1.3" fill={cream} />
          <circle cx="20" cy="30" r="1.2" fill={gold} />
          <path d="M14 38h20v4H14z" fill={ink} stroke={gold} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M16 40h16" stroke={gold} strokeWidth="1.2" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...common}>
          {/* Old-style pocket / mantel clock */}
          <ellipse cx="24" cy="42" rx="10" ry="3.5" fill={bark} stroke={ink} strokeWidth="2.2" />
          <path
            d="M14 38 V18 c0-2 2-4 4-4h12c2 0 4 2 4 4v20"
            fill="#8B5A2B"
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <rect x="16" y="8" width="16" height="8" rx="2" fill="#6B3E24" stroke={ink} strokeWidth="2.4" />
          <circle cx="24" cy="26" r="11" fill={cream} stroke={ink} strokeWidth="2.8" />
          <circle cx="24" cy="26" r="11" fill="none" stroke={gold} strokeWidth="1.6" opacity="0.7" />
          {/* Hour marks */}
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <path
              key={deg}
              d="M24 16.5v2.2"
              stroke={ink}
              strokeWidth="1.8"
              strokeLinecap="round"
              transform={`rotate(${deg} 24 26)`}
            />
          ))}
          <path d="M24 26 L24 18.5" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M24 26 L30 29" stroke={ink} strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="26" r="1.8" fill={gold} stroke={ink} strokeWidth="1.4" />
        </svg>
      )
    case 'fu':
      return (
        <svg {...common}>
          {/* Chinese New Year 福 plaque */}
          <rect x="8" y="7" width="32" height="34" rx="3" fill={red} stroke={ink} strokeWidth="2.8" />
          <rect x="11" y="10" width="26" height="28" rx="2" fill="#C41E1E" stroke={gold} strokeWidth="1.6" />
          <text
            x="24"
            y="31"
            textAnchor="middle"
            fontSize="18"
            fontFamily="Georgia, 'Songti SC', 'SimSun', serif"
            fontWeight="700"
            fill={gold}
          >
            福
          </text>
          <circle cx="12" cy="12" r="1.4" fill={gold} />
          <circle cx="36" cy="12" r="1.4" fill={gold} />
          <circle cx="12" cy="36" r="1.4" fill={gold} />
          <circle cx="36" cy="36" r="1.4" fill={gold} />
        </svg>
      )
    case 'diya':
      return (
        <svg {...common}>
          {/* Diwali oil lamp */}
          <ellipse cx="24" cy="38" rx="14" ry="4" fill="#8B5A2B" stroke={ink} strokeWidth="2.2" opacity="0.45" />
          <path
            d="M10 30c2-8 8-14 14-14s12 6 14 14c-3 4-8 6-14 6s-11-2-14-6z"
            fill="#E8A838"
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M14 28c2-5 6-9 10-9s8 4 10 9"
            fill="#F0C33C"
            stroke={ink}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M22 18c0-6 2.5-10 4-12 2 3 3 7 2 12"
            fill="#FFB347"
            stroke={ink}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M24 16c0-4 1.2-7 2-8" fill="#FFF6D0" stroke={ink} strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="16" cy="32" r="1.3" fill={red} />
          <circle cx="32" cy="32" r="1.3" fill={green} />
          <circle cx="24" cy="34" r="1.3" fill={gold} />
        </svg>
      )
    case 'shimekazari':
      return (
        <svg {...common}>
          {/* Japanese New Year shimekazari with bitter orange (daidai) */}
          <path
            d="M10 20c0-8 6-12 14-12s14 4 14 12c0 3-2 5-4 6H14c-2-1-4-3-4-6z"
            fill={green}
            stroke={ink}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path d="M14 24c2 6 4 10 6 14M24 26c0 6 0 10 0 14M34 24c-2 6-4 10-6 14" stroke={cream} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M18 28l-3 6M30 28l3 6M22 30l-2 7M26 30l2 7" stroke={cream} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="24" cy="18" r="7" fill="#E8782A" stroke={ink} strokeWidth="2.6" />
          <circle cx="22" cy="16" r="2" fill="#F5D76E" opacity="0.8" />
          <path d="M24 11c0-3 2-5 3-5" stroke={green} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M12 18h-4M36 18h4" stroke={gold} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
  }
}
