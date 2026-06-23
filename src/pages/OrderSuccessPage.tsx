import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, ShoppingBag, Truck } from 'lucide-react';

export function OrderSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Safely extract data sent from CheckoutForm
    const state = location.state as { orderId?: string; total?: number } | null;
    const { orderId, total } = state || {};

    // 🔒 Protection: if accessed directly without order data, show alternative message
    if (!orderId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]/10 p-4">
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                        <Package className="h-8 w-8 text-[#8C6239]" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#4A3B32] mb-2">Order details not found</h1>
                    <p className="text-gray-500 mb-6">Please complete a new purchase or check your email.</p>
                    <Link to="/shop-beans" className="text-[#8C6239] font-semibold hover:underline">Back to shop ←</Link>
                </div>
            </div>
        );
    }

    const currentDate = new Date().toLocaleDateString('en-EG', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return (
        <main className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_20%_15%,#fff8f1_0%,#f9e8d8_35%,#efdac7_65%,#e3ccb8_100%)] py-12 px-4">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/40 max-w-lg w-full text-center fade-in">

                {/* Success icon */}
                <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 pop-bounce">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                </div>

<h1 className="text-3xl font-bold text-[#4A3B32] mb-2">Your order has been confirmed successfully! 🎉</h1>
<p className="text-[#6B4423]/70 mb-8">Thank you for shopping at Aroma Corner. Your distinctive coffee is being prepared with care.</p>

                {/* Order details */}
                <div className="bg-white/80 rounded-2xl p-6 border border-gray-200 mb-8 text-right">
                    <h2 className="text-lg font-semibold text-[#4A3B32] mb-4 border-b pb-2">Order Details</h2>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">Order Number</span>
                            <span className="font-mono font-bold text-[#4A3B32]">#{orderId}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">Date & Time</span>
                            <span className="font-medium text-[#4A3B32]">{currentDate}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                            <span className="text-gray-500">Total Paid</span>
                            <span className="font-bold text-xl text-[#8C6239]">{total ? `${total.toFixed(2)} SAR` : '---'}</span>
                        </div>
                    </div>
                </div>

                {/* Order status tracker */}
                <div className="flex items-center justify-between mb-8 px-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                            <CheckCircle className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-green-700">Confirmed</span>
                    </div>
                    <div className="flex-1 h-px bg-green-300 mx-2"></div>
                    <div className="flex flex-col items-center gap-2 opacity-60">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            <Package className="h-4 w-4" />
                        </div>
                        <span>Preparing</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-2"></div>
                    <div className="flex flex-col items-center gap-2 opacity-60">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            <Truck className="h-4 w-4" />
                        </div>
                        <span>On the way</span>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => navigate('/profile')}
                        className="flex-1 bg-[#8C6239] text-white font-semibold py-3 rounded-xl hover:bg-[#5f3a26] transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-8px_rgba(95,58,38,0.5)]"
                    >
                        <Package className="h-4 w-4" /> Track Order
                    </button>
                    <Link
                        to="/shop-beans"
                        className="flex-1 bg-white border border-neutral-300 text-[#4A3B32] font-semibold py-3 rounded-xl hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <ShoppingBag className="h-4 w-4" /> Continue Shopping
                    </Link>
                </div>

                <p className="mt-6 text-xs text-gray-400">
                    A receipt and order details have been sent to your registered email.
                </p>
            </div>
        </main>
    );
}