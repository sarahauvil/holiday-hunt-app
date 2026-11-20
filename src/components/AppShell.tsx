import type { ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTeam } from '../context/TeamContext'
import { Snowfall } from './Snowfall'

export function AppShell({ children }: { children: ReactNode }) {
  const { session, team, demoMode, leaveTeam } = useTeam()
  const { pathname } = useLocation()
  const isFullBleed =
    pathname === '/' ||
    pathname === '/create' ||
    pathname === '/join' ||
    pathname === '/hub' ||
    pathname === '/leaderboard'

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-base transition ${isActive ? 'text-gold' : 'text-snow/80 hover:text-snow'}`

  return (
    <div className="winter-bg relative min-h-screen w-full overflow-x-hidden">
      <Snowfall />
      <div className="relative z-10 flex min-h-screen w-full flex-col">
        <header
          className={`flex w-full flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-10 ${
            isFullBleed
              ? 'absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-[#0a1520]/90 to-transparent'
              : 'panel mx-4 mt-4 rounded-2xl md:mx-8'
          }`}
        >
          <Link
            to={session ? '/hub' : '/'}
            className="font-display text-3xl text-snow md:text-4xl"
          >
            Holiday Hunt
          </Link>
          <nav className="flex flex-wrap items-center gap-4">
            {session && (
              <>
                <NavLink to="/hub" className={linkClass}>
                  Hub
                </NavLink>
                <NavLink to="/leaderboard" className={linkClass}>
                  Leaderboard
                </NavLink>
                <NavLink to="/final" className={linkClass}>
                  Final
                </NavLink>
              </>
            )}
            {demoMode && (
              <span className="rounded-full border border-gold/40 bg-navy/70 px-2.5 py-1 text-[11px] font-bold text-gold">
                Demo mode
              </span>
            )}
            {team && (
              <span className="text-sm text-snow/85">
                {team.name} ·{' '}
                <span className="tracking-widest text-gold">{team.code}</span>
              </span>
            )}
            {session && (
              <button
                type="button"
                onClick={leaveTeam}
                className="text-sm text-snow/70 underline-offset-2 hover:text-snow hover:underline"
              >
                Leave
              </button>
            )}
          </nav>
        </header>

        <main
          className={
            isFullBleed
              ? 'flex flex-1 flex-col'
              : 'mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-4 md:px-8'
          }
        >
          {children}
        </main>
      </div>
    </div>
  )
}
