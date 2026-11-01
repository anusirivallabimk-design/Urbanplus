import type { Issue, MapMarker } from '@/types';

// Mysuru city centre
export const MYSURU_CENTER: [number, number] = [12.2958, 76.6394];

// ── Sample civic issues ──────────────────────────────────────────────
export const sampleIssues: Issue[] = [
  {
    id: 'UPM-2026-0014',
    title: 'Large pothole near Mysuru Palace North Gate',
    description: 'A pothole approximately 2ft wide has formed on the road adjacent to the Palace North Gate, posing a risk to two-wheeler riders.',
    category: 'Pothole',
    location: 'Palace North Gate, Sayyaji Rao Rd',
    lat: 12.3051,
    lng: 76.6552,
    priority: 'High',
    status: 'Open',
    reportedAt: '2026-10-28T09:14:00Z',
    updatedAt: '2026-10-28T09:14:00Z',
    history: [
      { timestamp: '2026-10-28T09:14:00Z', action: 'Created', detail: 'Issue reported by citizen' },
    ],
  },
  {
    id: 'UPM-2026-0013',
    title: 'Garbage overflow near Devaraja Market',
    description: 'Bins are overflowing at the Devaraja Market rear entrance causing foul smell and blocking pedestrian path.',
    category: 'Garbage Overflow',
    location: 'Devaraja Market, Ashoka Road',
    lat: 12.3089,
    lng: 76.6508,
    priority: 'Medium',
    status: 'In Progress',
    reportedAt: '2026-10-27T07:30:00Z',
    updatedAt: '2026-10-29T11:00:00Z',
    history: [
      { timestamp: '2026-10-27T07:30:00Z', action: 'Created', detail: 'Issue reported by citizen' },
      { timestamp: '2026-10-28T10:15:00Z', action: 'Status updated', detail: 'Status changed to In Progress' },
      { timestamp: '2026-10-29T11:00:00Z', action: 'Assigned', detail: 'Route crew dispatched to site' },
    ],
  },
  {
    id: 'UPM-2026-0012',
    title: 'Water leakage on KRS Road',
    description: 'Continuous water leakage from a broken pipe near the Brindavan Gardens junction. Water wastage observed over 3 days.',
    category: 'Water Leakage',
    location: 'KRS Road, near Brindavan Gardens junction',
    lat: 12.4266,
    lng: 76.5685,
    priority: 'High',
    status: 'Open',
    reportedAt: '2026-10-29T06:45:00Z',
    updatedAt: '2026-10-29T06:45:00Z',
    history: [
      { timestamp: '2026-10-29T06:45:00Z', action: 'Created', detail: 'Issue reported by citizen' },
    ],
  },
  {
    id: 'UPM-2026-0011',
    title: 'Streetlight not working near Kukkarahalli Lake',
    description: 'Two consecutive streetlights are non-functional on the jogging track side of Kukkarahalli Lake, creating a safety hazard at night.',
    category: 'Broken Streetlight',
    location: 'Kukkarahalli Lake walking track',
    lat: 12.3136,
    lng: 76.6170,
    priority: 'Medium',
    status: 'Resolved',
    reportedAt: '2026-10-22T18:20:00Z',
    updatedAt: '2026-10-25T14:30:00Z',
    history: [
      { timestamp: '2026-10-22T18:20:00Z', action: 'Created', detail: 'Issue reported by citizen' },
      { timestamp: '2026-10-23T09:00:00Z', action: 'Status updated', detail: 'Status changed to In Progress' },
      { timestamp: '2026-10-25T14:30:00Z', action: 'Resolved', detail: 'Bulbs replaced and tested' },
    ],
  },
  {
    id: 'UPM-2026-0010',
    title: 'Damaged footpath near Chamundi Hill base',
    description: 'Footpath tiles are broken and displaced near the Chamundi Hill bus stand, creating tripping hazards for pilgrims.',
    category: 'Other Infrastructure Issues',
    location: 'Chamundi Hill bus stand',
    lat: 12.2734,
    lng: 76.6701,
    priority: 'Low',
    status: 'In Progress',
    reportedAt: '2026-10-26T14:10:00Z',
    updatedAt: '2026-10-28T16:00:00Z',
    history: [
      { timestamp: '2026-10-26T14:10:00Z', action: 'Created', detail: 'Issue reported by citizen' },
      { timestamp: '2026-10-28T16:00:00Z', action: 'Status updated', detail: 'Status changed to In Progress' },
    ],
  },
  {
    id: 'UPM-2026-0009',
    title: 'Pothole cluster on MG Road',
    description: 'Multiple potholes between MG Road and Agrahara circle causing traffic slowdowns during peak hours.',
    category: 'Pothole',
    location: 'MG Road, near Agrahara Circle',
    lat: 12.2995,
    lng: 76.6392,
    priority: 'Medium',
    status: 'Resolved',
    reportedAt: '2026-10-20T11:00:00Z',
    updatedAt: '2026-10-24T10:00:00Z',
    history: [
      { timestamp: '2026-10-20T11:00:00Z', action: 'Created', detail: 'Issue reported by citizen' },
      { timestamp: '2026-10-21T08:00:00Z', action: 'Status updated', detail: 'Status changed to In Progress' },
      { timestamp: '2026-10-24T10:00:00Z', action: 'Resolved', detail: 'Road patched and resurfaced' },
    ],
  },
  {
    id: 'UPM-2026-0008',
    title: 'Garbage accumulation at Gokulam 3rd Stage',
    description: 'No waste collection for 4 days near the Gokulam park area. Residents report stray dogs scattering waste.',
    category: 'Garbage Overflow',
    location: 'Gokulam 3rd Stage Park',
    lat: 12.3189,
    lng: 76.6345,
    priority: 'Medium',
    status: 'Open',
    reportedAt: '2026-10-30T05:30:00Z',
    updatedAt: '2026-10-30T05:30:00Z',
    history: [
      { timestamp: '2026-10-30T05:30:00Z', action: 'Created', detail: 'Issue reported by citizen' },
    ],
  },
];

// ── Sample map markers ───────────────────────────────────────────────
export const sampleMarkers: MapMarker[] = [
  // Traffic
  { id: 'trf-01', name: 'Bannappa Park Junction', category: 'Traffic', lat: 12.3071, lng: 76.6480, description: 'Major intersection monitoring with vehicle density sensors.', simulated: true, reading: '412 veh/hr', status: 'normal' },
  { id: 'trf-02', name: 'Columbia Asia Circle', category: 'Traffic', lat: 12.3110, lng: 76.6210, description: 'Signalized intersection with adaptive traffic control.', simulated: true, reading: '287 veh/hr', status: 'normal' },
  { id: 'trf-03', name: 'Harding Circle', category: 'Traffic', lat: 12.3020, lng: 76.6400, description: 'Roundabout flow monitoring.', simulated: true, reading: '523 veh/hr', status: 'warning' },
  { id: 'trf-04', name: 'KR Circle', category: 'Traffic', lat: 12.3045, lng: 76.6520, description: 'Central city traffic density node.', simulated: true, reading: '601 veh/hr', status: 'critical' },

  // Environment
  { id: 'env-01', name: 'Kukkarahalli Lake Sensor', category: 'Environment', lat: 12.3136, lng: 76.6170, description: 'Air quality and water temperature monitoring station.', simulated: true, reading: 'AQI 78 · Moderate', status: 'normal' },
  { id: 'env-02', name: 'Lalbagh Road Station', category: 'Environment', lat: 12.2950, lng: 76.6350, description: 'PM2.5 and NO2 sensor array.', simulated: true, reading: 'AQI 95 · Moderate', status: 'warning' },
  { id: 'env-03', name: 'Industrial Area Hebbal', category: 'Environment', lat: 12.3550, lng: 76.6100, description: 'Industrial emissions monitoring.', simulated: true, reading: 'AQI 142 · Unhealthy', status: 'critical' },

  // Civic Issues (derived from sampleIssues)
  { id: 'civ-01', name: 'Pothole – Palace North Gate', category: 'Civic Issues', lat: 12.3051, lng: 76.6552, description: 'Large pothole reported by citizen.', simulated: false, status: 'warning' },
  { id: 'civ-02', name: 'Garbage – Devaraja Market', category: 'Civic Issues', lat: 12.3089, lng: 76.6508, description: 'Garbage overflow at market rear entrance.', simulated: false, status: 'warning' },
  { id: 'civ-03', name: 'Water Leak – KRS Road', category: 'Civic Issues', lat: 12.4266, lng: 76.5685, description: 'Broken pipe leaking water.', simulated: false, status: 'critical' },
  { id: 'civ-04', name: 'Garbage – Gokulam 3rd Stage', category: 'Civic Issues', lat: 12.3189, lng: 76.6345, description: 'Missed waste collection.', simulated: false, status: 'warning' },

  // Public Utilities
  { id: 'util-01', name: 'Mysuru Water Works', category: 'Public Utilities', lat: 12.3400, lng: 76.6200, description: 'Main water treatment and supply facility.', simulated: true, reading: 'Supply 94 ML/day', status: 'normal' },
  { id: 'util-02', name: 'KRS Power Substation', category: 'Public Utilities', lat: 12.4180, lng: 76.5750, description: '110kV distribution substation.', simulated: true, reading: 'Load 72%', status: 'normal' },
  { id: 'util-03', name: 'Hebbal STP', category: 'Public Utilities', lat: 12.3500, lng: 76.6120, description: 'Sewage treatment plant, 60 MLD capacity.', simulated: true, reading: 'Flow 52 MLD', status: 'warning' },

  // Heritage
  { id: 'her-01', name: 'Mysuru Palace', category: 'Heritage', lat: 12.3051, lng: 76.6552, description: 'The iconic Mysuru Palace — seat of the Wodeyar dynasty and the centerpiece of the city.', simulated: false, status: 'normal' },
  { id: 'her-02', name: 'Chamundeshwari Temple', category: 'Heritage', lat: 12.2734, lng: 76.6701, description: 'Ancient Dravidian temple atop Chamundi Hill, overlooking the city.', simulated: false, status: 'normal' },
  { id: 'her-03', name: 'Jaganmohan Palace', category: 'Heritage', lat: 12.3075, lng: 76.6510, description: 'Jayachamarajendra Art Gallery housing rare paintings and artefacts.', simulated: false, status: 'normal' },
  { id: 'her-04', name: 'St. Philomena\u2019s Church', category: 'Heritage', lat: 12.3140, lng: 76.6430, description: 'Neo-Gothic cathedral, one of the tallest churches in South Asia.', simulated: false, status: 'normal' },
  { id: 'her-05', name: 'Lalitha Mahal Palace', category: 'Heritage', lat: 12.2825, lng: 76.6880, description: 'Stately white palace now serving as a heritage hotel.', simulated: false, status: 'normal' },
  { id: 'her-06', name: 'Mysuru Railway Station', category: 'Heritage', lat: 12.2958, lng: 76.6394, description: 'Historic Indo-Saracenic railway terminus at the heart of the city.', simulated: false, status: 'normal' },

  // Green Spaces
  { id: 'grn-01', name: 'Mysuru Zoo (Sri Chamarajendra)', category: 'Green Spaces', lat: 12.2980, lng: 76.6660, description: 'One of the oldest and most renowned zoos in the world.', simulated: false, status: 'normal' },
  { id: 'grn-02', name: 'Brindavan Gardens', category: 'Green Spaces', lat: 12.4266, lng: 76.5685, description: 'Famous terraced gardens beside the Krishna Raja Sagara dam.', simulated: false, status: 'normal' },
  { id: 'grn-03', name: 'Kukkarahalli Lake', category: 'Green Spaces', lat: 12.3136, lng: 76.6170, description: 'Urban lake and recreational walking trail.', simulated: false, status: 'normal' },
  { id: 'grn-04', name: 'Race Course Road Greens', category: 'Green Spaces', lat: 12.3000, lng: 76.6280, description: 'Race Course ring road green belt and jogging track.', simulated: false, status: 'normal' },
];

// ── Heritage data for reference panel ────────────────────────────────
export const heritageSites = [
  { name: 'Mysuru Palace', desc: 'Indo-Saracenic palace of the Wodeyar dynasty, illuminated on Sundays and festivals.' },
  { name: 'Chamundi Hill', desc: '1,000-step pilgrimage to the Chamundeshwari Temple with panoramic city views.' },
  { name: 'Mysuru Zoo', desc: 'Sri Chamarajendra Zoological Gardens — a pioneer in conservation breeding.' },
  { name: 'Brindavan Gardens', desc: 'Terraced gardens with musical fountains at the KRS dam.' },
  { name: 'St. Philomena\u2019s Church', desc: 'Neo-Gothic cathedral inspired by Cologne Cathedral.' },
  { name: 'Jaganmohan Palace', desc: 'Jayachamarajendra Art Gallery with Raja Ravi Varma originals.' },
  { name: 'Kukkarahalli Lake', desc: 'Lifeline lake for migratory birds and morning walkers.' },
  { name: 'Lalitha Mahal Palace', desc: 'White marble palace at the foot of Chamundi Hill.' },
  { name: 'Mysuru Railway Station', desc: 'Heritage terminus in the Indo-Saracenic style.' },
  { name: 'Race Course Road', desc: 'Green ring surrounding the historic Mysuru Race Club.' },
];
