import SearchBar from "./SearchBar";

const featureTags = [
  "Yahoo Finance",
  "NewsAPI",
  "LangChain AI",
  "Newsanalysis",
  "SWOT Analysis",
  "Risk Assessment",
];

const Hero = ({ onSearch, isLoading }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center hero-gradient dots-pattern overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-8 animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Powered by AI
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
          <span className="gradient-text">AI Investment</span>
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

        {/* Feature Tags / Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8 animate-fade-in-up-delay-3">
          {featureTags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 text-xs font-medium rounded-full bg-slate-800/60 text-slate-400 border border-slate-700/50 hover:border-violet-500/30 hover:text-violet-300 transition-all duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
