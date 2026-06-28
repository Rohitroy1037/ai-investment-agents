import { FiSearch } from "react-icons/fi";
import { RiRobot2Fill } from "react-icons/ri";

/**
 * EmptyState — Shown when no search has been performed yet (below the hero).
 */
const EmptyState = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center animate-fade-in-up">
        {/* Icon */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/10 flex items-center justify-center mx-auto mb-6">
          <RiRobot2Fill className="text-blue-400/60 text-3xl" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-slate-200 mb-2">
          Ready to Analyze
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
          Enter a company name above to receive a comprehensive AI-powered
          investment analysis with financial metrics, SWOT breakdown, and a clear
          recommendation.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            "Yahoo Finance",
            "NewsAPI",
            "LangChain AI",
            "SWOT Analysis",
            "Risk Assessment",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmptyState;
