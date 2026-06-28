import { FiClock, FiX, FiTrash2 } from "react-icons/fi";

/**
 * SearchHistory — Displays recent searches with click-to-search and clear functionality.
 */
const SearchHistory = ({ history, onSelect, onRemove, onClear }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="max-w-2xl mx-auto mt-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FiClock className="text-slate-500 text-sm" />
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Recent Searches
          </span>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
        >
          <FiTrash2 size={12} />
          Clear All
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <div
            key={item}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200"
          >
            <button
              onClick={() => onSelect(item)}
              className="text-xs text-slate-400 group-hover:text-blue-400 transition-colors cursor-pointer"
            >
              {item}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(item);
              }}
              className="text-slate-600 hover:text-red-400 transition-colors cursor-pointer"
            >
              <FiX size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
