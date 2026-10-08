# 🍳 Cookly — Recipe Application

> **Good food starts with a good idea.**  
> Cookly is a modern, responsive web application for searching, discovering, and saving recipes powered by [TheMealDB API](https://www.themealdb.com/).

---

## ✨ Features

- **🔍 Live Recipe Search:** Search meals by keyword with debounced queries and search history.
- **🏷️ Category Filtering:** Browse recipes by categories (Beef, Chicken, Dessert, Seafood, Vegetarian, etc.).
- **🎲 Surprise Me:** Discover inspiration quickly with a one-click random recipe generator.
- **📖 Detailed Recipe View:** Step-by-step instructions, ingredients with measurements, tags, YouTube video guides, and original source links.
- **🥗 Nutrition Facts:** Ingredient-based estimates for whole recipes or a chosen number of servings: calories, total sugar, protein, carbohydrates, total and saturated fat, fiber, sodium, and cholesterol. Review or adjust edible ingredient weights in grams.
- **❤️ Favorites & Bookmarking:** Save your favorite dishes to local storage and manage them anytime on the dedicated Favorites page.
- **📱 Fully Responsive Design:** Clean layout optimized for mobile, tablet, and desktop screens with custom CSS styling and dark/light accent variables.
- **⚡ Zero Dependencies:** Built with vanilla HTML5, CSS3, and ES6 JavaScript modules — no build tools or heavyweight frameworks required.

---

## 📁 Project Structure

```text
Recipe_aplication/
├── css/
│   ├── components.css    # Reusable UI component styles
│   ├── reset.css         # CSS reset / normalizer
│   ├── responsive.css    # Mobile and tablet media queries
│   ├── style.css         # Main application styles
│   └── variables.css     # CSS design tokens & variables
├── js/
│   ├── api.js            # TheMealDB API integration layer
│   ├── app.js            # Main application controller
│   ├── favorites.js      # Favorites management logic
│   ├── recipe.js         # Recipe detail page logic
│   ├── storage.js        # LocalStorage helpers for favorites and history
│   ├── ui.js             # DOM rendering and UI updates
│   └── utils.js          # Debounce, formatting, and helper utilities
├── favorites.html        # Bookmarked recipes page
├── index.html            # Main homepage and search portal
├── recipe.html           # Full recipe detail view
├── server.js             # Lightweight Node.js local development server
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended) or any local HTTP server (Live Server, Python HTTP server, etc.)

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/donoblmma-code/Recipe_aplication.git
   cd Recipe_aplication
   ```

2. **Start the local server:**
   Cookly includes a zero-dependency static server using Node's native HTTP module:
   ```bash
   node server.js
   ```

3. **Open in your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

*(Note: Because this project uses native ES Modules (`type="module"`), running via a local web server is required rather than opening `file://` directly.)*

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Flexbox, CSS Grid, Custom Properties), Vanilla JavaScript (ES6+ Modules)
- **API:** [TheMealDB](https://www.themealdb.com/api.php) (Free Recipe REST API)
- **Runtime / Server:** Node.js (native `node:http`)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## Nutrition estimates

Nutrition uses a bundled subset of [USDA Standard Reference 28](https://www.ars.usda.gov/northeast-area/beltsville-md-bhnrc/beltsville-human-nutrition-research-center/methods-and-application-of-food-composition-laboratory/mafcl-site-pages/sr11-sr28/) (2016): 123 food records and 276 explicitly matched ingredient names. The original NDB identifiers, per-100-gram nutrients, and household portion weights are retained in `js/nutrition-data.js`. No nutrition API key or additional runtime request is required.

TheMealDB does not supply nutrition or serving counts. Values are estimated from edible ingredient weights before cooking, with typical product variants and USDA portion sizes. Volume conversions use a 240 ml cup, 15 ml tablespoon, and 5 ml teaspoon when a direct USDA measure is unavailable. Ranges, unspecified cans, handfuls, and unrecognized foods are excluded and listed explicitly; partial estimates are never labeled as full meal totals. Missing nutrient data displays a dash rather than zero. Total sugar includes naturally occurring and added sugar; separate added sugar is not available.

The default view is the whole recipe. For per-serving values, choose “Per serving” and specify the number of servings in the recipe. Ingredient weight adjustments stay on the current page and do not change the original recipe. Cards display calorie and sugar previews when full ingredient data is available; otherwise their nutrition link opens the detail view. Newly saved favorites retain ingredient quantities for nutrition previews.
