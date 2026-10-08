import test from 'node:test';
import assert from 'node:assert/strict';
import { matchFood, measureToGrams, estimateNutrition, formatNutrient } from '../js/nutrition.js';
const meal = (...items) => Object.assign({ idMeal: 'test' }, ...items.map(([ingredient, measure], i) => ({ ['strIngredient' + (i + 1)]: ingredient, ['strMeasure' + (i + 1)]: measure })));
const grams = (measure, ingredient = 'Sugar') => measureToGrams(measure, matchFood(ingredient));

test('converts metric and imperial mass quantities', () => {
  assert.equal(grams('100g'), 100);
  assert.equal(grams('1/2 kg'), 500);
  assert.equal(grams('1 lb'), 453.59237);
  assert.equal(grams('2 oz'), 56.69904625);
});
test('handles mixed and Unicode fractions', () => {
  assert.equal(grams('1 1/2 cups'), 300);
  assert.equal(grams('1½ cups'), 300);
  assert.equal(grams('½ cup'), 100);
  assert.equal(grams('¼ kg'), 250);
  assert.equal(grams('1/0 cups'), null);
});
test('uses USDA food-specific cup, spoon and whole-food portions', () => {
  assert.equal(grams('1 cup', 'Flour'), 125);
  assert.equal(grams('1 cup', 'Sugar'), 200);
  assert.equal(grams('1 tsp', 'Garlic'), 2.8);
  assert.equal(grams('2 cloves', 'Garlic'), 6);
  assert.equal(grams('2 large', 'Eggs'), 100);
  assert.equal(grams('6 leaves', 'Basil'), 3);
});
test('uses explicit package weights only', () => {
  assert.equal(grams('2 x 400g tins'), 800);
  assert.equal(grams('1 400g tin'), 400);
  assert.equal(grams('1 tin'), null);
});
test('does not guess ambiguous or compound amounts', () => {
  for (const value of ['', 'to taste', 'a pinch', '1-2 tsp', '1–2 tsp', '1 cup plus 2 tbsp', '100g or 200g', '1 handful', '2 cans', '-10g']) assert.equal(grams(value), null, value);
});
test('uses explicit ingredient aliases and avoids fuzzy matches', () => {
  assert.ok(matchFood('  Caster Sugar  '));
  assert.equal(matchFood('sugar-free syrup'), null);
  assert.equal(matchFood('unknown sauce'), null);
});
test('calculates whole-recipe sugar from every ingredient, including natural sugar', () => {
  const result = estimateNutrition(meal(['Sugar', '100g'], ['Milk', '200g']));
  const expected = matchFood('Sugar').nutrients.sugar + matchFood('Milk').nutrients.sugar * 2;
  assert.equal(result.totals.sugar, expected);
  assert.equal(result.complete, true);
  assert.equal(result.included, 2);
});
test('reports skipped ingredients and partial totals', () => {
  const result = estimateNutrition(meal(['Sugar', '100g'], ['Mystery sauce', '100g'], ['Milk', 'to taste']));
  assert.equal(result.complete, false);
  assert.equal(result.included, 1);
  assert.equal(result.total, 3);
  assert.equal(result.totals.sugar, matchFood('Sugar').nutrients.sugar);
});
test('missing data is unavailable rather than zero', () => {
  const result = estimateNutrition(meal(['Mystery sauce', '100g']));
  assert.equal(result.totals.sugar, null);
  assert.equal(result.totals.calories, null);
  assert.equal(result.complete, false);
  assert.equal(formatNutrient(null, 'g'), '—');
});
test('gram overrides complete missing quantities without assigning data to unknown foods', () => {
  const input = meal(['Sugar', 'to taste'], ['Milk', '200g']);
  const result = estimateNutrition(input, { 1: 50 });
  assert.equal(result.complete, true);
  assert.equal(result.totals.sugar, matchFood('Sugar').nutrients.sugar * .5 + matchFood('Milk').nutrients.sugar * 2);
  assert.equal(estimateNutrition(meal(['Unknown', '100g']), { 1: 50 }).included, 0);
  assert.equal(estimateNutrition(input, { 1: -10 }).included, 1);
});
test('zero and tiny values are displayed honestly', () => {
  assert.equal(formatNutrient(0, 'g'), '0 g');
  assert.equal(formatNutrient(0.04, 'g'), '<0.1 g');
  assert.equal(formatNutrient(0.4, 'mg'), '<1 mg');
  assert.equal(formatNutrient(12.34, 'g', 'es'), '12,3 g');
});
