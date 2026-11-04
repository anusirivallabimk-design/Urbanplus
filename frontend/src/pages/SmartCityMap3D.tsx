
import { useEffect, useRef, useState, type FormEvent } from 'react';

import {
  Map as MapLibreMapClass,
  NavigationControl,
  FullscreenControl,
  Popup,
  setWorkerUrl,
} from 'maplibre-gl';

import type {
  Map as MapLibreMap,
  MapLayerMouseEvent,
} from 'maplibre-gl';

import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

import 'maplibre-gl/dist/maplibre-gl.css';
import './SmartCityMap3D.css';

import { MYSURU_CENTER, sampleMarkers } from '@/data/sampleData';
import type { MapMarker } from '@/types';

// Configure the MapLibre worker for Vite
setWorkerUrl(workerUrl);

type SearchPlace = {
  lat: string;
  lon: string;
  display_name: string;
};

const CATEGORY_COLORS: Record<string, string> = {
  Traffic: '#D6A15B',
  Environment: '#9EBA91',
  'Civic Issues': '#D17D78',
  'Public Utilities': '#B9A7D9',
  Heritage: '#E6C98E',
  'Green Spaces': '#86A98A',
};

export default function SmartCityMap3D() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState('');
  const [mapReady, setMapReady] = useState(false);
  const [terrainEnabled, setTerrainEnabled] = useState(true);
  const [buildingsEnabled, setBuildingsEnabled] = useState(true);

  // Initialize the 3D map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new MapLibreMapClass({
      container: mapContainer.current,
      style: 'https://tiles.openfreemap.org/styles/dark',
      center: [MYSURU_CENTER[1], MYSURU_CENTER[0]],
      zoom: 14,
      pitch: 60,
      bearing: -15,
      maxPitch: 85,
    });

    mapRef.current = map;

    map.addControl(
      new NavigationControl({ visualizePitch: true }),
      'top-right'
    );

    map.addControl(new FullscreenControl(), 'top-right');

    map.on('load', () => {
      // Terrain elevation source
      map.addSource('urbanpulse-terrain', {
        type: 'raster-dem',
        tiles: [
          'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
        ],
        tileSize: 256,
        encoding: 'terrarium',
        maxzoom: 15,
      });

      // Enable terrain
      map.setTerrain({
        source: 'urbanpulse-terrain',
        exaggeration: 1.25,
      });

      // Terrain hillshade
      map.addLayer({
        id: 'urbanpulse-hillshade',
        type: 'hillshade',
        source: 'urbanpulse-terrain',
        paint: {
          'hillshade-exaggeration': 0.35,
          'hillshade-shadow-color': '#21182D',
          'hillshade-highlight-color': '#B9A7D9',
        },
      });

      // Find the vector source for building data
      const style = map.getStyle();

      const vectorSource = Object.entries(style.sources).find(
        ([, source]) => source.type === 'vector'
      );

      if (vectorSource) {
        const sourceId = vectorSource[0];

        try {
          map.addLayer({
            id: 'urbanpulse-3d-buildings',
            source: sourceId,
            'source-layer': 'building',
            type: 'fill-extrusion',
            minzoom: 13,
            paint: {
              'fill-extrusion-color': [
                'interpolate',
                ['linear'],
                ['coalesce', ['get', 'render_height'], ['get', 'height'], 0],
                0, '#292333',
                20, '#44344E',
                60, '#715C78',
              ],
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                13, 0,
                15,
                ['coalesce', ['get', 'render_height'], ['get', 'height'], 0],
              ],
              'fill-extrusion-base': [
                'coalesce',
                ['get', 'render_min_height'],
                ['get', 'min_height'],
                0,
              ],
              'fill-extrusion-opacity': 0.88,
            },
          });
        } catch (error) {
          console.warn('3D building layer could not be added:', error);
        }
      } else {
        console.warn('No vector source found for 3D buildings.');
      }

      // Convert existing UrbanPulse locations into GeoJSON
      const features = sampleMarkers.map((marker: MapMarker) => ({
        type: 'Feature' as const,
        properties: {
          id: marker.id,
          name: marker.name,
          description: marker.description,
          category: marker.category,
          reading: marker.reading ?? '',
          color: CATEGORY_COLORS[marker.category] ?? '#C6A15B',
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [marker.lng, marker.lat],
        },
      }));

      map.addSource('urbanpulse-markers', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features,
        },
      });

      // Marker glow
      map.addLayer({
        id: 'urbanpulse-marker-glow',
        type: 'circle',
        source: 'urbanpulse-markers',
        paint: {
          'circle-radius': 13,
          'circle-color': ['get', 'color'],
          'circle-opacity': 0.2,
          'circle-blur': 0.8,
        },
      });

      // Main markers
      map.addLayer({
        id: 'urbanpulse-marker-circles',
        type: 'circle',
        source: 'urbanpulse-markers',
        paint: {
          'circle-radius': 7,
          'circle-color': ['get', 'color'],
          'circle-stroke-color': '#F5F1FA',
          'circle-stroke-width': 1.5,
        },
      });

      // Marker click popup
      map.on(
        'click',
        'urbanpulse-marker-circles',
        (event: MapLayerMouseEvent) => {
          const feature = event.features?.[0];
          if (!feature) return;

          const coordinates = (
            feature.geometry as GeoJSON.Point
          ).coordinates as [number, number];

          const properties = feature.properties;

          const content = document.createElement('div');
          content.className = 'urbanpulse-3d-popup';

          const category = document.createElement('span');
          category.textContent = properties?.category ?? 'CITY LOCATION';

          const name = document.createElement('strong');
          name.textContent = properties?.name ?? 'Location';

          const description = document.createElement('p');
          description.textContent = properties?.description ?? '';

          content.append(category, name, description);

          new Popup({ offset: 14 })
            .setLngLat(coordinates)
            .setDOMContent(content)
            .addTo(map);
        }
      );

      map.on('mouseenter', 'urbanpulse-marker-circles', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'urbanpulse-marker-circles', () => {
        map.getCanvas().style.cursor = '';
      });

      setMapReady(true);
    });

    map.on('error', (event) => {
      console.error('MapLibre error:', event.error);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Search for any place within Mysuru
  const searchPlace = async () => {
    const query = search.trim();

    if (!query) {
      setMessage('Please enter a place name.');
      return;
    }

    setSearching(true);
    setMessage('');

    try {
      const url = new URL(
        'https://nominatim.openstreetmap.org/search'
      );

      url.searchParams.set('q', query);
      url.searchParams.set('format', 'jsonv2');
      url.searchParams.set('limit', '1');
      url.searchParams.set('countrycodes', 'in');
      url.searchParams.set('viewbox', '76.55,12.40,76.73,12.20');
      url.searchParams.set('bounded', '1');

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error('Place search is temporarily unavailable.');
      }

      const results: SearchPlace[] = await response.json();

      if (results.length === 0) {
        setMessage('No matching place found within Mysuru.');
        return;
      }

      const place = results[0];
      const longitude = Number(place.lon);
      const latitude = Number(place.lat);
      const map = mapRef.current;

      if (
        !map ||
        !Number.isFinite(longitude) ||
        !Number.isFinite(latitude)
      ) {
        setMessage('The map is not ready. Please try again.');
        return;
      }

      // Remove previous search highlight
      [
        'urbanpulse-search-marker',
        'urbanpulse-search-glow',
      ].forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
        }
      });

      if (map.getSource('urbanpulse-search')) {
        map.removeSource('urbanpulse-search');
      }

      // Add searched location
      map.addSource('urbanpulse-search', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { name: place.display_name },
          geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        },
      });

      // Search glow
      map.addLayer({
        id: 'urbanpulse-search-glow',
        type: 'circle',
        source: 'urbanpulse-search',
        paint: {
          'circle-radius': 24,
          'circle-color': '#C6A15B',
          'circle-opacity': 0.25,
          'circle-blur': 0.7,
        },
      });

      // Highlighted marker
      map.addLayer({
        id: 'urbanpulse-search-marker',
        type: 'circle',
        source: 'urbanpulse-search',
        paint: {
          'circle-radius': 9,
          'circle-color': '#F4D28B',
          'circle-stroke-color': '#FFFFFF',
          'circle-stroke-width': 2.5,
        },
      });

      // Move camera to searched place
      map.flyTo({
        center: [longitude, latitude],
        zoom: 17,
        pitch: 65,
        bearing: -15,
        duration: 2200,
        essential: true,
      });

      const popupContent = document.createElement('div');
      popupContent.className = 'urbanpulse-3d-popup';

      const label = document.createElement('span');
      label.textContent = 'SEARCH RESULT';

      const name = document.createElement('strong');
      name.textContent = place.display_name.split(',')[0];

      const address = document.createElement('p');
      address.textContent = place.display_name;

      popupContent.append(label, name, address);

      new Popup({ offset: 18 })
        .setLngLat([longitude, latitude])
        .setDOMContent(popupContent)
        .addTo(map);

      setMessage(`Showing: ${place.display_name}`);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Unable to search for this place.'
      );
    } finally {
      setSearching(false);
    }
  };

  // Terrain toggle
  const toggleTerrain = () => {
    const map = mapRef.current;

    if (!map || !map.getSource('urbanpulse-terrain')) return;

    const next = !terrainEnabled;

    try {
      map.setTerrain(
        next
          ? {
              source: 'urbanpulse-terrain',
              exaggeration: 1.25,
            }
          : null
      );

      setTerrainEnabled(next);
    } catch (error) {
      console.error('Terrain toggle failed:', error);
    }
  };

  // Building toggle
  const toggleBuildings = () => {
    const map = mapRef.current;

    if (!map || !map.getLayer('urbanpulse-3d-buildings')) {
      setMessage('3D building data is unavailable in this map area.');
      return;
    }

    const next = !buildingsEnabled;

    map.setLayoutProperty(
      'urbanpulse-3d-buildings',
      'visibility',
      next ? 'visible' : 'none'
    );

    setBuildingsEnabled(next);
  };

  // Reset camera
  const resetCamera = () => {
    mapRef.current?.flyTo({
      center: [MYSURU_CENTER[1], MYSURU_CENTER[0]],
      zoom: 14,
      pitch: 60,
      bearing: -15,
      duration: 1800,
    });
  };

  return (
    <main className="smart-map-3d-page">
      <section className="smart-map-3d-heading">
        <div>
          <p className="smart-map-3d-eyebrow">
            URBANPULSE / MYSURU DIGITAL TWIN
          </p>

          <h1>
            The city, <span>in three dimensions.</span>
          </h1>

          <p className="smart-map-3d-intro">
            Explore Mysuru through an interactive 3D city environment,
            connected locations and terrain visualization.
          </p>
        </div>

        <span className="smart-map-3d-status">
          <i /> 3D CITY VIEW
        </span>
      </section>

      <section className="smart-map-3d-toolbar">
        <form
          className="smart-map-3d-search"
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            void searchPlace();
          }}
        >
          <span>⌕</span>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search any place in Mysuru..."
            aria-label="Search for a place in Mysuru"
          />

          <button type="submit" disabled={searching || !mapReady}>
            {searching ? 'Searching...' : 'Explore'}
          </button>
        </form>

        <div className="smart-map-3d-controls">
          <button
            type="button"
            className={buildingsEnabled ? 'active' : ''}
            onClick={toggleBuildings}
          >
            3D Buildings
          </button>

          <button
            type="button"
            className={terrainEnabled ? 'active' : ''}
            onClick={toggleTerrain}
          >
            Terrain
          </button>

          <button type="button" onClick={resetCamera}>
            Reset View
          </button>
        </div>
      </section>

      {message && (
        <p className="smart-map-3d-message" role="status">
          {message}
        </p>
      )}

      <section className="smart-map-3d-container">
        <div
          ref={mapContainer}
          className="smart-map-3d-canvas"
        />

        {!mapReady && (
          <div className="smart-map-3d-loading">
            Preparing your 3D city...
          </div>
        )}

        <div className="smart-map-3d-map-label">
          MYSURU · KARNATAKA · INDIA
        </div>
      </section>

      <p className="smart-map-3d-note">
        Building detail and terrain availability depend on the coverage
        of the underlying map and elevation data.
      </p>
    </main>
  );
}
