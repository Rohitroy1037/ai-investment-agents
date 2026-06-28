import {
  FiGlobe,
  FiUser,
  FiCalendar,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiTag,
} from "react-icons/fi";

const CompanyCard = ({ data }) => {
  const details = [
    { icon: <FiTag />, label: "Industry", value: data.industry },
    { icon: <FiUser />, label: "CEO", value: data.ceo },
    { icon: <FiCalendar />, label: "Founded", value: data.founded },
    { icon: <FiUsers />, label: "Employees", value: data.employees },
    { icon: <FiTrendingUp />, label: "Market Cap", value: data.marketCap },
    {
      icon: <FiDollarSign />,
      label: "Stock Price",
      value: data.currentStockPrice,
    },
  ];

  return (
    <div className="card animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <FiGlobe className="text-blue-400 text-lg" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            Company Overview
          </h2>
          <p className="text-xs text-slate-500">
            {data.companyName} • {data.ticker}
          </p>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {details.map((item) => (
          <div
            key={item.label}
            className="p-3 rounded-xl bg-[#0f172a] border border-[#1e293b]/50"
          >
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              {item.icon}
              {item.label}
            </div>
            <p className="text-sm font-medium text-slate-200">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b]/50">
        <p className="text-sm text-slate-400 leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default CompanyCard;
