import {
  FiBriefcase,
  FiTrendingUp,
  FiShield,
  FiAlertCircle,
  FiEye,
  FiAward,
} from "react-icons/fi";

const ExtrasCard = ({ data }) => {
  // Only render if there's meaningful data
  const hasData =
    data.businessModel ||
    data.financialHealth ||
    data.growthPotential ||
    data.competitiveAdvantage ||
    data.longTermOutlook ||
    (data.riskFactors && data.riskFactors.length > 0);

  if (!hasData) return null;

  const sections = [
    {
      key: "businessModel",
      title: "Business Model",
      icon: <FiBriefcase />,
      content: data.businessModel,
      color: "blue",
    },
    {
      key: "competitiveAdvantage",
      title: "Competitive Advantage",
      icon: <FiAward />,
      content: data.competitiveAdvantage,
      color: "violet",
    },
    {
      key: "financialHealth",
      title: "Financial Health",
      icon: <FiShield />,
      content: data.financialHealth,
      color: "emerald",
    },
    {
      key: "growthPotential",
      title: "Growth Potential",
      icon: <FiTrendingUp />,
      content: data.growthPotential,
      color: "amber",
    },
    {
      key: "longTermOutlook",
      title: "Long-Term Outlook",
      icon: <FiEye />,
      content: data.longTermOutlook,
      color: "cyan",
    },
  ].filter((s) => s.content);

  const colorMap = {
    blue: {
      iconBg: "bg-blue-500/10",
      iconBorder: "border-blue-500/20",
      iconColor: "text-blue-400",
    },
    violet: {
      iconBg: "bg-violet-500/10",
      iconBorder: "border-violet-500/20",
      iconColor: "text-violet-400",
    },
    emerald: {
      iconBg: "bg-emerald-500/10",
      iconBorder: "border-emerald-500/20",
      iconColor: "text-emerald-400",
    },
    amber: {
      iconBg: "bg-amber-500/10",
      iconBorder: "border-amber-500/20",
      iconColor: "text-amber-400",
    },
    cyan: {
      iconBg: "bg-cyan-500/10",
      iconBorder: "border-cyan-500/20",
      iconColor: "text-cyan-400",
    },
  };

  return (
    <div className="card animate-fade-in-up-delay-3">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
          <FiBriefcase className="text-violet-400 text-lg" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            AI Deep Dive
          </h2>
          <p className="text-xs text-slate-500">
            In-depth analysis by AI
          </p>
        </div>
      </div>

      {/* Sections grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {sections.map((section) => {
          const colors = colorMap[section.color];
          return (
            <div
              key={section.key}
              className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b]/50 hover:border-[#334155] transition-colors duration-200"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className={`w-7 h-7 rounded-lg ${colors.iconBg} border ${colors.iconBorder} flex items-center justify-center ${colors.iconColor} text-sm`}
                >
                  {section.icon}
                </div>
                <h3 className="text-sm font-medium text-slate-200">
                  {section.title}
                </h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {section.content}
              </p>
            </div>
          );
        })}
      </div>

      {/* Risk Factors */}
      {data.riskFactors && data.riskFactors.length > 0 && (
        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-sm">
              <FiAlertCircle />
            </div>
            <h3 className="text-sm font-medium text-red-400">Risk Factors</h3>
          </div>
          <ul className="space-y-2">
            {data.riskFactors.map((risk, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                <span className="text-sm text-slate-400 leading-relaxed">
                  {risk}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExtrasCard;
