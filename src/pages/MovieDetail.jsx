import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetail, IMG_ORIGINAL, IMG_BASE } from "../api";
import { useFetch } from "../hooks/useFetch";
import { useWatchlist } from "../context/WatchlistContext";
import { Loader, ErrorMsg } from "../components/UI";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const { data: movie, loading, error } = useFetch(() => getMovieDetail(id), [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMsg message={error} />;
  if (!movie) return null;

  const saved = isInWatchlist(movie.id);
  const trailer = movie.videos?.results?.find((v) => v.type === "Trailer" && v.site === "YouTube");
  const director = movie.credits?.crew?.find((p) => p.job === "Director");
  const cast = movie.credits?.cast?.slice(0, 6);

  return (
    <div className="detail-page">
      <div
        className="detail-backdrop"
        style={{ backgroundImage: `url(${IMG_ORIGINAL}${movie.backdrop_path})` }}
      >
        <div className="backdrop-overlay" />
      </div>

      <div className="detail-content">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        <div className="detail-main">
          <img
            src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : ""}
            alt={movie.title}
            className="detail-poster"
          />

          <div className="detail-info">
            <h1 className="detail-title">{movie.title}</h1>
            <div className="detail-meta">
              <span>⭐ {movie.vote_average?.toFixed(1)}</span>
              <span>📅 {movie.release_date?.slice(0, 4)}</span>
              <span>⏱ {movie.runtime} min</span>
              {movie.status && <span className="status-badge">{movie.status}</span>}
            </div>

            <div className="genres">
              {movie.genres?.map((g) => <span key={g.id} className="genre-tag">{g.name}</span>)}
            </div>

            <p className="detail-overview">{movie.overview}</p>

            {director && <p className="detail-director"><strong>Director:</strong> {director.name}</p>}

            <button
              className={`watchlist-btn-lg ${saved ? "saved" : ""}`}
              onClick={() => saved ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
            >
              {saved ? "✓ Saved to Watchlist" : "+ Add to Watchlist"}
            </button>

            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
                className="trailer-btn"
              >
                ▶ Watch Trailer
              </a>
            )}
          </div>
        </div>

        {cast?.length > 0 && (
          <div className="cast-section">
            <h2 className="section-title">Top Cast</h2>
            <div className="cast-grid">
              {cast.map((actor) => (
                <div key={actor.id} className="cast-card">
                  {actor.profile_path ? (
                    <img src={`${IMG_BASE}${actor.profile_path}`} alt={actor.name} className="cast-img" />
                  ) : (
                    <div className="cast-no-img">👤</div>
                  )}
                  <p className="cast-name">{actor.name}</p>
                  <p className="cast-char">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
