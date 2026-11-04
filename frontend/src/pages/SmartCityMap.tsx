
import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';

import {
  MapPin,
  Search,
  Car,
  Leaf,
  AlertTriangle,
  Zap,
  Landmark,
  TreePine,
  X,
  Gauge,
  Activity,
  RadioTower,
  RotateCcw,
  Loader2,
} from 'lucide-react';

import { MYSURU_CENTER, sampleMarkers } from '@/data/sampleData';
import { getMarkerIcon } from '@/lib/leafletSetup';
import type { MapMarker, MarkerCategory } from '@/types';

import './SmartCityMap3D.css';
import './SmartCityMap.css';

type SearchResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
};

const ALL_CATEGORIES: MarkerCategory[] = [
  'Traffic',
  'Environment',
  'Civic Issues',
  'Public Utilities',
  'Heritage',
  'Green Spaces',
];

const categoryIcons: Record<MarkerCategory, typeof Car> = {
  Traffic: Car,
  Environment: Leaf,
  'Civic Issues': AlertTriangle,
  'Public Utilities': Zap,
  Heritage: Landmark,
  'Green Spaces': TreePine,
};

const descriptions: Record<MarkerCategory, string> = {
  Traffic: 'Road movement and congestion points',
  Environment: 'Air quality and environmental sensors',
  'Civic Issues': 'Reported public infrastructure issues',
  'Public Utilities': 'Essential city utility locations',
  Heritage: 'Mysuru heritage landmarks',
  'Green Spaces': 'Parks, lakes and green locations',
};

// Moves the map whenever a searched location is selected.
function MapSearchController({
  location,
}: {
  location: SearchResult | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!location) return;

    const latitude = Number(location.lat);
    const longitude = Number(location.lon);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return;
    }

    map.flyTo([latitude, longitude], 17, {
      duration: 1.5,
    });
  }, [location, map]);

  return null;
}

export default function SmartCityMap() {
  const [activeFilters, setActiveFilters] = useState<Set<MarkerCategory>>(
    new Set(ALL_CATEGORIES)
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchedLocation, setSearchedLocation] =
    useState<SearchResult | null>(null);

  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const [selected, setSelected] = useState<MapMarker | null>(null);

  const toggleFilter = (category: MarkerCategory) => {
    setActiveFilters((current) => {
      const next = new Set(current);

      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }

      return next;
    });
  };

  // Existing sample markers continue to work with category filters.
  const filteredMarkers = useMemo(() => {
    return sampleMarkers.filter((marker) =>
      activeFilters.has(marker.category)
    );
  }, [activeFilters]);

  const summary = useMemo(
    () => ({
      traffic: sampleMarkers.filter((m) => m.category === 'Traffic').length,
      environment: sampleMarkers.filter(
        (m) => m.category === 'Environment'
      ).length,
      civic: sampleMarkers.filter(
        (m) => m.category === 'Civic Issues'
      ).length,
      heritage: sampleMarkers.filter(
        (m) => m.category === 'Heritage'
      ).length,
      total: sampleMarkers.length,
      simulated: sampleMarkers.filter((m) => m.simulated).length,
    }),
    []
  );

  const stats = [
    { label: 'Traffic Points', value: summary.traffic, icon: Car },
    { label: 'Environment', value: summary.environment, icon: RadioTower },
    { label: 'Civic Issues', value: summary.civic, icon: AlertTriangle },
    { label: 'Heritage Sites', value: summary.heritage, icon: Landmark },
    { label: 'Total Locations', value: summary.total, icon: Gauge },
  ];

  // Search any location using OpenStreetMap Nominatim.
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      setSearchError('Please enter a location to search.');
      return;
    }

    setSearching(true);
    setSearchError('');
    setSearchResults([]);
    setSearchedLocation(null);
    setSelected(null);

    try {
      const params = new URLSearchParams({
        q: `${query}, Mysuru, Karnataka, India`,
        format: 'jsonv2',
        addressdetails: '1',
        limit: '6',
        countrycodes: 'in',
        viewbox: '76.45,12.40,76.85,12.15',
      });

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${params.toString()}`,
        {
          headers: {
            Accept: 'application/json',
            'Accept-Language': 'en',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Location search is temporarily unavailable.');
      }

      const results: SearchResult[] = await response.json();

      if (!results.length) {
        setSearchError(
          'No matching location found. Try another name, street or address.'
        );
        return;
      }

      setSearchResults(results);
    } catch (error) {
      setSearchError(
        error instanceof Error
          ? error.message
          : 'Unable to search for this location. Please try again.'
      );
    } finally {
      setSearching(false);
    }
  };

  const chooseLocation = (location: SearchResult) => {
    setSearchedLocation(location);
    setSearchQuery(location.display_name.split(',').slice(0, 3).join(','));
    setSearchResults([]);
    setSearchError('');
    setSelected(null);
  };

  const resetFilters = () => {
    setActiveFilters(new Set(ALL_CATEGORIES));
    setSearchQuery('');
    setSearchResults([]);
    setSearchedLocation(null);
    setSearchError('');
    setSelected(null);
  };

  return (
    <main className="smart-map-page">

      {/* PAGE HEADING */}
      <section className="smart-map-heading">
        <div>
          <p className="smart-map-eyebrow">
            <span className="smart-map-eyebrow-line" />
            URBANPULSE / MYSURU DIGITAL TWIN
          </p>

          <h1>
            Interactive <span>City Map.</span>
          </h1>

          <p className="smart-map-intro">
            Explore Mysuru through connected views of mobility,
            environment, civic infrastructure and heritage locations.
          </p>
        </div>

        <div className="smart-map-live">
          <span className="smart-map-live-dot" />
          CITY VIEW
        </div>
      </section>

      {/* SUMMARY CARDS */}
      <section className="smart-map-summary">
        {stats.map(({ label, value, icon: Icon }) => (
          <article className="smart-map-stat glass-card" key={label}>
            <span className="smart-map-stat-icon">
              <Icon size={18} />
            </span>

            <strong>{value}</strong>
            <span className="smart-map-stat-label">{label}</span>
          </article>
        ))}
      </section>

      {/* SIMULATED DATA NOTICE */}
      <div className="smart-map-data-note">
        <Activity size={16} />

        <span>
          <strong>{summary.simulated} simulated</strong> sensor readings
          and <strong>{summary.total - summary.simulated} static</strong>
          {' '}site markers. Live readings will appear after backend integration.
        </span>
      </div>

      {/* MAP AND DETAILS */}
      <section className="smart-map-workspace">

        <div className="smart-map-main">

          {/* SEARCH */}
          <div className="smart-map-toolbar glass-card">
            <div>
              <p className="smart-map-section-kicker">LOCATION EXPLORER</p>
              <h2>Explore the city</h2>
            </div>

            <div className="relative w-full">
              <form
                className="smart-map-search"
                onSubmit={handleSearch}
              >
                <Search size={17} />

                <input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchError('');
                    setSearchResults([]);
                  }}
                  placeholder="Search any street, address or place in Mysuru..."
                />

                {searching && (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                )}

                {searchQuery && !searching && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                      setSearchError('');
                      setSearchedLocation(null);
                    }}
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}

                <button
                  type="submit"
                  disabled={searching}
                  className="shrink-0"
                >
                  {searching ? 'Searching...' : 'Search'}
                </button>
              </form>

              {/* SEARCH RESULTS */}
              {searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-[1000] mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#171020] shadow-2xl">
                  <p className="border-b border-white/10 px-4 py-3 text-xs text-[#B8ADBF]">
                    SEARCH RESULTS · MYSURU
                  </p>

                  {searchResults.map((result) => (
                    <button
                      key={result.place_id}
                      type="button"
                      onClick={() => chooseLocation(result)}
                      className="flex w-full items-start gap-3 border-b border-white/5 px-4 py-3 text-left transition hover:bg-white/5"
                    >
                      <MapPin
                        size={17}
                        className="mt-0.5 shrink-0 text-[#C6A15B]"
                      />

                      <span className="min-w-0">
                        <span className="block text-sm text-[#F5F1FA]">
                          {result.display_name.split(',').slice(0, 2).join(',')}
                        </span>

                        <span className="mt-1 block text-xs leading-relaxed text-[#B8ADBF]">
                          {result.display_name}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* SEARCH ERROR */}
              {searchError && (
                <p className="mt-2 text-xs text-red-400">
                  {searchError}
                </p>
              )}
            </div>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="smart-map-filters">
            {ALL_CATEGORIES.map((category) => {
              const Icon = categoryIcons[category];
              const active = activeFilters.has(category);

              return (
                <button
                  key={category}
                  onClick={() => toggleFilter(category)}
                  className={`smart-map-filter ${active ? 'is-active' : ''}`}
                  aria-pressed={active}
                >
                  <Icon size={15} />
                  {category}
                </button>
              );
            })}

            <button className="smart-map-reset" onClick={resetFilters}>
              <RotateCcw size={14} />
              Reset
            </button>
          </div>

          {/* REAL LEAFLET MAP */}
          <div className="smart-map-map-card">

            <div className="smart-map-map-topline">
              <span>
                <MapPin size={14} />
                MYSURU, KARNATAKA
              </span>

              <span>
                {filteredMarkers.length +
                  (searchedLocation ? 1 : 0)} locations visible
              </span>
            </div>

            <div className="smart-map-canvas">

              <MapContainer
                center={[
                  MYSURU_CENTER[0],
                  MYSURU_CENTER[1],
                ]}
                zoom={15}
                minZoom={13}
                maxZoom={19}
                maxBounds={[
                  [12.20, 76.55],
                  [12.40, 76.73],
                ]}
                maxBoundsViscosity={1.0}
                scrollWheelZoom={true}
                zoomControl={false}
                className="smart-map-leaflet"
              >

                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <ZoomControl position="bottomleft" />

                <MapSearchController location={searchedLocation} />

                {/* SEARCHED LOCATION MARKER */}
                {searchedLocation && (
                  <Marker
                    position={[
                      Number(searchedLocation.lat),
                      Number(searchedLocation.lon),
                    ]}
                    icon={getMarkerIcon('Heritage')}
                  >
                    <Popup>
                      <div className="smart-map-popup">
                        <span>SEARCHED LOCATION</span>

                        <strong>
                          {searchedLocation.display_name
                            .split(',')
                            .slice(0, 2)
                            .join(',')}
                        </strong>

                        <p>{searchedLocation.display_name}</p>

                        <small>
                          {Number(searchedLocation.lat).toFixed(5)},
                          {' '}
                          {Number(searchedLocation.lon).toFixed(5)}
                        </small>
                      </div>
                    </Popup>
                  </Marker>
                )}

                {/* EXISTING SAMPLE MARKERS */}
                {filteredMarkers.map((marker) => (
                  <Marker
                    key={marker.id}
                    position={[marker.lat, marker.lng]}
                    icon={getMarkerIcon(marker.category)}
                    eventHandlers={{
                      click: () => {
                        setSelected(marker);
                      },
                    }}
                  >
                    <Popup>
                      <div className="smart-map-popup">
                        <span>{marker.category}</span>
                        <strong>{marker.name}</strong>
                        <p>{marker.description}</p>

                        {marker.reading && (
                          <small>
                            {marker.simulated ? 'Simulated: ' : 'Reading: '}
                            {marker.reading}
                          </small>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}

              </MapContainer>
            </div>

            <div className="smart-map-map-footer">
              <span><i className="status-dot normal" /> Normal</span>
              <span><i className="status-dot warning" /> Warning</span>
              <span><i className="status-dot critical" /> Critical</span>

              <span className="smart-map-footer-source">
                Map tiles: OpenStreetMap
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="smart-map-sidebar">

          {/* MAP LEGEND */}
          <section className="smart-map-side-card glass-card">
            <p className="smart-map-section-kicker">MAP OVERLAY</p>
            <h2>Data layers</h2>

            <div className="smart-map-layer-list">
              {ALL_CATEGORIES.map((category) => {
                const Icon = categoryIcons[category];
                const active = activeFilters.has(category);

                return (
                  <button
                    key={category}
                    className={`smart-map-layer ${active ? 'is-active' : ''}`}
                    onClick={() => toggleFilter(category)}
                  >
                    <span className="smart-map-layer-icon">
                      <Icon size={16} />
                    </span>

                    <span className="smart-map-layer-copy">
                      <strong>{category}</strong>
                      <small>{descriptions[category]}</small>
                    </span>

                    <span className={`smart-map-toggle ${active ? 'on' : ''}`} />
                  </button>
                );
              })}
            </div>
          </section>

          {/* LOCATION DETAILS */}
          <section className="smart-map-side-card glass-card">
            <p className="smart-map-section-kicker">SELECTED LOCATION</p>
            <h2>Location details</h2>

            {selected ? (
              <div className="smart-map-selected">

                <div className="smart-map-selected-top">
                  <span className="smart-map-selected-category">
                    {selected.category}
                  </span>

                  <button onClick={() => setSelected(null)}>
                    <X size={16} />
                  </button>
                </div>

                <h3>{selected.name}</h3>
                <p>{selected.description}</p>

                {selected.reading && (
                  <div className="smart-map-reading">
                    <small>
                      {selected.simulated
                        ? 'SIMULATED READING'
                        : 'CURRENT READING'}
                    </small>

                    <strong>{selected.reading}</strong>

                    <span className={`smart-map-status ${selected.status}`}>
                      Status: {selected.status}
                    </span>
                  </div>
                )}

                <div className="smart-map-coordinates">
                  {selected.lat.toFixed(4)}° N, {selected.lng.toFixed(4)}° E
                </div>
              </div>
            ) : searchedLocation ? (
              <div className="smart-map-selected">
                <div className="smart-map-selected-top">
                  <span className="smart-map-selected-category">
                    SEARCH RESULT
                  </span>

                  <button onClick={() => setSearchedLocation(null)}>
                    <X size={16} />
                  </button>
                </div>

                <h3>
                  {searchedLocation.display_name.split(',').slice(0, 2).join(',')}
                </h3>

                <p>{searchedLocation.display_name}</p>

                <div className="smart-map-coordinates">
                  {Number(searchedLocation.lat).toFixed(5)}° N,
                  {' '}
                  {Number(searchedLocation.lon).toFixed(5)}° E
                </div>
              </div>
            ) : (
              <div className="smart-map-empty">
                <span><MapPin size={20} /></span>

                <p>
                  Search for any location in Mysuru or select a marker
                  on the map to inspect its details.
                </p>
              </div>
            )}
          </section>

          <div className="smart-map-side-footnote">
            <Activity size={14} />
            Monitoring preview · Data may be simulated
          </div>

        </aside>
      </section>
    </main>
  );
}
