import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "./reducers/auth.reducers";
import favoritesReducer from "./reducers/favorites.reducer";
import journalReducer from "./reducers/journal.reducer";
import ordersReducer from "./reducers/orders.reducer";

const storage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
};

const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favoritesReducer,
  journal: journalReducer,
  orders: ordersReducer,
});

const persistConfig = {
  key: "cozykieRoot",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

export const persistor = persistStore(store);
export default store;