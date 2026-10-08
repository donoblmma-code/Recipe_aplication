/**
 * UI Rendering and DOM manipulation module
 */

import { createNutritionCardHTML } from "./nutrition-ui.js";
import { truncateText, sanitizeText } from "./utils.js";
import { t, translateCategory, translateArea } from "./i18n.js";

const PREVIEW_SUFFIX = "/preview";

const SVG_HEART = `
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
`;

/**
 * Render a single recipe card as HTML string
 * @param {object} recipe
 * @param {boolean} isFav
 * @param {string} fallbackCategory
 * @returns {string}
 */
export function createRecipeCardHTML(recipe, isFav = false, fallbackCategory = "") {
  const title = sanitizeText(recipe.strMeal);
  const rawCategory = recipe.strCategory || fallbackCategory || "Recipe";
  const categoryDisplay = sanitizeText(translateCategory(rawCategory));
  const rawArea = recipe.strArea ? sanitizeText(recipe.strArea) : "";
  const areaDisplay = rawArea ? sanitizeText(translateArea(rawArea)) : "";
  const thumb = recipe.strMealThumb;
  // Favorites saved from a card already store the preview URL.
  const image = thumb
    ? (thumb.endsWith(PREVIEW_SUFFIX) ? thumb : `${thumb}${PREVIEW_SUFFIX}`)
    : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' fill='%23ece7df'%3E%3Crect width='100%25' height='100%25'/%3E%3C/svg%3E";

  const favAriaLabel = isFav
    ? t("remove_from_favorites_aria", { title })
    : t("add_to_favorites_aria", { title });
  const favTitle = isFav ? t("remove_from_favorites") : t("save_to_favorites");
  const viewRecipeAria = t("view_recipe_for", { title });
  const viewRecipeText = t("view_recipe");

  return `
    <article class="recipe-card" data-recipe-id="${recipe.idMeal}" data-id="${recipe.idMeal}">
      <div class="recipe-card-image-wrapper recipe-card-media">
        <img
          src="${image}"
          alt="${title}"
          class="recipe-card-image recipe-card-img"
          loading="lazy"
          width="400"
          height="300"
          onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22 fill=%22%23ece7df%22%3E%3Crect width=%22100%25%22 height=%22100%25%22/%3E%3C/svg%3E'"
        >
        <button
          type="button"
          class="favorite-button recipe-card-fav-btn ${isFav ? "is-favorite" : ""}"
          data-action="toggle-fav"
          data-role="favorite"
          data-id="${recipe.idMeal}"
          data-recipe-id="${recipe.idMeal}"
          aria-label="${favAriaLabel}"
          aria-pressed="${isFav ? "true" : "false"}"
          title="${favTitle}"
        >
          <span class="favorite-icon" aria-hidden="true">
            ${SVG_HEART}
          </span>
        </button>
      </div>
      <div class="recipe-card-content recipe-card-body">
        <div class="recipe-card-meta">
          <span class="recipe-card-category badge badge-accent">${categoryDisplay}</span>
          ${areaDisplay ? `<span class="recipe-card-area badge badge-subtle">${areaDisplay}</span>` : ""}
        </div>
        <h3 class="recipe-card-title" title="${title}">
          ${truncateText(title, 48)}
        </h3>
        ${createNutritionCardHTML(recipe)}
        <div class="recipe-card-footer">
          <a
            href="recipe.html?id=${encodeURIComponent(recipe.idMeal)}"
            class="btn btn-secondary recipe-card-link"
            aria-label="${viewRecipeAria}"
          >
            <span>${viewRecipeText}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Render an array of recipes into a container element
 * @param {Array<object>} recipes
 * @param {HTMLElement} container
 * @param {Set<string>} favoriteIds
 * @param {string} currentCategory
 */
export function renderRecipes(recipes, container, favoriteIds = new Set(), currentCategory = "") {
  if (!container) return;
  if (!recipes || recipes.length === 0) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = recipes
    .map((recipe) => createRecipeCardHTML(recipe, favoriteIds.has(recipe.idMeal), currentCategory))
    .join("");
}

/**
 * Render category filter chips into a container
 * @param {Array<object>} categories
 * @param {HTMLElement} container
 * @param {string} activeCategory
 */
export function renderCategories(categories, container, activeCategory = "All") {
  if (!container) return;

  const allChip = `
    <button
      type="button"
      class="category-chip ${activeCategory === "All" ? "active" : ""}"
      data-category="All"
      role="tab"
      aria-selected="${activeCategory === "All"}"
    >
      ${t("all_recipes")}
    </button>
  `;

  const chips = (categories || [])
    .map((cat) => {
      const name = sanitizeText(cat.strCategory);
      const translatedName = sanitizeText(translateCategory(cat.strCategory));
      const isActive = activeCategory && activeCategory.toLowerCase() === name.toLowerCase();
      return `
        <button
          type="button"
          class="category-chip ${isActive ? "active" : ""}"
          data-category="${name}"
          role="tab"
          aria-selected="${isActive}"
        >
          ${translatedName}
        </button>
      `;
    })
    .join("");

  container.innerHTML = allChip + chips;
}

/**
 * Render shimmer skeleton cards while loading
 * @param {HTMLElement} container
 * @param {number} count
 */
export function renderLoadingSkeletons(container, count = 8) {
  if (!container) return;
  container.innerHTML = Array.from({ length: count })
    .map(
      () => `
      <div class="recipe-card recipe-card--skeleton" aria-hidden="true">
        <div class="skeleton-media"></div>
        <div class="skeleton-body">
          <div class="skeleton-line w-40"></div>
          <div class="skeleton-line w-90"></div>
          <div class="skeleton-line w-75"></div>
          <div class="skeleton-line h-btn"></div>
        </div>
      </div>
    `
    )
    .join("");
}

/**
 * Show a toast notification
 * @param {string} message
 * @param {"success"|"info"} type
 */
export function showToast(message, type = "info") {
  let container = document.querySelector("#toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${
          type === "success"
            ? '<polyline points="20 6 9 17 4 12"></polyline>'
            : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'
        }
      </svg>
    </span>
    <span class="toast-message">${sanitizeText(message)}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/**
 * Update the favorites count badge in the header
 * @param {number} count
 */
export function updateFavoritesBadge(count) {
  const badges = document.querySelectorAll(
    "#headerFavoritesCount, .favorites-count-badge, .mobile-fav-badge"
  );
  badges.forEach((badge) => {
    badge.textContent = String(count);
    badge.style.display = count > 0 ? "inline-block" : "none";
  });
}
