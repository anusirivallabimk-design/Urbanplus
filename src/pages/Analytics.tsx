import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Activity, Wind, Thermometer, MapPin } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

const trafficData = [
  { time: '8 AM', vehicles: 320 },
  { time: '10 AM', vehicles: 520 },
  { time: '12 PM', vehicles: 410 },
  { time: '2 PM', vehicles: 650 },
  { time: '4 PM', vehicles: 720 },
  { time: '6 PM', vehicles: 480 },
];

const aqiData = [
  { location: 'Vijayanagar', aqi: 65 },
  { location: 'Hebbal', aqi: 82 },
  { location: 'Kuvempunagar', aqi: 55 },
  { location: 'Nazarbad', aqi: 91 },
  { location: 'Jayalakshmipuram', aqi: 72 },
];

const temperatureData = [
  { time: '8 AM', temperature: 23 },
  { time: '10 AM', temperature: 26 },
  { time: '12 PM', temperature: 30 },
  { time: '2 PM', temperature: 32 },
  { time: '4 PM', temperature: 29 },
  { time: '6 PM', temperature: 25 },
];

const locations = [
  { name: 'Vijayanagar', traffic: 'Moderate', aqi: 65 },
  { name: 'Hebbal', traffic: 'High', aqi: 82 },
  { name: 'Kuvempunagar', traffic: 'Low', aqi: 55 },
  { name: 'Nazarbad', traffic: 'High', aqi: 91 },
  { name: 'Jayalakshmipuram', traffic: 'Moderate', aqi: 72 },
];

export default function Analytics() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-fade-in">

      <PageHeader
        title="City Analytics"
        description="Traffic, environmental and location-wise insights across Mysuru."
        icon={Activity}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {[
          { title: 'Vehicles Monitored', value: '2,260', icon: Activity },
          { title: 'Average AQI', value: '73', icon: Wind },
          { title: 'Average Temperature', value: '27°C', icon: Thermometer },
          { title: 'Monitored Locations', value: '24', icon: MapPin },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="up-card p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-cream-muted">{item.title}</p>
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-cream">
                {item.value}
              </h2>
              <p className="mt-2 text-xs text-cream-muted">
                Sample monitoring data
              </p>
            </div>
          );
        })}
      </div>

      {/* Traffic Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="up-card p-5">
          <h2 className="mb-5 text-lg font-semibold text-cream">
            Traffic Trends
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555577" />
              <XAxis dataKey="time" stroke="#ccccdd" />
              <YAxis stroke="#ccccdd" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="vehicles"
                stroke="#f5c451"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AQI Chart */}
        <div className="up-card p-5">
          <h2 className="mb-5 text-lg font-semibold text-cream">
            Air Quality Comparison
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={aqiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555577" />
              <XAxis dataKey="location" stroke="#ccccdd" />
              <YAxis stroke="#ccccdd" />
              <Tooltip />
              <Bar dataKey="aqi" fill="#f5c451" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Temperature Chart */}
        <div className="up-card p-5">
          <h2 className="mb-5 text-lg font-semibold text-cream">
            Temperature Trends
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555577" />
              <XAxis dataKey="time" stroke="#ccccdd" />
              <YAxis stroke="#ccccdd" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#66c7df"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Location Comparison */}
        <div className="up-card p-5">
          <h2 className="mb-5 text-lg font-semibold text-cream">
            Location-wise Analysis
          </h2>

          <div className="space-y-4">
            {locations.map((location) => (
              <div
                key={location.name}
                className="flex items-center justify-between gap-3 border-b border-white/10 pb-3"
              >
                <div>
                  <p className="text-sm font-medium text-cream">
                    {location.name}
                  </p>
                  <p className="mt-1 text-xs text-cream-muted">
                    AQI: {location.aqi}
                  </p>
                </div>

                <span className="rounded-full bg-gold/10 px-3 py-1 text-xs text-gold">
                  {location.traffic} Traffic
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <p className="text-center text-xs text-cream-muted">
        UrbanPulse · Mysuru | Illustrative sample analytics data
      </p>

    </div>
  );
}