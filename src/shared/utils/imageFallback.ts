/**
 * imageFallback
 * ============
 * Utilities for gracefully handling broken <img> tags.
 *
 * Problem we're solving:
 *   Unsplash URLs occasionally go 404 (e.g. the "aefda" typo we just fixed).
 *   Without a fallback, the user sees a broken image icon or empty box.
 *
 * Solution:
 *   Pass `handleImageError` to <img onError={...}>. When the image fails
 *   to load, it gets replaced with a coffee-themed SVG data URI.
 *
 * Usage:
 *   import { handleImageError, COFFEE_PLACEHOLDER } from '@/shared/utils/imageFallback';
 *
 *   <img
 *     src={category.image}
 *     alt={category.name}
 *     onError={handleImageError}
 *   />
 *
 *   // Or use the placeholder directly:
 *   <img src={brokenUrl || COFFEE_PLACEHOLDER} alt="..." />
 */

/**
 * Coffee-themed SVG placeholder, encoded as a data URI.
 * Uses the project's coffee palette (matches tailwind.config.js):
 *   - Background: gradient from coffee-700 to coffee-900
 *   - Icon: coffee-400 (gold accent)
 *
 * SVG dimensions: 600x600 (matches typical Unsplash w=600&q=80 usage).
 */
const PLACEHOLDER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5f3a26"/>
      <stop offset="100%" stop-color="#3f2518"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <g transform="translate(220, 200)" fill="none" stroke="#d9aa7b" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
    <path d="M 80 40 L 80 130 Q 80 170 40 170 L 40 170 Q 0 170 0 130 L 0 40 Z"/>
    <path d="M 80 60 Q 110 60 110 90 Q 110 120 80 120"/>
    <path d="M 25 5 Q 22 -5 28 -15 M 50 5 Q 47 -5 53 -15 M 75 5 Q 72 -5 78 -15" stroke-width="4"/>
  </g>
  <text x="300" y="420" font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="#d9aa7b" text-anchor="middle" letter-spacing="2">AROMA CORNER</text>
  <text x="300" y="455" font-family="system-ui, sans-serif" font-size="14" font-weight="400" fill="#d9aa7b" text-anchor="middle" opacity="0.7">image unavailable</text>
</svg>`;

/**
 * The placeholder as a ready-to-use data URI.
 * Use as a fallback when an image URL is known to be broken.
 */
export const COFFEE_PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(PLACEHOLDER_SVG)}`;

/**
 * Error handler for <img onError={...}>.
 *
 * When an image fails to load:
 *   1. Replace the src with the coffee-themed placeholder.
 *   2. Set a data attribute so we can detect already-failed images
 *      (prevents infinite onError loops if the placeholder itself fails).
 *
 * Type-safe: works with both <img> and React.SyntheticEvent<HTMLImageElement>.
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement>): void {
    const img = event.currentTarget;
    // Guard against infinite loops: if the placeholder itself fails, give up.
    if (img.dataset.fallbackApplied === 'true') return;
    img.dataset.fallbackApplied = 'true';
    img.src = COFFEE_PLACEHOLDER;
    // Slightly reduce visual prominence of fallback images
    img.style.opacity = '0.85';
}