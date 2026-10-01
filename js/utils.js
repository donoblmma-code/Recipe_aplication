/**
 * Reusable utility helpers
 */

/**
 * Truncate text with ellipsis if length exceeds limit
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncateText(text, maxLength = 60) {
  if (!text || typeof text !== "string") return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Basic HTML sanitizer to prevent XSS injection
 * @param {string} str
 * @returns {string}
 */
export function sanitizeText(str) {
  if (!str || typeof str !== "string") return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  return str.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Read query parameter from current URL
 * @param {string} name
 * @returns {string|null}
 */
export function getQueryParameter(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/**
 * Debounce function to limit rapid calls
 * @param {Function} fn
 * @param {number} delayMs
 * @returns {Function}
 */
export function debounce(fn, delayMs = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delayMs);
  };
}
