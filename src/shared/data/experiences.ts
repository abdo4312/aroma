// ============================================================
// Aroma Corner — Experience Data
// Booking plans, gift cards, brew guides, box sizes
// ============================================================

import type { BookingPlan, GiftCard, BrewGuide } from '@/shared/types/experience.types';

// ─── Booking Plans ──────────────────────────────────────────

export const bookingPlans: BookingPlan[] = [
    {
        id: 'single',
        name: 'Focus Corner',
        description: 'Ideal single table for study or remote work with total peace.',
        pricePerHour: 25,
        features: ['Comfortable seat & private charger', 'Ultra-fast internet', '10% discount on drinks'],
        isPopular: false,
        maxGuests: 1,
        gradient: 'from-[#D4B895] to-[#C3A077]',
    },
    {
        id: 'duo',
        name: "Friends' Spot",
        description: 'Cozy table for 2 to 4 people, perfect for conversation.',
        pricePerHour: 45,
        features: ['Premium view', 'Fast hospitality service', 'Pre-booking available', 'Quiet corner'],
        isPopular: true,
        maxGuests: 4,
        gradient: 'from-[#8C6239] to-[#6B4423]',
    },
    {
        id: 'meeting',
        name: 'Meeting Room',
        description: 'Fully equipped private space for formal meetings or workshops.',
        pricePerHour: 150,
        features: ['Smart display screen', 'Whiteboard', 'Complimentary coffee', 'Total privacy'],
        isPopular: false,
        maxGuests: 10,
        gradient: 'from-[#4A3B32] to-[#2E1F18]',
    },
];

// ─── Gift Cards ─────────────────────────────────────────────

export const giftCards: GiftCard[] = [
    {
        id: 'bronze',
        amount: 100,
        title: 'Morning Card',
        gradient: 'from-[#D4B895] to-[#A68A68]',
        perks: ['Valid for 6 months', 'Valid for all coffee tools'],
        validity: '6 months',
    },
    {
        id: 'silver',
        amount: 250,
        title: 'Mood Card',
        gradient: 'from-[#8C6239] to-[#6B4423]',
        perks: ['Valid for 1 year', 'Free Gift Wrap', 'One-time Free Shipping'],
        validity: '1 year',
    },
    {
        id: 'gold',
        amount: 500,
        title: 'Barista Card',
        gradient: 'from-[#4A3B32] to-[#2E1F18]',
        perks: ['Lifetime Validity', 'Ultra-Premium Gift Wrap', '10% Discount on Next Order'],
        validity: 'Lifetime',
    },
];

// ─── Brew Guides ────────────────────────────────────────────

export const brewGuides: BrewGuide[] = [
    {
        id: 'v60',
        title: 'V60 Pour Over',
        method: 'V60 Pour Over',
        difficulty: 'intermediate',
        brewTime: '3:00 min',
        image: 'https://images.unsplash.com/photo-1544787210-22da3ef59ba3?w=800',
        specs: [
            { label: 'Ratio', value: '1:15' },
            { label: 'Temp', value: '92°C' },
            { label: 'Time', value: '3:00 min' },
            { label: 'Grind', value: 'Medium Fine' },
        ],
        steps: [
            { step: 1, title: 'Prepare Filter', description: 'Place the filter and wet it with hot water to remove any paper taste.', tip: 'Discard the rinse water before adding coffee.' },
            { step: 2, title: 'Bloom', description: 'Add 20 grams of ground coffee and start blooming with 40 ml water.', tip: 'Wait 30 seconds for the bloom to release gases.' },
            { step: 3, title: 'Pour', description: 'Pour water in steady circular motions until you reach 300 ml.', tip: 'Keep the water level consistent for even extraction.' },
            { step: 4, title: 'Enjoy', description: 'Enjoy a clean cup of coffee with clear flavors.' },
        ],
    },
    {
        id: 'chemex',
        title: 'Chemex',
        method: 'Chemex',
        difficulty: 'intermediate',
        brewTime: '4:30 min',
        image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=800',
        specs: [
            { label: 'Ratio', value: '1:16' },
            { label: 'Temp', value: '94°C' },
            { label: 'Time', value: '4:30 min' },
            { label: 'Grind', value: 'Medium Coarse' },
        ],
        steps: [
            { step: 1, title: 'Prepare Filter', description: 'Use a thick Chemex filter for high clarity.' },
            { step: 2, title: 'Start Pouring', description: 'Start by pouring water slowly in the center then move outwards.', tip: 'Avoid pouring directly on the filter walls.' },
            { step: 3, title: 'Maintain Flow', description: 'Maintain a steady flow of water throughout the brew.' },
            { step: 4, title: 'Serve', description: 'The result will be a balanced acidity and light body.' },
        ],
    },
    {
        id: 'aeropress',
        title: 'AeroPress',
        method: 'AeroPress',
        difficulty: 'beginner',
        brewTime: '2:00 min',
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800',
        specs: [
            { label: 'Ratio', value: '1:13' },
            { label: 'Temp', value: '85°C' },
            { label: 'Time', value: '2:00 min' },
            { label: 'Grind', value: 'Fine' },
        ],
        steps: [
            { step: 1, title: 'Add Coffee & Water', description: 'Place the coffee in the tool and add hot water.', tip: 'Use water just off the boil for best results.' },
            { step: 2, title: 'Stir', description: 'Stir the mixture for 10 seconds for consistency.' },
            { step: 3, title: 'Press', description: 'Wait for one minute then start pressing slowly.', tip: 'Press gently to avoid channeling.' },
            { step: 4, title: 'Serve', description: 'Ideal for obtaining a concentrated coffee similar to espresso.' },
        ],
    },
];

// ─── Box Sizes (Build Your Box) ─────────────────────────────

export interface BoxSize {
    id: string;
    size: number;
    discount: number;
    label: string;
    description: string;
    popular: boolean;
}

export const BOX_SIZES: BoxSize[] = [
    {
        id: 'small',
        size: 3,
        discount: 10,
        label: 'Starter Box',
        description: 'Perfect for trying new flavors',
        popular: false,
    },
    {
        id: 'medium',
        size: 6,
        discount: 15,
        label: 'Explorer Box',
        description: 'Most popular choice',
        popular: true,
    },
    {
        id: 'large',
        size: 12,
        discount: 20,
        label: 'Connoisseur Box',
        description: 'Best value for coffee lovers',
        popular: false,
    },
];

// ─── Lookup Helpers ──────────────────────────────────────────

export function getBookingPlanById(id: string): BookingPlan | undefined {
    return bookingPlans.find((p) => p.id === id);
}

export function getGiftCardById(id: string): GiftCard | undefined {
    return giftCards.find((c) => c.id === id);
}

export function getBrewGuideById(id: string): BrewGuide | undefined {
    return brewGuides.find((g) => g.id === id);
}