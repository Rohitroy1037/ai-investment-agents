import {
  FiShield,
  FiAlertTriangle,
  FiTarget,
  FiZap,
} from "react-icons/fi";

const swotConfig = [
  {
    key: "strengths",
    title: "Strengths",
    icon: <FiShield />,
    bgColor: "bg-emerald-500/8",
    borderColor: "border-emerald-500/20",
    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    dotColor: "bg-emerald-400",
    titleColor: "text-emerald-400",
  },
  {
    key: "weaknesses",
    title: "Weaknesses",
    icon: <FiAlertTriangle />,
    bgColor: "bg-red-500/8",
    borderColor: "border-red-500/20",
    iconBg: "bg-red-500/10",
    iconBorder: "border-red-500/20",
    iconColor: "text-red-400",
    dotColor: "bg-red-400",
    titleColor: "text-red-400",
  },
  {
    key: "opportunities",
    title: "Opportunities",
    icon: <FiTarget />,
    bgColor: "bg-blue-500/8",
    borderColor: "border-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconBorder: "border-blue-500/20",
    iconColor: "text-blue-400",
    dotColor: "bg-blue-400",
    titleColor: "text-blue-400",
  },
  {
    key: "threats",
    title: "Threats",
    icon: <FiZap />,
    bgColor: "bg-amber-500/8",
    borderColor: "border-amber-500/20",
    iconBg: "bg-amber-500/10",
    iconBorder: "border-amber-500/20",
    iconColor: "text-amber-400",
    dotColor: "bg-amber-400",
    titleColor: "text-amber-400",
  },
];

const SWOTCard = ({ data }) => {
  return (
    <div className="card animate-fade-in-up-delay-3">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <FiTarget className="text-cyan-400 text-lg" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            SWOT Analysis
          </h2>
          <p className="text-xs text-slate-500">
            Strategic position assessment
          </p>
        </div>
      </div>

      {/* SWOT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {swotConfig.map((section) => (
          <div
            key={section.key}
            className={`p-5 rounded-xl ${section.bgColor} border ${section.borderColor}`}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className={`w-7 h-7 rounded-lg ${section.iconBg} border ${section.iconBorder} flex items-center justify-center ${section.iconColor} text-sm`}
              >
                {section.icon}
              </div>
              <h3
                className={`text-sm font-semibold ${section.titleColor}`}
              >
                {section.title}
              </h3>
            </div>
            <ul className="space-y-2.5">
              {data[section.key].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${section.dotColor} mt-1.5 flex-shrink-0`}
                  />
                  <span className="text-sm text-slate-300 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SWOTCard;
