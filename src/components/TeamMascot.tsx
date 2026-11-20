/** Festive team mascots for the leaderboard — sticker charm style. */

export type TeamMascotId =
  | 'elf'
  | 'snowman'
  | 'reindeer'
  | 'penguin'
  | 'gingerbread'
  | 'mouse'
  | 'polar'
  | 'nutcracker'

const MASCOTS: TeamMascotId[] = [
  'elf',
  'snowman',
  'reindeer',
  'penguin',
  'gingerbread',
  'mouse',
  'polar',
  'nutcracker',
]

const ink = '#1B2A4A'
const red = '#E23B3B'
const green = '#2F8F4E'
const brown = '#A66B3A'
const ginger = '#C48A4A'
const gold = '#F0C33C'
const cream = '#FFF8F0'
const snow = '#F5FAFC'
const blush = '#F5A8A8'

/** Stable hash → mascot index from team id/code/name. */
export function mascotForTeam(seed: string): TeamMascotId {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return MASCOTS[Math.abs(h) % MASCOTS.length]
}

export function TeamMascot({
  teamId,
  teamCode,
  teamName,
  size = 32,
}: {
  teamId: string
  teamCode?: string
  teamName?: string
  size?: number
}) {
  const seed = teamId || teamCode || teamName || 'team'
  const mascot = mascotForTeam(seed)
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 48 48',
    fill: 'none' as const,
    'aria-hidden': true as const,
  }

  switch (mascot) {
    case 'elf':
      return (
        <svg {...common}>
          <ellipse cx="24" cy="42" rx="10" ry="3" fill={ink} opacity="0.15" />
          <path
            d="M16 28c0-8 3.5-14 8-14s8 6 8 14v8c0 2-3.5 4-8 4s-8-2-8-4v-8z"
            fill={green}
            stroke={ink}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path d="M16 30h16" stroke={gold} strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="18" r="9" fill="#F2C9A0" stroke={ink} strokeWidth="2.6" />
          <path
            d="M15 14c2-8 6-11 14-9 1 4-1 9-3 11"
            fill={red}
            stroke={ink}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <circle cx="30" cy="8" r="3.5" fill={cream} stroke={ink} strokeWidth="2.2" />
          <path
            d="M14 16c0-2.5 4-4.5 10-4.5s10 2 10 4.5v2c0 1-4 2-10 2s-10-1-10-2v-2z"
            fill={cream}
            stroke={ink}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="20.5" cy="18.5" r="1.6" fill={ink} />
          <circle cx="27.5" cy="18.5" r="1.6" fill={ink} />
          <path d="M21.5 22c1.2 1.4 3.8 1.4 5 0" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="18" cy="21" rx="1.8" ry="1.1" fill={blush} opacity="0.85" />
          <ellipse cx="30" cy="21" rx="1.8" ry="1.1" fill={blush} opacity="0.85" />
          <path d="M12 26l4 4M36 26l-4 4" stroke="#F2C9A0" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    case 'snowman':
      return (
        <svg {...common}>
          <ellipse cx="24" cy="43" rx="11" ry="2.5" fill={ink} opacity="0.12" />
          <circle cx="24" cy="34" r="10" fill={snow} stroke={ink} strokeWidth="2.6" />
          <circle cx="24" cy="20" r="7.5" fill={snow} stroke={ink} strokeWidth="2.6" />
          <circle cx="21" cy="19" r="1.5" fill={ink} />
          <circle cx="27" cy="19" r="1.5" fill={ink} />
          <path d="M24 21.5l3 2.5-3 .8z" fill="#E8782A" stroke={ink} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M20 24.5c1.5 1.2 5.5 1.2 7 0" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M14 28c4-1 6-1 10 0M34 28c-4-1-6-1-10 0" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="24" cy="30" r="1.6" fill={ink} />
          <circle cx="24" cy="34.5" r="1.6" fill={ink} />
          <path
            d="M16 14c1-6 5-9 12-8 .8 3.5-1 8-2.5 10"
            fill={red}
            stroke={ink}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <circle cx="29" cy="8" r="3.2" fill={cream} stroke={ink} strokeWidth="2" />
          <path
            d="M13 15c0-2 4-3.5 11-3.5s11 1.5 11 3.5v1.5c0 1-4 2-11 2s-11-1-11-2V15z"
            fill={cream}
            stroke={ink}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'reindeer':
      return (
        <svg {...common}>
          <path d="M13 16c-3-5-1-10 3-10 2.5 0 3.5 2.5 3.5 5" stroke={ink} strokeWidth="2.6" strokeLinecap="round" />
          <path d="M35 16c3-5 1-10-3-10-2.5 0-3.5 2.5-3.5 5" stroke={ink} strokeWidth="2.6" strokeLinecap="round" />
          <path d="M16 12c0-3.5 2.5-6 5-6M32 12c0-3.5-2.5-6-5-6" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
          <ellipse cx="24" cy="29" rx="12" ry="13" fill={brown} stroke={ink} strokeWidth="2.6" />
          <ellipse cx="24" cy="34" rx="6.5" ry="4.5" fill="#8B552E" stroke={ink} strokeWidth="1.6" />
          <circle cx="18.5" cy="26" r="2" fill={ink} />
          <circle cx="29.5" cy="26" r="2" fill={ink} />
          <circle cx="24" cy="32.5" r="4" fill={red} stroke={ink} strokeWidth="2.2" />
          <circle cx="22.8" cy="31.2" r="1" fill={cream} />
        </svg>
      )
    case 'penguin':
      return (
        <svg {...common}>
          <ellipse cx="24" cy="43" rx="10" ry="2.5" fill={ink} opacity="0.12" />
          <ellipse cx="24" cy="28" rx="12" ry="14" fill={ink} stroke={ink} strokeWidth="2.4" />
          <ellipse cx="24" cy="30" rx="8" ry="10" fill={cream} />
          <circle cx="24" cy="14" r="8" fill={ink} stroke={ink} strokeWidth="2.4" />
          <ellipse cx="24" cy="15" rx="5.5" ry="5" fill={cream} />
          <circle cx="21" cy="14" r="1.5" fill={ink} />
          <circle cx="27" cy="14" r="1.5" fill={ink} />
          <path d="M24 15.5l3.5 2.2H20.5z" fill="#E8782A" stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 26c-2 3-2 7 0 9M36 26c2 3 2 7 0 9" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M18 40l3 3h6l3-3" fill="#E8782A" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
          <path
            d="M16 8c2-5 6-7 12-6 1 3-.5 6-2 8"
            fill={red}
            stroke={ink}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="29" cy="4.5" r="2.8" fill={cream} stroke={ink} strokeWidth="1.8" />
        </svg>
      )
    case 'gingerbread':
      return (
        <svg {...common}>
          <path
            d="M24 7c3.5 0 6 2.5 6 6v3.5l6.5 3.5v5.5l-6.5-1.2v5.5l4.5 9H29l-2.5-5.5L24 35.8l-2.5-5.5H16l4.5-9v-5.5l-6.5 1.2v-5.5L20.5 16.5V13c0-3.5 2.5-6 6-6z"
            fill={ginger}
            stroke={ink}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <circle cx="20.5" cy="15" r="1.6" fill={ink} />
          <circle cx="27.5" cy="15" r="1.6" fill={ink} />
          <path d="M20.5 19.5c2 2.2 5 2.2 7 0" stroke={cream} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="24" cy="24.5" r="1.4" fill={ink} />
          <circle cx="24" cy="29.5" r="1.4" fill={ink} />
          <path
            d="M14.5 22.5c2.5 0 3.5 1.2 3.5 2.5M33.5 22.5c-2.5 0-3.5 1.2-3.5 2.5"
            stroke={cream}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'mouse':
      return (
        <svg {...common}>
          <circle cx="12" cy="16" r="7" fill="#D8C4A8" stroke={ink} strokeWidth="2.4" />
          <circle cx="36" cy="16" r="7" fill="#D8C4A8" stroke={ink} strokeWidth="2.4" />
          <circle cx="12" cy="16" r="3.5" fill="#F0DCC4" />
          <circle cx="36" cy="16" r="3.5" fill="#F0DCC4" />
          <ellipse cx="24" cy="26" rx="13" ry="12" fill="#D8C4A8" stroke={ink} strokeWidth="2.6" />
          <circle cx="19" cy="24" r="2" fill={ink} />
          <circle cx="29" cy="24" r="2" fill={ink} />
          <circle cx="19.7" cy="23.3" r="0.6" fill={cream} />
          <circle cx="29.7" cy="23.3" r="0.6" fill={cream} />
          <ellipse cx="24" cy="29" rx="3.5" ry="2.5" fill="#C4A888" stroke={ink} strokeWidth="1.6" />
          <path d="M20 32c1.5 1.5 6.5 1.5 8 0" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="17" cy="28" rx="2" ry="1.2" fill={blush} opacity="0.8" />
          <ellipse cx="31" cy="28" rx="2" ry="1.2" fill={blush} opacity="0.8" />
          <path
            d="M34 34c6 2 8 8 4 10"
            stroke={ink}
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M16 12c1-5 4-7 8-6"
            fill={red}
            stroke={ink}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="25" cy="7" r="2.5" fill={cream} stroke={ink} strokeWidth="1.6" />
        </svg>
      )
    case 'polar':
      return (
        <svg {...common}>
          <ellipse cx="24" cy="43" rx="11" ry="2.5" fill={ink} opacity="0.12" />
          <ellipse cx="24" cy="28" rx="14" ry="13" fill={snow} stroke={ink} strokeWidth="2.6" />
          <circle cx="12" cy="16" r="6" fill={snow} stroke={ink} strokeWidth="2.4" />
          <circle cx="36" cy="16" r="6" fill={snow} stroke={ink} strokeWidth="2.4" />
          <circle cx="24" cy="18" r="9" fill={snow} stroke={ink} strokeWidth="2.6" />
          <ellipse cx="24" cy="22" rx="5" ry="4" fill="#E8EEF2" stroke={ink} strokeWidth="1.6" />
          <circle cx="20" cy="17" r="1.6" fill={ink} />
          <circle cx="28" cy="17" r="1.6" fill={ink} />
          <ellipse cx="24" cy="21" rx="2" ry="1.5" fill={ink} />
          <path d="M20 25c1.5 1.5 6.5 1.5 8 0" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="16" cy="21" rx="2" ry="1.2" fill={blush} opacity="0.75" />
          <ellipse cx="32" cy="21" rx="2" ry="1.2" fill={blush} opacity="0.75" />
          <path d="M18 34h4v6h-4zM26 34h4v6h-4z" fill={snow} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
          <circle cx="24" cy="32" r="2" fill={red} stroke={ink} strokeWidth="1.6" />
        </svg>
      )
    case 'nutcracker':
      return (
        <svg {...common}>
          <rect x="14" y="18" width="20" height="22" rx="2" fill={red} stroke={ink} strokeWidth="2.6" />
          <path d="M14 28h20" stroke={gold} strokeWidth="2.5" />
          <rect x="16" y="8" width="16" height="12" rx="2" fill="#F2C9A0" stroke={ink} strokeWidth="2.4" />
          <path d="M15 8h18v4H15z" fill={ink} stroke={ink} strokeWidth="1.5" />
          <path d="M18 4h12v5H18z" fill={ink} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
          <rect x="21" y="1" width="6" height="4" rx="1" fill={gold} stroke={ink} strokeWidth="1.6" />
          <circle cx="20" cy="13" r="1.5" fill={ink} />
          <circle cx="28" cy="13" r="1.5" fill={ink} />
          <rect x="20" y="16" width="8" height="3" rx="0.5" fill={cream} stroke={ink} strokeWidth="1.4" />
          <path d="M10 22h5v10H10zM33 22h5v10h-5z" fill={green} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
          <path d="M16 40h6v5h-6zM26 40h6v5h-6z" fill={ink} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="1.5" fill={gold} stroke={ink} strokeWidth="1.2" />
          <circle cx="24" cy="33" r="1.5" fill={gold} stroke={ink} strokeWidth="1.2" />
        </svg>
      )
  }
}
