import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFavorites } from "../redux/actions/favorites.actions";

const getStorageKey = (userId) => `favorites_${userId}`;

export const useFavorites = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.favorites.favorites);

  // Load this user's favorites from localStorage whenever they log in/out
  useEffect(() => {
    if (!user) {
      dispatch(setFavorites([]));
      return;
    }
    const stored = localStorage.getItem(getStorageKey(user.id));
    dispatch(setFavorites(stored ? JSON.parse(stored) : []));
  }, [user?.id]);

  const isFavorite = (slug) => favorites.some((r) => r.slug === slug);

  const toggleFavorite = (recipe) => {
    if (!user) return;

    const exists = isFavorite(recipe.slug);
    const updated = exists
      ? favorites.filter((r) => r.slug !== recipe.slug)
      : [...favorites, recipe];

    localStorage.setItem(getStorageKey(user.id), JSON.stringify(updated));
    dispatch(setFavorites(updated));
  };

  return { favorites, isFavorite, toggleFavorite };
};