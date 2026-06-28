import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiBarChart2,
  FiPercent,
  FiActivity,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

/**
 * FinancialCard — Displays financial metrics in a grid + a small bar chart.
 */
const FinancialCard = ({ data }) => {
  const metrics = [
    {
      label: "Revenue Growth",
      value: data?.revenueGrowth,
      icon: <FiTrendingUp />,
      color: "text-emerald-400",
    },
    {
      label: "Profit Margin",
      value: data?.netProfitMargin,
      icon: <FiPercent />,
      color: "text-blue-400",
    },
    {
      label: "P/E Ratio",
      value: data?.peRatio,
      icon: <FiBarChart2 />,
      color: "text-violet-400",
    },
    {
      label: "EPS",
      value: data?.eps,
      icon: <FiDollarSign />,
      color: "text-amber-400",
    },
    {
      label: "Debt/Equity",
      value: data?.debtToEquity,
      icon: <FiActivity />,
      color: "text-red-400",
    },
    {
      label: "52W High",
      value: data?.weekHigh52,
      icon: <FiTrendingUp />,
      color: "text-green-400",
    },
    {
      label: "52W Low",
      value: data?.weekLow52,
      icon: <FiTrendingDown />,
      color: "text-orange-400",
    },
  ];

  // Build chart data from numeric metrics
  const chartData = metrics
    .map((m) => {
      const num = parseFloat(String(m.value).replace(/[%,]/g, ""));
      if (isNaN(num)) return null;
      return { name: m.label.replace(/\s/g, "\n"), value: num };
    })
    .filter(Boolean)
    .slice(0, 5);

  const chartColors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="card animate-fade-in-up-delay-1">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <FiBarChart2 className="text-emerald-400 text-lg" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            Financial Metrics
          </h2>
          <p className="text-xs text-slate-500">Key financial indicators</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="p-3.5 rounded-xl bg-[#0f172a] border border-[#1e293b]/50 hover:border-[#334155] transition-colors duration-200"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-sm ${m.color}`}>{m.icon}</span>
              <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                {m.label}
              </span>
            </div>
            <p className="text-lg font-semibold text-slate-100">
              {m.value || "N/A"}
            </p>
          </div>
        ))}
      </div>

      {/* Mini Bar Chart */}
      {chartData.length > 0 && (
        <div className="pt-4 border-t border-slate-700/30">
          <p className="text-xs text-slate-500 mb-3 font-medium">
            Metrics Overview
          </p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={28}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#f1f5f9",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialCard;
