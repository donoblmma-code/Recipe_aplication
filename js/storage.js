/**
 * LocalStorage management for favorites and recent searches
 */

const FAVORITES_STORAGE_KEY = "recipe_app_favorites";
const RECENT_SEARCHES_KEY = "recipe_app_recent_searches";

/**
 * Retrieve saved favorite recipes
 * @returns {Array<object>}
 */
export function getFavorites() {
  try {
    const data = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error reading favorites from localStorage", err);
    return [];
  }
}

/**
 * Save a recipe to favorites list
 * @param {object} recipe
 * @returns {boolean} true if added, false if already present
 */
export function saveFavorite(recipe) {
  if (!recipe || !recipe.idMeal) return false;
  try {
    const favorites = getFavorites();
    const exists = favorites.some((item) => item.idMeal === recipe.idMeal);
    if (!exists) {
      favorites.unshift({
        idMeal: recipe.idMeal,
        strMeal: recipe.strMeal,
        strMealThumb: recipe.strMealThumb,
        strCategory: recipe.strCategory || "Recipe",
        strArea: recipe.strArea || "International"
      });
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      return true;
    }
    return false;
  } catch (err) {
    console.error("Error saving favorite to localStorage", err);
    return false;
  }
}

/**
 * Remove recipe from favorites by ID
 * @param {string} idMeal
 * @returns {boolean}
 */
export function removeFavorite(idMeal) {
  try {
    const favorites = getFavorites();
    const updated = favorites.filter((item) => item.idMeal !== idMeal);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error("Error removing favorite from localStorage", err);
    return false;
  }
}

/**
 * Check if a recipe ID is favorited
 * @param {string} idMeal
 * @returns {boolean}
 */
export function isFavorite(idMeal) {
  const favorites = getFavorites();
  return favorites.some((item) => item.idMeal === idMeal);
}

/**
 * Save recent search query (max 5 stored)
 * @param {string} query
 */
export function saveRecentSearch(query) {
  if (!query || typeof query !== "string") return;
  const clean = query.trim().toLowerCase();
  if (!clean) return;
  try {
    const recent = getRecentSearches();
    const filtered = recent.filter((item) => item.toLowerCase() !== clean);
    filtered.unshift(clean);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(filtered.slice(0, 5)));
  } catch (err) {
    console.error("Error saving recent search", err);
  }
}

/**
 * Get recent search queries
 * @returns {Array<string>}
 */
export function getRecentSearches() {
  try {
    const data = localStorage.getItem(RECENT_SEARCHES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
}
