import SearchBar from "./SearchBar";

const Hero = ({ onSearch, isLoading }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center hero-gradient dots-pattern overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-8 animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Powered by AI
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
          <span className="text-slate-100">AI Investment</span>
          <br />
          <span className="gradient-text">Research Agent</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay-1">
          Research any company using AI and receive an investment recommendation
          with detailed reasoning.
        </p>

        {/* Search Bar */}
        <div className="animate-fade-in-up-delay-2">
          <SearchBar onSearch={onSearch} isLoading={isLoading} />
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-6 mt-10 text-xs text-slate-500 animate-fade-in-up-delay-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            Real-time Data
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            SWOT Analysis
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            AI Recommendations
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
