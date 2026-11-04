import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowUpRight, Bus, ChevronRight, GraduationCap, HeartPulse,
  MapPin, Navigation, RefreshCw, Search, ShoppingBag, Trees, Utensils,
  X, Clock3, Phone, Globe, Info,
} from 'lucide-react';
import {
  CITY_CATEGORIES, fetchPlacesByCategory, getCategoryTitle, isCityCategory,
  type CityCategory, type CityPlace,
} from '@/services/cityPlaces';
import './CityExplorer.css';

const ICONS = {
  'graduation-cap': GraduationCap, 'heart-pulse': HeartPulse, utensils: Utensils,
  'shopping-bag': ShoppingBag, bus: Bus, trees: Trees,
} as const;

function CategoryIcon({ name }: { name: keyof typeof ICONS }) {
  const Icon = ICONS[name];
  return <Icon size={25} strokeWidth={1.7} />;
}

function PlaceDetails({ place, onClose }: { place: CityPlace; onClose: () => void }) {
  const directions = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=;${place.lat}%2C${place.lon}`;
  return (
    <aside className="ce-details">
      <div className="ce-details-top"><span className="ce-eyebrow">PLACE DETAILS</span><button className="ce-icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button></div>
      <div className="ce-place-symbol"><MapPin size={22} /></div>
      <span className="ce-category-tag">{getCategoryTitle(place.category)}</span>
      <h2>{place.name}</h2>
      <p className="ce-detail-description">{place.kind}</p>
      <div className="ce-detail-list">
        <div className="ce-detail-row"><MapPin size={17} /><div><span>Address</span><p>{place.address}</p></div></div>
        {place.phone && <div className="ce-detail-row"><Phone size={17} /><div><span>Phone</span><p><a href={`tel:${place.phone}`}>{place.phone}</a></p></div></div>}
        {place.website && <div className="ce-detail-row"><Globe size={17} /><div><span>Website</span><p><a href={place.website.startsWith('http') ? place.website : `https://${place.website}`} target="_blank" rel="noreferrer">{place.website}</a></p></div></div>}
        {place.openingHours && <div className="ce-detail-row"><Clock3 size={17} /><div><span>Opening hours</span><p>{place.openingHours}</p></div></div>}
      </div>
      <a className="ce-directions" href={directions} target="_blank" rel="noreferrer"><Navigation size={16} /> Get directions <ArrowUpRight size={15} /></a>
      <p className="ce-source-note">Place details depend on OpenStreetMap community contributions.</p>
    </aside>
  );
}

export default function CityExplorer() {
  const navigate = useNavigate();
  const { category: param } = useParams();
  const category: CityCategory | null = isCityCategory(param) ? param : null;
  const [places, setPlaces] = useState<CityPlace[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<CityPlace | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setSearch(''); setSelected(null); setPlaces([]); setError('');
    if (!category) return;
    let cancelled = false;
    setLoading(true);
    fetchPlacesByCategory(category)
      .then((items) => { if (!cancelled) setPlaces(items); })
      .catch((reason: unknown) => { if (!cancelled) setError(reason instanceof Error ? reason.message : 'Unable to load places.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [category]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return places;
    return places.filter((place) => [place.name, place.address, place.kind].some((value) => value.toLowerCase().includes(query)));
  }, [places, search]);

  async function refresh() {
    if (!category) return;
    setLoading(true); setError('');
    try {
      setPlaces(await fetchPlacesByCategory(category));
    }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to refresh places.'); }
    finally { setLoading(false); }
  }

  return (
    <main className="city-explorer"><div className="ce-shell">
      <div className="ce-topline"><Link to="/" className="ce-brand">URBAN<span>PULSE</span></Link><span className="ce-location-label"><MapPin size={13} /> MYSURU, KARNATAKA</span></div>
      {category ? <>
        <button className="ce-back" onClick={() => navigate('/city-explorer')}><ArrowLeft size={16} /> All categories</button>
        <header className="ce-heading ce-category-heading"><span className="ce-eyebrow">CITY EXPLORER / {category.toUpperCase()}</span><h1>{getCategoryTitle(category)}<em> in Mysuru.</em></h1><p>Discover places, explore details and find your way around the city.</p></header>
        <section className="ce-results-layout"><div className="ce-results-main">
          <div className="ce-results-toolbar"><label className="ce-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${getCategoryTitle(category).toLowerCase()}...`} />{search && <button onClick={() => setSearch('')} aria-label="Clear"><X size={16} /></button>}</label><button className="ce-refresh" onClick={refresh} disabled={loading}><RefreshCw size={15} /> Refresh</button></div>
          <div className="ce-result-count">{loading ? 'Finding places in Mysuru…' : `${filtered.length} places found`}<span>OpenStreetMap data</span></div>
          {loading && <div className="ce-state-card"><div className="ce-loader" /><h3>Discovering places</h3><p>Searching OpenStreetMap for places in Mysuru.</p></div>}
          {!loading && error && <div className="ce-state-card ce-error"><Info size={24} /><h3>Places could not be loaded</h3><p>{error}</p><button className="ce-primary-button" onClick={refresh}>Try again</button></div>}
          {!loading && !error && filtered.length === 0 && <div className="ce-state-card"><Search size={24} /><h3>{places.length ? 'No matching places' : 'No places listed yet'}</h3><p>{places.length ? 'Try another search term.' : 'OpenStreetMap may not have mapped places in this category in this area yet.'}</p></div>}
          {!loading && !error && filtered.length > 0 && <div className="ce-place-grid">{filtered.map((place) => <button key={place.id} className={`ce-place-card ${selected?.id === place.id ? 'is-selected' : ''}`} onClick={() => setSelected(place)}><div className="ce-card-icon"><MapPin size={19} /></div><div className="ce-card-content"><h3>{place.name}</h3><p>{place.address}</p><span>{place.kind}</span></div><ChevronRight size={18} className="ce-card-arrow" /></button>)}</div>}
        </div>{selected && <PlaceDetails place={selected} onClose={() => setSelected(null)} />}</section>
      </> : <>
        <header className="ce-heading"><span className="ce-eyebrow">A CLOSER LOOK AT YOUR CITY</span><h1>Explore your city<em> in a new light.</em></h1><p>Discover places, find essential services and explore what Mysuru has to offer.</p></header>
        <div className="ce-section-title"><div><span className="ce-eyebrow">DISCOVER</span><h2>Explore by category</h2></div><span>01 — 06</span></div>
        <div className="ce-category-grid">{CITY_CATEGORIES.map((item, index) => <button key={item.id} className="ce-category-card" onClick={() => navigate(`/city-explorer/${item.id}`)}><span className="ce-card-index">0{index + 1}</span><span className="ce-category-icon"><CategoryIcon name={item.icon as keyof typeof ICONS} /></span><span className="ce-category-title">{item.title}</span><span className="ce-category-description">{item.description}</span><span className="ce-explore-link">Explore places <ArrowUpRight size={15} /></span></button>)}</div>
        <div className="ce-footnote"><Info size={15} /><p>Place listings come from OpenStreetMap. Details and coverage depend on community mapping.</p></div>
      </>}
    </div></main>
  );
}
