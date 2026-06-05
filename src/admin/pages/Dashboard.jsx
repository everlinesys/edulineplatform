import { useEffect, useState } from "react";
import api from "../../shared/api";
import { useBranding } from "../../shared/hooks/BrandingContext";
import { Users, Book, IndianRupee, Radio, Calendar, ArrowUpRight, Award } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const brand = useBranding();
  const primaryColor = brand.colors?.primary || "#0f172a";

  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [now, setNow] = useState(new Date());

  // Load dashboard dataset
  useEffect(() => {
    async function load() {
      try {
        const [statsRes, chartRes, liveRes] = await Promise.all([
          api.get("/adminDashboard/dashboard"),
          api.get("/adminAnalytics/revenue"),
          api.get("/live-classes"),
        ]);

        setStats(statsRes.data);
        setChartData(chartRes.data);
        setLiveClasses(liveRes.data);
      } catch (err) {
        console.error("Analytics load error:", err);
      }
    }

    load();
  }, []);

  // Live timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function getCountdown(startTime) {
    const diff = new Date(startTime) - now;
    if (diff <= 0) return "Live";

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    return `${h}h ${m}m ${s}s`;
  }

  function isLive(start, end) {
    return now >= new Date(start) && now <= new Date(end);
  }

  // Custom Chart Tooltip for smooth UX
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1.5">
          <p className="font-semibold text-slate-400 mb-1">{label}</p>
          {payload.map((item, index) => (
            <div key={index} className="flex items-center gap-4 justify-between">
              <span className="capitalize text-slate-300">{item.name}:</span>
              <span className="font-mono font-bold text-white">
                {item.name === "revenue" ? `₹${item.value.toLocaleString()}` : item.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!stats) {
    return (
      <div className="flex h-screen w-full flex-col gap-3 items-center justify-center bg-slate-50">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
        <div className="text-xs text-slate-500 font-medium tracking-tight animate-pulse">
          Syncing academy performance infrastructure...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 antialiased selection:bg-slate-200">
      <div className="max-w-[1400px] mx-auto p-6 md:p-10 lg:p-14 space-y-10">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Intelligence Engine
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Real-time operational sync & revenue generation metrics
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-white px-3 py-1.5 rounded-full border shadow-sm font-medium text-slate-600 self-start sm:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Operations Active
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <StatCard
            title="Portfolio Distribution"
            value={stats.courses.total}
            sub="Active Catalog Courses"
            icon={<Book className="w-4 h-4 text-slate-500" />}
          />
          <StatCard
            title="Active Community"
            value={stats.students.total.toLocaleString()}
            sub="Enrolled Global Scholars"
            icon={<Users className="w-4 h-4 text-slate-500" />}
          />
          <StatCard
            title="Net Premium Earnings"
            value={`₹${stats.revenue.total.toLocaleString()}`}
            sub="Gross Academic Revenue"
            icon={<IndianRupee className="w-4 h-4 text-slate-500" />}
            highlight
          />
        </div>

        {/* BOTTOM LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* ANALYTICS GRAPH */}
          <div className="lg:col-span-2 space-y-4 bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Growth Vector
              </h3>
              <p className="text-[11px] text-slate-400">Co-indexing revenue growth alongside student acquisition velocity</p>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={primaryColor} stopOpacity={0.12} />
                      <stop offset="95%" stopColor={primaryColor} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 500 }}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <Tooltip content={<CustomTooltip />} />
                  
                  {/* Revenue Line */}
                  <Area
                    name="revenue"
                    type="monotone"
                    dataKey="revenue"
                    stroke={primaryColor}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                  {/* Students Trend Line */}
                  <Area
                    name="students"
                    type="monotone"
                    dataKey="students"
                    stroke="#94a3b8"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* DYNAMIC SIDEBAR (LIVE WORKSHOPS & MARQUEE PRODUCT) */}
          <div className="space-y-6">
            
            {/* LIVE SESSIONS PANEL */}
            {liveClasses.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                  <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Direct Broadcasts
                </h3>

                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {liveClasses.map((lc) => {
                    const live = isLive(lc.startTime, lc.endTime);

                    return (
                      <div
                        key={lc.id}
                        className={`p-4 rounded-xl border bg-white shadow-sm transition-all duration-200 ${
                          live ? "border-rose-200 ring-1 ring-rose-100" : "border-slate-100"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider bg-slate-50 px-2 py-0.5 rounded border border-slate-100 max-w-[70%] truncate">
                            {lc.course?.title || "Program"}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            live ? "bg-rose-50 text-rose-600 animate-pulse" : "bg-indigo-50 text-indigo-600"
                          }`}>
                            {live ? "● Live Now" : `⏳ ${getCountdown(lc.startTime)}`}
                          </span>
                        </div>

                        <h4 className="font-semibold text-slate-900 text-sm mt-2 line-clamp-1">
                          {lc.title}
                        </h4>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span className="text-[11px] font-medium">
                            {new Date(lc.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        {live && (
                          <button
                            onClick={() => window.open(lc.meetLink, "_blank")}
                            className="w-full mt-3 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white py-1.5 rounded-lg text-xs font-semibold tracking-wide shadow-sm shadow-rose-100 transition-colors"
                          >
                            Enter Live Stream Room
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* HIGHLIGHT BOX */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-slate-950/10">
              <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5 pointer-events-none">
                <Award className="w-40 h-40" />
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <h4 className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                  Top-Performing Asset
                </h4>
              </div>
              <p className="text-base font-semibold mt-3 tracking-tight text-slate-100 line-clamp-2">
                {stats.courses.topCourse || "Awaiting calculation cycle..."}
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                Highest grossing module this cycle <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

/* ===== POLISHED STAT CARD COMPONENT ===== */
function StatCard({ title, value, sub, icon, highlight = false }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {title}
        </span>
        <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-100">
          {icon}
        </div>
      </div>

      <div className="space-y-1">
        <h3 className={`text-2.5xl font-bold tracking-tight text-slate-900 ${highlight ? "text-indigo-900" : ""}`}>
          {value}
        </h3>
        <p className="text-[11px] text-slate-400 font-medium">{sub}</p>
      </div>
    </div>
  );
}