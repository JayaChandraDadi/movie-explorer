export type Favorite = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;

  rating: 1 | 2 | 3 | 4 | 5;
  note?: string;
};

const KEY = "movie_explorer_favorites_v1";

export function loadFavorites(): Record<number, Favorite> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveFavorites(map: Record<number, Favorite>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(map));
}