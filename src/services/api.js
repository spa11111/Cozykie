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

export const createRecipe = async (recipe) => {
  const response = await axios.post(`${API_BASE_URL}/recipes`, recipe);
  return response.data;
};

export const updateRecipe = async (id, updates) => {
  const response = await axios.patch(`${API_BASE_URL}/recipes/${id}`, updates);
  return response.data;
};

export const deleteRecipe = async (id) => {
  await axios.delete(`${API_BASE_URL}/recipes/${id}`);
  return id;
};

export const getRecipesByAuthor = async (authorId) => {
  const response = await axios.get(`${API_BASE_URL}/recipes`);
  return response.data.filter((r) => String(r.authorId) === String(authorId));
};

// ---- Collections ----

export const getCollections = async () => {
  const response = await axios.get(`${API_BASE_URL}/collections`);
  return response.data;
};

// ---- Journal ----
export const getJournalEntries = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/journal`);
  return response.data.filter((entry) => String(entry.userId) === String(userId));
};

export const createJournalEntry = async (entry) => {
  const response = await axios.post(`${API_BASE_URL}/journal`, entry);
  return response.data;
};

export const updateJournalEntry = async (id, updates) => {
  const response = await axios.patch(`${API_BASE_URL}/journal/${id}`, updates);
  return response.data;
};

export const deleteJournalEntry = async (id) => {
  await axios.delete(`${API_BASE_URL}/journal/${id}`);
  return id;
};

export const getPublicJournalEntries = async () => {
  const response = await axios.get(`${API_BASE_URL}/journal`, {
    params: { isPublic: true },
  });
  return response.data;
};

// ---- Users ----

export const getUserByEmail = async (email) => {
  const response = await axios.get(`${API_BASE_URL}/users`, {
    params: { email },
  });
  return response.data[0] || null;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/users`, userData);
  return response.data;
};

export const updateUser = async (id, updates) => {
  const response = await axios.patch(`${API_BASE_URL}/users/${id}`, updates);
  return response.data;
};
// ---- Orders ----
export const createOrder = async (order) => {
  const response = await axios.post(`${API_BASE_URL}/orders`, order);
  return response.data;
};

export const getOrdersByUser = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/orders`);
  return response.data.filter((order) => String(order.userId) === String(userId));
};

// ---- Collections (admin) ----
export const createCollection = async (collection) => {
  const response = await axios.post(`${API_BASE_URL}/collections`, collection);
  return response.data;
};
export const updateCollection = async (id, updates) => {
  const response = await axios.patch(`${API_BASE_URL}/collections/${id}`, updates);
  return response.data;
};
export const deleteCollection = async (id) => {
  await axios.delete(`${API_BASE_URL}/collections/${id}`);
  return id;
};

// ---- Users (admin) ----
export const getAllUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};
export const deleteUser = async (id) => {
  await axios.delete(`${API_BASE_URL}/users/${id}`);
  return id;
};

// ---- Orders (admin) ----
export const getAllOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/orders`);
  return response.data;
};
export const updateOrderStatus = async (id, status) => {
  const response = await axios.patch(`${API_BASE_URL}/orders/${id}`, { status });
  return response.data;
};

// ---- Recipes (admin) ----
export const getAllRecipesAdmin = async () => {
  const response = await axios.get(`${API_BASE_URL}/recipes`);
  return response.data;
};

export const reportRecipe = async (id, reason) => {
  const response = await axios.patch(`${API_BASE_URL}/recipes/${id}`, {
    reported: true,
    reportReason: reason,
    reportedAt: Date.now(),
  });
  return response.data;
};

export const reportOrder = async (id, reason) => {
  const response = await axios.patch(`${API_BASE_URL}/orders/${id}`, {
    reported: true,
    reportReason: reason,
    reportedAt: Date.now(),
  });
  return response.data;
};