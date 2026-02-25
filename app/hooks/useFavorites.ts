"use client";

import { useEffect, useState } from "react";
import { Favorite, loadFavorites, saveFavorites } from "../lib/favorites";

export function useFavorites() {
  const [favMap, setFavMap] = useState<Record<number, Favorite>>({});

  // load once
  useEffect(() => {
    setFavMap(loadFavorites());
  }, []);

  // persist on change
  useEffect(() => {
    saveFavorites(favMap);
  }, [favMap]);

  const isFavorite = (id: number) => Boolean(favMap[id]);

  const addOrRemoveFavorite = (movie: Omit<Favorite, "rating" | "note">) => {
    setFavMap((prev) => {
      const next = { ...prev };
      if (next[movie.id]) {
        delete next[movie.id]; // remove
      } else {
        next[movie.id] = { ...movie, rating: 3, note: "" }; // add with defaults
      }
      return next;
    });
  };

  const updateFavorite = (id: number, patch: Partial<Pick<Favorite, "rating" | "note">>) => {
    setFavMap((prev) => {
      if (!prev[id]) return prev;
      return { ...prev, [id]: { ...prev[id], ...patch } };
    });
  };

  return {
    favorites: Object.values(favMap),
    isFavorite,
    addOrRemoveFavorite,
    updateFavorite,
  };
}