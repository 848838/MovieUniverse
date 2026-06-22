import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api";
import MovieCard from "../components/MovieCard";
import { Loader, ErrorMsg } from "../components/UI";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 400);

  const fetchResults = useCallback(async (q) => {
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(q);
      setResults(data.results || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults(debouncedQuery);
    if (debouncedQuery) setSearchParams({ q: debouncedQuery });
  }, [debouncedQuery]);

  return (
    <div className="page-container">
      <h1 className="section-title">Search Movies</h1>
      <input
        className="search-input-lg"
        type="text"
        placeholder="Type a movie name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      {loading && <Loader />}
      {error && <ErrorMsg message={error} />}

      {!loading && results.length === 0 && debouncedQuery && (
        <p className="empty-msg">No results found for "{debouncedQuery}"</p>
      )}

      {results.length > 0 && (
        <p className="result-count">{results.length} results for "{debouncedQuery}"</p>
      )}

      <div className="movies-grid">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
