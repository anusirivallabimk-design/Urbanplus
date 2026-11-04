
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  Leaf,
  Trees,
  Sprout,
  MapPin,
  Droplets,
  TreePine,
} from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";

const distributionData = [
  { name: "Public Parks", value: 35 },
  { name: "Urban Forests", value: 25 },
  { name: "Roadside Greenery", value: 20 },
  { name: "Community Gardens", value: 20 },
];

const COLORS = ["#D6AC55", "#22C55E", "#38BDF8", "#A78BFA"];

const plantationData = [
  { month: "Jan", trees: 120 },
  { month: "Feb", trees: 180 },
  { month: "Mar", trees: 240 },
  { month: "Apr", trees: 190 },
  { month: "May", trees: 300 },
  { month: "Jun", trees: 360 },
];

const parks = [
  {
    name: "Kukkarahalli Lake Park",
    area: "25 hectares",
    trees: 1200,
    status: "Well Maintained",
  },
  {
    name: "Cheluvamba Park",
    area: "8 hectares",
    trees: 450,
    status: "Well Maintained",
  },
  {
    name: "Happy Man Park",
    area: "5 hectares",
    trees: 320,
    status: "Needs Attention",
  },
  {
    name: "Lingambudhi Lake",
    area: "20 hectares",
    trees: 950,
    status: "Well Maintained",
  },
  {
    name: "Javaregowda Park",
    area: "6 hectares",
    trees: 380,
    status: "Under Maintenance",
  },
];

function GreenCard({
  title,
  value,
  unit,
  description,
  icon: Icon,
}: {
  title: string;
  value: string;
  unit: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111D2B] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <div className="rounded-xl bg-[#D6AC55]/10 p-2">
          <Icon size={22} className="text-[#D6AC55]" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-[#F5EBD5]">
          {value}
        </span>
        <span className="text-sm text-slate-400">{unit}</span>
      </div>

      <p className="mt-3 text-xs text-slate-500">{description}</p>
    </div>
  );
}

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
    <section className="rounded-2xl border border-white/10 bg-[#111D2B] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-[#F5EBD5]">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

export default function GreenSpaces() {
  return (
    <div className="min-h-screen space-y-7 bg-[#0B1420] p-4 text-[#F5EBD5] md:p-7">

      <PageHeader
        title="Green Spaces"
        description="Monitoring parks, urban forests and green development across Mysuru."
        icon={Leaf}
      />

      {/* Summary cards */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <GreenCard
          title="Total Green Spaces"
          value="48"
          unit="Locations"
          description="Parks, gardens and urban forests"
          icon={Trees}
        />

        <GreenCard
          title="Total Green Area"
          value="640"
          unit="Hectares"
          description="Illustrative total green area"
          icon={Leaf}
        />

        <GreenCard
          title="Green Coverage"
          value="32"
          unit="%"
          description="Estimated city green coverage"
          icon={Sprout}
        />

        <GreenCard
          title="Trees Planted"
          value="12,500"
          unit="Trees"
          description="Illustrative plantation count"
          icon={TreePine}
        />

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        <Panel
          title="Green Space Distribution"
          subtitle="Distribution of different types of green spaces"
        >
          <div className="h-[290px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
label={({ name, percent }) =>
  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
}
                >
                  {distributionData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          title="Tree Plantation Progress"
          subtitle="Illustrative monthly plantation statistics"
        >
          <div className="h-[290px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={plantationData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#283747"
                />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111D2B",
                    border: "1px solid #D6AC55",
                    borderRadius: "10px",
                    color: "#F5EBD5",
                  }}
                />
                <Bar
                  dataKey="trees"
                  name="Trees Planted"
                  fill="#22C55E"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

      </div>

      {/* Green initiatives */}

      <Panel
        title="Green Development Initiatives"
        subtitle="Progress of urban sustainability activities"
      >
        <div className="space-y-6">

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Tree Plantation Programme</span>
              <span className="text-emerald-400">75%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[75%] rounded-full bg-emerald-500" />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Park Maintenance</span>
              <span className="text-[#D6AC55]">82%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[82%] rounded-full bg-[#D6AC55]" />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Water Conservation</span>
              <span className="text-sky-400">60%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[60%] rounded-full bg-sky-500" />
            </div>
          </div>

        </div>
      </Panel>

      {/* Park information */}

      <Panel
        title="Park-wise Information"
        subtitle="Green space monitoring and maintenance status"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">

            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3">Park / Green Space</th>
                <th className="pb-3">Area</th>
                <th className="pb-3">Trees</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {parks.map((park) => (
                <tr
                  key={park.name}
                  className="border-b border-white/5"
                >
                  <td className="py-4 font-medium">
                    <span className="flex items-center gap-2">
                      <MapPin
                        size={15}
                        className="text-[#D6AC55]"
                      />
                      {park.name}
                    </span>
                  </td>

                  <td className="py-4 text-slate-300">
                    {park.area}
                  </td>

                  <td className="py-4 text-slate-300">
                    {park.trees}
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        park.status === "Well Maintained"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : park.status === "Needs Attention"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {park.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </Panel>

      {/* Sustainability message */}

      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
        <div className="flex items-center gap-3">
          <Leaf className="text-emerald-400" size={25} />
          <h2 className="text-lg font-semibold">
            Sustainable Mysuru
          </h2>
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          Urban green spaces improve air quality, support biodiversity,
          reduce urban heat and provide healthier public spaces.
          Monitoring these resources supports UN Sustainable
          Development Goal 11.
        </p>
      </div>

      <p className="pb-3 text-center text-xs text-slate-500">
        UrbanPulse · Mysuru Smart City · Demonstration data, not live readings
      </p>

    </div>
  );
}
