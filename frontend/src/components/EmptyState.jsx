import { RiRobot2Fill } from "react-icons/ri";
import { HiSparkles } from "react-icons/hi2";

/**
 * EmptyState — Shown when no search has been performed yet (below the hero).
 * Matches the target design with robot icon on left, sparkle on right.
 */
const EmptyState = () => {
  return (
    <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative flex flex-col items-center text-center animate-fade-in-up">
        {/* Robot icon - positioned to the left on larger screens */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-slate-700/30 flex items-center justify-center shadow-lg">
            <RiRobot2Fill className="text-slate-400 text-2xl" />
          </div>
        </div>

        {/* Sparkle icon - positioned to the right on larger screens */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
          <HiSparkles className="text-slate-600 text-3xl" />
        </div>

        {/* Mobile robot icon */}
        <div className="lg:hidden w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-slate-700/30 flex items-center justify-center shadow-lg mb-4">
          <RiRobot2Fill className="text-slate-400 text-2xl" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-slate-200 mb-2">
          Ready to Analyze
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Enter a company name above to receive a comprehensive AI-powered
          investment analysis with financial metrics, SWOT breakdown, and a clear
          recommendation.
        </p>
      </div>
    </section>
  );
};

export default EmptyState;
