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

import {
  initI18n,
  onLanguageChange,
  t
} from "./i18n.js";

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
    if (favs.length === 0) {
      elements.favoritesCount.textContent = t("favorites_count_zero");
    } else if (favs.length === 1) {
      elements.favoritesCount.textContent = t("favorites_count_single");
    } else {
      elements.favoritesCount.textContent = t("favorites_count_text", { count: favs.length });
    }
  }

  if (!elements.favoritesGrid) return;

  if (favs.length === 0) {
    elements.favoritesGrid.innerHTML = `
      <div class="empty-favorites-box" style="grid-column: 1 / -1;">
        <p class="empty-favorites-text">${t("empty_favorites_title")}</p>
        <p class="empty-favorites-sub">${t("empty_favorites_desc")}</p>
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

    const title = favBtn.closest(".recipe-card")?.querySelector(".recipe-card-title")?.textContent.trim() || t("recipe_default_category");
    removeFavorite(id);
    showToast(t("toast_removed_fav", { title }), "info");
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
    showToast(t("toast_random_error"), "info");
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

// Re-render when language changes
onLanguageChange(() => {
  renderFavoritesPage();
});

/* --------------------------------------------------------------------------
   Initialization
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initI18n();

  if (elements.currentYear) {
    elements.currentYear.textContent = String(new Date().getFullYear());
  }
  renderFavoritesPage();
});
