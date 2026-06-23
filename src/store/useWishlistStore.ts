import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
    items: string[];
    addItem: (id: string) => void;
    removeItem: (id: string) => void;
    toggleItem: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    clearWishlist: () => void;
    getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (id) =>
                set((state) => ({
                    items: state.items.includes(id) ? state.items : [...state.items, id],
                })),

            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((i) => i !== id),
                })),

            toggleItem: (id) => {
                if (get().isInWishlist(id)) {
                    get().removeItem(id);
                } else {
                    get().addItem(id);
                }
            },

            isInWishlist: (id) => get().items.includes(id),

            clearWishlist: () => set({ items: [] }),

            getTotalItems: () => get().items.length,
        }),
        {
            name: 'aroma-wishlist-storage',
        }
    )
);