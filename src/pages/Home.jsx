import { getTrending, getPopular, getTopRated } from "../api";
import { useFetch } from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";
import { Loader, ErrorMsg } from "../components/UI";

function MovieRow({ title, fetchFn }) {
  const { data, loading, error } = useFetch(fetchFn, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMsg message={error} />;

  return (
    <section className="movie-row">
      <h2 className="section-title">{title}</h2>
      <div className="movies-grid">
        {data?.results?.slice(0, 8).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="page-container">
      <div className="hero">
        <h1 className="hero-title">Discover Your Next Favourite Film</h1>
        <p className="hero-sub">Browse trending movies, explore top picks, and build your watchlist.</p>
      </div>
      <MovieRow title="🔥 Trending This Week" fetchFn={getTrending} />
      <MovieRow title="🎥 Popular Now" fetchFn={getPopular} />
      <MovieRow title="🏆 Top Rated" fetchFn={getTopRated} />
    </div>
  );
}
