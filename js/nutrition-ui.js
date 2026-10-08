import { estimateNutrition, formatNutrient, NUTRIENTS } from './nutrition.js';
import { t, getCurrentLanguage } from './i18n.js';
import { sanitizeText } from './utils.js';

const state = { meal: null, basis: 'recipe', servings: 1, weights: {} };
let container;

function displayValue(value, unit) {
  return formatNutrient(value === null ? null : value / (state.basis === 'serving' ? state.servings : 1), unit, getCurrentLanguage());
}

function updateValues() {
  const nutrition = estimateNutrition(state.meal, state.weights);
  container.querySelector('#nutritionValues').innerHTML = NUTRIENTS.map(([key, unit]) =>
    '<div class="nutrition-item' + (key === 'sugar' ? ' nutrition-item--sugar' : '') + '"><dt>' + t('nutrition_' + key) + '</dt><dd>' + displayValue(nutrition.totals[key], unit) + '</dd></div>'
  ).join('');
  container.querySelector('#nutritionBasisLabel').textContent = t(state.basis === 'serving' ? 'nutrition_per_serving' : 'nutrition_whole_recipe');
  const status = nutrition.included === 0 ? t('nutrition_unavailable') : nutrition.complete ? t('nutrition_complete', { count: nutrition.total }) : t('nutrition_partial', { count: nutrition.included, total: nutrition.total });
  container.querySelector('#nutritionStatus').textContent = status;
  for (const [id, key, unit] of [["metaSugarText", "sugar", "g"], ["metaCaloriesText", "calories", "kcal"]]) {
    const element = document.getElementById(id);
    if (element) element.textContent = formatNutrient(nutrition.totals[key], unit, getCurrentLanguage());
  }
  const metaStatus = document.getElementById("metaNutritionStatus");
  if (metaStatus) metaStatus.textContent = nutrition.included ? t(nutrition.complete ? "nutrition_meta_estimate" : "nutrition_meta_partial") : t("nutrition_no_data");
  const skipped = nutrition.ingredients.filter(item => !item.food || item.grams === null);
  container.querySelector('#nutritionSkipped').textContent = skipped.length ? t('nutrition_skipped', { ingredients: skipped.map(item => item.ingredient).join(', ') }) : '';
}

export function renderNutritionPanel(meal) {
  container = document.querySelector('#recipeNutrition');
  if (!container) return;
  if (state.meal?.idMeal !== meal.idMeal) {
    state.weights = {};
    state.basis = 'recipe';
    state.servings = 1;
  }
  state.meal = meal;
  const nutrition = estimateNutrition(meal, state.weights);
  container.innerHTML = '<div class="nutrition-header"><div><h2 class="recipe-section-title" id="nutritionHeading">' + t('nutrition_heading') + '</h2><p class="nutrition-basis" id="nutritionBasisLabel"></p></div><span class="badge badge-subtle">' + t('nutrition_estimated') + '</span></div>' +
    '<div class="nutrition-controls"><label>' + t('nutrition_show') + '<select id="nutritionBasis"><option value="recipe"' + (state.basis === 'recipe' ? ' selected' : '') + '>' + t('nutrition_whole_recipe') + '</option><option value="serving"' + (state.basis === 'serving' ? ' selected' : '') + '>' + t('nutrition_per_serving') + '</option></select></label><label for="nutritionServings">' + t('nutrition_servings') + '<input type="number" id="nutritionServings" min="1" max="100" step="1" value="' + state.servings + '"' + (state.basis === 'recipe' ? ' disabled' : '') + '></label></div>' +
    '<dl class="nutrition-grid" id="nutritionValues" aria-live="polite" aria-atomic="true"></dl>' +
    '<p class="nutrition-status" id="nutritionStatus" role="status"></p><p class="nutrition-note" id="nutritionSkipped"></p>' +
    '<details class="nutrition-weights"><summary>' + t('nutrition_adjust_weights') + '</summary><p class="nutrition-note">' + t('nutrition_weight_hint') + '</p><div class="nutrition-weight-list">' + nutrition.ingredients.map(item =>
      '<label class="nutrition-weight-row"><span>' + sanitizeText(item.ingredient) + '<small>' + sanitizeText(item.measure || t('nutrition_no_measure')) + '</small></span><input type="number" min="0" step="any" data-weight-index="' + item.index + '" aria-label="' + sanitizeText(t('nutrition_weight_for', { ingredient: item.ingredient })) + '" value="' + (item.grams === null ? '' : Math.round(item.grams * 100) / 100) + '" placeholder="' + t(item.food ? 'nutrition_enter_grams' : 'nutrition_no_data') + '"' + (item.food ? '' : ' disabled') + '><span>' + t('nutrition_grams') + '</span></label>'
    ).join('') + '</div></details><p class="nutrition-note nutrition-source">' + t('nutrition_note') + ' <a href="https://www.ars.usda.gov/northeast-area/beltsville-md-bhnrc/beltsville-human-nutrition-research-center/methods-and-application-of-food-composition-laboratory/mafcl-site-pages/sr11-sr28/" target="_blank" rel="noopener noreferrer">' + t('nutrition_source') + '</a></p>';
  if (!container.dataset.nutritionBound) {
    container.dataset.nutritionBound = 'true';
    container.addEventListener('change', event => {
      if (event.target.id === 'nutritionBasis') {
        state.basis = event.target.value;
        container.querySelector('#nutritionServings').disabled = state.basis === 'recipe';
        updateValues();
      }
    });
    container.addEventListener('input', event => {
      const input = event.target;
      if (input.id === 'nutritionServings') {
        if (!input.validity.valid || input.value === '') return;
        state.servings = Number(input.value);
        updateValues();
      } else if (input.dataset.weightIndex) {
        if (!input.validity.valid) return;
        if (input.value === '') delete state.weights[input.dataset.weightIndex];
        else state.weights[input.dataset.weightIndex] = Number(input.value);
        updateValues();
      }
    });
  }
  updateValues();
}

export function createNutritionCardHTML(meal) {
  const nutrition = estimateNutrition(meal);
  const link = 'recipe.html?id=' + encodeURIComponent(meal.idMeal) + '#recipeNutrition';
  if (!nutrition.included) return '<a class="recipe-card-nutrition-link" href="' + link + '">' + t('nutrition_view') + '</a>';
  const status = nutrition.complete ? t('nutrition_card_estimate') : t('nutrition_card_partial', { count: nutrition.included, total: nutrition.total });
  return '<div class="recipe-card-nutrition"><span class="recipe-card-nutrition-note">' + status + '</span><div><span>' + t('nutrition_calories') + ': <strong>' + formatNutrient(nutrition.totals.calories, 'kcal', getCurrentLanguage()) + '</strong></span><span>' + t('nutrition_sugar') + ': <strong>' + formatNutrient(nutrition.totals.sugar, 'g', getCurrentLanguage()) + '</strong></span></div><a class="recipe-card-nutrition-link" href="' + link + '">' + t('nutrition_view') + '</a></div>';
}
