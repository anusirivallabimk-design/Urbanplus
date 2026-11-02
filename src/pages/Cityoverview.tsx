
import {
  Activity,
  Car,
  Wind,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPin
} from 'lucide-react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';

import PageHeader from '@/components/ui/PageHeader';

const trafficData = [
  { area: 'Vijayanagar', vehicles: 420 },
  { area: 'Hebbal', vehicles: 650 },
  { area: 'Kuvempunagar', vehicles: 380 },
  { area: 'Nazarbad', vehicles: 520 },
  { area: 'Jayalakshmipuram', vehicles: 290 }
];

const environmentData = [
  { time: '8 AM', aqi: 65 },
  { time: '10 AM', aqi: 72 },
  { time: '12 PM', aqi: 85 },
  { time: '2 PM', aqi: 78 },
  { time: '4 PM', aqi: 90 },
  { time: '6 PM', aqi: 82 }
];

const stats = [
  {
    title: 'Monitored Locations',
    value: '24',
    icon: MapPin,
    note: 'Across Mysuru'
  },
  {
    title: 'Vehicles Monitored',
    value: '2,260',
    icon: Car,
    note: 'Sample traffic data'
  },
  {
    title: 'Average AQI',
    value: '79',
    icon: Wind,
    note: 'Sample air quality data'
  },
  {
    title: 'Civic Issues',
    value: '18',
    icon: AlertTriangle,
    note: 'Reported issues'
  }
];

export default function CityOverview() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-fade-in">

      <PageHeader
        title="City Overview"
        description="A centralized view of Mysuru's traffic, environment and civic infrastructure."
        icon={Activity}
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="up-card p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-cream-muted">{item.title}</p>
                <Icon className="h-5 w-5 text-gold" />
              </div>

              <h2 className="mt-4 font-display text-3xl text-cream">
                {item.value}
              </h2>

              <p className="mt-2 text-xs text-cream-muted">
                {item.note}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="up-card p-5">
          <h2 className="mb-5 font-display text-xl text-cream">
            Traffic by Location
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#343434" />
                <XAxis dataKey="area" stroke="#b8b0a4" tick={{ fontSize: 10 }} />
                <YAxis stroke="#b8b0a4" />
                <Tooltip />
                <Bar dataKey="vehicles" fill="#d6ad60" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="up-card p-5">
          <h2 className="mb-5 font-display text-xl text-cream">
            Air Quality Trend
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={environmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#343434" />
                <XAxis dataKey="time" stroke="#b8b0a4" />
                <YAxis stroke="#b8b0a4" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="aqi"
                  stroke="#d6ad60"
                  strokeWidth={3}
                  dot={{ fill: '#d6ad60' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Civic Issues */}
      <div className="up-card p-5">
        <h2 className="mb-5 font-display text-xl text-cream">
          Civic Issue Summary
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="flex items-center gap-3 rounded-xl bg-gold/10 p-4">
            <Clock className="text-gold" />
            <div>
              <p className="text-2xl text-cream">8</p>
              <p className="text-xs text-cream-muted">Open Issues</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-gold/10 p-4">
            <Activity className="text-gold" />
            <div>
              <p className="text-2xl text-cream">6</p>
              <p className="text-xs text-cream-muted">In Progress</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-gold/10 p-4">
            <CheckCircle className="text-gold" />
            <div>
              <p className="text-2xl text-cream">4</p>
              <p className="text-xs text-cream-muted">Resolved</p>
            </div>
          </div>

        </div>
      </div>

      {/* Alerts */}
      <div className="up-card p-5">
        <h2 className="mb-4 font-display text-xl text-cream">
          City Alerts
        </h2>

        <div className="flex items-center gap-3 rounded-lg border border-gold/20 p-4">
          <AlertTriangle className="text-gold" />
          <div>
            <p className="text-sm text-cream">Traffic monitoring overview</p>
            <p className="text-xs text-cream-muted">
              Sample dashboard data. Live alerts will be connected later.
            </p>
          </div>
          <TrendingUp className="ml-auto text-gold" />
        </div>
      </div>

    </div>
  );
}
