import { createContext, useContext, useReducer } from "react";

const WatchlistContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      if (state.find((m) => m.id === action.movie.id)) return state;
      return [...state, action.movie];
    case "REMOVE":
      return state.filter((m) => m.id !== action.id);
    default:
      return state;
  }
};

export function WatchlistProvider({ children }) {
  const [watchlist, dispatch] = useReducer(reducer, []);

  const addToWatchlist = (movie) => dispatch({ type: "ADD", movie });
  const removeFromWatchlist = (id) => dispatch({ type: "REMOVE", id });
  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => useContext(WatchlistContext);
