Create a professional frontend project structure for a modern Recipe Finder web app.

Use only:
- HTML5
- CSS3
- Vanilla JavaScript
- ES6 modules
- Fetch API
- LocalStorage

Do NOT use React, Vue, Angular, Bootstrap, Tailwind, or any other framework.

The goal is to create a clean, scalable frontend architecture that can later connect to a recipe API such as TheMealDB.

Create this project structure:

recipe-app/
├── index.html
├── recipe.html
├── favorites.html
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── style.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── api.js
│   ├── ui.js
│   ├── recipe.js
│   ├── favorites.js
│   ├── storage.js
│   └── utils.js
├── assets/
│   ├── images/
│   └── icons/
└── README.md

Build the frontend structure and starter code for every file.

INDEX PAGE

Create a responsive homepage containing:

1. Header
- App logo/name
- Home link
- Favorites link
- Random Recipe button
- Mobile navigation button

2. Hero section
- Large heading: "Find something delicious"
- Short description
- Large search input
- Search button

3. Category section
- Horizontal or responsive category list
- Example categories:
  - Chicken
  - Beef
  - Seafood
  - Pasta
  - Dessert
  - Vegetarian

4. Recipe results section
- Responsive grid
- Recipe cards
- Each card should contain:
  - Recipe image
  - Recipe title
  - Category
  - Cuisine
  - Favorite heart button
  - View Recipe button

5. Loading state
Create attractive skeleton recipe cards while API data is loading.

6. Empty state
Display a clean message when no recipes are found.

7. Error state
Display an error card with a Retry button.

8. Footer
Include basic navigation and copyright text.

RECIPE DETAILS PAGE

Create a detailed recipe page containing:

- Large recipe image
- Recipe title
- Category
- Cuisine
- Favorite button
- Ingredients list
- Ingredient measurements
- Cooking instructions
- YouTube recipe button if available
- Back button
- Similar recipes section

FAVORITES PAGE

Create a page where recipes saved in LocalStorage appear.

Allow users to:
- Open a saved recipe
- Remove individual favorites
- Clear all favorites

JAVASCRIPT ARCHITECTURE

api.js
Handle all external API requests.

Functions should include:

searchRecipes(query)
getRecipeById(id)
getRandomRecipe()
getCategories()
getRecipesByCategory(category)
getRecipesByIngredient(ingredient)

Use:

https://www.themealdb.com/api/json/v1/1/

storage.js
Handle LocalStorage.

Functions:
saveFavorite(recipe)
removeFavorite(id)
getFavorites()
isFavorite(id)
saveRecentSearch(query)
getRecentSearches()

ui.js
Handle DOM rendering.

Functions:
renderRecipes()
renderRecipeCard()
renderCategories()
renderLoadingSkeletons()
renderEmptyState()
renderError()
showToast()

app.js
Control homepage events and connect UI logic to API functions.

recipe.js
Control the recipe details page.

favorites.js
Control the favorites page.

utils.js
Include reusable helper functions such as:
- truncateText()
- sanitizeText()
- getQueryParameter()
- debounce()

DESIGN SYSTEM

Create CSS variables for:

--background
--surface
--text-primary
--text-secondary
--border
--accent
--accent-hover
--radius-small
--radius-medium
--radius-large
--shadow-small
--shadow-medium
--spacing-xs
--spacing-sm
--spacing-md
--spacing-lg
--spacing-xl

Use a clean modern food-app style.

Do not make it overly colorful.

Use:
- Warm neutral backgrounds
- White cards
- Dark readable text
- One primary accent color
- Subtle borders
- Soft shadows
- Rounded cards
- Professional typography
- Plenty of whitespace

Make the interface look like a real production application rather than a beginner tutorial project.

RESPONSIVE DESIGN

Desktop:
- Maximum content width around 1200–1400px
- 3–4 recipe cards per row

Tablet:
- 2–3 cards per row

Mobile:
- 1 card per row
- Full-width search input
- Compact header
- Mobile navigation
- Touch-friendly buttons

ACCESSIBILITY

Use:
- Semantic HTML
- Proper button elements
- Labels
- alt attributes
- aria-label where necessary
- Visible keyboard focus states
- Good color contrast

CODE QUALITY

Important:
- Keep HTML, CSS, and JavaScript separated.
- Do not put the whole application in one file.
- Avoid duplicated code.
- Use JavaScript modules with import/export.
- Add useful comments but do not over-comment.
- Use async/await.
- Handle failed API requests.
- Handle missing API fields.
- Prevent broken images.
- Use encodeURIComponent() for user search input.
- Keep functions small and reusable.

Do not create fake API results.

If API data has not loaded yet, show loading placeholders instead.

First create the complete folder/file architecture.

Then generate the starter implementation for every file so that opening index.html through a local development server produces a functional frontend application. not neon