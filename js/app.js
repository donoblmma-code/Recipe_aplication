/**
 * Main application coordinator for Cookly (index.html)
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
  isFavorite,
  saveRecentSearch,
  getRecentSearches
} from "./storage.js";

import {
  renderRecipes,
  renderLoadingSkeletons,
  showToast,
  updateFavoritesBadge
} from "./ui.js";

import { debounce, sanitizeText } from "./utils.js";

/* --------------------------------------------------------------------------
   App State
   -------------------------------------------------------------------------- */
const state = {
  popularRecipes: [],
  searchResults: [],
  categories: [],
  activeCategory: null,
  currentQuery: "",
  loading: false,
  lastSearchAction: null
};

/* --------------------------------------------------------------------------
   DOM Elements Cache
   -------------------------------------------------------------------------- */
const elements = {
  // Search
  searchForm: document.querySelector("#searchForm"),
  searchInput: document.querySelector("#searchInput"),
  searchButton: document.querySelector("#searchButton"),
  tagButtons: document.querySelectorAll(".tag-button"),

  // Search Results Section
  searchResultsSection: document.querySelector("#searchResultsSection"),
  searchQueryDisplay: document.querySelector("#searchQueryDisplay"),
  searchResultsCount: document.querySelector("#searchResultsCount"),
  clearSearchButton: document.querySelector("#clearSearchButton"),
  searchResultsGrid: document.querySelector("#searchResultsGrid"),
  emptyState: document.querySelector("#emptyState"),
  exploreRecipesButton: document.querySelector("#exploreRecipesButton"),
  errorState: document.querySelector("#errorState"),
  retryButton: document.querySelector("#retryButton"),

  // Popular Recipes Section
  popularRecipes: document.querySelector("#popularRecipes"),
  popularRecipesGrid: document.querySelector("#popularRecipesGrid"),
  viewAllRecipesLink: document.querySelector("#viewAllRecipesLink"),

  // Categories
  categoryGrid: document.querySelector("#categoryGrid"),

  // Favorites Preview
  favoritesSection: document.querySelector("#favoritesSection"),
  favoritesPreview: document.querySelector("#favoritesPreview"),

  // Recent Searches
  recentSearchesSection: document.querySelector("#recentSearchesSection"),
  recentSearches: document.querySelector("#recentSearches"),

  // Random Recipe Buttons
  randomRecipeButton: document.querySelector("#randomRecipeButton"),
  randomRecipeButtonMobile: document.querySelector("#randomRecipeButtonMobile"),
  randomRecipeButtonSecondary: document.querySelector("#randomRecipeButtonSecondary"),

  // Header & Mobile Nav
  mobileMenuButton: document.querySelector("#mobileMenuButton"),
  mobileNavigation: document.querySelector("#mobileNavigation"),
  headerFavoritesCount: document.querySelector("#headerFavoritesCount"),

  // Newsletter
  newsletterForm: document.querySelector("#newsletterForm"),
  newsletterEmail: document.querySelector("#newsletterEmail"),

  // Footer & Misc
  currentYear: document.querySelector("#currentYear"),
  liveRegion: document.querySelector("#liveRegion")
};

/* --------------------------------------------------------------------------
   Helper Functions
   -------------------------------------------------------------------------- */
function getFavoriteIdsSet() {
  return new Set(getFavorites().map((f) => f.idMeal));
}

function syncFavorites() {
  const favs = getFavorites();
  updateFavoritesBadge(favs.length);

  // Update mobile badge if present
  document.querySelectorAll(".mobile-fav-badge").forEach((badge) => {
    badge.textContent = String(favs.length);
    badge.style.display = favs.length > 0 ? "inline-block" : "none";
  });

  renderFavoritesPreview();
}

function announceLive(message) {
  if (elements.liveRegion) {
    elements.liveRegion.textContent = message;
  }
}

/* --------------------------------------------------------------------------
   Favorites Preview Rendering
   -------------------------------------------------------------------------- */
function renderFavoritesPreview() {
  if (!elements.favoritesPreview) return;

  const favs = getFavorites();
  if (favs.length === 0) {
    elements.favoritesPreview.innerHTML = `
      <div class="empty-favorites-box" style="grid-column: 1 / -1;">
        <p class="empty-favorites-text">You haven't saved any recipes yet.</p>
        <p class="empty-favorites-sub">Click the heart icon on any recipe to save it here for later.</p>
      </div>
    `;
    return;
  }

  // Display top 4 favorites
  const preview = favs.slice(0, 4);
  renderRecipes(preview, elements.favoritesPreview, getFavoriteIdsSet());
}

/* --------------------------------------------------------------------------
   Recent Searches Rendering
   -------------------------------------------------------------------------- */
function renderRecentSearchesList() {
  if (!elements.recentSearches || !elements.recentSearchesSection) return;

  const searches = getRecentSearches();
  if (!searches || searches.length === 0) {
    elements.recentSearchesSection.hidden = true;
    return;
  }

  elements.recentSearchesSection.hidden = false;
  elements.recentSearches.innerHTML = searches
    .map(
      (term) => `
      <button type="button" class="recent-search-chip" data-recent="${sanitizeText(term)}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 14 14"></polyline>
        </svg>
        <span>${sanitizeText(term)}</span>
      </button>
    `
    )
    .join("");
}

/* --------------------------------------------------------------------------
   Popular Recipes Loading
   -------------------------------------------------------------------------- */
async function loadPopularRecipes() {
  if (!elements.popularRecipesGrid) return;
  renderLoadingSkeletons(elements.popularRecipesGrid, 4);

  try {
    // Fetch a curated set of top popular dishes
    const meals = await searchRecipes("chicken");
    state.popularRecipes = (meals || []).slice(0, 4);

    if (state.popularRecipes.length > 0) {
      renderRecipes(state.popularRecipes, elements.popularRecipesGrid, getFavoriteIdsSet(), "Popular");
    }
  } catch (err) {
    console.warn("Could not fetch popular recipes, keeping defaults:", err);
  }
}

/* --------------------------------------------------------------------------
   Search & Filter Execution
   -------------------------------------------------------------------------- */
async function executeSearch(query) {
  if (!query || !query.trim()) return;
  const clean = query.trim();

  state.currentQuery = clean;
  state.lastSearchAction = () => executeSearch(clean);
  saveRecentSearch(clean);
  renderRecentSearchesList();

  // Reveal search results section and hide other states
  if (elements.searchResultsSection) elements.searchResultsSection.hidden = false;
  if (elements.emptyState) elements.emptyState.hidden = true;
  if (elements.errorState) elements.errorState.hidden = true;
  if (elements.searchQueryDisplay) elements.searchQueryDisplay.textContent = `"${clean}"`;
  if (elements.searchResultsCount) elements.searchResultsCount.textContent = "Searching recipes...";

  // Render skeletons while loading
  renderLoadingSkeletons(elements.searchResultsGrid, 8);

  // Smooth scroll to search results
  elements.searchResultsSection?.scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    const meals = await searchRecipes(clean);
    state.searchResults = meals || [];

    if (state.searchResults.length === 0) {
      elements.searchResultsGrid.innerHTML = "";
      if (elements.searchResultsCount) elements.searchResultsCount.textContent = "0 recipes found";
      if (elements.emptyState) elements.emptyState.hidden = false;
      announceLive(`No recipes found for ${clean}`);
      return;
    }

    const countText = `${state.searchResults.length} recipe${state.searchResults.length === 1 ? "" : "s"} found`;
    if (elements.searchResultsCount) elements.searchResultsCount.textContent = countText;
    announceLive(countText);

    renderRecipes(state.searchResults, elements.searchResultsGrid, getFavoriteIdsSet());
  } catch (err) {
    console.error("Search failed:", err);
    elements.searchResultsGrid.innerHTML = "";
    if (elements.searchResultsCount) elements.searchResultsCount.textContent = "Error occurred";
    if (elements.errorState) elements.errorState.hidden = false;
    announceLive("Could not load recipes due to network error.");
  }
}

/**
 * Filter recipes by category
 * @param {string} category 
 */
async function executeCategoryFilter(category) {
  if (!category) return;

  state.currentQuery = category;
  state.lastSearchAction = () => executeCategoryFilter(category);

  if (elements.searchResultsSection) elements.searchResultsSection.hidden = false;
  if (elements.emptyState) elements.emptyState.hidden = true;
  if (elements.errorState) elements.errorState.hidden = true;
  if (elements.searchQueryDisplay) elements.searchQueryDisplay.textContent = `Category: ${category}`;
  if (elements.searchResultsCount) elements.searchResultsCount.textContent = "Loading category recipes...";

  renderLoadingSkeletons(elements.searchResultsGrid, 8);
  elements.searchResultsSection?.scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    const meals = await getRecipesByCategory(category);
    state.searchResults = meals || [];

    if (state.searchResults.length === 0) {
      elements.searchResultsGrid.innerHTML = "";
      if (elements.searchResultsCount) elements.searchResultsCount.textContent = "0 recipes found";
      if (elements.emptyState) elements.emptyState.hidden = false;
      return;
    }

    const countText = `${state.searchResults.length} ${category} recipes found`;
    if (elements.searchResultsCount) elements.searchResultsCount.textContent = countText;

    renderRecipes(state.searchResults, elements.searchResultsGrid, getFavoriteIdsSet(), category);
  } catch (err) {
    console.error("Category filter failed:", err);
    elements.searchResultsGrid.innerHTML = "";
    if (elements.errorState) elements.errorState.hidden = false;
  }
}

/**
 * Reset and close search view
 */
function closeSearch() {
  if (elements.searchResultsSection) elements.searchResultsSection.hidden = true;
  if (elements.searchInput) elements.searchInput.value = "";
  state.currentQuery = "";
  elements.popularRecipes?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* --------------------------------------------------------------------------
   Event Listeners
   -------------------------------------------------------------------------- */

// 1. Search Form Submission
if (elements.searchForm) {
  elements.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = elements.searchInput?.value.trim();
    if (val) executeSearch(val);
  });
}

// 2. Debounced search on input (min 3 chars)
if (elements.searchInput) {
  const debounced = debounce((val) => {
    if (val.length >= 3) executeSearch(val);
  }, 450);

  elements.searchInput.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    debounced(val);
  });
}

// 3. Popular search tags
elements.tagButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const term = btn.dataset.search || btn.textContent.trim();
    if (elements.searchInput) elements.searchInput.value = term;
    executeSearch(term);
  });
});

// 4. Category Grid Clicks
if (elements.categoryGrid) {
  elements.categoryGrid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-category]");
    if (!card) return;
    const cat = card.dataset.category;
    if (cat) executeCategoryFilter(cat);
  });
}

// 5. Recent Search Chips
if (elements.recentSearches) {
  elements.recentSearches.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-recent]");
    if (!chip) return;
    const term = chip.dataset.recent;
    if (elements.searchInput) elements.searchInput.value = term;
    executeSearch(term);
  });
}

// 6. Clear Search & Explore Buttons
if (elements.clearSearchButton) {
  elements.clearSearchButton.addEventListener("click", closeSearch);
}
if (elements.exploreRecipesButton) {
  elements.exploreRecipesButton.addEventListener("click", closeSearch);
}

// 7. Retry Button
if (elements.retryButton) {
  elements.retryButton.addEventListener("click", () => {
    if (typeof state.lastSearchAction === "function") {
      state.lastSearchAction();
    } else {
      executeSearch("chicken");
    }
  });
}

// 8. Recipe Card Favorite Action (Delegation)
document.addEventListener("click", (e) => {
  const favBtn = e.target.closest("[data-action='toggle-fav'], .favorite-button, [data-role='favorite']");
  if (!favBtn) return;

  const id = favBtn.dataset.id || favBtn.dataset.recipeId;
  if (!id) return;

  const card = favBtn.closest(".recipe-card");
  const title = card?.querySelector(".recipe-card-title")?.textContent.trim() || "Recipe";
  const img = card?.querySelector(".recipe-card-img, .recipe-card-image")?.src || "";
  const cat = card?.querySelector(".badge-accent, .recipe-card-category")?.textContent.trim() || "Recipe";

  const isFav = isFavorite(id);
  if (isFav) {
    removeFavorite(id);
    favBtn.classList.remove("is-favorite");
    favBtn.setAttribute("aria-pressed", "false");
    showToast(`Removed "${title}" from favorites`, "info");
  } else {
    saveFavorite({
      idMeal: id,
      strMeal: title,
      strMealThumb: img,
      strCategory: cat
    });
    favBtn.classList.add("is-favorite");
    favBtn.setAttribute("aria-pressed", "true");
    showToast(`Saved "${title}" to favorites!`, "success");
  }

  syncFavorites();
});

// 9. Surprise Me (Random Recipe)
async function triggerRandomRecipe(btn) {
  if (btn) btn.disabled = true;
  try {
    const meal = await getRandomRecipe();
    if (meal?.idMeal) {
      window.location.href = `recipe.html?id=${encodeURIComponent(meal.idMeal)}`;
    }
  } catch (err) {
    console.error("Surprise Me error:", err);
    showToast("Could not pick a random recipe right now", "info");
    if (btn) btn.disabled = false;
  }
}

if (elements.randomRecipeButton) {
  elements.randomRecipeButton.addEventListener("click", () => triggerRandomRecipe(elements.randomRecipeButton));
}
if (elements.randomRecipeButtonMobile) {
  elements.randomRecipeButtonMobile.addEventListener("click", () => triggerRandomRecipe(elements.randomRecipeButtonMobile));
}
if (elements.randomRecipeButtonSecondary) {
  elements.randomRecipeButtonSecondary.addEventListener("click", () => triggerRandomRecipe(elements.randomRecipeButtonSecondary));
}

// 10. Mobile Menu Toggle
if (elements.mobileMenuButton && elements.mobileNavigation) {
  elements.mobileMenuButton.addEventListener("click", () => {
    const isHidden = elements.mobileNavigation.hidden;
    elements.mobileNavigation.hidden = !isHidden;
    elements.mobileMenuButton.setAttribute("aria-expanded", String(isHidden));
  });
}

// 11. Newsletter Form
if (elements.newsletterForm) {
  elements.newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = elements.newsletterEmail?.value.trim();
    if (email && email.includes("@")) {
      showToast("Thank you for subscribing to Cookly!", "success");
      elements.newsletterForm.reset();
    } else {
      showToast("Please enter a valid email address.", "info");
    }
  });
}

/* --------------------------------------------------------------------------
   Initialization
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  if (elements.currentYear) {
    elements.currentYear.textContent = String(new Date().getFullYear());
  }
  syncFavorites();
  renderRecentSearchesList();
  loadPopularRecipes();
});
