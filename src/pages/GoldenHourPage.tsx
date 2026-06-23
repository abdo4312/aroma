import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import { getProductById } from '@/shared/data/products';
import { useCartStore } from '@/store/useCartStore';
import { formatCurrency } from '@/shared/utils/formatCurrency';

export function GoldenHourPage() {
    const navigate = useNavigate();
    const addItem = useCartStore((state) => state.addItem);
    const [quantity, setQuantity] = useState(1);

    const product = getProductById('golden-hour-01');

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F0EB]">
                <p className="text-[#3f2518] font-bold">Product not found</p>
            </div>
        );
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 25;

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity,
            roastLevel: product.roastLevel || 'Medium'
        });
        navigate('/cart');
    };

    const flavorNotes = product.flavorNotes || ['Hazelnut', 'Milk Chocolate', 'Orange Zest'];

    return (
        <div className="min-h-screen bg-[#F5F0EB] relative overflow-hidden font-sans pb-16">
            {/* Decorative Blobs */}
            <div className="absolute top-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#D4B895] opacity-50 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-[#8C6239] opacity-20 blur-[130px] pointer-events-none" />

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="fixed left-6 top-24 z-50 p-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl text-[#4A3B32] hover:bg-[#4A3B32] hover:text-white transition-all duration-300 group"
            >
                <ArrowLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <div className="container mx-auto px-4 py-24 relative z-10">
                <div className="max-w-6xl mx-auto">

                    {/* Limited Badge */}
                    <div className="text-center mb-8">
                        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#8C6239]/10 border border-[#8C6239]/30 text-[#8C6239] font-semibold text-sm animate-pulse">
                            <Clock size={16} />
                            Limited Time Offer - Ends This Week
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left: Product Image */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#D4B895]/60 to-[#8C6239]/40 rounded-[3rem] blur-2xl scale-95 group-hover:scale-100 transition-transform duration-700" />
                            <div className="relative rounded-[3rem] overflow-hidden border border-white/40 bg-white/30 backdrop-blur-xl shadow-2xl p-4">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-[400px] md:h-[500px] object-cover rounded-[2.5rem] transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Discount Badge */}
                                <div className="absolute top-8 right-8 bg-[#8C6239] text-white px-5 py-2 rounded-full font-bold text-lg shadow-lg">
                                    -{discount}%
                                </div>
                            </div>
                        </div>

                        {/* Right: Product Details */}
                        <div className="space-y-8">
                            {/* Rating */}
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={20} className={i < Math.floor(product.rating) ? "text-[#D4A574] fill-[#D4A574]" : "text-gray-300"} />
                                    ))}
                                </div>
                                <span className="text-sm text-[#6B4423]/70 font-medium">{product.rating} ({product.reviewCount} reviews)</span>
                            </div>

                            <div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-[#3f2518] mb-3">{product.name}</h1>
                                <p className="text-lg text-[#6B4423]/80 leading-relaxed">{product.description}</p>
                            </div>

                            {/* Flavor Notes */}
                            <div className="flex flex-wrap gap-3">
                                {flavorNotes.map((note) => (
                                    <span key={note} className="px-4 py-2 rounded-xl bg-white/40 border border-white/50 text-[#5F3A26] text-sm font-medium backdrop-blur-sm">
                                        {note}
                                    </span>
                                ))}
                            </div>

                            {/* Price */}
                            <div className="flex items-end gap-4">
                                <span className="text-5xl font-black text-[#3f2518]">{formatCurrency(product.price)}</span>
                                {product.originalPrice && (
                                    <span className="text-2xl text-[#6B4423]/50 line-through font-bold">{formatCurrency(product.originalPrice)}</span>
                                )}
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/40 border border-white/50 backdrop-blur-sm">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 rounded-xl hover:bg-[#8C6239]/20 transition-colors text-[#4A3B32]"
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <span className="w-10 text-center text-xl font-bold text-[#3f2518]">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-2 rounded-xl hover:bg-[#8C6239]/20 transition-colors text-[#4A3B32]"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-[#8C6239] to-[#5F3A26] text-white font-bold text-lg transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <ShoppingCart size={22} />
                                    Add to Cart
                                </button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/40">
                                <div className="flex items-center gap-3 text-[#4A3B32]">
                                    <div className="p-2 rounded-xl bg-[#8C6239]/10">
                                        <Check size={18} className="text-[#8C6239]" />
                                    </div>
                                    <span className="text-sm font-medium">Free Shipping</span>
                                </div>
                                <div className="flex items-center gap-3 text-[#4A3B32]">
                                    <div className="p-2 rounded-xl bg-[#8C6239]/10">
                                        <Check size={18} className="text-[#8C6239]" />
                                    </div>
                                    <span className="text-sm font-medium">Freshly Roasted</span>
                                </div>
                                <div className="flex items-center gap-3 text-[#4A3B32]">
                                    <div className="p-2 rounded-xl bg-[#8C6239]/10">
                                        <Check size={18} className="text-[#8C6239]" />
                                    </div>
                                    <span className="text-sm font-medium">Limited Stock</span>
                                </div>
                                <div className="flex items-center gap-3 text-[#4A3B32]">
                                    <div className="p-2 rounded-xl bg-[#8C6239]/10">
                                        <Check size={18} className="text-[#8C6239]" />
                                    </div>
                                    <span className="text-sm font-medium">Specialty Grade</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}