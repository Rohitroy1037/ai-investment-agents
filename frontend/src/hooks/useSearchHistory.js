import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ai-invest-search-history";
const MAX_HISTORY = 10;

/**
 * Hook: useSearchHistory
 * Manages recent search history in localStorage.
 */
export const useSearchHistory = () => {
  const [history, setHistory] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Sync state to localStorage
  const persist = (newHistory) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const addSearch = useCallback(
    (companyName) => {
      const trimmed = companyName.trim();
      if (!trimmed) return;
      // Remove duplicate, add to front, cap at MAX_HISTORY
      const filtered = history.filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase()
      );
      const updated = [trimmed, ...filtered].slice(0, MAX_HISTORY);
      persist(updated);
    },
    [history]
  );

  const removeSearch = useCallback(
    (companyName) => {
      const updated = history.filter(
        (item) => item.toLowerCase() !== companyName.toLowerCase()
      );
      persist(updated);
    },
    [history]
  );

  const clearHistory = useCallback(() => {
    persist([]);
  }, []);

  return { history, addSearch, removeSearch, clearHistory };
};
