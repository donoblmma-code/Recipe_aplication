# 🍳 Cookly — Recipe Application

> **Good food starts with a good idea.**  
> Cookly is a modern, responsive web application for searching, discovering, and saving recipes powered by [TheMealDB API](https://www.themealdb.com/).

---

## ✨ Features

- **🔍 Live Recipe Search:** Search meals by keyword with debounced queries and search history.
- **🏷️ Category Filtering:** Browse recipes by categories (Beef, Chicken, Dessert, Seafood, Vegetarian, etc.).
- **🎲 Surprise Me:** Discover inspiration quickly with a one-click random recipe generator.
- **📖 Detailed Recipe View:** Step-by-step instructions, ingredients with measurements, tags, YouTube video guides, and original source links.
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
