import { useCallback } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useQuickViewStore } from '@/features/products/useQuickViewStore';
import type { Product } from './product.types';

interface ProductCardActions {
    /** Whether the product is in the wishlist */
    isWishlisted: boolean;
    /** Computed discount percentage (null if no discount) */
    discount: number | null;
    /** The second image URL for hover effect (undefined if none) */
    secondImage: string | undefined;
    /** Extracted roast level tag */
    roastLevel: string | undefined;

    /** Add item to cart (stops event propagation) */
    handleAddToCart: (e: React.MouseEvent) => void;
    /** Toggle wishlist state (stops event propagation) */
    toggleWishlist: (e: React.MouseEvent) => void;
    /** Open quick-view modal (stops event propagation) */
    handleQuickView: (e: React.MouseEvent) => void;
}

export function useProductCardActions(product: Product): ProductCardActions {
    const addItem = useCartStore((s) => s.addItem);
    const { isInWishlist, toggleItem } = useWishlistStore();
    const openQuickView = useQuickViewStore((s) => s.open);

    const isWishlisted = isInWishlist(product.id);

    const discount = product.originalPrice
        ? Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
        : null;

    const secondImage = product.images?.[1];

    const roastLevel =
        product.tags?.find(
            (t) => t.includes('roast') || t === 'cold brew'
        ) ?? undefined;

    const handleAddToCart = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (product.inStock) {
                addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0] ?? '',
                    quantity: 1,
                });
            }
        },
        [addItem, product.id, product.name, product.price, product.images, product.inStock]
    );

    const toggleWishlist = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(product.id);
        },
        [toggleItem, product.id]
    );

    const handleQuickView = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            openQuickView(product);
        },
        [openQuickView, product]
    );

    return {
        isWishlisted,
        discount,
        secondImage,
        roastLevel,
        handleAddToCart,
        toggleWishlist,
        handleQuickView,
    };
}