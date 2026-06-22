import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useWatchlist } from "../context/WatchlistContext";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">MovieUniverse</Link>
      <form className="nav-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>Home</NavLink>
        <NavLink to="/watchlist" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Watchlist {watchlist.length > 0 && <span className="badge">{watchlist.length}</span>}
        </NavLink>
      </div>
    </nav>
  );
}
