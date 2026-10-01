/**
 * Main application coordinator for the homepage (index.html)
 */

import {
  searchRecipes,
  getCategories,
  getRecipesByCategory,
  getRandomRecipe
} from "./api.js";

import {
  getFavorites,
  saveFavorite,
  removeFavorite,
  isFavorite
} from "./storage.js";

import {
  renderRecipes,
  renderCategories,
  renderLoadingSkeletons,
  renderEmptyState,
  renderError,
  showToast,
  updateFavoritesBadge
} from "./ui.js";

import { debounce } from "./utils.js";

/* --------------------------------------------------------------------------
   App State
   -------------------------------------------------------------------------- */
const state = {
  recipes: [],
  categories: [],
  activeCategory: "All",
  searchQuery: "",
  loading: false,
  lastAction: null
};

/* --------------------------------------------------------------------------
   DOM Elements Cache
   -------------------------------------------------------------------------- */
const elements = {
  recipeGrid: document.querySelector("#recipeGrid"),
  categoryChips: document.querySelector("#categoryChips"),
  searchForm: document.querySelector("#searchForm"),
  searchInput: document.querySelector("#searchInput"),
  searchClearBtn: document.querySelector("#searchClearBtn"),
  randomRecipeBtn: document.querySelector("#randomRecipeBtn"),
  mobileMenuBtn: document.querySelector("#mobileMenuBtn"),
  primaryNav: document.querySelector("#primaryNav"),
  quickTags: document.querySelectorAll(".quick-tag-btn"),
  resultsHeading: document.querySelector("#resultsHeading"),
  resultsCount: document.querySelector("#resultsCount")
};

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */
function getFavoriteIdsSet() {
  return new Set(getFavorites().map((f) => f.idMeal));
}

function syncFavoritesBadge() {
  updateFavoritesBadge(getFavorites().length);
}

/* --------------------------------------------------------------------------
   Data Loading
   -------------------------------------------------------------------------- */
async function loadCategories() {
  try {
    const categories = await getCategories();
    const popular = ["Chicken", "Beef", "Seafood", "Pasta", "Dessert", "Vegetarian", "Breakfast", "Pork"];
    const filtered = categories.filter((c) => popular.includes(c.strCategory));
    state.categories = filtered.length ? filtered : categories.slice(0, 8);
    renderCategories(state.categories, elements.categoryChips, state.activeCategory);
  } catch (err) {
    console.warn("Could not load categories:", err);
  }
}

async function fetchAndDisplayRecipes(param, type = "query") {
  state.loading = true;
  state.lastAction = () => fetchAndDisplayRecipes(param, type);

  if (elements.resultsHeading) {
    elements.resultsHeading.textContent =
      type === "category"
        ? param === "All" ? "All Popular Recipes" : `${param} Recipes`
        : param ? `Results for "${param}"` : "Explore Recipes";
  }

  if (elements.resultsCount) {
    elements.resultsCount.textContent = "Loading recipes...";
  }

  renderLoadingSkeletons(elements.recipeGrid, 8);

  try {
    let meals = [];

    if (type === "category") {
      meals = param === "All" ? await searchRecipes("") : await getRecipesByCategory(param);
    } else {
      meals = await searchRecipes(param);
    }

    state.recipes = meals || [];
    state.loading = false;

    if (elements.resultsCount) {
      elements.resultsCount.textContent = state.recipes.length
        ? `${state.recipes.length} recipe${state.recipes.length === 1 ? "" : "s"} found`
        : "0 recipes found";
    }

    if (state.recipes.length === 0) {
      renderEmptyState(elements.recipeGrid, `No recipes found for "${param}".`);
      return;
    }

    renderRecipes(state.recipes, elements.recipeGrid, getFavoriteIdsSet(), state.activeCategory || "");
  } catch (err) {
    state.loading = false;
    console.error("Failed to fetch recipes:", err);
    if (elements.resultsCount) elements.resultsCount.textContent = "Error loading recipes";
    renderError(elements.recipeGrid, "We couldn't connect to the recipe server. Please check your internet connection.");
  }
}

/* --------------------------------------------------------------------------
   Event Listeners
   -------------------------------------------------------------------------- */

// Search form submit
if (elements.searchForm) {
  elements.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = elements.searchInput.value.trim();
    if (!query) return;
    state.searchQuery = query;
    state.activeCategory = null;
    renderCategories(state.categories, elements.categoryChips, null);
    fetchAndDisplayRecipes(query, "query");
    elements.recipeGrid?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// Debounced live search
if (elements.searchInput) {
  const debouncedSearch = debounce((query) => {
    if (query.length >= 2) {
      state.searchQuery = query;
      state.activeCategory = null;
      renderCategories(state.categories, elements.categoryChips, null);
      fetchAndDisplayRecipes(query, "query");
    }
  }, 400);

  elements.searchInput.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    elements.searchClearBtn?.classList.toggle("is-visible", val.length > 0);
    debouncedSearch(val);
  });
}

// Clear search
if (elements.searchClearBtn) {
  elements.searchClearBtn.addEventListener("click", () => {
    elements.searchInput.value = "";
    elements.searchClearBtn.classList.remove("is-visible");
    elements.searchInput.focus();
    state.searchQuery = "";
    state.activeCategory = "All";
    renderCategories(state.categories, elements.categoryChips, "All");
    fetchAndDisplayRecipes("All", "category");
  });
}

// Category chip clicks (delegation)
if (elements.categoryChips) {
  elements.categoryChips.addEventListener("click", (e) => {
    const chip = e.target.closest(".category-chip");
    if (!chip) return;
    const category = chip.dataset.category;
    state.activeCategory = category;
    state.searchQuery = "";
    if (elements.searchInput) elements.searchInput.value = "";
    elements.searchClearBtn?.classList.remove("is-visible");
    renderCategories(state.categories, elements.categoryChips, category);
    fetchAndDisplayRecipes(category, "category");
  });
}

// Quick tag buttons
elements.quickTags.forEach((btn) => {
  btn.addEventListener("click", () => {
    const term = btn.dataset.tag || btn.textContent.trim();
    if (elements.searchInput) {
      elements.searchInput.value = term;
      elements.searchClearBtn?.classList.add("is-visible");
    }
    state.searchQuery = term;
    state.activeCategory = null;
    renderCategories(state.categories, elements.categoryChips, null);
    fetchAndDisplayRecipes(term, "query");
    elements.recipeGrid?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Recipe grid interaction — favorites, retry, reset (delegation)
if (elements.recipeGrid) {
  elements.recipeGrid.addEventListener("click", (e) => {
    // Retry
    const retryBtn = e.target.closest("#retryActionBtn");
    if (retryBtn) {
      state.lastAction ? state.lastAction() : fetchAndDisplayRecipes("Chicken", "category");
      return;
    }

    // Reset filters
    const resetBtn = e.target.closest("#resetFiltersBtn");
    if (resetBtn) {
      if (elements.searchInput) elements.searchInput.value = "";
      elements.searchClearBtn?.classList.remove("is-visible");
      state.searchQuery = "";
      state.activeCategory = "All";
      renderCategories(state.categories, elements.categoryChips, "All");
      fetchAndDisplayRecipes("All", "category");
      return;
    }

    // Toggle favorite
    const favBtn = e.target.closest("[data-action='toggle-fav']");
    if (!favBtn) return;

    const id = favBtn.dataset.id;
    const recipe = state.recipes.find((r) => r.idMeal === id);
    if (!recipe) return;

    if (isFavorite(id)) {
      removeFavorite(id);
      favBtn.classList.remove("is-favorite");
      favBtn.setAttribute("aria-label", `Add ${recipe.strMeal} to favorites`);
      favBtn.title = "Save to favorites";
      showToast(`Removed "${recipe.strMeal}" from favorites`, "info");
    } else {
      saveFavorite(recipe);
      favBtn.classList.add("is-favorite");
      favBtn.setAttribute("aria-label", `Remove ${recipe.strMeal} from favorites`);
      favBtn.title = "Remove from favorites";
      showToast(`Saved "${recipe.strMeal}" to favorites`, "success");
    }

    syncFavoritesBadge();
  });
}

// Random recipe
if (elements.randomRecipeBtn) {
  elements.randomRecipeBtn.addEventListener("click", async () => {
    const btn = elements.randomRecipeBtn;
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span>Picking...</span>`;

    try {
      const meal = await getRandomRecipe();
      btn.disabled = false;
      btn.innerHTML = originalHTML;

      if (meal?.idMeal) {
        window.location.href = `recipe.html?id=${encodeURIComponent(meal.idMeal)}`;
      } else {
        showToast("Could not pick a random recipe right now", "info");
      }
    } catch (err) {
      console.error("Random recipe error:", err);
      btn.disabled = false;
      btn.innerHTML = originalHTML;
      showToast("Network error picking random recipe", "info");
    }
  });
}

// Mobile nav toggle
if (elements.mobileMenuBtn && elements.primaryNav) {
  elements.mobileMenuBtn.addEventListener("click", () => {
    const isOpen = elements.primaryNav.classList.toggle("is-open");
    elements.mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

/* --------------------------------------------------------------------------
   Initialize
   -------------------------------------------------------------------------- */
async function initApp() {
  syncFavoritesBadge();
  await loadCategories();
  fetchAndDisplayRecipes("Chicken", "category");
}

document.addEventListener("DOMContentLoaded", initApp);
