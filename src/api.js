const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_BASE = "https://image.tmdb.org/t/p/w500";
export const IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";

const fetcher = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`);
  if (!res.ok) throw new Error("API request failed");
  return res.json();
};

export const getTrending = () => fetcher("/trending/movie/week?language=en-US");
export const getPopular = () => fetcher("/movie/popular?language=en-US");
export const getTopRated = () => fetcher("/movie/top_rated?language=en-US");
export const getMovieDetail = (id) => fetcher(`/movie/${id}?language=en-US&append_to_response=credits,videos`);
export const searchMovies = (query) => fetcher(`/search/movie?query=${encodeURIComponent(query)}&language=en-US`);
