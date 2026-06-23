import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/useCartStore';
import { allProducts } from '@/shared/data/products';
import type { Product } from '@/shared/types/product.types';
import { cn } from '@/shared/utils/cn';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import {
    Package,
    Plus,
    Minus,
    Check,
    ShoppingBag,
    Sparkles,
    Gift,
    ArrowRight
} from 'lucide-react';

const BOX_SIZES = [
    {
        id: 'small',
        size: 3,
        discount: 10,
        label: 'Starter Box',
        description: 'Perfect for trying new flavors',
        popular: false
    },
    {
        id: 'medium',
        size: 6,
        discount: 15,
        label: 'Explorer Box',
        description: 'Most popular choice',
        popular: true
    },
    {
        id: 'large',
        size: 12,
        discount: 20,
        label: 'Connoisseur Box',
        description: 'Best value for coffee lovers',
        popular: false
    },
];

// Only show coffee beans in the box builder
const boxProducts = allProducts.filter(p => p.productType === 'coffee-bean');

export function BuildYourBoxPage() {
    const navigate = useNavigate();
    const addItem = useCartStore((state) => state.addItem);

    const [selectedBoxSize, setSelectedBoxSize] = useState(BOX_SIZES[1]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const originalTotal = useMemo(() =>
        selectedProducts.reduce((sum, p) => sum + p.price, 0),
        [selectedProducts]
    );

    const discountedTotal = useMemo(() =>
        originalTotal * (1 - selectedBoxSize.discount / 100),
        [originalTotal, selectedBoxSize.discount]
    );

    const savings = originalTotal - discountedTotal;

    const handleAddProduct = (product: Product) => {
        if (selectedProducts.length < selectedBoxSize.size) {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    const handleRemoveProduct = (productId: string) => {
        const index = selectedProducts.findIndex(p => p.id === productId);
        if (index > -1) {
            const newProducts = [...selectedProducts];
            newProducts.splice(index, 1);
            setSelectedProducts(newProducts);
        }
    };

    const getProductCount = (productId: string) =>
        selectedProducts.filter(p => p.id === productId).length;

    const handleAddBoxToCart = () => {
        if (selectedProducts.length !== selectedBoxSize.size) return;

        const boxId = `box-${Date.now()}`;
        const boxName = `Custom ${selectedBoxSize.label} (${selectedProducts.length} items)`;

        addItem({
            id: boxId,
            name: boxName,
            price: discountedTotal,
            image: selectedProducts[0]?.images[0] || "/images/default-box.jpg",
            quantity: 1,
            roastLevel: `Save ${selectedBoxSize.discount}%`,
        });

        navigate('/cart');
    };

    const remainingSlots = selectedBoxSize.size - selectedProducts.length;
    const isBoxComplete = remainingSlots === 0;
    const progressPercent = Math.round((selectedProducts.length / selectedBoxSize.size) * 100);

    return (
        <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_15%,#fff8f1_0%,#f9e8d8_35%,#efdac7_65%,#e3ccb8_100%)] text-[#2e1a12]">

            <div className="coffee-blob coffee-blob-a" aria-hidden="true" />
            <div className="coffee-blob coffee-blob-b" aria-hidden="true" />
            <div className="coffee-blob coffee-blob-d" aria-hidden="true" />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">

                <header className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8c6239]/30 bg-[#8c6239]/10 px-4 py-2">
                        <Gift className="h-4 w-4 text-[#8c6239]" aria-hidden="true" />
                        <span className="text-sm font-medium text-[#5f3a26]">Save up to 20%</span>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-[#3f2518] md:text-5xl">
                        Build Your Box
                    </h1>
                    <p className="mx-auto max-w-xl text-base text-[#6B4423]/80">
                        Choose your box size and fill it with your favorite coffee beans. The more you add, the more you save!
                    </p>
                </header>

                <div className="grid gap-10 lg:grid-cols-3">

                    <div className="lg:col-span-2 space-y-10">

                        <section aria-labelledby="step-1-heading">
                            <div className="mb-6 flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5f3a26] text-sm font-bold text-white" aria-current="step">
                                    1
                                </span>
                                <h2 id="step-1-heading" className="text-xl font-bold text-[#3f2518]">Choose Your Box Size</h2>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3" role="radiogroup" aria-label="Box size selection">
                                {BOX_SIZES.map((box) => (
                                    <button
                                        key={box.id}
                                        onClick={() => {
                                            setSelectedBoxSize(box);
                                            if (selectedProducts.length > box.size) {
                                                setSelectedProducts(selectedProducts.slice(0, box.size));
                                            }
                                        }}
                                        role="radio"
                                        aria-checked={selectedBoxSize.id === box.id}
                                        aria-label={`${box.label}, ${box.size} products, save ${box.discount} percent${box.popular ? ', most popular' : ''}`}
                                        className={cn(
                                            "relative rounded-2xl border-2 p-6 text-left transition-all duration-300",
                                            "hover:shadow-xl",
                                            selectedBoxSize.id === box.id
                                                ? "border-[#5f3a26] bg-white/60 shadow-xl scale-[1.02]"
                                                : "border-white/50 bg-white/30 hover:bg-white/40"
                                        )}
                                    >
                                        {box.popular && (
                                            <span className="absolute -top-3 left-4 flex items-center gap-1 rounded-full bg-[#d4a574] px-3 py-1 text-xs font-bold text-white">
                                                <Sparkles className="h-3 w-3" aria-hidden="true" />
                                                Popular
                                            </span>
                                        )}

                                        <div className="mb-3" aria-hidden="true">
                                            <Package className={cn(
                                                "h-8 w-8",
                                                selectedBoxSize.id === box.id ? "text-[#5f3a26]" : "text-[#8c6239]/50"
                                            )} />
                                        </div>

                                        <h3 className="text-lg font-bold text-[#3f2518]">{box.label}</h3>
                                        <p className="text-sm text-[#6B4423]/70 mb-3">{box.size} products</p>
                                        <p className="text-xs text-[#6B4423]/60">{box.description}</p>

                                        <div className={cn(
                                            "mt-4 rounded-xl px-3 py-2 text-center",
                                            selectedBoxSize.id === box.id
                                                ? "bg-[#5f3a26] text-white"
                                                : "bg-[#8c6239]/10 text-[#5f3a26]"
                                        )}>
                                            <span className="text-lg font-bold">Save {box.discount}%</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section aria-labelledby="step-2-heading">
                            <div className="mb-6 flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5f3a26] text-sm font-bold text-white" aria-current="step">
                                    2
                                </span>
                                <h2 id="step-2-heading" className="text-xl font-bold text-[#3f2518]">Fill Your Box</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                {boxProducts.map((product) => {
                                    const count = getProductCount(product.id);
                                    const canAdd = remainingSlots > 0;

                                    return (
                                        <div
                                            key={product.id}
                                            className={cn(
                                                "group relative overflow-hidden rounded-2xl border transition-all duration-300",
                                                count > 0
                                                    ? "border-[#5f3a26] bg-[#5f3a26]/5 shadow-lg"
                                                    : "border-white/50 bg-white/30 hover:bg-white/50"
                                            )}
                                        >
                                            <div className="relative aspect-square overflow-hidden">
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                {count > 0 && (
                                                    <span
                                                        className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#5f3a26] text-xs font-bold text-white"
                                                        aria-label={`${count} in box`}
                                                    >
                                                        {count}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="p-3">
                                                <h4 className="text-sm font-semibold text-[#3f2518] line-clamp-1">
                                                    {product.name}
                                                </h4>
                                                <p className="text-xs text-[#6B4423]/70">{formatCurrency(product.price)}</p>

                                                <div className="mt-3 flex items-center justify-between">
                                                    {count > 0 ? (
                                                        <div
                                                            className="flex w-full items-center justify-between"
                                                            role="group"
                                                            aria-label={`Quantity of ${product.name} in box`}
                                                        >
                                                            <button
                                                                onClick={() => handleRemoveProduct(product.id)}
                                                                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#5f3a26]/30 text-[#5f3a26] transition hover:bg-[#5f3a26]/10"
                                                                aria-label={`Remove one ${product.name} from box`}
                                                            >
                                                                <Minus className="h-4 w-4" aria-hidden="true" />
                                                            </button>
                                                            <span
                                                                className="text-lg font-bold text-[#3f2518]"
                                                                role="status"
                                                                aria-live="polite"
                                                                aria-label={`${count} in box`}
                                                            >
                                                                {count}
                                                            </span>
                                                            <button
                                                                onClick={() => handleAddProduct(product)}
                                                                disabled={!canAdd}
                                                                className={cn(
                                                                    "flex h-8 w-8 items-center justify-center rounded-full transition",
                                                                    canAdd ? "bg-[#5f3a26] text-white" : "bg-neutral-200 text-neutral-400"
                                                                )}
                                                                aria-label={`Add one more ${product.name} to box`}
                                                                aria-disabled={!canAdd}
                                                            >
                                                                <Plus className="h-4 w-4" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleAddProduct(product)}
                                                            disabled={!canAdd}
                                                            className={cn(
                                                                "w-full rounded-xl py-2 text-xs font-semibold transition",
                                                                canAdd ? "bg-[#5f3a26] text-white hover:bg-[#4c2d1e]" : "bg-neutral-200 text-neutral-400"
                                                            )}
                                                            aria-label={`Add ${product.name} to box`}
                                                            aria-disabled={!canAdd}
                                                        >
                                                            Add to Box
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-1">
                        <aside
                            className="sticky top-28 rounded-[2rem] border border-white/50 bg-white/40 p-6 backdrop-blur-2xl shadow-2xl"
                            aria-labelledby="box-summary-heading"
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5f3a26]" aria-hidden="true">
                                    <ShoppingBag className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 id="box-summary-heading" className="text-lg font-bold text-[#3f2518]">Your Box</h3>
                                    <p className="text-sm text-[#6B4423]/70">
                                        <span aria-live="polite">{selectedProducts.length}</span> / {selectedBoxSize.size} items
                                    </p>
                                </div>
                            </div>

                            <div className="mb-6 space-y-3">
                                {selectedProducts.length === 0 ? (
                                    <div className="rounded-2xl border-2 border-dashed border-[#8c6239]/20 py-8 text-center">
                                        <Package className="mx-auto h-10 w-10 text-[#8c6239]/30" aria-hidden="true" />
                                        <p className="mt-2 text-sm text-[#6B4423]/50">Your box is empty</p>
                                    </div>
                                ) : (
                                    <ul className="max-h-64 space-y-2 overflow-y-auto pr-2 list-none p-0 m-0" aria-label="Selected products in your box">
                                        {selectedProducts.map((product, index) => (
                                            <li key={`${product.id}-${index}`} className="flex items-center gap-3 rounded-xl bg-white/50 p-2">
                                                <img src={product.images[0]} alt="" className="h-10 w-10 rounded-lg object-cover" aria-hidden="true" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-[#3f2518] truncate">{product.name}</p>
                                                    <p className="text-xs text-[#6B4423]/70">{formatCurrency(product.price)}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveProduct(product.id)}
                                                    className="text-red-400 hover:text-red-600"
                                                    aria-label={`Remove ${product.name} from box`}
                                                >
                                                    <Minus className="h-4 w-4" aria-hidden="true" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="mb-6">
                                <div className="mb-2 flex justify-between text-sm text-[#3f2518]">
                                    <span>Progress</span>
                                    <span aria-live="polite">{progressPercent}%</span>
                                </div>
                                <div
                                    className="h-2 overflow-hidden rounded-full bg-[#8c6239]/10"
                                    role="progressbar"
                                    aria-valuenow={progressPercent}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label="Box fill progress"
                                >
                                    <div
                                        className="h-full bg-[#5f3a26] transition-all duration-500"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>

                            <div className="mb-6 space-y-3 border-t border-[#8c6239]/10 pt-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#6B4423]/70">Subtotal</span>
                                    <span className="text-[#3f2518]">{formatCurrency(originalTotal)}</span>
                                </div>
                                {savings > 0 && (
                                    <div className="flex justify-between text-sm text-green-600 font-medium">
                                        <span>Discount ({selectedBoxSize.discount}%)</span>
                                        <span>-{formatCurrency(savings)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between border-t border-[#8c6239]/10 pt-3">
                                    <span className="text-lg font-bold text-[#3f2518]">Total</span>
                                    <span className="text-2xl font-bold text-[#3f2518]" aria-live="polite">{formatCurrency(discountedTotal)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleAddBoxToCart}
                                disabled={!isBoxComplete}
                                className={cn(
                                    "w-full rounded-2xl py-4 text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                                    isBoxComplete
                                        ? "bg-[#5f3a26] text-white hover:bg-[#4c2d1e] shadow-lg active:scale-[0.98]"
                                        : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                                )}
                                aria-label={isBoxComplete ? 'Add your custom box to cart' : `Select ${remainingSlots} more item${remainingSlots === 1 ? '' : 's'} to complete box`}
                                aria-disabled={!isBoxComplete}
                            >
                                {isBoxComplete ? (
                                    <>
                                        <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                                        Add Box to Cart
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </>
                                ) : (
                                    `Select ${remainingSlots} more item${remainingSlots === 1 ? '' : 's'}`
                                )}
                            </button>

                            {isBoxComplete && (
                                <p className="mt-3 text-center text-xs text-green-600 font-medium" role="status">
                                    <Check className="mr-1 inline h-3 w-3" aria-hidden="true" />
                                    Your box is ready!
                                </p>
                            )}
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    );
}