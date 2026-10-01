/**
 * API service for fetching recipes from TheMealDB
 */

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function fetchFromApi(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Search recipes by name or term
 * @param {string} query
 * @returns {Promise<Array<object>>}
 */
export async function searchRecipes(query) {
  const cleanQuery = query ? encodeURIComponent(query.trim()) : "";
  const data = await fetchFromApi(`search.php?s=${cleanQuery}`);
  return data.meals || [];
}

/**
 * Lookup full recipe details by meal ID
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export async function getRecipeById(id) {
  if (!id) return null;
  const data = await fetchFromApi(`lookup.php?i=${encodeURIComponent(id.trim())}`);
  return (data.meals && data.meals[0]) || null;
}

/**
 * Fetch a single random recipe
 * @returns {Promise<object|null>}
 */
export async function getRandomRecipe() {
  const data = await fetchFromApi("random.php");
  return (data.meals && data.meals[0]) || null;
}

/**
 * Get all available recipe categories
 * @returns {Promise<Array<object>>}
 */
export async function getCategories() {
  const data = await fetchFromApi("categories.php");
  return data.categories || [];
}

/**
 * Filter recipes by category name
 * @param {string} category
 * @returns {Promise<Array<object>>}
 */
export async function getRecipesByCategory(category) {
  const data = await fetchFromApi(`filter.php?c=${encodeURIComponent(category.trim())}`);
  return data.meals || [];
}

/**
 * Filter recipes by primary ingredient
 * @param {string} ingredient
 * @returns {Promise<Array<object>>}
 */
export async function getRecipesByIngredient(ingredient) {
  const data = await fetchFromApi(`filter.php?i=${encodeURIComponent(ingredient.trim())}`);
  return data.meals || [];
}
