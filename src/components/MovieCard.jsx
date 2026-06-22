import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import { IMG_BASE } from "../api";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const saved = isInWatchlist(movie.id);

  const handleWatchlist = (e) => {
    e.stopPropagation();
    saved ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
  };

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <div className="card-img-wrap">
        {movie.poster_path ? (
          <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} className="card-img" />
        ) : (
          <div className="card-no-img">No Image</div>
        )}
        <div className="card-overlay">
          <span className="card-rating">⭐ {movie.vote_average?.toFixed(1)}</span>
          <button className={`watchlist-btn ${saved ? "saved" : ""}`} onClick={handleWatchlist}>
            {saved ? "✓ Saved" : "+ Watchlist"}
          </button>
        </div>
      </div>
      <div className="card-info">
        <h3 className="card-title">{movie.title}</h3>
        <p className="card-year">{movie.release_date?.slice(0, 4)}</p>
      </div>
    </div>
  );
}
