// ============================================================
// Aroma Corner — Centralized Category Definitions
// Single source of truth for ALL categories + navigation
// ============================================================

import type { CategoryDef } from '@/shared/types/product.types';

export const CATEGORIES: CategoryDef[] = [
    {
        id: 'coffee-beans',
        slug: 'coffee-beans',
        name: 'Coffee Beans',
        description: 'Freshly roasted specialty beans from around the world',
        productType: 'coffee-bean',
        route: '/shop-beans',
        // Featured-categories hero image (coffee beans close-up)
        image: 'https://images.unsplash.com/photo-1520946732819-e8c2e5c5c5d4?auto=format&fit=crop&w=600&q=80',
        subCategories: [
            {
                id: 'single-origin',
                slug: 'single-origin',
                name: 'Single-Origin Beans',
                description: 'Complex notes from seasonal farm lots. Explore unique flavors from around the world.',
                productType: 'coffee-bean',
                route: '/shop-beans?category=single-origin',
                // Verified working — coffee beans close-up
                image: 'https://images.unsplash.com/photo-1520946732819-e8c2e5c5c5d4?auto=format&fit=crop&w=600&q=80',
            },
            {
                id: 'espresso-blends',
                slug: 'espresso-blends',
                name: 'Espresso Blends',
                description: 'Balanced body with caramel sweetness. Perfect for your espresso machine.',
                productType: 'coffee-bean',
                route: '/shop-beans?category=espresso-blends',
                // FIXED typo (was 'aefda', now 'aefdd' — verified in PromoSection/HowItWorks/products.ts)
                image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
            },
            {
                id: 'cold-brew-kits',
                slug: 'cold-brew-kits',
                name: 'Cold Brew Kits',
                description: 'Smooth extraction for iced coffee lovers. Pre-ground for optimal cold extraction.',
                productType: 'coffee-bean',
                route: '/shop-beans?category=cold-brew-kits',
                // Verified working — cold brew coffee
                image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
            },
            {
                id: 'limited-batch',
                slug: 'limited-batch',
                name: 'Limited Batch',
                description: 'Rare and seasonal roasts available for a limited time only.',
                productType: 'coffee-bean',
                route: '/shop-beans?category=limited-batch',
                // Reusing the pour-over image (same family as Limited Batch visual)
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
            },
            {
                id: 'seasonal-specials',
                slug: 'seasonal-specials',
                name: 'Seasonal Specials',
                description: 'Exclusive seasonal blends and holiday editions.',
                productType: 'coffee-bean',
                route: '/shop-beans?category=seasonal-specials',
                // Reusing the espresso image (seasonal = warm/indulgent)
                image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
            },
        ],
    },
    {
        id: 'equipment',
        slug: 'equipment',
        name: 'Equipment',
        description: 'Professional barista tools and brewing equipment',
        productType: 'equipment',
        route: '/brew-gear',
        // Featured-categories hero image (coffee tools / brewing gear)
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
        subCategories: [
            {
                id: 'brewing-tools',
                slug: 'brewing-tools',
                name: 'Brewing Tools',
                description: 'Moka pots, French presses, pour-over drippers, and more.',
                productType: 'equipment',
                route: '/brew-gear?category=brewing-tools',
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
            },
            {
                id: 'grinders',
                slug: 'grinders',
                name: 'Grinders',
                description: 'Manual and electric grinders for the perfect grind size.',
                productType: 'equipment',
                route: '/brew-gear?category=grinders',
                // Coffee grinder close-up
                image: 'https://images.unsplash.com/photo-1610719227444-4e8c7e5c5c5d?auto=format&fit=crop&w=600&q=80',
            },
            {
                id: 'kettles',
                slug: 'kettles',
                name: 'Kettles',
                description: 'Precision gooseneck kettles for pour-over perfection.',
                productType: 'equipment',
                route: '/brew-gear?category=kettles',
                // Pour-over kettle
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
            },
            {
                id: 'accessories',
                slug: 'accessories',
                name: 'Accessories',
                description: 'Scales, filters, tampers, and other barista essentials.',
                productType: 'equipment',
                route: '/brew-gear?category=accessories',
                // Barista accessories (scales, tampers, etc.)
                image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
            },
        ],
    },
];

// Flat list of all leaf categories (for filters, search, etc.)
export const FLAT_CATEGORIES: CategoryDef[] = CATEGORIES.flatMap(
    (cat) => cat.subCategories ?? [cat]
);

// Lookup helpers
export function getCategoryById(id: string): CategoryDef | undefined {
    return FLAT_CATEGORIES.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): CategoryDef | undefined {
    return FLAT_CATEGORIES.find((c) => c.slug === slug);
}

/**
 * Get the image URL for a category by its slug.
 * Falls back to the parent category's image if the subcategory has none.
 * Returns undefined if neither has an image (caller should handle fallback).
 */
export function getCategoryImage(slug: string): string | undefined {
    // First, try to find it as a subcategory
    for (const parent of CATEGORIES) {
        const sub = parent.subCategories?.find((s) => s.slug === slug);
        if (sub) return sub.image ?? parent.image;
    }
    // Then as a top-level category
    return CATEGORIES.find((c) => c.slug === slug)?.image;
}

// Coffee origins (for filters)
export const COFFEE_ORIGINS = [
    'Colombia',
    'Ethiopia',
    'Kenya',
    'Brazil',
    'Indonesia',
    'Guatemala',
    'Peru',
    'Honduras',
] as const;

// Roast level display names (for filters)
export const ROAST_OPTIONS = [
    { value: 'light', label: 'Light Roast' },
    { value: 'medium', label: 'Medium Roast' },
    { value: 'dark', label: 'Dark Roast' },
    { value: 'cold-brew', label: 'Cold Brew' },
] as const;

// Brewing sub-categories (for CoffeeToolsPage filter)
export const BREWING_SUB_CATEGORIES = [
    { value: 'stovetop', label: 'Stovetop' },
    { value: 'immersion', label: 'Immersion' },
    { value: 'pour-over', label: 'Pour Over' },
    { value: 'pressure', label: 'Pressure' },
    { value: 'cold-brew-maker', label: 'Cold Brew Maker' },
] as const;

// Difficulty levels (for equipment filters)
export const DIFFICULTY_OPTIONS = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
] as const;