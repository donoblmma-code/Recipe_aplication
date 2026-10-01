/**
 * Controller for the recipe details page (recipe.html)
 */

import {
  getRecipeById,
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
  createRecipeCardHTML,
  showToast,
  updateFavoritesBadge
} from "./ui.js";

import {
  getQueryParameter,
  sanitizeText
} from "./utils.js";

/* --------------------------------------------------------------------------
   State
   -------------------------------------------------------------------------- */
let currentRecipe = null;
const recipeId = getQueryParameter("id");

/* --------------------------------------------------------------------------
   DOM Elements
   -------------------------------------------------------------------------- */
const elements = {
  recipeSkeleton: document.querySelector("#recipeSkeleton"),
  recipeArticle: document.querySelector("#recipeArticle"),
  recipeErrorState: document.querySelector("#recipeErrorState"),
  recipeErrorMessage: document.querySelector("#recipeErrorMessage"),
  retryRecipeBtn: document.querySelector("#retryRecipeBtn"),

  // Recipe details
  recipeTitle: document.querySelector("#recipeTitle"),
  recipeImage: document.querySelector("#recipeImage"),
  recipeCategory: document.querySelector("#recipeCategory"),
  recipeArea: document.querySelector("#recipeArea"),
  metaCategoryText: document.querySelector("#metaCategoryText"),
  metaAreaText: document.querySelector("#metaAreaText"),
  ingredientsCount: document.querySelector("#ingredientsCount"),
  recipeIngredientsList: document.querySelector("#recipeIngredientsList"),
  recipeInstructions: document.querySelector("#recipeInstructions"),

  // Actions
  recipeFavoriteBtn: document.querySelector("#recipeFavoriteBtn"),
  heroFavoriteActionBtn: document.querySelector("#heroFavoriteActionBtn"),
  heroFavoriteBtnText: document.querySelector("#heroFavoriteBtnText"),
  recipeYoutubeBtn: document.querySelector("#recipeYoutubeBtn"),
  recipeSourceBtn: document.querySelector("#recipeSourceBtn"),

  // Video Section
  recipeVideoSection: document.querySelector("#recipeVideoSection"),
  recipeVideoFrame: document.querySelector("#recipeVideoFrame"),

  // Similar Recipes
  similarRecipesSection: document.querySelector("#similarRecipesSection"),
  similarCategoryName: document.querySelector("#similarCategoryName"),
  similarRecipesGrid: document.querySelector("#similarRecipesGrid"),

  // Header & Nav
  randomRecipeButton: document.querySelector("#randomRecipeButton"),
  randomRecipeButtonMobile: document.querySelector("#randomRecipeButtonMobile"),
  mobileMenuButton: document.querySelector("#mobileMenuButton"),
  mobileNavigation: document.querySelector("#mobileNavigation"),
  currentYear: document.querySelector("#currentYear")
};

/* --------------------------------------------------------------------------
   Helper Functions
   -------------------------------------------------------------------------- */
function syncFavoritesUI() {
  const count = getFavorites().length;
  updateFavoritesBadge(count);

  if (currentRecipe) {
    const favorited = isFavorite(currentRecipe.idMeal);

    if (elements.recipeFavoriteBtn) {
      elements.recipeFavoriteBtn.classList.toggle("is-favorite", favorited);
      elements.recipeFavoriteBtn.setAttribute("aria-pressed", String(favorited));
      elements.recipeFavoriteBtn.setAttribute(
        "aria-label",
        favorited ? "Remove from favorites" : "Add to favorites"
      );
    }

    if (elements.heroFavoriteActionBtn && elements.heroFavoriteBtnText) {
      if (favorited) {
        elements.heroFavoriteActionBtn.classList.add("btn-favorited");
        elements.heroFavoriteBtnText.textContent = "Saved to Favorites";
      } else {
        elements.heroFavoriteActionBtn.classList.remove("btn-favorited");
        elements.heroFavoriteBtnText.textContent = "Save to Favorites";
      }
    }
  }
}

/**
 * Toggle favorite state for the currently displayed recipe
 */
function handleFavoriteToggle() {
  if (!currentRecipe) return;

  const id = currentRecipe.idMeal;
  const currentlyFavorite = isFavorite(id);

  if (currentlyFavorite) {
    removeFavorite(id);
    showToast(`Removed "${currentRecipe.strMeal}" from favorites`, "info");
  } else {
    saveFavorite(currentRecipe);
    showToast(`Saved "${currentRecipe.strMeal}" to favorites!`, "success");
  }

  syncFavoritesUI();
}

/**
 * Parse ingredients & measurements from TheMealDB object
 * @param {object} meal 
 * @returns {Array<{ ingredient: string, measure: string }>}
 */
function extractIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      list.push({
        ingredient: ing.trim(),
        measure: measure ? measure.trim() : ""
      });
    }
  }
  return list;
}

/**
 * Extract YouTube embed URL from standard YouTube link
 * @param {string} url 
 * @returns {string|null}
 */
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube-nocookie.com/embed/${match[2]}`;
    }
    return null;
  } catch (err) {
    return null;
  }
}

/* --------------------------------------------------------------------------
   Load Recipe Details
   -------------------------------------------------------------------------- */
async function loadRecipeDetails() {
  if (!recipeId) {
    showError("No recipe specified. Please choose a recipe from the homepage.");
    return;
  }

  // Show loading skeleton
  if (elements.recipeSkeleton) elements.recipeSkeleton.hidden = false;
  if (elements.recipeArticle) elements.recipeArticle.hidden = true;
  if (elements.recipeErrorState) elements.recipeErrorState.hidden = true;

  try {
    const meal = await getRecipeById(recipeId);

    if (!meal) {
      showError("Recipe not found. It may have been removed or the ID is invalid.");
      return;
    }

    currentRecipe = meal;
    renderRecipePage(meal);

    // Fetch similar category recipes in background
    if (meal.strCategory) {
      loadSimilarRecipes(meal.strCategory, meal.idMeal);
    }
  } catch (error) {
    console.error("Failed to load recipe details", error);
    showError("Could not load the recipe. Please check your internet connection.");
  }
}

/**
 * Render the full recipe data into DOM
 * @param {object} meal 
 */
function renderRecipePage(meal) {
  document.title = `${meal.strMeal} — Cookly`;

  // Title, Image & Tags
  if (elements.recipeTitle) elements.recipeTitle.textContent = meal.strMeal;

  if (elements.recipeImage) {
    elements.recipeImage.src = meal.strMealThumb;
    elements.recipeImage.alt = meal.strMeal;
    elements.recipeImage.onerror = () => {
      elements.recipeImage.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450' fill='%23ece7df'%3E%3Crect width='100%25' height='100%25'/%3E%3C/svg%3E";
    };
  }

  const category = meal.strCategory || "Recipe";
  const area = meal.strArea || "International";

  if (elements.recipeCategory) elements.recipeCategory.textContent = category;
  if (elements.recipeArea) elements.recipeArea.textContent = area;
  if (elements.metaCategoryText) elements.metaCategoryText.textContent = category;
  if (elements.metaAreaText) elements.metaAreaText.textContent = area;

  // Render Ingredients Checklist
  const ingredients = extractIngredients(meal);
  if (elements.ingredientsCount) {
    elements.ingredientsCount.textContent = `${ingredients.length} items`;
  }

  if (elements.recipeIngredientsList) {
    elements.recipeIngredientsList.innerHTML = ingredients
      .map((item, index) => {
        const id = `ingredient-${index}`;
        const ingName = sanitizeText(item.ingredient);
        const measure = sanitizeText(item.measure);
        const thumbUrl = `https://www.themealdb.com/images/ingredients/${encodeURIComponent(item.ingredient)}-Small.png`;

        return `
          <li class="ingredient-item">
            <label class="ingredient-checkbox-label" for="${id}">
              <input type="checkbox" id="${id}" class="ingredient-checkbox">
              <span class="custom-checkbox" aria-hidden="true"></span>
              <img src="${thumbUrl}" alt="" class="ingredient-thumb" loading="lazy" onerror="this.style.display='none'">
              <span class="ingredient-details">
                ${measure ? `<strong class="ingredient-measure">${measure}</strong>` : ""}
                <span class="ingredient-name">${ingName}</span>
              </span>
            </label>
          </li>
        `;
      })
      .join("");
  }

  // Render Instructions Steps
  if (elements.recipeInstructions) {
    const rawText = meal.strInstructions || "";
    // Split by double newline or line breaks
    const steps = rawText
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.toLowerCase().startsWith("step"));

    // If splitting gives too few items, split by sentences
    const cleanSteps = steps.length > 1 ? steps : rawText.split(/(?<=[.!?])\s+/).filter(Boolean);

    elements.recipeInstructions.innerHTML = cleanSteps
      .map((step, idx) => {
        return `
          <div class="instruction-step">
            <div class="step-badge" aria-hidden="true">${idx + 1}</div>
            <div class="step-text">
              <p>${sanitizeText(step)}</p>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // YouTube Link & Embedded Player
  const embedUrl = getYouTubeEmbedUrl(meal.strYoutube);
  if (embedUrl && elements.recipeVideoFrame && elements.recipeVideoSection) {
    elements.recipeVideoFrame.src = embedUrl;
    elements.recipeVideoSection.style.display = "block";
  }

  if (meal.strYoutube && elements.recipeYoutubeBtn) {
    elements.recipeYoutubeBtn.href = meal.strYoutube;
    elements.recipeYoutubeBtn.style.display = "inline-flex";
  }

  // Original Source Link
  if (meal.strSource && elements.recipeSourceBtn) {
    elements.recipeSourceBtn.href = meal.strSource;
    elements.recipeSourceBtn.style.display = "inline-flex";
  }

  // Sync favorites UI
  syncFavoritesUI();

  // Show content
  if (elements.recipeSkeleton) elements.recipeSkeleton.hidden = true;
  if (elements.recipeArticle) elements.recipeArticle.hidden = false;
}

/**
 * Fetch and display similar recipes in the same category
 * @param {string} category 
 * @param {string} currentId 
 */
async function loadSimilarRecipes(category, currentId) {
  try {
    const meals = await getRecipesByCategory(category);
    // Exclude current meal and take top 4
    const filtered = (meals || []).filter((m) => m.idMeal !== currentId).slice(0, 4);

    if (filtered.length > 0 && elements.similarRecipesSection && elements.similarRecipesGrid) {
      if (elements.similarCategoryName) {
        elements.similarCategoryName.textContent = category;
      }

      const favIds = new Set(getFavorites().map((f) => f.idMeal));
      elements.similarRecipesGrid.innerHTML = filtered
        .map((m) => createRecipeCardHTML(m, favIds.has(m.idMeal), category))
        .join("");

      elements.similarRecipesSection.style.display = "block";
    }
  } catch (err) {
    console.warn("Could not load similar recipes:", err);
  }
}

/**
 * Display error state
 * @param {string} message 
 */
function showError(message) {
  if (elements.recipeSkeleton) elements.recipeSkeleton.hidden = true;
  if (elements.recipeArticle) elements.recipeArticle.hidden = true;
  if (elements.recipeErrorState) {
    elements.recipeErrorState.hidden = false;
    if (elements.recipeErrorMessage) {
      elements.recipeErrorMessage.textContent = message;
    }
  }
}

/* --------------------------------------------------------------------------
   Event Listeners
   -------------------------------------------------------------------------- */

// Favorite button clicks
if (elements.recipeFavoriteBtn) {
  elements.recipeFavoriteBtn.addEventListener("click", handleFavoriteToggle);
}

if (elements.heroFavoriteActionBtn) {
  elements.heroFavoriteActionBtn.addEventListener("click", handleFavoriteToggle);
}

// Similar recipes grid favorite toggle (delegation)
if (elements.similarRecipesGrid) {
  elements.similarRecipesGrid.addEventListener("click", (e) => {
    const favBtn = e.target.closest("[data-action='toggle-fav'], .favorite-button");
    if (!favBtn) return;

    const id = favBtn.dataset.id || favBtn.dataset.recipeId;
    if (!id) return;

    const isFav = isFavorite(id);
    const card = favBtn.closest(".recipe-card");
    const title = card ? card.querySelector(".recipe-card-title")?.textContent.trim() : "Recipe";

    if (isFav) {
      removeFavorite(id);
      favBtn.classList.remove("is-favorite");
      favBtn.setAttribute("aria-pressed", "false");
      showToast(`Removed "${title}" from favorites`, "info");
    } else {
      const img = card?.querySelector(".recipe-card-img")?.src;
      saveFavorite({
        idMeal: id,
        strMeal: title,
        strMealThumb: img,
        strCategory: elements.recipeCategory?.textContent || "Recipe"
      });
      favBtn.classList.add("is-favorite");
      favBtn.setAttribute("aria-pressed", "true");
      showToast(`Saved "${title}" to favorites!`, "success");
    }

    syncFavoritesUI();
  });
}

// Retry button
if (elements.retryRecipeBtn) {
  elements.retryRecipeBtn.addEventListener("click", loadRecipeDetails);
}

// Surprise Me buttons
async function handleSurpriseMe() {
  const btn = elements.randomRecipeButton;
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

/* --------------------------------------------------------------------------
   Initialization
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  if (elements.currentYear) {
    elements.currentYear.textContent = String(new Date().getFullYear());
  }
  syncFavoritesUI();
  loadRecipeDetails();
});
