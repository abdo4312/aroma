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
        subCategories: [
            {
                id: 'single-origin',
                slug: 'single-origin',
                name: 'Single-Origin Beans',
                description: 'Complex notes from seasonal farm lots. Explore unique flavors from around the world.',
                productType: 'coffee-bean',
                route: '/shop-beans?category=single-origin',
            },
            {
                id: 'espresso-blends',
                slug: 'espresso-blends',
                name: 'Espresso Blends',
                description: 'Balanced body with caramel sweetness. Perfect for your espresso machine.',
                productType: 'coffee-bean',
                route: '/shop-beans?category=espresso-blends',
            },
            {
                id: 'cold-brew-kits',
                slug: 'cold-brew-kits',
                name: 'Cold Brew Kits',
                description: 'Smooth extraction for iced coffee lovers. Pre-ground for optimal cold extraction.',
                productType: 'coffee-bean',
                route: '/shop-beans?category=cold-brew-kits',
            },
            {
                id: 'limited-batch',
                slug: 'limited-batch',
                name: 'Limited Batch',
                description: 'Rare and seasonal roasts available for a limited time only.',
                productType: 'coffee-bean',
                route: '/shop-beans?category=limited-batch',
            },
            {
                id: 'seasonal-specials',
                slug: 'seasonal-specials',
                name: 'Seasonal Specials',
                description: 'Exclusive seasonal blends and holiday editions.',
                productType: 'coffee-bean',
                route: '/shop-beans?category=seasonal-specials',
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
        subCategories: [
            {
                id: 'brewing-tools',
                slug: 'brewing-tools',
                name: 'Brewing Tools',
                description: 'Moka pots, French presses, pour-over drippers, and more.',
                productType: 'equipment',
                route: '/brew-gear?category=brewing-tools',
            },
            {
                id: 'grinders',
                slug: 'grinders',
                name: 'Grinders',
                description: 'Manual and electric grinders for the perfect grind size.',
                productType: 'equipment',
                route: '/brew-gear?category=grinders',
            },
            {
                id: 'kettles',
                slug: 'kettles',
                name: 'Kettles',
                description: 'Precision gooseneck kettles for pour-over perfection.',
                productType: 'equipment',
                route: '/brew-gear?category=kettles',
            },
            {
                id: 'accessories',
                slug: 'accessories',
                name: 'Accessories',
                description: 'Scales, filters, tampers, and other barista essentials.',
                productType: 'equipment',
                route: '/brew-gear?category=accessories',
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