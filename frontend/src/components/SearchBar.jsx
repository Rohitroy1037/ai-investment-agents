import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        {/* Glow effect behind input */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-blue-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500" />

        <div className="relative flex items-center bg-[#111827] border border-[#1e293b] rounded-2xl overflow-hidden group-focus-within:border-blue-500/40 transition-colors duration-300">
          <FiSearch className="ml-5 text-slate-500 text-lg flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter company name..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-4 py-4 sm:py-5 text-slate-100 text-sm sm:text-base placeholder-slate-500 outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 mr-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer
              bg-gradient-to-r from-blue-600 to-violet-600 text-white
              hover:from-blue-500 hover:to-violet-500 hover:shadow-lg hover:shadow-blue-500/25
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <FiSearch className="text-base" />
            )}
            <span className="hidden sm:inline">
              {isLoading ? "Searching..." : "Search"}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
