
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Activity,
  MapPinned,
  ShieldCheck,
  Leaf,
  Gauge,
  Landmark,
  Menu,
  X,
  GraduationCap,
  HeartPulse,
  Utensils,
  ShoppingBag,
  Bus,
  Trees,
} from 'lucide-react';

import { useState } from 'react';
import './HomePage.css';

const highlights = [
  {
    icon: Activity,
    label: 'City intelligence',
    detail: 'A unified view of urban activity',
  },
  {
    icon: MapPinned,
    label: 'Live city map',
    detail: 'Explore monitored locations',
  },
  {
    icon: ShieldCheck,
    label: 'Civic response',
    detail: 'Track issues from report to resolution',
  },
];

const destinations = [
  {
    name: 'City overview',
    description: 'A clear picture of the city at a glance.',
    href: '/overview',
    icon: Gauge,
  },
  {
    name: 'Smart city map',
    description: 'Explore traffic, environment and civic locations.',
    href: '/map',
    icon: MapPinned,
  },
  {
    name: 'Report an issue',
    description: 'Help improve your neighbourhood.',
    href: '/report-issue',
    icon: ShieldCheck,
  },
  {
    name: 'Admin management',
    description: 'Review and manage reported civic issues.',
    href: '/admin/issues',
    icon: Activity,
  },
];

const cityCategories = [
  {
    id: 'education',
    name: 'Education',
    description: 'Schools, colleges and universities',
    icon: GraduationCap,
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Hospitals, clinics and pharmacies',
    icon: HeartPulse,
  },
  {
    id: 'food',
    name: 'Food & Dining',
    description: 'Restaurants, cafes and bakeries',
    icon: Utensils,
  },
  {
    id: 'shopping',
    name: 'Shopping',
    description: 'Malls, markets and local shops',
    icon: ShoppingBag,
  },
  {
    id: 'transport',
    name: 'Transport',
    description: 'Bus, rail and fuel facilities',
    icon: Bus,
  },
  {
    id: 'parks',
    name: 'Parks & Recreation',
    description: 'Parks, gardens and attractions',
    icon: Trees,
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="up-home">
      <div className="up-home-glow up-home-glow-one" />
      <div className="up-home-glow up-home-glow-two" />

      {/* Navigation */}
      <header className="up-home-nav">
        <a className="up-home-brand" href="/" aria-label="UrbanPulse home">
          <span className="up-home-brand-mark">
            <Landmark size={19} />
          </span>

          <span>
            URBAN<span className="up-home-gold">PULSE</span>
            <small>SMART CITY DIGITAL TWIN</small>
          </span>
        </a>

        <button
          className="up-home-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`up-home-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="/overview" onClick={() => setMenuOpen(false)}>
            Overview
          </a>

          <a href="/map" onClick={() => setMenuOpen(false)}>
            City map
          </a>

          <a href="/city-explorer" onClick={() => setMenuOpen(false)}>
            City Explorer
          </a>

          <a href="/report-issue" onClick={() => setMenuOpen(false)}>
            Report an issue
          </a>

          <a
            className="up-home-nav-cta"
            href="/map"
            onClick={() => setMenuOpen(false)}
          >
            Explore UrbanPulse <ArrowRight size={15} />
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="up-home-hero">
        <div className="up-home-copy">
          <div className="up-home-eyebrow">
            <span /> MYSURU · A CITY IN MOTION
          </div>

          <h1>
            The city,
            <br />
            <em>in a new</em> light.
          </h1>

          <p className="up-home-lead">
            A smarter way to understand, explore and care for our city.
            Bringing urban insights and civic action together in one
            connected experience.
          </p>

          <div className="up-home-actions">
            <a className="up-home-primary" href="/map">
              Explore the city <ArrowRight size={17} />
            </a>

            <a className="up-home-secondary" href="/report-issue">
              Report a civic issue
            </a>
          </div>

          <div className="up-home-scroll">
            <ArrowDown size={14} /> SCROLL TO DISCOVER
          </div>
        </div>

        <div
          className="up-home-art"
          aria-label="Abstract architectural city illustration"
        >
          <div className="up-home-art-orbit orbit-a" />
          <div className="up-home-art-orbit orbit-b" />
          <div className="up-home-sun" />

          <div className="up-home-architecture">
            <div className="arch-dome">
              <span />
            </div>

            <div className="arch-roof" />

            <div className="arch-main">
              {Array.from({ length: 7 }).map((_, i) => (
                <span className="arch-window" key={i} />
              ))}
            </div>

            <div className="arch-base" />
            <div className="arch-wing arch-wing-left" />
            <div className="arch-wing arch-wing-right" />
          </div>

          <div className="up-home-art-caption">
            <span>12° 18' N</span>
            <span>76° 39' E</span>
            <i />
          </div>

          <div className="up-home-art-label">
            <span className="pulse-dot" /> MYSURU, KARNATAKA
            <small>HERITAGE MEETS TOMORROW</small>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="up-home-intro">
        <div>
          <span className="up-home-section-kicker">
            ONE CITY. CONNECTED INSIGHTS.
          </span>

          <h2>
            See the bigger picture.
            <br />
            <em>Shape what comes next.</em>
          </h2>
        </div>

        <p>
          UrbanPulse brings together the signals that help a city work
          better — from the streets we travel to the spaces we share.
        </p>
      </section>

      {/* Highlights */}
      <section className="up-home-highlights">
        {highlights.map(({ icon: Icon, label, detail }, index) => (
          <article className="up-home-highlight" key={label}>
            <span className="up-home-highlight-number">
              0{index + 1}
            </span>

            <Icon size={22} strokeWidth={1.5} />

            <h3>{label}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      {/* Existing platform destinations */}
      <section className="up-home-destinations">
        <div className="up-home-destinations-heading">
          <div>
            <span className="up-home-section-kicker">
              EXPLORE THE PLATFORM
            </span>

            <h2>
              Move from insight <em>to action.</em>
            </h2>
          </div>

          <span className="up-home-destinations-note">
            YOUR CITY, CONNECTED
          </span>
        </div>

        <div className="up-home-destination-grid">
          {destinations.map(({ name, description, href, icon: Icon }) => (
            <a
              className="up-home-destination"
              href={href}
              key={name}
            >
              <span className="up-home-destination-icon">
                <Icon size={20} />
              </span>

              <span>
                <strong>{name}</strong>
                <small>{description}</small>
              </span>

              <ArrowRight
                className="up-home-destination-arrow"
                size={17}
              />
            </a>
          ))}
        </div>
      </section>

      {/* NEW: City Explorer */}
      <section className="up-home-city-explorer">
        <div className="up-home-explorer-heading">
          <div>
            <span className="up-home-section-kicker">
              DISCOVER MYSURU
            </span>

            <h2>
              Every corner has
              <br />
              <em>something to discover.</em>
            </h2>

            <p>
              Explore educational institutions, healthcare facilities,
              local businesses and the places that make Mysuru special.
            </p>
          </div>

          <a
            href="/city-explorer"
            className="up-home-explorer-all"
          >
            Explore all places <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="up-home-explorer-grid">
          {cityCategories.map(({ id, name, description, icon: Icon }, index) => (
            <a
              href={`/city-explorer/${id}`}
              className="up-home-explorer-card"
              key={id}
            >
              <span className="up-home-explorer-number">
                0{index + 1}
              </span>

              <span className="up-home-explorer-icon">
                <Icon size={23} strokeWidth={1.6} />
              </span>

              <strong>{name}</strong>

              <small>{description}</small>

              <span className="up-home-explorer-link">
                Explore places <ArrowUpRight size={15} />
              </span>
            </a>
          ))}
        </div>

        <div className="up-home-explorer-footnote">
          <MapPinned size={15} />
          Discover real-world places across Mysuru using OpenStreetMap.
        </div>
      </section>

      {/* Footer */}
      <footer className="up-home-footer">
        <span>
          URBAN<span className="up-home-gold">PULSE</span>
        </span>

        <span>DESIGNED FOR A MORE CONNECTED MYSURU</span>

        <span>
          <Leaf size={14} /> SDG 11 · SUSTAINABLE CITIES
        </span>
      </footer>
    </main>
  );
}
