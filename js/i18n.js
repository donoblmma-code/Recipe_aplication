/**
 * Internationalization (i18n) module for Cookly
 * Supports English (en), Spanish (es), and Russian (ru)
 */

const STORAGE_KEY = "cookly_language";
export const SUPPORTED_LANGUAGES = ["en", "es", "ru"];
export const DEFAULT_LANGUAGE = "en";

export const translations = {
  en: {
    nutrition_meta_estimate: "Estimated · whole recipe",
    nutrition_meta_partial: "Partial estimate · whole recipe",
    // Nutrition facts
    nutrition_heading: "Nutrition facts",
    nutrition_estimated: "Estimated",
    nutrition_whole_recipe: "Whole recipe",
    nutrition_per_serving: "Per serving",
    nutrition_show: "Show nutrition",
    nutrition_servings: "Servings in recipe",
    nutrition_calories: "Calories",
    nutrition_sugar: "Total sugar",
    nutrition_protein: "Protein",
    nutrition_carbs: "Carbohydrates",
    nutrition_fat: "Total fat",
    nutrition_saturatedFat: "Saturated fat",
    nutrition_fiber: "Fiber",
    nutrition_sodium: "Sodium",
    nutrition_cholesterol: "Cholesterol",
    nutrition_unavailable: "Nutrition is unavailable for these ingredients and measurements. Add gram weights below for supported ingredients.",
    nutrition_complete: "Calculated from all {count} ingredients.",
    nutrition_partial: "Partial estimate: {count} of {total} ingredients included. These values are not the full meal totals.",
    nutrition_skipped: "Not included: {ingredients}.",
    nutrition_adjust_weights: "Review ingredient weights",
    nutrition_weight_hint: "Weights refer to edible ingredients before cooking. Enter grams to adjust an estimate or add a missing quantity. Clear a field to restore the recipe amount.",
    nutrition_weight_for: "{ingredient}: weight in grams",
    nutrition_no_measure: "No quantity provided",
    nutrition_enter_grams: "Enter weight",
    nutrition_no_data: "No food data",
    nutrition_grams: "g",
    nutrition_note: "Estimates use typical ingredients and portion weights; brands and preparation can change the result. Sugar includes naturally occurring and added sugar. A dash means nutrient data is unavailable.",
    nutrition_source: "Source: USDA SR28",
    nutrition_view: "View nutrition facts",
    nutrition_card_estimate: "Estimated · whole recipe",
    nutrition_card_partial: "Partial estimate · {count}/{total} ingredients",

    // Brand & Meta
    brand_name: "Cookly",
    brand_tagline: "Good food starts with a good idea.",
    brand_subtagline: "Simple recipes. Better meals.",
    page_title_home: "Cookly — Good food starts with a good idea.",
    page_title_favorites: "Your Favorites — Cookly",
    page_title_recipe: "Recipe Details — Cookly",

    // Navigation
    nav_home: "Home",
    nav_explore: "Explore",
    nav_favorites: "Favorites",
    nav_surprise_me: "Surprise Me",
    nav_open_menu: "Open navigation menu",
    nav_lang_label: "Language",

    // Hero
    hero_eyebrow: "Discover your next favorite meal",
    hero_heading_1: "Good food starts",
    hero_heading_2: "with a good idea.",
    hero_subhead: "Search recipes by dish or ingredient, explore world cuisines, and save the meals you love.",
    search_placeholder: "Try 'pasta', 'chicken', 'tacos'...",
    search_button: "Search",
    search_popular_label: "Popular searches:",

    // Categories
    categories_heading: "Browse categories",
    categories_subtitle: "Pick a cuisine style to start exploring hundreds of curated meals.",
    all_recipes: "All Recipes",

    // Search Results
    search_results_heading: "Results for",
    search_results_count: "{count} recipes found",
    search_results_count_single: "1 recipe found",
    search_results_count_none: "0 recipes found",
    search_results_category: "Category: {category}",
    search_loading: "Searching recipes...",
    search_loading_category: "Loading category recipes...",
    clear_search: "Clear search",
    search_error_network: "Could not load recipes due to network error.",
    search_error_title: "We couldn't load the recipes.",
    search_error_desc: "Please check your internet connection or try again in a few moments.",
    retry: "Try again",
    empty_search_title: "No recipes found",
    empty_search_desc: "We couldn't find anything matching your search. Try different keywords, ingredients, or explore categories below.",
    empty_search_button: "Explore popular recipes",

    // Popular Section
    popular_eyebrow: "Handpicked",
    popular_heading: "Popular right now",
    popular_subtitle: "A rotating selection of crowd favorites and comfort classics.",
    view_all_recipes: "View all recipes",

    // Random CTA Section
    random_cta_eyebrow: "Spontaneous dinner",
    random_cta_heading: "Not sure what to cook?",
    random_cta_text: "Let Cookly choose for you. Get an instant recipe suggestion from over 300 meals around the world.",
    random_cta_button: "Surprise Me",

    // Favorites (Homepage & Page)
    favorites_preview_eyebrow: "Saved dishes",
    favorites_preview_heading: "Your favorites",
    favorites_preview_subtitle: "Quick access to the meals you've bookmarked.",
    favorites_page_heading: "Your favorites",
    favorites_count_badge: "favorites count",
    favorites_count_text: "{count} saved recipes",
    favorites_count_single: "1 saved recipe",
    favorites_count_zero: "0 saved recipes",
    view_all_favorites: "View all favorites",
    find_more_recipes: "Find more recipes",
    empty_favorites_title: "You haven't saved any recipes yet.",
    empty_favorites_desc: "Click the heart icon on any recipe to save it here for later.",
    empty_favorites_preview: "You haven't saved any recipes yet. Click the heart icon on any dish to keep it handy.",

    // Recent Searches
    recent_searches_eyebrow: "History",
    recent_searches_heading: "Recently searched",

    // Newsletter Section
    newsletter_eyebrow: "Stay inspired",
    newsletter_heading: "Save room for something new.",
    newsletter_desc: "Get weekly recipe inspiration, seasonal cooking guides, and dinner ideas delivered to your inbox.",
    newsletter_placeholder: "Your email address",
    newsletter_button: "Subscribe",
    newsletter_note: "No spam, ever. Unsubscribe anytime.",

    // Footer
    footer_col_explore: "Explore",
    footer_col_account: "Account",
    footer_col_info: "Information",
    footer_link_recipes: "Recipes",
    footer_link_categories: "Categories",
    footer_link_random: "Random Recipe",
    footer_link_favorites: "Favorites",
    footer_link_recent: "Recently Viewed",
    footer_link_about: "About",
    footer_link_privacy: "Privacy",
    footer_link_contact: "Contact",
    footer_copyright: "All rights reserved.",

    // Recipe Card & Common Actions
    view_recipe: "View Recipe",
    view_recipe_for: "View recipe for {title}",
    save_to_favorites: "Save to favorites",
    saved_to_favorites: "Saved to Favorites",
    remove_from_favorites: "Remove from favorites",
    add_to_favorites_aria: "Add {title} to favorites",
    remove_from_favorites_aria: "Remove {title} from favorites",
    recipe_default_category: "Recipe",
    recipe_default_area: "International",

    // Recipe Details Page
    recipe_back: "Back to recipes",
    recipe_ingredients_heading: "Ingredients",
    recipe_ingredients_count: "{count} items",
    recipe_ingredients_count_single: "1 item",
    recipe_instructions_heading: "Cooking Instructions",
    recipe_video_heading: "Video Tutorial",
    recipe_video_desc: "Watch the step-by-step preparation video on YouTube.",
    recipe_watch_youtube: "Watch on YouTube",
    recipe_original_source: "Original Recipe",
    recipe_similar_heading: "Similar recipes you might enjoy",
    recipe_similar_subtitle: "More dishes in the {category} category.",
    recipe_not_found_title: "Recipe not found",
    recipe_not_found_desc: "No recipe specified. Please choose a recipe from the homepage.",
    recipe_invalid_desc: "Recipe not found. It may have been removed or the ID is invalid.",
    recipe_network_error: "Could not load the recipe. Please check your internet connection.",
    recipe_back_home: "Back to Home",

    // Nutrition Facts
    nutrition_subtitle: "Estimated values per serving",
    nutrition_per_recipe: "Entire Recipe",
    nutrition_servings_label: "Servings",
    nutrition_daily_value: "% Daily Value",
    nutrition_disclaimer: "Estimated values based on standard USDA nutritional benchmarks. Individual recipes may vary.",
    nutrition_badge_sugar: "{amount}g sugar",
    nutrition_badge_cal: "{amount} kcal",
    nutrition_badge_protein: "{amount}g protein",

    // Toasts & Messages
    toast_saved_fav: 'Saved "{title}" to favorites!',
    toast_removed_fav: 'Removed "{title}" from favorites',
    toast_random_error: "Could not pick a random recipe right now",
    toast_newsletter_success: "Thank you for subscribing to Cookly!",
    toast_newsletter_invalid: "Please enter a valid email address.",

    // Categories names
    category_beef: "Beef",
    category_chicken: "Chicken",
    category_dessert: "Dessert",
    category_lamb: "Lamb",
    category_miscellaneous: "Miscellaneous",
    category_pasta: "Pasta",
    category_pork: "Pork",
    category_seafood: "Seafood",
    category_side: "Side Dishes",
    category_starter: "Starters",
    category_vegan: "Vegan",
    category_vegetarian: "Vegetarian",
    category_breakfast: "Breakfast",
    category_goat: "Goat",

    // Areas / Cuisines
    area_american: "American",
    area_british: "British",
    area_canadian: "Canadian",
    area_chinese: "Chinese",
    area_croatian: "Croatian",
    area_dutch: "Dutch",
    area_egyptian: "Egyptian",
    area_filipino: "Filipino",
    area_french: "French",
    area_greek: "Greek",
    area_indian: "Indian",
    area_irish: "Irish",
    area_italian: "Italian",
    area_jamaican: "Jamaican",
    area_japanese: "Japanese",
    area_kenyan: "Kenyan",
    area_malaysian: "Malaysian",
    area_mexican: "Mexican",
    area_moroccan: "Moroccan",
    area_polish: "Polish",
    area_portuguese: "Portuguese",
    area_russian: "Russian",
    area_spanish: "Spanish",
    area_thai: "Thai",
    area_tunisian: "Tunisian",
    area_turkish: "Turkish",
    area_ukrainian: "Ukrainian",
    area_vietnamese: "Vietnamese",
    area_international: "International"
  },

  es: {
    nutrition_meta_estimate: "Estimación · receta completa",
    nutrition_meta_partial: "Estimación parcial · receta completa",
    // Nutrition facts
    nutrition_heading: "Información nutricional",
    nutrition_estimated: "Estimada",
    nutrition_whole_recipe: "Receta completa",
    nutrition_per_serving: "Por porción",
    nutrition_show: "Mostrar nutrientes",
    nutrition_servings: "Porciones de la receta",
    nutrition_calories: "Calorías",
    nutrition_sugar: "Azúcares totales",
    nutrition_protein: "Proteína",
    nutrition_carbs: "Carbohidratos",
    nutrition_fat: "Grasas totales",
    nutrition_saturatedFat: "Grasas saturadas",
    nutrition_fiber: "Fibra",
    nutrition_sodium: "Sodio",
    nutrition_cholesterol: "Colesterol",
    nutrition_unavailable: "No hay datos para estos ingredientes y cantidades. Añade los pesos en gramos para los ingredientes disponibles.",
    nutrition_complete: "Calculado con los {count} ingredientes.",
    nutrition_partial: "Estimación parcial: {count} de {total} ingredientes incluidos. Estos valores no son los totales de la receta.",
    nutrition_skipped: "No incluidos: {ingredients}.",
    nutrition_adjust_weights: "Revisar pesos de ingredientes",
    nutrition_weight_hint: "Los pesos corresponden a los ingredientes comestibles antes de cocinar. Introduce gramos para ajustar una estimación o añadir una cantidad. Vacía un campo para restaurar la cantidad de la receta.",
    nutrition_weight_for: "{ingredient}: peso en gramos",
    nutrition_no_measure: "Sin cantidad indicada",
    nutrition_enter_grams: "Introduce peso",
    nutrition_no_data: "Sin datos",
    nutrition_grams: "g",
    nutrition_note: "Estimaciones con ingredientes y porciones típicos; las marcas y la preparación pueden cambiar el resultado. El azúcar incluye azúcares naturales y añadidos. Un guion indica datos no disponibles.",
    nutrition_source: "Fuente: USDA SR28",
    nutrition_view: "Ver información nutricional",
    nutrition_card_estimate: "Estimada · receta completa",
    nutrition_card_partial: "Estimación parcial · {count}/{total} ingredientes",

    // Brand & Meta
    brand_name: "Cookly",
    brand_tagline: "La buena comida empieza con una buena idea.",
    brand_subtagline: "Recetas sencillas. Mejores comidas.",
    page_title_home: "Cookly — La buena comida empieza con una buena idea.",
    page_title_favorites: "Tus Favoritos — Cookly",
    page_title_recipe: "Detalles de la Receta — Cookly",

    // Navigation
    nav_home: "Inicio",
    nav_explore: "Explorar",
    nav_favorites: "Favoritos",
    nav_surprise_me: "Sorpréndeme",
    nav_open_menu: "Abrir menú de navegación",
    nav_lang_label: "Idioma",

    // Hero
    hero_eyebrow: "Descubre tu próximo plato favorito",
    hero_heading_1: "La buena comida empieza",
    hero_heading_2: "con una buena idea.",
    hero_subhead: "Busca recetas por plato o ingrediente, explora cocinas del mundo y guarda las que más te gusten.",
    search_placeholder: "Prueba 'pasta', 'pollo', 'tacos'...",
    search_button: "Buscar",
    search_popular_label: "Búsquedas populares:",

    // Categories
    categories_heading: "Explorar categorías",
    categories_subtitle: "Elige un estilo de cocina para descubrir cientos de platos seleccionados.",
    all_recipes: "Todas las recetas",

    // Search Results
    search_results_heading: "Resultados para",
    search_results_count: "{count} recetas encontradas",
    search_results_count_single: "1 receta encontrada",
    search_results_count_none: "0 recetas encontradas",
    search_results_category: "Categoría: {category}",
    search_loading: "Buscando recetas...",
    search_loading_category: "Cargando recetas de la categoría...",
    clear_search: "Borrar búsqueda",
    search_error_network: "No se pudieron cargar las recetas debido a un error de red.",
    search_error_title: "No pudimos cargar las recetas.",
    search_error_desc: "Comprueba tu conexión a internet o inténtalo de nuevo en unos momentos.",
    retry: "Reintentar",
    empty_search_title: "No se encontraron recetas",
    empty_search_desc: "No encontramos nada que coincida con tu búsqueda. Prueba con otras palabras clave, ingredientes o explora las categorías siguientes.",
    empty_search_button: "Explorar recetas populares",

    // Popular Section
    popular_eyebrow: "Selección especial",
    popular_heading: "Populares ahora mismo",
    popular_subtitle: "Una selección rotativa de los platos más queridos y clásicos reconfortantes.",
    view_all_recipes: "Ver todas las recetas",

    // Random CTA Section
    random_cta_eyebrow: "Cena espontánea",
    random_cta_heading: "¿No sabes qué cocinar?",
    random_cta_text: "Deja que Cookly decida por ti. Obtén una sugerencia instantánea de más de 300 platos de todo el mundo.",
    random_cta_button: "Sorpréndeme",

    // Favorites (Homepage & Page)
    favorites_preview_eyebrow: "Platos guardados",
    favorites_preview_heading: "Tus favoritos",
    favorites_preview_subtitle: "Acceso rápido a las recetas que has guardado.",
    favorites_page_heading: "Tus favoritos",
    favorites_count_badge: "cantidad de favoritos",
    favorites_count_text: "{count} recetas guardadas",
    favorites_count_single: "1 receta guardada",
    favorites_count_zero: "0 recetas guardadas",
    view_all_favorites: "Ver todos los favoritos",
    find_more_recipes: "Buscar más recetas",
    empty_favorites_title: "Aún no has guardado ninguna receta.",
    empty_favorites_desc: "Haz clic en el corazón de cualquier receta para guardarla aquí para después.",
    empty_favorites_preview: "Aún no has guardado ninguna receta. Haz clic en el corazón de cualquier plato para tenerlo a mano.",

    // Recent Searches
    recent_searches_eyebrow: "Historial",
    recent_searches_heading: "Búsquedas recientes",

    // Newsletter Section
    newsletter_eyebrow: "Mantente inspirado",
    newsletter_heading: "Deja espacio para algo nuevo.",
    newsletter_desc: "Recibe inspiración semanal, guías de temporada e ideas para cenar directamente en tu correo.",
    newsletter_placeholder: "Tu correo electrónico",
    newsletter_button: "Suscribirse",
    newsletter_note: "Sin spam, nunca. Cancela tu suscripción cuando quieras.",

    // Footer
    footer_col_explore: "Explorar",
    footer_col_account: "Cuenta",
    footer_col_info: "Información",
    footer_link_recipes: "Recetas",
    footer_link_categories: "Categorías",
    footer_link_random: "Receta aleatoria",
    footer_link_favorites: "Favoritos",
    footer_link_recent: "Visto recientemente",
    footer_link_about: "Acerca de",
    footer_link_privacy: "Privacidad",
    footer_link_contact: "Contacto",
    footer_copyright: "Todos los derechos reservados.",

    // Recipe Card & Common Actions
    view_recipe: "Ver receta",
    view_recipe_for: "Ver receta de {title}",
    save_to_favorites: "Guardar en favoritos",
    saved_to_favorites: "Guardado en Favoritos",
    remove_from_favorites: "Eliminar de favoritos",
    add_to_favorites_aria: "Añadir {title} a favoritos",
    remove_from_favorites_aria: "Eliminar {title} de favoritos",
    recipe_default_category: "Receta",
    recipe_default_area: "Internacional",

    // Recipe Details Page
    recipe_back: "Volver a recetas",
    recipe_ingredients_heading: "Ingredientes",
    recipe_ingredients_count: "{count} ingredientes",
    recipe_ingredients_count_single: "1 ingrediente",
    recipe_instructions_heading: "Instrucciones de preparación",
    recipe_video_heading: "Videotutorial",
    recipe_video_desc: "Mira el video paso a paso de preparación en YouTube.",
    recipe_watch_youtube: "Ver en YouTube",
    recipe_original_source: "Receta original",
    recipe_similar_heading: "Recetas similares que te pueden gustar",
    recipe_similar_subtitle: "Más platos en la categoría {category}.",
    recipe_not_found_title: "Receta no encontrada",
    recipe_not_found_desc: "No se especificó ninguna receta. Elige una receta desde la página de inicio.",
    recipe_invalid_desc: "Receta no encontrada. Es posible que haya sido eliminada o que el ID no sea válido.",
    recipe_network_error: "No se pudo cargar la receta. Comprueba tu conexión a internet.",
    recipe_back_home: "Volver al inicio",

    // Nutrition Facts
    nutrition_subtitle: "Valores estimados por porción",
    nutrition_per_recipe: "Receta completa",
    nutrition_servings_label: "Porciones",
    nutrition_daily_value: "% Valor Diario",
    nutrition_disclaimer: "Valores estimados según referencias nutricionales estándar. Pueden variar según los ingredientes utilizados.",
    nutrition_badge_sugar: "{amount}g azúcar",
    nutrition_badge_cal: "{amount} kcal",
    nutrition_badge_protein: "{amount}g proteína",

    // Toasts & Messages
    toast_saved_fav: '¡"{title}" guardada en favoritos!',
    toast_removed_fav: '"{title}" eliminada de favoritos',
    toast_random_error: "No se pudo elegir una receta aleatoria en este momento",
    toast_newsletter_success: "¡Gracias por suscribirte a Cookly!",
    toast_newsletter_invalid: "Por favor, introduce un correo electrónico válido.",

    // Categories names
    category_beef: "Carne de res",
    category_chicken: "Pollo",
    category_dessert: "Postres",
    category_lamb: "Cordero",
    category_miscellaneous: "Varios",
    category_pasta: "Pasta",
    category_pork: "Cerdo",
    category_seafood: "Mariscos",
    category_side: "Guarniciones",
    category_starter: "Entrantes",
    category_vegan: "Vegano",
    category_vegetarian: "Vegetariano",
    category_breakfast: "Desayuno",
    category_goat: "Cabra",

    // Areas / Cuisines
    area_american: "Estadounidense",
    area_british: "Británica",
    area_canadian: "Canadiense",
    area_chinese: "China",
    area_croatian: "Croata",
    area_dutch: "Holandesa",
    area_egyptian: "Egipcia",
    area_filipino: "Filipina",
    area_french: "Francesa",
    area_greek: "Griega",
    area_indian: "India",
    area_irish: "Irlandesa",
    area_italian: "Italiana",
    area_jamaican: "Jamaiquina",
    area_japanese: "Japonesa",
    area_kenyan: "Keniata",
    area_malaysian: "Malaya",
    area_mexican: "Mexicana",
    area_moroccan: "Marroquí",
    area_polish: "Polaca",
    area_portuguese: "Portuguesa",
    area_russian: "Rusa",
    area_spanish: "Española",
    area_thai: "Tailandesa",
    area_tunisian: "Tunecina",
    area_turkish: "Turca",
    area_ukrainian: "Ucraniana",
    area_vietnamese: "Vietnamita",
    area_international: "Internacional"
  },

  ru: {
    nutrition_meta_estimate: "Приблизительно · весь рецепт",
    nutrition_meta_partial: "Частичный расчёт · весь рецепт",
    // Nutrition facts
    nutrition_heading: "Пищевая ценность",
    nutrition_estimated: "Приблизительно",
    nutrition_whole_recipe: "Весь рецепт",
    nutrition_per_serving: "На порцию",
    nutrition_show: "Показать значения",
    nutrition_servings: "Порций в рецепте",
    nutrition_calories: "Калории",
    nutrition_sugar: "Всего сахара",
    nutrition_protein: "Белки",
    nutrition_carbs: "Углеводы",
    nutrition_fat: "Всего жиров",
    nutrition_saturatedFat: "Насыщенные жиры",
    nutrition_fiber: "Клетчатка",
    nutrition_sodium: "Натрий",
    nutrition_cholesterol: "Холестерин",
    nutrition_unavailable: "Нет данных для этих ингредиентов и количеств. Укажите вес в граммах для доступных ингредиентов.",
    nutrition_complete: "Учтены все ингредиенты: {count}.",
    nutrition_partial: "Частичный расчёт: учтено {count} из {total} ингредиентов. Это не полные значения для блюда.",
    nutrition_skipped: "Не учтены: {ingredients}.",
    nutrition_adjust_weights: "Проверить вес ингредиентов",
    nutrition_weight_hint: "Вес съедобных ингредиентов до приготовления. Укажите граммы для уточнения расчёта или добавления количества. Очистите поле, чтобы вернуть количество из рецепта.",
    nutrition_weight_for: "{ingredient}: вес в граммах",
    nutrition_no_measure: "Количество не указано",
    nutrition_enter_grams: "Укажите вес",
    nutrition_no_data: "Нет данных",
    nutrition_grams: "г",
    nutrition_note: "Расчёт использует типичные ингредиенты и размеры порций; марка продукта и приготовление могут изменить результат. Сахар включает природный и добавленный сахар. Прочерк означает отсутствие данных.",
    nutrition_source: "Источник: USDA SR28",
    nutrition_view: "Пищевая ценность блюда",
    nutrition_card_estimate: "Приблизительно · весь рецепт",
    nutrition_card_partial: "Частично · {count}/{total} ингредиентов",

    // Brand & Meta
    brand_name: "Cookly",
    brand_tagline: "Вкусная еда начинается с хорошей идеи.",
    brand_subtagline: "Простые рецепты. Вкусные блюда.",
    page_title_home: "Cookly — Вкусная еда начинается с хорошей идеи.",
    page_title_favorites: "Избранное — Cookly",
    page_title_recipe: "Рецепт — Cookly",

    // Navigation
    nav_home: "Главная",
    nav_explore: "Категории",
    nav_favorites: "Избранное",
    nav_surprise_me: "Удиви меня",
    nav_open_menu: "Открыть меню",
    nav_lang_label: "Язык",

    // Hero
    hero_eyebrow: "Найдите своё следующее любимое блюдо",
    hero_heading_1: "Вкусная еда начинается",
    hero_heading_2: "с хорошей идеи.",
    hero_subhead: "Ищите рецепты по блюду или ингредиентам, исследуйте кухни мира и сохраняйте то, что вам по душе.",
    search_placeholder: "Попробуйте 'паста', 'курица', 'тако'...",
    search_button: "Найти",
    search_popular_label: "Популярные запросы:",

    // Categories
    categories_heading: "Категории рецептов",
    categories_subtitle: "Выберите направление, чтобы открыть сотни проверенных рецептов со всего мира.",
    all_recipes: "Все рецепты",

    // Search Results
    search_results_heading: "Результаты по запросу",
    search_results_count: "Найдено рецептов: {count}",
    search_results_count_single: "Найден 1 рецепт",
    search_results_count_none: "Рецептов не найдено",
    search_results_category: "Категория: {category}",
    search_loading: "Поиск рецептов...",
    search_loading_category: "Загрузка рецептов категории...",
    clear_search: "Сбросить поиск",
    search_error_network: "Не удалось загрузить рецепты из-за ошибки сети.",
    search_error_title: "Не удалось загрузить рецепты.",
    search_error_desc: "Проверьте подключение к интернету или повторите попытку через несколько секунд.",
    retry: "Повторить",
    empty_search_title: "Рецепты не найдены",
    empty_search_desc: "По вашему запросу ничего не нашлось. Попробуйте другие ключевые слова или выберите категорию ниже.",
    empty_search_button: "Смотреть популярные рецепты",

    // Popular Section
    popular_eyebrow: "Выбор редакции",
    popular_heading: "Популярно сейчас",
    popular_subtitle: "Любимые блюда наших пользователей и проверенная временем классика.",
    view_all_recipes: "Все рецепты",

    // Random CTA Section
    random_cta_eyebrow: "Спонтанный ужин",
    random_cta_heading: "Не знаете, что приготовить?",
    random_cta_text: "Доверьтесь Cookly! Получите случайный рецепт из коллекции более чем 300 блюд со всего мира.",
    random_cta_button: "Удиви меня",

    // Favorites (Homepage & Page)
    favorites_preview_eyebrow: "Сохранённое",
    favorites_preview_heading: "Ваше избранное",
    favorites_preview_subtitle: "Быстрый доступ к сохранённым рецептам.",
    favorites_page_heading: "Ваше избранное",
    favorites_count_badge: "количество избранного",
    favorites_count_text: "Сохранено рецептов: {count}",
    favorites_count_single: "Сохранён 1 рецепт",
    favorites_count_zero: "0 сохранённых рецептов",
    view_all_favorites: "Все избранные",
    find_more_recipes: "Найти больше рецептов",
    empty_favorites_title: "Вы пока ничего не сохранили.",
    empty_favorites_desc: "Нажмите на значок сердечка у любого рецепта, чтобы сохранить его сюда.",
    empty_favorites_preview: "Вы пока ничего не сохранили. Нажмите на сердечко у любого блюда, чтобы не потерять его.",

    // Recent Searches
    recent_searches_eyebrow: "История",
    recent_searches_heading: "Недавние поиски",

    // Newsletter Section
    newsletter_eyebrow: "Вдохновение",
    newsletter_heading: "Оставьте место для новых вкусов.",
    newsletter_desc: "Еженедельные идеи для ужина, сезонные подборки и кулинарные советы прямо на вашей почте.",
    newsletter_placeholder: "Ваш адрес эл. почты",
    newsletter_button: "Подписаться",
    newsletter_note: "Никакого спама. Отписка в любой момент.",

    // Footer
    footer_col_explore: "Разделы",
    footer_col_account: "Коллекции",
    footer_col_info: "Информация",
    footer_link_recipes: "Рецепты",
    footer_link_categories: "Категории",
    footer_link_random: "Случайный рецепт",
    footer_link_favorites: "Избранное",
    footer_link_recent: "Недавно просмотренные",
    footer_link_about: "О сервисе",
    footer_link_privacy: "Конфиденциальность",
    footer_link_contact: "Контакты",
    footer_copyright: "Все права защищены.",

    // Recipe Card & Common Actions
    view_recipe: "Смотреть рецепт",
    view_recipe_for: "Смотреть рецепт: {title}",
    save_to_favorites: "Добавить в избранное",
    saved_to_favorites: "В избранном",
    remove_from_favorites: "Удалить из избранного",
    add_to_favorites_aria: "Добавить {title} в избранное",
    remove_from_favorites_aria: "Удалить {title} из избранного",
    recipe_default_category: "Рецепт",
    recipe_default_area: "Международная кухня",

    // Recipe Details Page
    recipe_back: "Назад к рецептам",
    recipe_ingredients_heading: "Ингредиенты",
    recipe_ingredients_count: "Ингредиентов: {count}",
    recipe_ingredients_count_single: "1 ингредиент",
    recipe_instructions_heading: "Пошаговый способ приготовления",
    recipe_video_heading: "Видео-инструкция",
    recipe_video_desc: "Посмотрите наглядный видео-урок приготовления на YouTube.",
    recipe_watch_youtube: "Смотреть на YouTube",
    recipe_original_source: "Первоисточник рецепта",
    recipe_similar_heading: "Похожие рецепты",
    recipe_similar_subtitle: "Ещё вкусные блюда из категории «{category}».",
    recipe_not_found_title: "Рецепт не найден",
    recipe_not_found_desc: "Рецепт не указан. Пожалуйста, выберите рецепт на главной странице.",
    recipe_invalid_desc: "Рецепт не найден. Возможно, он был удалён или указан неверный ID.",
    recipe_network_error: "Не удалось загрузить рецепт. Проверьте подключение к интернету.",
    recipe_back_home: "На главную",

    // Nutrition Facts
    nutrition_subtitle: "Расчётные показатели на одну порцию",
    nutrition_per_recipe: "На весь рецепт",
    nutrition_servings_label: "Порции",
    nutrition_daily_value: "% от нормы",
    nutrition_disclaimer: "Приблизительные значения на основе стандартных данных USDA. Могут отличаться в зависимости от конкретных продуктов.",
    nutrition_badge_sugar: "{amount}г сахара",
    nutrition_badge_cal: "{amount} ккал",
    nutrition_badge_protein: "{amount}г белка",

    // Toasts & Messages
    toast_saved_fav: '«{title}» добавлено в избранное!',
    toast_removed_fav: '«{title}» удалено из избранного',
    toast_random_error: "Не удалось загрузить случайный рецепт",
    toast_newsletter_success: "Спасибо за подписку на Cookly!",
    toast_newsletter_invalid: "Пожалуйста, введите корректный адрес эл. почты.",

    // Categories names
    category_beef: "Говядина",
    category_chicken: "Курица",
    category_dessert: "Десерты",
    category_lamb: "Баранина",
    category_miscellaneous: "Разное",
    category_pasta: "Паста",
    category_pork: "Свинина",
    category_seafood: "Морепродукты",
    category_side: "Гарниры",
    category_starter: "Закуски",
    category_vegan: "Веганские блюда",
    category_vegetarian: "Вегетарианские блюда",
    category_breakfast: "Завтраки",
    category_goat: "Козлятина",

    // Areas / Cuisines
    area_american: "Американская",
    area_british: "Британская",
    area_canadian: "Канадская",
    area_chinese: "Китайская",
    area_croatian: "Хорватская",
    area_dutch: "Голландская",
    area_egyptian: "Египетская",
    area_filipino: "Филиппинская",
    area_french: "Французская",
    area_greek: "Греческая",
    area_indian: "Индийская",
    area_irish: "Ирландская",
    area_italian: "Итальянская",
    area_jamaican: "Ямайская",
    area_japanese: "Японская",
    area_kenyan: "Кенийская",
    area_malaysian: "Малайзийская",
    area_mexican: "Мексиканская",
    area_moroccan: "Марокканская",
    area_polish: "Польская",
    area_portuguese: "Португальская",
    area_russian: "Русская",
    area_spanish: "Испанская",
    area_thai: "Тайская",
    area_tunisian: "Тунисская",
    area_turkish: "Турецкая",
    area_ukrainian: "Украинская",
    area_vietnamese: "Вьетнамская",
    area_international: "Международная"
  }
};

const CATEGORY_KEY_MAP = {
  beef: "category_beef",
  chicken: "category_chicken",
  dessert: "category_dessert",
  lamb: "category_lamb",
  miscellaneous: "category_miscellaneous",
  pasta: "category_pasta",
  pork: "category_pork",
  seafood: "category_seafood",
  side: "category_side",
  starter: "category_starter",
  vegan: "category_vegan",
  vegetarian: "category_vegetarian",
  breakfast: "category_breakfast",
  goat: "category_goat"
};

const AREA_KEY_MAP = {
  american: "area_american",
  british: "area_british",
  canadian: "area_canadian",
  chinese: "area_chinese",
  croatian: "area_croatian",
  dutch: "area_dutch",
  egyptian: "area_egyptian",
  filipino: "area_filipino",
  french: "area_french",
  greek: "area_greek",
  indian: "area_indian",
  irish: "area_irish",
  italian: "area_italian",
  jamaican: "area_jamaican",
  japanese: "area_japanese",
  kenyan: "area_kenyan",
  malaysian: "area_malaysian",
  mexican: "area_mexican",
  moroccan: "area_moroccan",
  polish: "area_polish",
  portuguese: "area_portuguese",
  russian: "area_russian",
  spanish: "area_spanish",
  thai: "area_thai",
  tunisian: "area_tunisian",
  turkish: "area_turkish",
  ukrainian: "area_ukrainian",
  vietnamese: "area_vietnamese",
  unknown: "area_international",
  international: "area_international"
};

const listeners = new Set();

/**
 * Get currently selected language code
 * @returns {"en"|"es"|"ru"}
 */
export function getCurrentLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
      return saved;
    }
  } catch (err) {
    console.warn("Could not read language from localStorage:", err);
  }

  // Detect browser language if possible
  if (typeof navigator !== "undefined" && navigator.language) {
    const navLang = navigator.language.slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGUAGES.includes(navLang)) {
      return navLang;
    }
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Change the active language
 * @param {string} lang
 */
export function setLanguage(lang) {
  if (!SUPPORTED_LANGUAGES.includes(lang)) return;

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (err) {
    console.warn("Could not save language to localStorage:", err);
  }

  document.documentElement.setAttribute("lang", lang);
  translatePage();
  syncLanguageSelectors(lang);

  listeners.forEach((callback) => {
    try {
      callback(lang);
    } catch (err) {
      console.error("Error in language change listener:", err);
    }
  });
}

/**
 * Subscribe to language change events
 * @param {(lang: string) => void} callback
 * @returns {() => void} unsubscribe function
 */
export function onLanguageChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/**
 * Translate a key into the active language with optional parameter substitution
 * @param {string} key
 * @param {Record<string, string|number>} [params]
 * @returns {string}
 */
export function t(key, params = {}) {
  const lang = getCurrentLanguage();
  const dict = translations[lang] || translations[DEFAULT_LANGUAGE];
  let text = dict[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;

  if (params && typeof params === "object") {
    Object.keys(params).forEach((paramKey) => {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(params[paramKey]));
    });
  }

  return text;
}

/**
 * Translate category name from TheMealDB (e.g. "Chicken" -> "Курица" / "Pollo")
 * @param {string} category
 * @returns {string}
 */
export function translateCategory(category) {
  if (!category) return t("recipe_default_category");
  const clean = category.trim().toLowerCase();
  const translationKey = CATEGORY_KEY_MAP[clean];
  return translationKey ? t(translationKey) : category;
}

/**
 * Translate area/cuisine name (e.g. "Italian" -> "Итальянская" / "Italiana")
 * @param {string} area
 * @returns {string}
 */
export function translateArea(area) {
  if (!area) return "";
  const clean = area.trim().toLowerCase();
  const translationKey = AREA_KEY_MAP[clean];
  return translationKey ? t(translationKey) : area;
}

/**
 * Translate all DOM elements marked with data-i18n and data-i18n-attr
 * @param {HTMLElement|Document} [root]
 */
export function translatePage(root = document) {
  const currentLang = getCurrentLanguage();
  document.documentElement.setAttribute("lang", currentLang);

  // Update page title if element with data-i18n="page_title_..." exists
  const titleEl = root.querySelector?.("[data-i18n-page-title]");
  if (titleEl) {
    const titleKey = titleEl.getAttribute("data-i18n-page-title");
    if (titleKey) document.title = t(titleKey);
  }

  // 1. Text content: data-i18n="key"
  const elements = root.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    el.textContent = t(key);
  });

  // 2. HTML content: data-i18n-html="key"
  const htmlElements = root.querySelectorAll("[data-i18n-html]");
  htmlElements.forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (!key) return;
    el.innerHTML = t(key);
  });

  // 3. Attributes: data-i18n-attr="placeholder:search_placeholder,aria-label:nav_home"
  const attrElements = root.querySelectorAll("[data-i18n-attr]");
  attrElements.forEach((el) => {
    const mapping = el.getAttribute("data-i18n-attr");
    if (!mapping) return;

    mapping.split(",").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (attr && key) {
        el.setAttribute(attr, t(key));
      }
    });
  });
}

/**
 * Keep all language dropdown selects synchronized
 * @param {string} lang
 */
function syncLanguageSelectors(lang) {
  const selects = document.querySelectorAll(".lang-select");
  selects.forEach((select) => {
    if (select.value !== lang) {
      select.value = lang;
    }
  });
}

/**
 * Setup language selector components on the page
 */
export function initI18n() {
  const lang = getCurrentLanguage();
  document.documentElement.setAttribute("lang", lang);

  // Sync selects
  const selects = document.querySelectorAll(".lang-select");
  selects.forEach((select) => {
    select.value = lang;
    select.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  });

  // Listen for storage changes across tabs
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY && e.newValue && SUPPORTED_LANGUAGES.includes(e.newValue)) {
      setLanguage(e.newValue);
    }
  });

  translatePage();
}

