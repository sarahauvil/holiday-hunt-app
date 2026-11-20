import { Link, Navigate } from 'react-router-dom'
import { CharmProgress } from '../components/CharmProgress'
import { ornamentLayout, StationOrnament } from '../components/StationOrnament'
import { useTeam } from '../context/TeamContext'
import { stations } from '../data/stations'
import { allCharmsCollected } from '../lib/teams'

export function Hub() {
  const { session, team, loading } = useTeam()

  if (!session) return <Navigate to="/" replace />
  if (loading || !team) {
    return <p className="text-center text-snow/80">Warming up by the Weihnachtspyramide…</p>
  }

  const readyForFinal = allCharmsCollected(team)

  return (
    <section className="space-y-6">
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

      <div className="relative mx-auto min-h-[620px] w-full max-w-5xl overflow-hidden rounded-3xl border border-gold/25 shadow-inner md:min-h-[720px]">
        <img
          src="/images/market-dom.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_40%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#0a1520]/35" />

        {stations.map((station) => (
          <StationOrnament
            key={station.id}
            station={station}
            collected={Boolean(team.charms[station.id])}
            style={ornamentLayout[station.id]}
          />
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stations.map((station) => {
          const got = Boolean(team.charms[station.id])
          return (
            <Link
              key={station.id}
              to={`/station/${station.id}`}
              className={`rounded-2xl border px-4 py-3 transition hover:border-gold/60 ${
                got
                  ? 'border-gold/45 bg-evergreen/70'
                  : 'border-snow/20 bg-[#050c16]/85'
              }`}
            >
              <p className="text-xl text-snow">{station.title}</p>
              <p className="text-sm text-snow/75">{station.owners}</p>
              <p className="mt-1 text-sm text-gold">
                {got ? `${station.charmLabel} unlocked` : 'Visit stall'}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
