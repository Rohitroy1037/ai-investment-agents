import { FiCheckCircle, FiAlertTriangle, FiShield, FiClock } from "react-icons/fi";

/**
 * RecommendationCard — Displays the AI verdict, confidence badge, and reasoning.
 * Enhanced with a confidence meter and analysis metadata.
 */
const RecommendationCard = ({ data, analysisId, timestamp }) => {
  const verdict = data?.verdict || "N/A";
  const confidence = data?.confidence || "N/A";
  const reason = data?.reason || "No reasoning provided.";

  const isInvest = verdict === "INVEST";

  // Parse confidence percentage for the meter
  const confNum = parseInt(String(confidence).replace(/[^0-9]/g, "")) || 0;

  return (
    <div className="card animate-fade-in-up-delay-5 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isInvest
                ? "bg-emerald-500/10 border border-emerald-500/20"
                : "bg-red-500/10 border border-red-500/20"
            }`}
          >
            {isInvest ? (
              <FiCheckCircle className="text-emerald-400 text-lg" />
            ) : (
              <FiAlertTriangle className="text-red-400 text-lg" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-100">
              Recommendation
            </h2>
            <p className="text-xs text-slate-500">AI investment verdict</p>
          </div>
        </div>

        {/* Verdict Badge */}
        <span
          className={`px-4 py-2 rounded-xl text-sm font-bold tracking-wide ${
            isInvest
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
              : "bg-red-500/15 text-red-400 border border-red-500/25"
          }`}
        >
          {verdict}
        </span>
      </div>

      {/* Confidence Meter */}
      <div className="mb-5 p-3.5 rounded-xl bg-[#0f172a] border border-[#1e293b]/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FiShield className="text-blue-400 text-sm" />
            <span className="text-xs text-slate-400 font-medium">
              AI Confidence
            </span>
          </div>
          <span className="text-sm font-semibold text-blue-400">
            {confidence}
          </span>
        </div>
        {/* Meter bar */}
        <div className="w-full h-2 rounded-full bg-slate-700/50 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${Math.min(confNum, 100)}%`,
              background: `linear-gradient(90deg, #3b82f6, #8b5cf6)`,
            }}
          />
        </div>
      </div>

      {/* Reasoning */}
      <div className="mb-4">
        <p className="text-sm text-slate-400 leading-relaxed">{reason}</p>
      </div>

      {/* Metadata footer */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-700/30">
        {analysisId && (
          <span className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            ID: {analysisId}
          </span>
        )}
        {timestamp && (
          <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <FiClock size={11} />
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
