import { Link, Navigate } from 'react-router-dom'
import { CharmProgress } from '../components/CharmProgress'
import { PaintedScene } from '../components/PaintedScene'
import { StallTile } from '../components/StallTile'
import { ornamentLayout, StationOrnament } from '../components/StationOrnament'
import { useTeam } from '../context/TeamContext'
import { stations } from '../data/stations'
import { allCharmsCollected } from '../lib/teams'

export function Hub() {
  const { session, team, loading } = useTeam()

  if (!session) return <Navigate to="/" replace />
  if (loading || !team) {
    return (
      <section className="relative flex min-h-screen w-full flex-1 items-center justify-center">
        <p className="text-center text-snow/80">Warming up by the Weihnachtspyramide…</p>
      </section>
    )
  }

  const readyForFinal = allCharmsCollected(team)

  return (
    <section className="relative flex min-h-screen w-full flex-1 flex-col overflow-x-hidden">
      {/* Top chrome: title + progress — page winter-bg shows through (no full-viewport scene) */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-6 pt-24 md:px-8 md:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="panel max-w-xl rounded-3xl px-5 py-4 md:px-6 md:py-5">
            <p className="text-lg text-gold">Kölner Marktplatz</p>
            <h1 className="font-display mt-1 text-4xl text-snow md:text-5xl">Explore the stalls</h1>
            <p className="mt-2 text-base leading-relaxed text-snow/90">
              Each ornament is a booth on our digital Christmas market — discover what colleagues
              near Köln are building. Progress syncs live for code{' '}
              <span className="font-extrabold text-gold">{team.code}</span>.
            </p>
          </div>
          {readyForFinal && !team.finalUnlocked && (
            <Link
              to="/final"
              className="rounded-xl bg-gold px-5 py-3 font-bold text-navy shadow-lg shadow-gold/25"
            >
              Unlock the fireplace →
            </Link>
          )}
          {team.finalUnlocked && (
            <Link
              to="/final"
              className="rounded-xl border border-gold/60 bg-navy/80 px-5 py-3 font-bold text-gold"
            >
              View celebration
            </Link>
          )}
        </div>

        <CharmProgress team={team} />
      </div>

      {/* Full-width middle band: charms map scene behind ornaments only (not stalls) */}
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[#0a1520]" />
          <PaintedScene
            src="/images/charms-map.jpg"
            objectPosition="center 45%"
            className="opacity-95"
          />
          {/* Light scrim so ornament labels stay readable */}
          <div className="absolute inset-0 bg-[#0a1520]/25" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0a1520] via-[#0a1520]/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a1520] via-[#0a1520]/60 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-10">
          <div className="relative min-h-[420px] w-full md:min-h-[520px] lg:min-h-[560px]">
            {stations.map((station) => (
              <StationOrnament
                key={station.id}
                station={station}
                collected={Boolean(team.charms[station.id])}
                style={ornamentLayout[station.id]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stalls sit on the normal page winter-bg — outside the tree/market scene band */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 pt-2 md:px-8 md:pt-4">
        <div className="rounded-3xl border border-gold/25 bg-[#0a1520]/72 p-4 shadow-2xl backdrop-blur-md md:p-6">
          <p className="mb-4 text-lg text-gold">Market stalls</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stations.map((station) => (
              <StallTile
                key={station.id}
                station={station}
                unlocked={Boolean(team.charms[station.id])}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
