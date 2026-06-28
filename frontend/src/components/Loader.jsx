/**
 * Loader.jsx — Skeleton loading screen for the analysis results.
 * Displays animated placeholder cards that match the dashboard layout.
 */
const SkeletonBlock = ({ className = "" }) => (
  <div className={`bg-slate-700/30 rounded-xl animate-pulse ${className}`} />
);

const SkeletonCard = ({ children, className = "" }) => (
  <div className={`card animate-fade-in-up ${className}`}>
    {children}
  </div>
);

const Loader = () => {
  return (
    <div className="py-16 space-y-6">
      {/* Header skeleton */}
      <div className="text-center mb-12">
        <SkeletonBlock className="h-8 w-64 mx-auto mb-3" />
        <SkeletonBlock className="h-4 w-40 mx-auto" />
      </div>

      {/* Company Overview skeleton */}
      <SkeletonCard>
        <div className="flex items-center gap-3 mb-6">
          <SkeletonBlock className="w-10 h-10 rounded-xl" />
          <div>
            <SkeletonBlock className="h-5 w-48 mb-1.5" />
            <SkeletonBlock className="h-3 w-32" />
          </div>
        </div>
        <SkeletonBlock className="h-4 w-full mb-2" />
        <SkeletonBlock className="h-4 w-4/5 mb-2" />
        <SkeletonBlock className="h-4 w-3/5" />
      </SkeletonCard>

      {/* Financial Metrics skeleton */}
      <SkeletonCard className="animate-fade-in-up-delay-1">
        <div className="flex items-center gap-3 mb-6">
          <SkeletonBlock className="w-10 h-10 rounded-xl" />
          <SkeletonBlock className="h-5 w-40" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-800/30">
              <SkeletonBlock className="h-3 w-20 mb-2" />
              <SkeletonBlock className="h-6 w-28" />
            </div>
          ))}
        </div>
      </SkeletonCard>

      {/* News + SWOT skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonCard className="animate-fade-in-up-delay-2">
          <div className="flex items-center gap-3 mb-6">
            <SkeletonBlock className="w-10 h-10 rounded-xl" />
            <SkeletonBlock className="h-5 w-32" />
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mb-4 p-3 rounded-lg bg-slate-800/20">
              <SkeletonBlock className="h-4 w-4/5 mb-2" />
              <SkeletonBlock className="h-3 w-1/2" />
            </div>
          ))}
        </SkeletonCard>

        <SkeletonCard className="animate-fade-in-up-delay-2">
          <div className="flex items-center gap-3 mb-6">
            <SkeletonBlock className="w-10 h-10 rounded-xl" />
            <SkeletonBlock className="h-5 w-36" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-800/20">
                <SkeletonBlock className="h-4 w-20 mb-2" />
                <SkeletonBlock className="h-3 w-full mb-1" />
                <SkeletonBlock className="h-3 w-3/4" />
              </div>
            ))}
          </div>
        </SkeletonCard>
      </div>

      {/* Score + Recommendation skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SkeletonCard className="lg:col-span-1 animate-fade-in-up-delay-3">
          <div className="flex items-center justify-center py-8">
            <div className="w-32 h-32 rounded-full bg-slate-700/30 animate-pulse" />
          </div>
        </SkeletonCard>
        <SkeletonCard className="lg:col-span-2 animate-fade-in-up-delay-3">
          <SkeletonBlock className="h-10 w-32 rounded-xl mb-4" />
          <SkeletonBlock className="h-4 w-full mb-2" />
          <SkeletonBlock className="h-4 w-4/5 mb-2" />
          <SkeletonBlock className="h-4 w-2/3" />
        </SkeletonCard>
      </div>

      {/* Animated loading text */}
      <div className="text-center pt-4">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-blue-500/5 border border-blue-500/10">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm text-blue-300/80 font-medium">
            AI Agent is analyzing… This may take 30–60 seconds
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
