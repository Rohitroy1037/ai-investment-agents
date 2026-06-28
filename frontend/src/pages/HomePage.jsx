import { useState, useRef } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import CompanyCard from "../components/CompanyCard";
import FinancialCard from "../components/FinancialCard";
import NewsCard from "../components/NewsCard";
import SWOTCard from "../components/SWOTCard";
import ScoreCard from "../components/ScoreCard";
import RecommendationCard from "../components/RecommendationCard";
import ExtrasCard from "../components/ExtrasCard";
import ActionButtons from "../components/ActionButtons";
import SearchHistory from "../components/SearchHistory";
import Footer from "../components/Footer";
import { getInvestmentResearch, transformApiResponse } from "../services/api";
import { useSearchHistory } from "../hooks/useSearchHistory";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [searchedCompany, setSearchedCompany] = useState("");
  const [error, setError] = useState(null);
  const [analysisId, setAnalysisId] = useState(null);
  const [analysisTimestamp, setAnalysisTimestamp] = useState(null);
  const resultsRef = useRef(null);

  const { history, addSearch, removeSearch, clearHistory } = useSearchHistory();

  const handleSearch = async (companyName) => {
    setIsLoading(true);
    setResults(null);
    setError(null);
    setSearchedCompany(companyName);

    // Add to search history
    addSearch(companyName);

    try {
      // ── Call the real backend API ──
      toast.loading("AI Agent is analyzing…", { id: "analysis" });
      const response = await getInvestmentResearch(companyName);

      if (response.success && response.data) {
        const formattedData = transformApiResponse(response.data);
        setResults(formattedData);

        // Generate analysis metadata
        setAnalysisId(
          `INV-${Date.now().toString(36).toUpperCase()}`
        );
        setAnalysisTimestamp(
          new Date().toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        );

        toast.success(`Analysis complete for ${companyName}!`, {
          id: "analysis",
        });

        // Scroll to results
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else {
        toast.error("Analysis failed.", { id: "analysis" });
        setError(
          response.message || "Failed to analyze company. Please try again."
        );
      }
    } catch (err) {
      console.error("Search error:", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please check your connection and try again.";
      toast.error(message, { id: "analysis" });
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onSearch={handleSearch} isLoading={isLoading} />

        {/* Search History */}
        {!isLoading && !results && !error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchHistory
              history={history}
              onSelect={handleSearch}
              onRemove={removeSearch}
              onClear={clearHistory}
            />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !results && !error && <EmptyState />}

        {/* Loading State — Skeleton Loaders */}
        {isLoading && (
          <section className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
            <Loader />
          </section>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="card border-red-500/30 text-center animate-fade-in-up">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-red-400 text-2xl">!</span>
              </div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">
                Analysis Failed
              </h3>
              <p className="text-sm text-slate-400 mb-6">{error}</p>
              <button
                onClick={() => handleSearch(searchedCompany)}
                className="px-6 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 transition-all duration-300 cursor-pointer"
              >
                Try Again
              </button>
            </div>
          </section>
        )}

        {/* Results Section */}
        {results && !isLoading && (
          <section
            ref={resultsRef}
            className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-16"
          >
            {/* Results header + Action Buttons */}
            <div className="text-center mb-10 animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-1">
                Research Results
              </h2>
              <p className="text-slate-500 text-sm mb-4">
                AI analysis for{" "}
                <span className="text-blue-400 font-medium">
                  {searchedCompany}
                </span>
              </p>
              <div className="flex justify-center">
                <ActionButtons
                  resultsRef={resultsRef}
                  companyName={searchedCompany}
                  rawData={results}
                />
              </div>
            </div>

            {/* Cards grid — consistent gap throughout */}
            <div className="space-y-8">
              {/* Row 1: Company Overview (full width) */}
              <CompanyCard data={results.companyOverview} />

              {/* Row 2: Financial Metrics (full width) */}
              <FinancialCard data={results.financialMetrics} />

              {/* Row 3: News + SWOT (equal two columns) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <NewsCard data={results.latestNews} />
                <SWOTCard data={results.swotAnalysis} />
              </div>

              {/* Row 4: Extras — AI Deep Dive (full width) */}
              {results.extras && <ExtrasCard data={results.extras} />}

              {/* Row 5: Score + Recommendation (1/3 + 2/3) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <ScoreCard data={results.investmentScore} />
                </div>
                <div className="lg:col-span-2">
                  <RecommendationCard
                    data={results.recommendation}
                    analysisId={analysisId}
                    timestamp={analysisTimestamp}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
