// ============================================================
// Aroma Corner — Experience Types
// Types for non-product offerings: bookings, gift cards, brew guides
// ============================================================

import type { DifficultyLevel } from './product.types';

// ─── Table Booking ──────────────────────────────────────────

export interface BookingPlan {
    id: string;
    name: string;
    description: string;
    pricePerHour: number;
    features: string[];
    isPopular?: boolean;
    maxGuests: number;
    gradient: string;          // e.g. 'from-[#D4B895] to-[#C3A077]'
}

// ─── Gift Cards ─────────────────────────────────────────────

export interface GiftCard {
    id: string;
    amount: number;
    title: string;
    gradient: string;          // e.g. 'from-[#8C6239] to-[#6B4423]'
    perks: string[];
    validity: string;          // e.g. "6 months", "1 year", "Lifetime"
}

// ─── Brew Guides ────────────────────────────────────────────

export interface BrewGuideStep {
    step: number;
    title: string;
    description: string;
    tip?: string;
}

export interface BrewGuideSpec {
    label: string;             // e.g. "Ratio", "Temp", "Time", "Grind"
    value: string;             // e.g. "1:15", "92°C", "3:00 min", "Medium Fine"
}

export interface BrewGuide {
    id: string;
    title: string;
    method: string;            // e.g. "V60 Pour Over", "Chemex", "AeroPress"
    difficulty: DifficultyLevel;
    brewTime: string;          // e.g. "3-4 min"
    image: string;
    specs: BrewGuideSpec[];
    steps: BrewGuideStep[];
}

// ─── Consultation ───────────────────────────────────────────

export interface ConsultationRequest {
    name: string;
    phone: string;
    experience: 'beginner' | 'intermediate' | 'pro';
    budget: string;
    message: string;
}