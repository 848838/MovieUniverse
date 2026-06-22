import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1 className="section-title">🎞 My Watchlist</h1>
      {watchlist.length === 0 ? (
        <div className="empty-state">
          <p className="empty-msg">Your watchlist is empty.</p>
          <button className="watchlist-btn-lg" onClick={() => navigate("/")}>Browse Movies</button>
        </div>
      ) : (
        <>
          <p className="result-count">{watchlist.length} movie{watchlist.length > 1 ? "s" : ""} saved</p>
          <div className="movies-grid">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
