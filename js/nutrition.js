/** Ingredient-based nutrition estimates; recipe totals use edible ingredient weights. */
import { FOOD_DATA, FOOD_ALIASES } from './nutrition-data.js';

export const NUTRIENTS = [
  ['calories', 'kcal'], ['sugar', 'g'], ['protein', 'g'], ['carbs', 'g'],
  ['fat', 'g'], ['saturatedFat', 'g'], ['fiber', 'g'], ['sodium', 'mg'], ['cholesterol', 'mg']
];

const FRACTIONS = { '¼': '1/4', '½': '1/2', '¾': '3/4', '⅓': '1/3', '⅔': '2/3', '⅛': '1/8', '⅜': '3/8', '⅝': '5/8', '⅞': '7/8' };
const MASS = { g: 1, gram: 1, grams: 1, kg: 1000, kilogram: 1000, kilograms: 1000, oz: 28.349523125, ounce: 28.349523125, ounces: 28.349523125, lb: 453.59237, lbs: 453.59237, pound: 453.59237, pounds: 453.59237 };
const VOLUME = { tsp: 1 / 48, teaspoon: 1 / 48, teaspoons: 1 / 48, tbsp: 1 / 16, tbs: 1 / 16, tblsp: 1 / 16, tablespoon: 1 / 16, tablespoons: 1 / 16, cup: 1, cups: 1, ml: 1 / 240, milliliter: 1 / 240, milliliters: 1 / 240, millilitre: 1 / 240, millilitres: 1 / 240, l: 1000 / 240, liter: 1000 / 240, litre: 1000 / 240 };
const PREPARATION = /^(?:,?\s*(?:finely |roughly )?(?:chopped|diced|sliced|minced|grated|crushed|beaten|peeled|sifted|melted|softened|drained|fresh|dried|packed|heaped|level|small|medium|large|whole|pieces?|cloves?|(?:leaf|leaves)|eggs?|onions?|carrots?|potatoes?|tomatoes?|breasts?))*$/;

export function getIngredients(meal) {
  const result = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal?.['strIngredient' + i]?.trim();
    if (name) result.push({ index: i, ingredient: name, measure: meal['strMeasure' + i]?.trim() || '' });
  }
  return result;
}

export function matchFood(name) {
  const match = FOOD_ALIASES[String(name).trim().toLowerCase()];
  return match ? { ...FOOD_DATA[match.id], ...match } : null;
}

function portionWeight(food, pattern) {
  const portion = food.portions.find(([, label]) => pattern.test(label.toLowerCase()));
  return portion ? portion[2] / portion[0] : null;
}

/** Ambiguous amounts (ranges, handfuls, to taste, unspecified tins) remain unknown. */
export function measureToGrams(measure, food) {
  if (!food || !measure) return null;
  let text = String(measure).toLowerCase().trim().replace(/[¼½¾⅓⅔⅛⅜⅝⅞]/g, c => ' ' + FRACTIONS[c]).replace(/\s+/g, ' ').replace(/(\d),(\d)/g, '$1.$2').trim();
  if (/(\d\s*[-–]\s*\d)|\b(to taste|pinch|handful|dash|or|plus|divided)\b|\+/.test(text)) return null;
  const packageMatch = text.match(/^(\d+)\s*(?:x\s*|×\s*|\s+)(\d+(?:\.\d+)?)\s*(g|kg|oz|lb)\s*(?:cans?|tins?|packs?)?$/);
  if (packageMatch) return Number(packageMatch[1]) * Number(packageMatch[2]) * MASS[packageMatch[3]];
  const match = text.match(/^(?:(\d+)\s+)?(\d+\s*\/\s*\d+|\d+(?:\.\d+)?)\s*(.*)$/);
  if (!match) return null;
  const part = match[2].replace(/\s/g, '').split('/').map(Number);
  let amount = part.length === 2 ? part[0] / part[1] : part[0];
  if (match[1]) amount += Number(match[1]);
  if (!Number.isFinite(amount) || amount < 0) return null;
  const rest = match[3].replace(/\./g, '').trim();
  const unitMatch = rest.match(/^([a-z]+)\b/);
  const unit = unitMatch?.[1] || '';
  const suffix = unitMatch ? rest.slice(unit.length).trim() : rest;
  if (MASS[unit]) return /^\s*(?:,?\s*(?:chopped|diced|sliced|minced|grated|crushed|peeled|drained|melted|softened|sifted|can|tin|pack)s?)*\s*$/.test(suffix) ? amount * MASS[unit] : null;
  if (VOLUME[unit]) {
    if (!PREPARATION.test(suffix)) return null;
    const direct = /^(tsp|teaspoons?)$/.test(unit) ? portionWeight(food, /^tsp\b/) : /^(tbsp|tbs|tblsp|tablespoons?)$/.test(unit) ? portionWeight(food, /^tbsp\b/) : null;
    const cup = portionWeight(food, /^cup\b/);
    return direct !== null ? amount * direct : cup !== null ? amount * VOLUME[unit] * cup : null;
  }
  if (!PREPARATION.test(rest)) return null;
  let weight;
  if (/\bcloves?\b/.test(rest)) weight = portionWeight(food, /^clove\b/);
  else if (/\b(?:leaf|leaves)\b/.test(rest)) weight = portionWeight(food, /^(?:leaf|leaves)\b/);
  else if (/\blarge\b/.test(rest)) weight = portionWeight(food, /^large\b/);
  else if (/\bsmall\b/.test(rest)) weight = portionWeight(food, /^small\b/);
  else if (food.portion) weight = portionWeight(food, new RegExp('^' + food.portion + '\\b'));
  else weight = portionWeight(food, /^medium\b/) ?? portionWeight(food, /^large\b/) ?? portionWeight(food, /^piece\b/) ?? portionWeight(food, /^clove\b/);
  return weight !== null && weight !== undefined ? amount * weight : null;
}

export function estimateNutrition(meal, weightOverrides = {}) {
  const ingredients = getIngredients(meal).map(item => {
    const food = matchFood(item.ingredient);
    const override = weightOverrides[item.index];
    const grams = food && typeof override === 'number' && Number.isFinite(override) && override >= 0 ? override : measureToGrams(item.measure, food);
    return { ...item, food, grams };
  });
  const included = ingredients.filter(item => item.food && item.grams !== null);
  const totals = Object.fromEntries(NUTRIENTS.map(([key]) => [key, included.length === 0 || included.some(item => item.food.nutrients[key] === null) ? null : included.reduce((sum, item) => sum + item.food.nutrients[key] * item.grams / 100, 0)]));
  return { totals, ingredients, included: included.length, total: ingredients.length, complete: ingredients.length > 0 && included.length === ingredients.length };
}

export function formatNutrient(value, unit, language = 'en') {
  if (value === null || !Number.isFinite(value)) return '—';
  if (value > 0 && value < (unit === 'g' ? 0.1 : 1)) return '<' + new Intl.NumberFormat(language).format(unit === 'g' ? 0.1 : 1) + ' ' + unit;
  return new Intl.NumberFormat(language, { maximumFractionDigits: unit === 'g' ? 1 : 0 }).format(value) + ' ' + unit;
}
