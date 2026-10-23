import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/shared/types/product.types';

interface CartState {
    items: CartItem[];
    addItem: (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (newItem) => {
                const { items } = get();
                const existingItem = items.find((item) => item.id === newItem.id);
                const quantityToAdd = newItem.quantity || 1;

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === newItem.id
                                ? { ...item, quantity: item.quantity + quantityToAdd }
                                : item
                        ),
                    });
                } else {
                    set({
                        items: [...items, { ...newItem, quantity: quantityToAdd } as CartItem],
                    });
                }
            },

            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),

            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id);
                    return;
                }
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            getTotalItems: () => {
                return get().items.reduce((sum, item) => sum + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'aroma-cart-storage',
        }
    )
);