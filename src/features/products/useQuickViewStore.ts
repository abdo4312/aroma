import { create } from 'zustand'
import type { Product } from './product.types'

interface QuickViewState {
    isOpen: boolean
    product: Product | null
    open: (product: Product) => void
    close: () => void
}

export const useQuickViewStore = create<QuickViewState>((set) => ({
    isOpen: false,
    product: null,
    open: (product) => set({ isOpen: true, product }),
    close: () => set({ isOpen: false, product: null }),
}))