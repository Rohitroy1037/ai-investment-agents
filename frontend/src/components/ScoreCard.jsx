import { FiTarget } from "react-icons/fi";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

/**
 * ScoreCard — Displays the AI investment score as a Recharts radial gauge chart.
 * @param {object} props
 * @param {object} props.data — { score: number, maxScore: number }
 */
const ScoreCard = ({ data }) => {
  const score = data?.score ?? 0;
  const maxScore = data?.maxScore ?? 100;

  // Color based on score
  const getScoreColor = (s) => {
    if (s >= 75) return "#10b981"; // green
    if (s >= 50) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  const color = getScoreColor(score);

  const getScoreLabel = (s) => {
    if (s >= 80) return "Excellent";
    if (s >= 65) return "Good";
    if (s >= 50) return "Average";
    if (s >= 30) return "Below Average";
    return "Poor";
  };

  const chartData = [
    {
      name: "Score",
      value: score,
      fill: color,
    },
  ];

  return (
    <div className="card animate-fade-in-up-delay-4 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <FiTarget className="text-blue-400 text-lg" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            Investment Score
          </h2>
          <p className="text-xs text-slate-500">AI confidence rating</p>
        </div>
      </div>

      {/* Recharts Radial Gauge */}
      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative w-44 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="75%"
              outerRadius="100%"
              startAngle={225}
              endAngle={-45}
              data={chartData}
              barSize={12}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, maxScore]}
                tick={false}
                angleAxisId={0}
              />
              <RadialBar
                dataKey="value"
                cornerRadius={8}
                background={{ fill: "#1e293b" }}
                angleAxisId={0}
              />
            </RadialBarChart>
          </ResponsiveContainer>

          {/* Center text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-4xl font-bold"
              style={{ color }}
            >
              {score}
            </span>
            <span className="text-xs text-slate-500 mt-0.5">
              / {maxScore}
            </span>
          </div>
        </div>

        {/* Label */}
        <span
          className="mt-2 text-sm font-medium px-3 py-1 rounded-full"
          style={{
            color,
            backgroundColor: `${color}15`,
            border: `1px solid ${color}30`,
          }}
        >
          {getScoreLabel(score)}
        </span>
      </div>
    </div>
  );
};

export default ScoreCard;
