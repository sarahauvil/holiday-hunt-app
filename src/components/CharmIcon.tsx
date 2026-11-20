import type { CharmId } from '../data/stations'

const stroke = '#E8F1F5'

export function CharmIcon({
  charm,
  size = 28,
  collected = true,
}: {
  charm: CharmId
  size?: number
  collected?: boolean
}) {
  const muted = collected ? 1 : 0.35
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 48 48',
    fill: 'none',
    style: { opacity: muted },
    'aria-hidden': true as const,
  }

  switch (charm) {
    case 'star':
      return (
        <svg {...common}>
          <path
            d="M24 6l4.2 10.2H39l-8.4 6.3 3.2 10.5L24 27.8 14.2 33l3.2-10.5L9 16.2h10.8L24 6z"
            fill="#C4A35A"
            stroke={stroke}
            strokeWidth="1.2"
          />
        </svg>
      )
    case 'mitten':
      return (
        <svg {...common}>
          <path
            d="M18 14c0-4 3-7 7-7s7 3 7 7v8h3c2 0 4 2 4 4v6c0 5-4 9-9 9h-6c-5 0-9-4-9-9V20c0-2 1.5-3.5 3.5-3.5H18V14z"
            fill="#B91C1C"
            stroke={stroke}
            strokeWidth="1.2"
          />
          <path d="M16 28h16" stroke="#E8F1F5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'magnifier':
      return (
        <svg {...common}>
          <circle cx="20" cy="20" r="10" stroke="#C4A35A" strokeWidth="3" />
          <path d="M28 28l10 10" stroke="#C4A35A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="20" cy="20" r="5" fill="#0B3D2E" opacity="0.5" />
        </svg>
      )
    case 'bell':
      return (
        <svg {...common}>
          <path
            d="M24 8c-6 0-10 5-10 12v6l-3 4h26l-3-4v-6c0-7-4-12-10-12z"
            fill="#C4A35A"
            stroke={stroke}
            strokeWidth="1.2"
          />
          <path d="M20 36c1.5 2.5 6.5 2.5 8 0" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="8" r="2.5" fill="#B91C1C" />
        </svg>
      )
    case 'snowflake':
      return (
        <svg {...common}>
          <g stroke="#E8F1F5" strokeWidth="2" strokeLinecap="round">
            <path d="M24 8v32M12 16l24 16M12 32l24-16" />
            <path d="M24 14l-4-3M24 14l4-3M24 34l-4 3M24 34l4 3" />
          </g>
        </svg>
      )
    case 'candle':
      return (
        <svg {...common}>
          <rect x="18" y="18" width="12" height="22" rx="2" fill="#E8F1F5" stroke="#C4A35A" />
          <path d="M24 18v-4" stroke="#C4A35A" strokeWidth="2" />
          <ellipse cx="24" cy="10" rx="4" ry="6" fill="#E07A3D" />
        </svg>
      )
    case 'gift':
      return (
        <svg {...common}>
          <rect x="10" y="20" width="28" height="20" rx="2" fill="#B91C1C" stroke={stroke} />
          <rect x="10" y="14" width="28" height="8" rx="1.5" fill="#C4A35A" stroke={stroke} />
          <path d="M24 14v26M10 28h28" stroke="#E8F1F5" strokeWidth="2" />
        </svg>
      )
    case 'cookie':
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="14" fill="#C4A35A" stroke={stroke} />
          <circle cx="18" cy="20" r="2" fill="#0F1C2E" />
          <circle cx="28" cy="18" r="2" fill="#0F1C2E" />
          <circle cx="22" cy="28" r="2" fill="#0F1C2E" />
          <circle cx="30" cy="28" r="1.5" fill="#0F1C2E" />
        </svg>
      )
  }
}
