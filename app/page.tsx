"use client";

import { useEffect, useState } from "react";
import { useFavorites } from "./hooks/useFavorites";
import type { Favorite } from "./lib/favorites";
type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [details, setDetails] = useState<any>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const { favorites, isFavorite, addOrRemoveFavorite, updateFavorite } = useFavorites();
  useEffect(() => {
    if (!query.trim()) {
      setSelectedId(null);
      setDetails(null);
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `/api/tmdb/search?query=${encodeURIComponent(query)}`
        );

        if (!res.ok) {
          throw new Error("Search failed");
        }

        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }, 400); // debounce

    return () => clearTimeout(timeout);
  }, [query]);
  useEffect(() => {
  if (!selectedId) return;

  const loadDetails = async () => {
    try {
      setDetailsLoading(true);

      const res = await fetch(`/api/tmdb/movie/${selectedId}`);
      const data = await res.json();

      setDetails(data);
    } catch (err) {
      setError("Failed to load details.");
    } finally {
      setDetailsLoading(false);
    }
  };

  loadDetails();
}, [selectedId]);
  return (
    <main style={{ padding: 20 }}>
      <h1>Movie Explorer</h1>

      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 20,
          fontSize: 16,
        }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && query && results.length === 0 && <p>No results found.</p>}

      <div>
        {results.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #ddd",
              padding: 10,
              marginBottom: 10,
              cursor: "pointer"
            }}
          >
          
            <h3
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => setSelectedId(movie.id)}
            >
              {movie.title} ({movie.release_date?.slice(0, 4)})
            </h3>
            <p>{movie.overview?.slice(0, 120)}...</p>
            <button
            onClick={() =>
              addOrRemoveFavorite({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                overview: movie.overview,
              })
  }
>
  {isFavorite(movie.id) ? "Remove Favorite" : "Add to Favorites"}
</button>
          </div>
        ))}
      </div>
      {detailsLoading && <p>Loading details...</p>}

{details && (
  <div style={{ border: "2px solid black", padding: 15, marginTop: 20 }}>
    <h2>{details.title}</h2>
    {details.poster_path && (
  <img
    src={`https://image.tmdb.org/t/p/w200${details.poster_path}`}
    alt={details.title}
    style={{ marginBottom: 10 }}
  />
)}
    <p>Year: {details.release_date?.slice(0, 4)}</p>
    <p>
  Runtime: {details.runtime ? `${details.runtime} minutes` : "Not available"}
    </p>
    <p>{details.overview}</p>
  <button
  onClick={() =>
    addOrRemoveFavorite({
      id: details.id,
      title: details.title,
      poster_path: details.poster_path,
      release_date: details.release_date,
      overview: details.overview,
    })
  }
>
  {isFavorite(details.id) ? "Remove Favorite" : "Add to Favorites"}
</button>

{isFavorite(details.id) && (
  <div style={{ marginTop: 12 }}>
    <label>
      Rating (1–5):{" "}
      <select
        value={favorites.find((f) => f.id === details.id)?.rating ?? 3}
        onChange={(e) =>
          updateFavorite(details.id, { rating: Number(e.target.value) as 1 | 2 | 3 | 4 | 5 })
        }
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </label>

    <div style={{ marginTop: 8 }}>
      <label>
        Note:
        <textarea
          style={{ width: "100%", minHeight: 70 }}
          value={favorites.find((f) => f.id === details.id)?.note ?? ""}
          onChange={(e) => updateFavorite(details.id, { note: e.target.value })}
        />
      </label>
    </div>
  </div>
)}
  </div>
  
)}
<hr style={{ margin: "20px 0" }} />
<h2>Favorites</h2>

{favorites.length === 0 ? (
  <p>No favorites yet.</p>
) : (
  favorites.map((f) => (
    <div
      key={f.id}
      style={{
        border: "1px solid #ddd",
        padding: 10,
        marginBottom: 10,
      }}
    >
      <strong>{f.title}</strong> ({f.release_date?.slice(0, 4)})
      <p>Rating: {f.rating}/5</p>
      {f.note ? <p>Note: {f.note}</p> : <p style={{ opacity: 0.7 }}>No note</p>}
      <button onClick={() => setSelectedId(f.id)}>Open Details</button>
      <button
        onClick={() =>
            addOrRemoveFavorite({
                id: f.id,
                title: f.title,
                poster_path: f.poster_path,
                release_date: f.release_date,
                overview: f.overview,
              })
              }
            >
              Remove
            </button>
    </div>
  ))
)}
    </main>
    
  );
}