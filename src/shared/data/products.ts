// ============================================================
// Aroma Corner — Unified Product Data
// ALL products (coffee beans + equipment) with proper types
// This replaces the old mockProducts.ts
// ============================================================

import type { Product } from '@/shared/types/product.types';

// ─── Coffee Beans ───────────────────────────────────────────

const coffeeBeans: Product[] = [
    // Limited Batch
    {
        id: 'golden-hour-01',
        name: 'Golden Hour Roast',
        slug: 'golden-hour-roast',
        description: 'A warm blend of hazelnut, milk chocolate, and orange zest. Available this week only, while stocks last. Sourced from the highlands of Guatemala, this limited batch captures the essence of a perfect sunset.',
        price: 60,
        originalPrice: 80,
        images: [
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'coffee-bean',
        category: 'limited-batch',
        tags: ['medium roast', 'Guatemala', 'hazelnut', 'chocolate', 'orange', 'limited'],
        rating: 4.9,
        reviewCount: 45,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: '250g', stock: 15 }],
        isNew: false,
        isFeatured: true,
        isBestSeller: false,
        roastLevel: 'medium',
        origin: 'Guatemala',
        flavorNotes: ['hazelnut', 'chocolate', 'orange'],
        weight: '250g',
        createdAt: '2024-02-10',
    },

    // Single-Origin
    {
        id: 'colombia-01',
        name: 'Colombian Caramel Roast',
        slug: 'colombian-caramel-roast',
        description: 'Velvety body with toffee finish. A classic choice for coffee lovers who appreciate smooth, sweet flavors.',
        price: 65,
        images: [
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'coffee-bean',
        category: 'single-origin',
        tags: ['medium roast', 'Colombia', 'caramel', 'toffee'],
        rating: 4.8,
        reviewCount: 124,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Size', value: '250g', stock: 50 },
            { id: 'v2', name: 'Size', value: '500g', stock: 30 }
        ],
        isNew: false,
        isFeatured: false,
        isBestSeller: true,
        roastLevel: 'medium',
        origin: 'Colombia',
        flavorNotes: ['caramel', 'toffee'],
        weight: '250g',
        createdAt: '2024-01-15',
    },
    {
        id: 'ethiopia-02',
        name: 'Ethiopian Bloom Beans',
        slug: 'ethiopian-bloom-beans',
        description: 'Floral aroma and citrus sparkle. Perfect for pour-over enthusiasts.',
        price: 72,
        originalPrice: 85,
        images: [
            'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'coffee-bean',
        category: 'single-origin',
        tags: ['light roast', 'Ethiopia', 'floral', 'citrus', 'new'],
        rating: 4.9,
        reviewCount: 89,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: '250g', stock: 25 }],
        isNew: true,
        isFeatured: true,
        isBestSeller: false,
        roastLevel: 'light',
        origin: 'Ethiopia',
        flavorNotes: ['floral', 'citrus'],
        weight: '250g',
        createdAt: '2024-02-01',
    },
    {
        id: 'kenya-05',
        name: 'Kenyan Peaberry Reserve',
        slug: 'kenyan-peaberry-reserve',
        description: 'Wine-like acidity with blackcurrant notes. A rare treat for connoisseurs.',
        price: 85,
        images: [
            'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'coffee-bean',
        category: 'single-origin',
        tags: ['light roast', 'Kenya', 'fruity', 'acidic', 'new'],
        rating: 4.9,
        reviewCount: 42,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: '200g', stock: 20 }],
        isNew: true,
        isFeatured: false,
        isBestSeller: false,
        roastLevel: 'light',
        origin: 'Kenya',
        flavorNotes: ['fruity', 'acidic'],
        weight: '200g',
        createdAt: '2024-02-05',
    },
    {
        id: 'brazil-06',
        name: 'Brazilian Nutty Delight',
        slug: 'brazilian-nutty-delight',
        description: 'Hazelnut and milk chocolate profile. Comfort in every cup.',
        price: 55,
        images: [
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'coffee-bean',
        category: 'single-origin',
        tags: ['medium roast', 'Brazil', 'nutty', 'chocolate'],
        rating: 4.5,
        reviewCount: 167,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: '250g', stock: 45 }],
        isNew: false,
        isFeatured: false,
        isBestSeller: true,
        roastLevel: 'medium',
        origin: 'Brazil',
        flavorNotes: ['nutty', 'chocolate'],
        weight: '250g',
        createdAt: '2024-01-10',
    },
    {
        id: 'sumatra-07',
        name: 'Sumatra Dark Majesty',
        slug: 'sumatra-dark-majesty',
        description: 'Earthy, spicy with heavy body. For those who like it bold.',
        price: 68,
        images: [
            'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'coffee-bean',
        category: 'single-origin',
        tags: ['dark roast', 'Indonesia', 'earthy', 'spicy'],
        rating: 4.6,
        reviewCount: 93,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: '250g', stock: 35 }],
        isNew: false,
        isFeatured: false,
        isBestSeller: false,
        roastLevel: 'dark',
        origin: 'Indonesia',
        flavorNotes: ['earthy', 'spicy'],
        weight: '250g',
        createdAt: '2024-01-18',
    },
    {
        id: 'guatemala-09',
        name: 'Guatemalan Antigua',
        slug: 'guatemalan-antigua',
        description: 'Spicy with dark cocoa undertones. A Central American classic.',
        price: 62,
        originalPrice: 75,
        images: [
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'coffee-bean',
        category: 'single-origin',
        tags: ['medium roast', 'Guatemala', 'spicy', 'cocoa'],
        rating: 4.8,
        reviewCount: 134,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: '250g', stock: 40 }],
        isNew: false,
        isFeatured: false,
        isBestSeller: true,
        roastLevel: 'medium',
        origin: 'Guatemala',
        flavorNotes: ['spicy', 'cocoa'],
        weight: '250g',
        createdAt: '2024-01-22',
    },
    {
        id: 'peru-10',
        name: 'Peruvian Organic Select',
        slug: 'peruvian-organic-select',
        description: 'Clean, mild with nutty finish. Certified organic goodness.',
        price: 70,
        images: [
            'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'coffee-bean',
        category: 'single-origin',
        tags: ['light roast', 'Peru', 'organic', 'clean'],
        rating: 4.6,
        reviewCount: 56,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: '250g', stock: 30 }],
        isNew: false,
        isFeatured: false,
        isBestSeller: false,
        roastLevel: 'light',
        origin: 'Peru',
        flavorNotes: ['organic', 'clean'],
        weight: '250g',
        createdAt: '2024-02-03',
    },
    {
        id: 'honduras-12',
        name: 'Honduras Honey Process',
        slug: 'honduras-honey-process',
        description: 'Sweet, syrupy with berry notes. Unique honey processing method.',
        price: 75,
        images: [
            'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'coffee-bean',
        category: 'single-origin',
        tags: ['medium roast', 'Honduras', 'honey', 'berry', 'new'],
        rating: 4.8,
        reviewCount: 38,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: '250g', stock: 22 }],
        isNew: true,
        isFeatured: true,
        isBestSeller: false,
        roastLevel: 'medium',
        origin: 'Honduras',
        flavorNotes: ['honey', 'berry'],
        weight: '250g',
        createdAt: '2024-02-08',
    },

    // Espresso Blends
    {
        id: 'espresso-03',
        name: 'Midnight Espresso Blend',
        slug: 'midnight-espresso-blend',
        description: 'Dark cocoa and smoky sweetness. The foundation of a perfect shot.',
        price: 58,
        images: [
            'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'coffee-bean',
        category: 'espresso-blends',
        tags: ['dark roast', 'Blend', 'cocoa', 'espresso'],
        rating: 4.7,
        reviewCount: 256,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Size', value: '500g', stock: 40 },
            { id: 'v2', name: 'Size', value: '1kg', stock: 15 }
        ],
        isNew: false,
        isFeatured: false,
        isBestSeller: true,
        roastLevel: 'dark',
        flavorNotes: ['cocoa', 'espresso'],
        weight: '500g',
        createdAt: '2024-01-20',
    },
    {
        id: 'italy-11',
        name: 'Italian Roast Classic',
        slug: 'italian-roast-classic',
        description: 'Intense, smoky with burnt sugar. Traditional Italian espresso style.',
        price: 48,
        images: [
            'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'coffee-bean',
        category: 'espresso-blends',
        tags: ['dark roast', 'Blend', 'smoky', 'intense'],
        rating: 4.4,
        reviewCount: 189,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: '500g', stock: 50 }],
        isNew: false,
        isFeatured: false,
        isBestSeller: false,
        roastLevel: 'dark',
        flavorNotes: ['smoky', 'intense'],
        weight: '500g',
        createdAt: '2024-01-12',
    },

    // Cold Brew Kits
    {
        id: 'coldbrew-04',
        name: 'Vanilla Cold Brew Pack',
        slug: 'vanilla-cold-brew-pack',
        description: 'Smooth finish for iced coffee days. Pre-ground for optimal cold extraction.',
        price: 45,
        images: [
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'coffee-bean',
        category: 'cold-brew-kits',
        tags: ['cold brew', 'Guatemala', 'vanilla', 'iced'],
        rating: 4.6,
        reviewCount: 78,
        inStock: true,
        variants: [{ id: 'v1', name: 'Pack', value: '3 servings', stock: 60 }],
        isNew: false,
        isFeatured: false,
        isBestSeller: false,
        roastLevel: 'cold-brew',
        origin: 'Guatemala',
        flavorNotes: ['vanilla', 'iced'],
        createdAt: '2024-01-25',
    },
    {
        id: 'coldbrew-08',
        name: 'Citrus Cold Brew Box',
        slug: 'citrus-cold-brew-box',
        description: 'Bright orange and honey sweetness. Summer in a glass.',
        price: 52,
        images: [
            'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'coffee-bean',
        category: 'cold-brew-kits',
        tags: ['cold brew', 'Ethiopia', 'citrus', 'honey'],
        rating: 4.7,
        reviewCount: 61,
        inStock: true,
        variants: [{ id: 'v1', name: 'Pack', value: '5 servings', stock: 25 }],
        isNew: false,
        isFeatured: false,
        isBestSeller: false,
        roastLevel: 'cold-brew',
        origin: 'Ethiopia',
        flavorNotes: ['citrus', 'honey'],
        createdAt: '2024-01-28',
    },
];

// ─── Equipment ──────────────────────────────────────────────

const equipment: Product[] = [
    // Brewing Tools
    {
        id: 'dripper-01',
        name: 'Ceramic V60 Dripper',
        slug: 'ceramic-v60-dripper',
        description: 'Classic pour-over design with spiral ridges. Brews clean, bright coffee.',
        price: 95,
        images: [
            'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'equipment',
        category: 'brewing-tools',
        subCategory: 'pour-over',
        tags: ['dripper', 'pour-over', 'ceramic', 'V60'],
        rating: 4.8,
        reviewCount: 234,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Size', value: '02', stock: 45 },
            { id: 'v2', name: 'Size', value: '01', stock: 30 }
        ],
        isNew: false,
        isFeatured: false,
        isBestSeller: true,
        difficulty: 'intermediate',
        brewTime: '3-4 min',
        features: ['Classic pour-over design', 'Spiral ridges', 'Brews clean, bright coffee'],
        createdAt: '2024-01-20',
    },
    {
        id: 'frenchpress-01',
        name: 'French Press 1L',
        slug: 'french-press-1l',
        description: 'Classic full-immersion brewer. Rich, full-bodied coffee in minutes.',
        price: 145,
        images: [
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'equipment',
        category: 'brewing-tools',
        subCategory: 'immersion',
        tags: ['french press', 'immersion', 'glass', 'classic'],
        rating: 4.5,
        reviewCount: 112,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: '1L', stock: 35 }],
        isNew: false,
        isFeatured: false,
        isBestSeller: false,
        difficulty: 'beginner',
        brewTime: '4 min',
        features: ['Full-bodied flavor', 'Simple technique', 'No paper filters'],
        createdAt: '2024-02-01',
    },
    {
        id: 'aeropress-01',
        name: 'AeroPress Original',
        slug: 'aeropress-original',
        description: 'Versatile and portable. Makes smooth, rich coffee in under a minute.',
        price: 250,
        images: [
            'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'equipment',
        category: 'brewing-tools',
        subCategory: 'pressure',
        tags: ['aeropress', 'portable', 'immersion', 'versatile', 'new'],
        rating: 4.9,
        reviewCount: 289,
        inStock: true,
        variants: [{ id: 'v1', name: 'Version', value: 'Original', stock: 40 }],
        isNew: true,
        isFeatured: true,
        isBestSeller: true,
        difficulty: 'intermediate',
        brewTime: '1-2 min',
        features: ['Fast brewing', 'Travel-friendly', 'Versatile recipes'],
        createdAt: '2024-02-05',
    },
    {
        id: 'moka-pot',
        name: 'Moka Pot',
        slug: 'moka-pot',
        description: 'The classic Italian stovetop espresso maker. Creates a bold, concentrated coffee through pressurized steam extraction.',
        price: 95,
        images: [
            'https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=600&q=80',
        ],
        productType: 'equipment',
        category: 'brewing-tools',
        subCategory: 'stovetop',
        tags: ['moka pot', 'stovetop', 'espresso', 'classic'],
        rating: 4.6,
        reviewCount: 156,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: '3 cup', stock: 30 }],
        isNew: false,
        isFeatured: false,
        isBestSeller: false,
        difficulty: 'beginner',
        brewTime: '5-7 min',
        features: ['Rich espresso-like brew', 'No electricity needed', 'Easy to use', 'Affordable'],
        createdAt: '2024-01-08',
    },
    {
        id: 'chemex',
        name: 'Chemex',
        slug: 'chemex',
        description: 'An elegant lab-glass brewer with thick bonded filters. Produces an exceptionally clean, sediment-free cup.',
        price: 230,
        images: [
            'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?auto=format&fit=crop&w=600&q=80',
        ],
        productType: 'equipment',
        category: 'brewing-tools',
        subCategory: 'pour-over',
        tags: ['chemex', 'pour-over', 'glass', 'elegant'],
        rating: 4.7,
        reviewCount: 98,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: '6 cups', stock: 20 }],
        isNew: false,
        isFeatured: false,
        isBestSeller: false,
        difficulty: 'intermediate',
        brewTime: '4-5 min',
        features: ['Elegant design', 'Ultra-clean brew', 'No bitterness', 'Beautiful to display'],
        createdAt: '2024-01-14',
    },
    {
        id: 'cold-brew-tower',
        name: 'Cold Brew Tower',
        slug: 'cold-brew-tower',
        description: 'Slow cold-water drip extracts smooth, sweet cold brew concentrate over 12-24 hours. No heat, no acidity.',
        price: 380,
        images: [
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
        ],
        productType: 'equipment',
        category: 'brewing-tools',
        subCategory: 'cold-brew-maker',
        tags: ['cold brew', 'tower', 'slow drip', 'premium'],
        rating: 4.5,
        reviewCount: 34,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: 'Standard', stock: 10 }],
        isNew: false,
        isFeatured: true,
        isBestSeller: false,
        difficulty: 'advanced',
        brewTime: '12-24 hrs',
        features: ['Ultra-smooth flavor', 'Low acidity', 'Makes concentrate', 'Stunning centerpiece'],
        createdAt: '2024-01-28',
    },

    // Grinders
    {
        id: 'grinder-01',
        name: 'Porlex Mini Grinder',
        slug: 'porlex-mini-grinder',
        description: 'Compact hand grinder with ceramic burrs. Perfect for travel and precision grinding.',
        price: 320,
        images: [
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'equipment',
        category: 'grinders',
        tags: ['grinder', 'manual', 'ceramic', 'travel'],
        rating: 4.7,
        reviewCount: 89,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Color', value: 'Silver', stock: 20 },
            { id: 'v2', name: 'Color', value: 'Black', stock: 15 }
        ],
        isNew: false,
        isFeatured: false,
        isBestSeller: false,
        features: ['Ceramic burrs', 'Travel-friendly', 'Precision grinding', 'Compact design'],
        createdAt: '2024-01-10',
    },
    {
        id: 'pro-grinder-01',
        name: 'Professional Manual Grinder',
        slug: 'professional-manual-grinder',
        description: 'High-quality hand grinder with adjustable settings. Perfect for serious coffee enthusiasts.',
        price: 420,
        images: [
            'https://images.unsplash.com/photo-1585445497204-94e26c6fabfc?auto=format&fit=crop&q=80&w=400',
        ],
        productType: 'equipment',
        category: 'grinders',
        tags: ['grinder', 'manual', 'professional', 'adjustable'],
        rating: 4.8,
        reviewCount: 67,
        inStock: true,
        variants: [{ id: 'v1', name: 'Color', value: 'Matte Black', stock: 15 }],
        isNew: false,
        isFeatured: false,
        isBestSeller: false,
        features: ['Adjustable grind settings', 'Stainless steel burrs', 'Ergonomic handle', 'Anti-static'],
        createdAt: '2024-01-18',
    },

    // Kettles
    {
        id: 'kettle-01',
        name: 'Gooseneck Pour-Over Kettle',
        slug: 'gooseneck-pour-over-kettle',
        description: 'Precision pouring with built-in thermometer. Essential for pour-over perfection.',
        price: 280,
        images: [
            'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'equipment',
        category: 'kettles',
        tags: ['kettle', 'pour-over', 'thermometer', 'stainless'],
        rating: 4.9,
        reviewCount: 156,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: '1L', stock: 30 }],
        isNew: false,
        isFeatured: true,
        isBestSeller: true,
        features: ['Precision gooseneck spout', 'Built-in thermometer', 'Stainless steel', 'Ergonomic handle'],
        createdAt: '2024-01-15',
    },
    {
        id: 'matte-kettle-01',
        name: 'Matte Black Pour-over Kettle',
        slug: 'matte-black-pour-over-kettle',
        description: 'Stylish matte finish with precision gooseneck spout. A barista favorite.',
        price: 210,
        images: [
            'https://images.unsplash.com/photo-1577939748584-42bc9776832e?auto=format&fit=crop&q=80&w=400',
        ],
        productType: 'equipment',
        category: 'kettles',
        tags: ['kettle', 'pour-over', 'matte black', 'barista'],
        rating: 4.7,
        reviewCount: 78,
        inStock: true,
        variants: [{ id: 'v1', name: 'Size', value: '800ml', stock: 25 }],
        isNew: false,
        isFeatured: false,
        isBestSeller: false,
        features: ['Matte black finish', 'Gooseneck spout', 'Heat-resistant handle', 'Drip-free pour'],
        createdAt: '2024-01-22',
    },

    // Accessories
    {
        id: 'scale-01',
        name: 'Digital Coffee Scale',
        slug: 'digital-coffee-scale',
        description: 'Precise measurements with timer function. Essential for consistent brewing.',
        price: 180,
        originalPrice: 220,
        images: [
            'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80'
        ],
        productType: 'equipment',
        category: 'accessories',
        tags: ['scale', 'digital', 'timer', 'precision'],
        rating: 4.6,
        reviewCount: 178,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Color', value: 'Black', stock: 25 },
            { id: 'v2', name: 'Color', value: 'White', stock: 20 }
        ],
        isNew: false,
        isFeatured: false,
        isBestSeller: true,
        features: ['0.1g precision', 'Built-in timer', 'USB rechargeable', 'Compact design'],
        createdAt: '2024-01-25',
    },
    {
        id: 'smart-scale-01',
        name: 'Smart Digital Scale',
        slug: 'smart-digital-scale',
        description: 'Bluetooth-connected scale with real-time flow rate display and app integration.',
        price: 145,
        images: [
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400',
        ],
        productType: 'equipment',
        category: 'accessories',
        tags: ['scale', 'smart', 'bluetooth', 'app'],
        rating: 4.5,
        reviewCount: 45,
        inStock: true,
        variants: [{ id: 'v1', name: 'Color', value: 'Silver', stock: 18 }],
        isNew: true,
        isFeatured: false,
        isBestSeller: false,
        features: ['Bluetooth connectivity', 'Real-time flow rate', 'Companion app', 'Rechargeable battery'],
        createdAt: '2024-02-02',
    },
];

// ─── Export All Products ─────────────────────────────────────

export const allProducts: Product[] = [...coffeeBeans, ...equipment];

// ─── Lookup Helpers ──────────────────────────────────────────

export function getProductById(id: string): Product | undefined {
    return allProducts.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
    return allProducts.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
    return allProducts.filter((p) => p.category === category);
}

export function getProductsByType(productType: 'coffee-bean' | 'equipment'): Product[] {
    return allProducts.filter((p) => p.productType === productType);
}

export function getFeaturedProducts(): Product[] {
    return allProducts.filter((p) => p.isFeatured);
}

export function getBestSellers(): Product[] {
    return allProducts.filter((p) => p.isBestSeller);
}

export function getNewArrivals(): Product[] {
    return allProducts.filter((p) => p.isNew);
}