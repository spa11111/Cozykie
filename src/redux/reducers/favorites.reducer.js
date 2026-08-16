import { TOGGLE_FAVORITE } from "../actions/favorites.actions";

const initialState = {};
// shape: { [userId]: [recipe, recipe, ...] }

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      const { userId, recipe } = action.payload;
      const userFavorites = state[userId] || [];

      const exists = userFavorites.some((r) => r.slug === recipe.slug);
      const updated = exists
        ? userFavorites.filter((r) => r.slug !== recipe.slug)
        : [...userFavorites, recipe];

      return {
        ...state,
        [userId]: updated,
      };
    }

    default:
      return state;
  }
};

export default favoritesReducer;