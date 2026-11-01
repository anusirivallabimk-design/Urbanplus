import { Link } from 'react-router-dom';
import { ArrowRight, Map, AlertCircle, ShieldCheck, RadioTower, Waves, Mountain, Landmark } from 'lucide-react';
import CitySkyline from '@/components/layout/CitySkyline';

const precincts = [
  {
    name: 'Palace District',
    site: 'Mysuru Palace',
    role: 'Civic core & ceremonial axis telemetry',
    icon: Landmark,
  },
  {
    name: 'Chamundi Ridge',
    site: 'Chamundi Hill',
    role: 'Elevation, pilgrim flow & ridge sensors',
    icon: Mountain,
  },
  {
    name: 'Zoological Precinct',
    site: 'Mysuru Zoo',
    role: 'Green corridor & habitat monitoring',
    icon: RadioTower,
  },
  {
    name: 'KRS Hydrology',
    site: 'Brindavan Gardens',
    role: 'Water network & garden irrigation load',
    icon: Waves,
  },
  {
    name: 'Gothic Quarter',
    site: "St. Philomena's Church",
    role: 'Urban fabric & night-illumination grid',
    icon: Landmark,
  },
  {
    name: 'Lake Basin',
    site: 'Kukkarahalli Lake',
    role: 'Ecology, AQI and shoreline safety',
    icon: Waves,
  },
];

const modules = [
  {
    to: '/map',
    title: 'Interactive Twin Map',
    copy: 'Live layers for traffic, environment, utilities, heritage fabric and civic incidents.',
    icon: Map,
  },
  {
    to: '/report-issue',
    title: 'Civic Issue Reporting',
    copy: 'Pin a fault on the city grid and route it into the operations queue.',
    icon: AlertCircle,
  },
  {
    to: '/admin/issues',
    title: 'Admin Issue Management',
    copy: 'Triage, assign status and close the loop across citizen reports.',
    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      <section className="relative flex min-h-[92vh] flex-col justify-center px-5 pb-16 pt-32 sm:px-10 lg:px-16">
        <CitySkyline />
        <div className="mx-auto w-full max-w-7xl">
          <p className="up-kicker animate-rise">Mysuru · Smart City Digital Twin</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
            The living operating
            <span className="block text-gold-light">system of a heritage city.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-muted sm:text-lg">
            UrbanPulse fuses civic operations, environmental sensing and the historic grain of Mysuru
            into one command surface — cinematic in presence, operational in purpose.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/map" className="up-btn-primary">
              Enter the twin <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/report-issue" className="up-btn-ghost">
              Report an issue
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-10 lg:px-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="up-kicker">Operational precincts</p>
            <h2 className="mt-3 font-display text-3xl text-cream sm:text-4xl">City fabric, instrumented.</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {precincts.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to="/map"
                className="up-card group p-6 hover:shadow-card-hover"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold-light/80">{item.site}</p>
                <h3 className="mt-2 font-display text-xl text-cream">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-muted">{item.role}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-10 lg:px-16">
        <p className="up-kicker">Live modules</p>
        <h2 className="mt-3 font-display text-3xl text-cream sm:text-4xl">Command the city from three desks.</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link key={mod.to} to={mod.to} className="up-card flex flex-col p-7 hover:shadow-card-hover">
                <Icon className="h-6 w-6 text-gold" />
                <h3 className="mt-5 font-display text-2xl text-cream">{mod.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-muted">{mod.copy}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
                  Open module <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
