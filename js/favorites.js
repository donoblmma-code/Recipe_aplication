/**
 * Controller for the favorites page (favorites.html)
 */

import { getRandomRecipe } from "./api.js";

import { getFavorites, removeFavorite } from "./storage.js";

import {
  renderRecipes,
  showToast,
  updateFavoritesBadge
} from "./ui.js";

/* --------------------------------------------------------------------------
   DOM Elements
   -------------------------------------------------------------------------- */
const elements = {
  favoritesGrid: document.querySelector("#favoritesGrid"),
  favoritesCount: document.querySelector("#favoritesCount"),

  // Header & Nav
  randomRecipeButton: document.querySelector("#randomRecipeButton"),
  randomRecipeButtonMobile: document.querySelector("#randomRecipeButtonMobile"),
  mobileMenuButton: document.querySelector("#mobileMenuButton"),
  mobileNavigation: document.querySelector("#mobileNavigation"),
  currentYear: document.querySelector("#currentYear")
};

/* --------------------------------------------------------------------------
   Rendering
   -------------------------------------------------------------------------- */
function renderFavoritesPage() {
  const favs = getFavorites();
  updateFavoritesBadge(favs.length);

  if (elements.favoritesCount) {
    elements.favoritesCount.textContent = `${favs.length} saved recipe${favs.length === 1 ? "" : "s"}`;
  }

  if (!elements.favoritesGrid) return;

  if (favs.length === 0) {
    elements.favoritesGrid.innerHTML = `
      <div class="empty-favorites-box" style="grid-column: 1 / -1;">
        <p class="empty-favorites-text">You haven't saved any recipes yet.</p>
        <p class="empty-favorites-sub">Click the heart icon on any recipe to save it here for later.</p>
      </div>
    `;
    return;
  }

  const favIds = new Set(favs.map((f) => f.idMeal));
  renderRecipes(favs, elements.favoritesGrid, favIds);
}

/* --------------------------------------------------------------------------
   Event Listeners
   -------------------------------------------------------------------------- */

// Every card on this page is a favorite, so the heart button removes it
if (elements.favoritesGrid) {
  elements.favoritesGrid.addEventListener("click", (e) => {
    const favBtn = e.target.closest(".favorite-button");
    if (!favBtn) return;

    const id = favBtn.dataset.id || favBtn.dataset.recipeId;
    if (!id) return;

    const title = favBtn.closest(".recipe-card")?.querySelector(".recipe-card-title")?.textContent.trim() || "Recipe";
    removeFavorite(id);
    showToast(`Removed "${title}" from favorites`, "info");
    renderFavoritesPage();
  });
}

// Surprise Me buttons
async function handleSurpriseMe(e) {
  const btn = e.currentTarget;
  if (btn) btn.disabled = true;

  try {
    const meal = await getRandomRecipe();
    if (meal?.idMeal) {
      window.location.href = `recipe.html?id=${encodeURIComponent(meal.idMeal)}`;
    }
  } catch (err) {
    showToast("Could not pick a random recipe right now", "info");
    if (btn) btn.disabled = false;
  }
}

if (elements.randomRecipeButton) {
  elements.randomRecipeButton.addEventListener("click", handleSurpriseMe);
}
if (elements.randomRecipeButtonMobile) {
  elements.randomRecipeButtonMobile.addEventListener("click", handleSurpriseMe);
}

// Mobile menu toggle
if (elements.mobileMenuButton && elements.mobileNavigation) {
  elements.mobileMenuButton.addEventListener("click", () => {
    const isHidden = elements.mobileNavigation.hidden;
    elements.mobileNavigation.hidden = !isHidden;
    elements.mobileMenuButton.setAttribute("aria-expanded", String(isHidden));
  });
}

// Keep the list in sync when favorites change in another tab
window.addEventListener("storage", renderFavoritesPage);

/* --------------------------------------------------------------------------
   Initialization
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  if (elements.currentYear) {
    elements.currentYear.textContent = String(new Date().getFullYear());
  }
  renderFavoritesPage();
});
