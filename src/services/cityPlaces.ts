
export type CityCategory =
  | 'education'
  | 'healthcare'
  | 'food'
  | 'shopping'
  | 'transport'
  | 'parks';

export type CityPlace = {
  id: string;
  name: string;
  category: CityCategory;
  lat: number;
  lon: number;
  address: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  kind: string;
};

export const CITY_CATEGORIES = [
  {
    id: 'education',
    title: 'Education',
    description: 'Schools, colleges and universities',
    icon: 'graduation-cap',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Hospitals, clinics and pharmacies',
    icon: 'heart-pulse',
  },
  {
    id: 'food',
    title: 'Food & Dining',
    description: 'Restaurants, cafes and bakeries',
    icon: 'utensils',
  },
  {
    id: 'shopping',
    title: 'Shopping',
    description: 'Malls, markets and local shops',
    icon: 'shopping-bag',
  },
  {
    id: 'transport',
    title: 'Transport',
    description: 'Bus, rail and fuel facilities',
    icon: 'bus',
  },
  {
    id: 'parks',
    title: 'Parks & Recreation',
    description: 'Parks, gardens and attractions',
    icon: 'trees',
  },
] as const;

const BBOX = '12.20,76.55,12.40,76.73';

// OpenStreetMap filters for each category
const FILTERS: Record<CityCategory, string[]> = {
  education: [
    '[amenity~"school|college|university|kindergarten"]',
  ],

  healthcare: [
    '[amenity~"hospital|clinic|doctors|dentist|pharmacy"]',
  ],

  food: [
    '[amenity~"restaurant|cafe|fast_food|food_court|ice_cream"]',
  ],

  shopping: [
    '[shop]',
    '[amenity=marketplace]',
    '[landuse=retail]',
  ],

  transport: [
    '[public_transport~"station|stop_position|platform"]',
    '[railway~"station|halt"]',
    '[amenity~"bus_station|fuel|taxi"]',
  ],

  parks: [
    '[leisure~"park|garden|nature_reserve|playground"]',
    '[tourism~"attraction|museum|zoo"]',
  ],
};

const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
];

const CACHE_DURATION = 10 * 60 * 1000;

const cache = new Map<
  CityCategory,
  {
    at: number;
    places: CityPlace[];
  }
>();

type OverpassElement = {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: Record<string, string>;
};

type OverpassResponse = {
  elements: OverpassElement[];
};

// Get coordinates from nodes, ways or relations
function getPosition(element: OverpassElement) {
  if (
    typeof element.lat === 'number' &&
    typeof element.lon === 'number'
  ) {
    return {
      lat: element.lat,
      lon: element.lon,
    };
  }

  if (element.center) {
    return {
      lat: element.center.lat,
      lon: element.center.lon,
    };
  }

  return null;
}

// Create a readable address from OpenStreetMap tags
function formatAddress(tags: Record<string, string>) {
  const parts = [
    tags['addr:housenumber'],
    tags['addr:street'],
    tags['addr:suburb'],
    tags['addr:city'],
    tags['addr:postcode'],
  ].filter(Boolean);

  return parts.length > 0
    ? parts.join(', ')
    : 'Address not available';
}

// Check whether an element belongs to the selected category
function isRelevantCategory(
  tags: Record<string, string>,
  category: CityCategory
) {
  const amenity = tags.amenity;
  const shop = tags.shop;
  const leisure = tags.leisure;
  const tourism = tags.tourism;
  const publicTransport = tags.public_transport;
  const railway = tags.railway;
  const landuse = tags.landuse;

  switch (category) {
    case 'education':
      return [
        'school',
        'college',
        'university',
        'kindergarten',
      ].includes(amenity);

    case 'healthcare':
      return [
        'hospital',
        'clinic',
        'doctors',
        'dentist',
        'pharmacy',
      ].includes(amenity);

    case 'food':
      return [
        'restaurant',
        'cafe',
        'fast_food',
        'food_court',
        'ice_cream',
      ].includes(amenity);

    case 'shopping':
      return (
        Boolean(shop) ||
        amenity === 'marketplace' ||
        landuse === 'retail'
      );

    case 'transport':
      return (
        [
          'station',
          'stop_position',
          'platform',
        ].includes(publicTransport) ||
        ['station', 'halt'].includes(railway) ||
        ['bus_station', 'fuel', 'taxi'].includes(amenity)
      );

    case 'parks':
      return (
        [
          'park',
          'garden',
          'nature_reserve',
          'playground',
        ].includes(leisure) ||
        ['attraction', 'museum', 'zoo'].includes(tourism)
      );

    default:
      return false;
  }
}

// Send a request to one Overpass server
async function requestFromServer(
  endpoint: string,
  query: string
): Promise<OverpassResponse> {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 20000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Overpass server error: ${response.status}`
      );
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

// Try multiple Overpass servers in parallel.
// The first successful response is used.
function fetchFromAvailableServer(
  query: string
): Promise<OverpassResponse> {
  return new Promise((resolve, reject) => {
    let failedRequests = 0;
    let settled = false;

    ENDPOINTS.forEach((endpoint) => {
      requestFromServer(endpoint, query)
        .then((result) => {
          if (!settled) {
            settled = true;
            resolve(result);
          }
        })
        .catch(() => {
          failedRequests += 1;

          if (
            failedRequests === ENDPOINTS.length &&
            !settled
          ) {
            settled = true;

            reject(
              new Error(
                'All location servers are currently unavailable. Please try again.'
              )
            );
          }
        });
    });
  });
}

// Main function to fetch places by category
export async function fetchPlacesByCategory(
  category: CityCategory
): Promise<CityPlace[]> {
  // Return cached results if available
  const cached = cache.get(category);

  if (
    cached &&
    Date.now() - cached.at < CACHE_DURATION
  ) {
    return cached.places;
  }

  const filters = FILTERS[category];

  if (!filters) {
    throw new Error('Invalid city category.');
  }

  // Build one query containing all filters for the category
  const queryParts = filters
    .map(
      (filter) =>
        `nwr${filter}(${BBOX});`
    )
    .join('\n');

  const query = `
    [out:json][timeout:30];
    (
      ${queryParts}
    );
    out center tags;
  `;

  try {
    const data = await fetchFromAvailableServer(query);

    const places: CityPlace[] = [];

    for (const element of data.elements ?? []) {
      const tags = element.tags ?? {};

      // Ignore elements without a name
      if (!tags.name) {
        continue;
      }

      // Ignore elements without valid coordinates
      const position = getPosition(element);

      if (!position) {
        continue;
      }

      // Validate the category
      if (!isRelevantCategory(tags, category)) {
        continue;
      }

      const place: CityPlace = {
        id: `${element.type}-${element.id}`,
        name: tags.name,
        category,
        lat: position.lat,
        lon: position.lon,
        address: formatAddress(tags),
        phone: tags.phone || tags['contact:phone'] || undefined,
        website:
          tags.website ||
          tags['contact:website'] ||
          undefined,
        openingHours:
          tags.opening_hours || undefined,
        kind:
          tags.amenity ||
          tags.shop ||
          tags.leisure ||
          tags.tourism ||
          tags.railway ||
          tags.public_transport ||
          'Place',
      };

      places.push(place);
    }

    // Remove duplicate places
    const uniquePlaces = Array.from(
      new Map(
        places.map((place) => [place.id, place])
      ).values()
    );

    // Sort places alphabetically
    uniquePlaces.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // Save results in cache
    cache.set(category, {
      at: Date.now(),
      places: uniquePlaces,
    });

    return uniquePlaces;
  } catch (error) {
    console.error(
      `Error fetching ${category} places:`,
      error
    );

    throw new Error(
      'Unable to load places right now. Please try again.'
    );
  }
}

// Get the display title of a category
export function getCategoryTitle(
  category: CityCategory
): string {
  const found = CITY_CATEGORIES.find(
    (item) => item.id === category
  );

  return found?.title ?? 'Explore City';
}

// Validate category from URL parameters
export function isCityCategory(
  value: string | undefined
): value is CityCategory {
  return CITY_CATEGORIES.some(
    (category) => category.id === value
  );
}
