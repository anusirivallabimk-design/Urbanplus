import L from 'leaflet';

// Fix default marker icon for Leaflet under bundlers
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Colored pin markers using SVG paths — no external image deps
export const MAP_TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
export const MAP_TILE_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const pinSvg = (color: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40"><path d="M14 0C6.27 0 0 6.27 0 14c0 9.5 14 26 14 26s14-16.5 14-26C28 6.27 21.73 0 14 0z" fill="${color}" fill-opacity="0.92" stroke="#07060f" stroke-width="1.5"/><circle cx="14" cy="14" r="5" fill="#07060f" fill-opacity="0.35"/></svg>`;

export const markerIcons = {
  traffic: L.divIcon({
    html: pinSvg('#d4af37'),
    className: 'up-marker',
    iconSize: [28, 40],
    iconAnchor: [14, 38],
    popupAnchor: [0, -34],
  }),
  environment: L.divIcon({
    html: pinSvg('#38B77A'),
    className: 'up-marker',
    iconSize: [28, 40],
    iconAnchor: [14, 38],
    popupAnchor: [0, -34],
  }),
  civic: L.divIcon({
    html: pinSvg('#E34F55'),
    className: 'up-marker',
    iconSize: [28, 40],
    iconAnchor: [14, 38],
    popupAnchor: [0, -34],
  }),
  utility: L.divIcon({
    html: pinSvg('#E8A33E'),
    className: 'up-marker',
    iconSize: [28, 40],
    iconAnchor: [14, 38],
    popupAnchor: [0, -34],
  }),
  heritage: L.divIcon({
    html: pinSvg('#F1CD86'),
    className: 'up-marker',
    iconSize: [28, 40],
    iconAnchor: [14, 38],
    popupAnchor: [0, -34],
  }),
  green: L.divIcon({
    html: pinSvg('#3AA57A'),
    className: 'up-marker',
    iconSize: [28, 40],
    iconAnchor: [14, 38],
    popupAnchor: [0, -34],
  }),
  selected: L.divIcon({
    html: pinSvg('#d4af37'),
    className: 'up-marker',
    iconSize: [32, 44],
    iconAnchor: [16, 42],
    popupAnchor: [0, -38],
  }),
} as const;

export type MarkerIconKey = keyof typeof markerIcons;

export function getMarkerIcon(category: string): L.DivIcon {
  const map: Record<string, MarkerIconKey> = {
    Traffic: 'traffic',
    Environment: 'environment',
    'Civic Issues': 'civic',
    'Public Utilities': 'utility',
    Heritage: 'heritage',
    'Green Spaces': 'green',
  };
  return markerIcons[map[category] ?? 'civic'];
}

// ── Clickable location picker marker (gold ring) ────────────────────
const pickerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40"><path d="M14 0C6.27 0 0 6.27 0 14c0 9.5 14 26 14 26s14-16.5 14-26C28 6.27 21.73 0 14 0z" fill="#d4af37" fill-opacity="0.95" stroke="#e8d08a" stroke-width="2"/><circle cx="14" cy="14" r="4" fill="#07060f"/></svg>`;

export const pickerIcon = L.divIcon({
  html: pickerSvg,
  className: 'up-marker',
  iconSize: [28, 40],
  iconAnchor: [14, 38],
  popupAnchor: [0, -34],
});

// ── Issue marker (red) for report-issue preview ─────────────────────
export const issueIcon = markerIcons.civic;
