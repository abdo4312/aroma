// ============================================================
// Aroma Corner — Unified Product Types
// Single source of truth for ALL product-related types
// ============================================================

// ─── Product Type Discriminator ─────────────────────────────
export type ProductType = 'coffee-bean' | 'equipment';

// ─── Coffee Categories ──────────────────────────────────────
export type CoffeeCategory =
    | 'single-origin'
    | 'espresso-blends'
    | 'cold-brew-kits'
    | 'limited-batch'
    | 'seasonal-specials';

// ─── Equipment Categories ───────────────────────────────────
export type EquipmentCategory =
    | 'brewing-tools'
    | 'grinders'
    | 'kettles'
    | 'accessories';

// ─── Equipment Sub-Categories (brewing tools only) ──────────
export type BrewingSubCategory =
    | 'stovetop'
    | 'immersion'
    | 'pour-over'
    | 'pressure'
    | 'cold-brew-maker';

// ─── Roast Levels ───────────────────────────────────────────
export type RoastLevel = 'light' | 'medium' | 'dark' | 'cold-brew';

// ─── Difficulty Levels ──────────────────────────────────────
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// ─── Sort Options ───────────────────────────────────────────
export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name' | 'rating';

// ─── Product Variant ────────────────────────────────────────
export interface ProductVariant {
    id: string;
    name: string;      // e.g. "Size", "Color"
    value: string;     // e.g. "250g", "Silver"
    stock: number;
}

// ─── Core Product Interface ─────────────────────────────────
// One unified type for coffee beans AND equipment.
// Use `productType` to discriminate, and optional fields
// that apply only to one type.
export interface Product {
    // Identity
    id: string;
    name: string;
    description: string;
    slug?: string;             // URL-friendly name, e.g. "colombian-caramel-roast"

    // Pricing
    price: number;
    originalPrice?: number;    // for showing discounts

    // Media
    images: string[];

    // Classification
    productType: ProductType;
    category: string;          // CoffeeCategory or EquipmentCategory value
    subCategory?: string;      // BrewingSubCategory for brewing-tools only
    tags: string[];            // flexible labels: roast level, origin, flavor notes, "new", "limited", etc.

    // Stats
    rating: number;
    reviewCount: number;

    // Availability
    inStock: boolean;
    variants: ProductVariant[];

    // Flags
    isNew?: boolean;
    isFeatured?: boolean;
    isBestSeller?: boolean;

    // ── Coffee-Bean Specific ────────────────────────────────
    roastLevel?: RoastLevel;
    origin?: string;           // e.g. "Colombia", "Ethiopia"
    flavorNotes?: string[];    // e.g. ["chocolate", "citrus", "caramel"]
    weight?: string;           // default weight, e.g. "250g"

    // ── Equipment Specific ──────────────────────────────────
    difficulty?: DifficultyLevel;
    brewTime?: string;         // e.g. "3-4 min", "12-24 hrs"
    features?: string[];       // e.g. ["Rich espresso-like brew", "No electricity needed"]

    // Metadata
    createdAt: string;
}

// ─── Query / Filter Params ──────────────────────────────────
export interface ProductsQuery {
    page?: number;
    limit?: number;
    category?: string;
    subCategory?: string;
    productType?: ProductType;
    search?: string;
    sortBy?: SortOption;
    minPrice?: number;
    maxPrice?: number;
    roastLevel?: RoastLevel;
    origin?: string;
    inStock?: boolean;
}

// ─── Paginated API Response ─────────────────────────────────
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// ─── Cart Item (derived from Product) ───────────────────────
export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    roastLevel?: string;
}

// ─── Category Definition (for navigation & display) ─────────
export interface CategoryDef {
    id: string;                // e.g. 'single-origin'
    slug: string;              // e.g. 'single-origin'
    name: string;              // e.g. 'Single-Origin Beans'
    description: string;
    productType: ProductType;
    route: string;             // e.g. '/shop-beans?category=single-origin'
    /**
     * Optional image URL for the category card.
     * Centralized here so a broken image can be fixed in ONE place
     * instead of being scattered across multiple component files.
     */
    image?: string;
    subCategories?: CategoryDef[];
}