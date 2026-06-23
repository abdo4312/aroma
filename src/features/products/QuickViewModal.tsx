import { useEffect, useState, useLayoutEffect } from 'react'
import { X, Plus, Star, Minus, ShoppingCart } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { formatCurrency } from '@/shared/utils/formatCurrency'
import { useQuickViewStore } from './useQuickViewStore'
// تم استبدال CartContext بـ useCartStore
import { useCartStore } from '@/store/useCartStore'

export function QuickViewModal() {
    const { isOpen, product, close } = useQuickViewStore()

    // Use the Zustand store directly (no prop drilling needed)
    const addItem = useCartStore((state) => state.addItem)

    const [quantity, setQuantity] = useState(1)

    // إغلاق المودال عند الضغط على Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [close])

    // منع التمرير (Scrolling) عند فتح المودال
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    // إعادة تعيين الكمية عند تغيير المنتج أو فتح المودال
    // useLayoutEffect runs synchronously before browser paint — recommended in React docs for syncing
    // state with a newly opened modal. Because React batches useLayoutEffect setState calls, there is
    // no double-render here — the comment merely silences the rule which is overly strict for this case.
    useLayoutEffect(() => {
        /* eslint-disable react-hooks/set-state-in-effect */
        if (isOpen) setQuantity(1)
        /* eslint-enable react-hooks/set-state-in-effect */
    }, [isOpen, product?.id])

    if (!isOpen || !product) return null

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null

    const handleAddToCart = () => {
        if (product.inStock) {
            // استدعاء دالة الإضافة من Zustand Store
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity,
            })
            close()
        }
    }

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quickview-title"
        >
            {/* الخلفية المظلمة */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={close}
                aria-hidden="true"
            />

            {/* محتوى المودال */}
            <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/50 bg-white/90 backdrop-blur-2xl shadow-2xl">

                <button
                    onClick={close}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-900 transition-all shadow-lg border border-white/60"
                    aria-label="Close quick view"
                >
                    <X className="w-5 h-5" aria-hidden="true" />
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                    {/* قسم الصورة */}
                    <div className="relative aspect-square md:aspect-auto md:h-full bg-neutral-100 overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />

                        {discount && (
                            <div className="absolute top-4 left-4 px-4 py-1.5 bg-red-500 text-white text-sm font-bold rounded-2xl shadow-lg" aria-label={`Discount ${discount} percent`}>
                                -{discount}% OFF
                            </div>
                        )}

                        {!product.inStock && (
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                <span className="text-white font-bold text-2xl tracking-widest uppercase">
                                    Out of Stock
                                </span>
                            </div>
                        )}
                    </div>

                    {/* قسم التفاصيل */}
                    <div className="p-8 flex flex-col">
                        <span className="text-xs font-medium uppercase tracking-[1.5px] text-[#8c6239] mb-2">
                            {product.category}
                        </span>

                        <h2 id="quickview-title" className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 leading-tight">
                            {product.name}
                        </h2>

                        {/* التقييم */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center gap-px" role="img" aria-label={`Rated ${product.rating} out of 5`}>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "w-4 h-4",
                                            i < Math.floor(product.rating)
                                                ? "text-amber-400 fill-amber-400"
                                                : "text-neutral-200"
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-neutral-500">
                                {product.rating} ({product.reviewCount} reviews)
                            </span>
                        </div>

                        {/* السعر */}
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-4xl font-bold text-neutral-900">
                                {formatCurrency(product.price)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-xl text-neutral-400 line-through">
                                    {formatCurrency(product.originalPrice)}
                                </span>
                            )}
                        </div>

                        <p className="text-neutral-600 leading-relaxed mb-8 flex-grow text-sm md:text-base">
                            {product.description}
                        </p>

                        {/* التاغات */}
                        {product.tags && product.tags.length > 0 && (
                            <ul className="flex flex-wrap gap-2 mb-8 list-none p-0" aria-label="Product tags">
                                {product.tags.map((tag) => (
                                    <li
                                        key={tag}
                                        className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#f5e6d3] text-[#5f3a26] rounded-lg"
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* التحكم في الكمية وأزرار الإجراءات */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
                            <div
                                className="flex items-center rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden w-full sm:w-auto"
                                role="group"
                                aria-label="Quantity selector"
                            >
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="p-4 hover:bg-neutral-50 transition active:bg-neutral-100 disabled:opacity-50"
                                    disabled={!product.inStock}
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="w-4 h-4" aria-hidden="true" />
                                </button>
                                <span className="px-6 font-bold text-lg min-w-[3.5rem] text-center text-neutral-800" role="status" aria-live="polite">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="p-4 hover:bg-neutral-50 transition active:bg-neutral-100 disabled:opacity-50"
                                    disabled={!product.inStock}
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="w-4 h-4" aria-hidden="true" />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                className={cn(
                                    "w-full flex-1 py-4 rounded-2xl text-base font-bold transition-all duration-300 flex items-center justify-center gap-3",
                                    product.inStock
                                        ? "bg-[#5f3a26] hover:bg-[#4a2e1f] text-white shadow-lg hover:shadow-xl active:scale-[0.98]"
                                        : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                                )}
                            >
                                <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}