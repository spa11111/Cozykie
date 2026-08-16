export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

export const toggleFavorite = (userId, recipe) => ({
  type: TOGGLE_FAVORITE,
  payload: { userId, recipe },
});