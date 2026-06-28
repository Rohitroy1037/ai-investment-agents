import { FiRss, FiExternalLink } from "react-icons/fi";

const NewsCard = ({ data }) => {
  return (
    <div className="card animate-fade-in-up-delay-2">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <FiRss className="text-amber-400 text-lg" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">Latest News</h2>
          <p className="text-xs text-slate-500">Recent headlines & updates</p>
        </div>
      </div>

      {/* News list */}
      <div className="flex flex-col gap-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="group p-4 rounded-xl bg-[#0f172a] border border-[#1e293b]/50 hover:border-[#334155] transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors duration-200 leading-snug mb-2">
                  {item.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                    {item.source}
                  </span>
                  <span>{item.date}</span>
                </div>
              </div>
              <FiExternalLink className="text-slate-600 group-hover:text-blue-400 transition-colors duration-200 flex-shrink-0 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
