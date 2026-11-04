
import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Activity,
  Wind,
  Thermometer,
  Leaf,
  Car,
  MapPin,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Clock,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

type Period = "Today" | "7 Days" | "30 Days";

const trafficData: Record<Period, { time: string; vehicles: number; congestion: number }[]> = {
  Today: [
    { time: "6 AM", vehicles: 120, congestion: 12 },
    { time: "8 AM", vehicles: 380, congestion: 45 },
    { time: "10 AM", vehicles: 290, congestion: 30 },
    { time: "12 PM", vehicles: 340, congestion: 35 },
    { time: "2 PM", vehicles: 270, congestion: 25 },
    { time: "4 PM", vehicles: 410, congestion: 48 },
    { time: "6 PM", vehicles: 520, congestion: 65 },
    { time: "8 PM", vehicles: 300, congestion: 32 },
  ],
  "7 Days": [
    { time: "Mon", vehicles: 320, congestion: 35 },
    { time: "Tue", vehicles: 390, congestion: 42 },
    { time: "Wed", vehicles: 350, congestion: 38 },
    { time: "Thu", vehicles: 430, congestion: 49 },
    { time: "Fri", vehicles: 510, congestion: 62 },
    { time: "Sat", vehicles: 280, congestion: 25 },
    { time: "Sun", vehicles: 220, congestion: 18 },
  ],
  "30 Days": [
    { time: "Week 1", vehicles: 310, congestion: 32 },
    { time: "Week 2", vehicles: 360, congestion: 39 },
    { time: "Week 3", vehicles: 420, congestion: 48 },
    { time: "Week 4", vehicles: 390, congestion: 43 },
  ],
};

const airQualityData = [
  { location: "Vijayanagar", aqi: 72 },
  { location: "Hebbal", aqi: 95 },
  { location: "Kuvempunagar", aqi: 48 },
  { location: "Gokulam", aqi: 65 },
  { location: "KR Circle", aqi: 118 },
  { location: "Hootagalli", aqi: 83 },
];

const temperatureData = [
  { time: "6 AM", temperature: 22 },
  { time: "8 AM", temperature: 25 },
  { time: "10 AM", temperature: 29 },
  { time: "12 PM", temperature: 32 },
  { time: "2 PM", temperature: 34 },
  { time: "4 PM", temperature: 31 },
  { time: "6 PM", temperature: 27 },
  { time: "8 PM", temperature: 24 },
];

const locations = [
  { name: "Vijayanagar", traffic: "High", aqi: 72, score: 78 },
  { name: "Hebbal", traffic: "Moderate", aqi: 95, score: 68 },
  { name: "Kuvempunagar", traffic: "Low", aqi: 48, score: 94 },
  { name: "Gokulam", traffic: "Moderate", aqi: 65, score: 87 },
  { name: "KR Circle", traffic: "High", aqi: 118, score: 56 },
];

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#111D2B] p-5 shadow-lg">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-[#F5EBD5]">{title}</h2>
        <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function MetricCard({
  title,
  value,
  unit,
  change,
  positive,
  icon: Icon,
  description,
}: {
  title: string;
  value: string;
  unit: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111D2B] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <div className="rounded-xl bg-[#D6AC55]/10 p-2">
          <Icon size={21} className="text-[#D6AC55]" />
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-[#F5EBD5]">{value}</span>
        <span className="text-sm text-slate-400">{unit}</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {positive ? (
          <TrendingDown size={16} className="text-emerald-400" />
        ) : (
          <TrendingUp size={16} className="text-red-400" />
        )}
        <span className={`text-xs font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}>
          {change}
        </span>
        <span className="text-xs text-slate-500">vs previous period</span>
      </div>
      <p className="mt-3 text-xs text-slate-500">{description}</p>
    </div>
  );
}

export default function Analytics() {
  const [period, setPeriod] = useState<Period>("7 Days");

  const currentTraffic = trafficData[period];

  const averageCongestion = Math.round(
    currentTraffic.reduce((sum, item) => sum + item.congestion, 0) /
      currentTraffic.length
  );

  const averageAqi = Math.round(
    airQualityData.reduce((sum, item) => sum + item.aqi, 0) /
      airQualityData.length
  );

  return (
    <div className="min-h-screen space-y-7 bg-[#0B1420] p-4 text-[#F5EBD5] md:p-7">
      <PageHeader
        title="City Analytics"
        description="Data-driven insights for a smarter and more sustainable Mysuru."
        icon={Activity}
      />

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm text-slate-400">Smart City Performance Dashboard</p>
          <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
            <Clock size={13} />
            Sample dashboard data · Mysuru
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["Today", "7 Days", "30 Days"] as Period[]).map((item) => (
            <button
              key={item}
              onClick={() => setPeriod(item)}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                period === item
                  ? "border-[#D6AC55] bg-[#D6AC55] text-[#101A27]"
                  : "border-white/10 bg-[#111D2B] text-slate-300 hover:border-[#D6AC55]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Traffic Congestion" value={`${averageCongestion}`} unit="%" change="8.2%" positive={true} icon={Car} description="Average congestion level" />
        <MetricCard title="Average AQI" value={`${averageAqi}`} unit="AQI" change="4.5%" positive={true} icon={Wind} description="Air quality across monitored areas" />
        <MetricCard title="Average Temperature" value="28.5" unit="°C" change="2.1%" positive={false} icon={Thermometer} description="City temperature reading" />
        <MetricCard title="Green Coverage" value="32" unit="%" change="3.4%" positive={true} icon={Leaf} description="Illustrative green coverage estimate" />
      </div>

      <Panel title="Traffic Trends" subtitle={`Vehicle movement and congestion · ${period}`}>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentTraffic}>
              <defs>
                <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D6AC55" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#D6AC55" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#283747" />
              <XAxis dataKey="time" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={{ backgroundColor: "#111D2B", border: "1px solid #D6AC55", borderRadius: "10px", color: "#F5EBD5" }} />
              <Legend />
              <Area type="monotone" dataKey="vehicles" name="Vehicles" stroke="#D6AC55" fill="url(#trafficFill)" strokeWidth={2} />
              <Line type="monotone" dataKey="congestion" name="Congestion %" stroke="#38BDF8" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel title="Air Quality Comparison" subtitle="AQI readings across selected Mysuru locations">
          <div className="h-[290px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={airQualityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#283747" />
                <XAxis type="number" stroke="#94A3B8" />
                <YAxis type="category" dataKey="location" width={105} stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: "#111D2B", border: "1px solid #D6AC55", borderRadius: "10px", color: "#F5EBD5" }} />
                <Bar dataKey="aqi" name="AQI" fill="#D6AC55" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-slate-500">Lower AQI generally indicates better air quality.</p>
        </Panel>

        <Panel title="Temperature Trends" subtitle="Illustrative daily temperature variation">
          <div className="h-[290px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#283747" />
                <XAxis dataKey="time" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={{ backgroundColor: "#111D2B", border: "1px solid #D6AC55", borderRadius: "10px", color: "#F5EBD5" }} />
                <Line type="monotone" dataKey="temperature" name="Temperature °C" stroke="#F59E0B" strokeWidth={3} dot={{ fill: "#F59E0B", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel title="Location-wise Performance" subtitle="Comparison of traffic, air quality and overall performance">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[570px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Traffic</th>
                <th className="pb-3 font-medium">AQI</th>
                <th className="pb-3 font-medium">Performance</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.name} className="border-b border-white/5">
                  <td className="py-4 font-medium text-[#F5EBD5]">
                    <span className="flex items-center gap-2">
                      <MapPin size={15} className="text-[#D6AC55]" />
                      {location.name}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`rounded-full px-3 py-1 text-xs ${
                      location.traffic === "High" ? "bg-red-500/10 text-red-400" :
                      location.traffic === "Moderate" ? "bg-amber-500/10 text-amber-400" :
                      "bg-emerald-500/10 text-emerald-400"
                    }`}>{location.traffic}</span>
                  </td>
                  <td className="py-4 text-slate-300">{location.aqi}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-[#D6AC55]" style={{ width: `${location.score}%` }} />
                      </div>
                      <span className="text-slate-300">{location.score}/100</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-[#F5EBD5]">Smart City Insights</h2>
        <p className="mb-4 text-sm text-slate-400">Highlights based on illustrative dashboard data</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
            <div className="mb-3 flex items-center gap-2 text-amber-400">
              <AlertTriangle size={19} />
              <span className="text-sm font-semibold">Traffic Alert</span>
            </div>
            <p className="text-sm text-slate-300">Higher congestion is indicated around peak commuting hours.</p>
          </div>
          <div className="rounded-xl border border-sky-400/20 bg-sky-400/5 p-4">
            <div className="mb-3 flex items-center gap-2 text-sky-400">
              <Wind size={19} />
              <span className="text-sm font-semibold">Air Quality</span>
            </div>
            <p className="text-sm text-slate-300">KR Circle has the highest AQI in this sample comparison.</p>
          </div>
          <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
            <div className="mb-3 flex items-center gap-2 text-emerald-400">
              <Leaf size={19} />
              <span className="text-sm font-semibold">Green Initiative</span>
            </div>
            <p className="text-sm text-slate-300">Monitor green coverage and plantation progress to support SDG 11.</p>
          </div>
        </div>
      </div>

      <p className="pb-3 text-center text-xs text-slate-500">
        UrbanPulse · Mysuru Smart City · Demonstration data, not live sensor readings
      </p>
    </div>
  );
}
