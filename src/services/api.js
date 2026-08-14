import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

// ---- Recipes ----

export const getRecipes = async () => {
  const response = await axios.get(`${API_BASE_URL}/recipes`);
  return response.data;
};

export const getRecipeBySlug = async (slug) => {
  const response = await axios.get(`${API_BASE_URL}/recipes`, {
    params: { slug },
  });
  return response.data[0] || null;
};

export const getRecipesByCookieType = async (cookieType, excludeSlug) => {
  const response = await axios.get(`${API_BASE_URL}/recipes`, {
    params: { cookieType },
  });
  return excludeSlug
    ? response.data.filter((r) => r.slug !== excludeSlug)
    : response.data;
};

export const getRecipesByCategory = async (category, excludeSlug) => {
  const response = await axios.get(`${API_BASE_URL}/recipes`, {
    params: { category },
  });
  return excludeSlug
    ? response.data.filter((r) => r.slug !== excludeSlug)
    : response.data;
};

// ---- Collections ----

export const getCollections = async () => {
  const response = await axios.get(`${API_BASE_URL}/collections`);
  return response.data;
};

// ---- Journal ----

export const getJournalEntries = async () => {
  const response = await axios.get(`${API_BASE_URL}/journal`);
  return response.data;
};