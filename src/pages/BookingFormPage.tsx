import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Users, Coffee, Star, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Define Interface
interface BookingPlan {
    id: string;
    name: string;
    description: string;
    price: string;
    duration: string;
    icon: React.ElementType;
    features: string[];
    isPopular?: boolean;
    color: string;
}

// Plan data lives here so icon components render correctly
const bookingPlans: BookingPlan[] = [
    {
        id: 'single',
        name: 'Focus Corner',
        description: 'Ideal single table for study or remote work with total peace.',
        price: '25',
        duration: 'Hour',
        icon: Coffee,
        features: ['Comfortable seat & private charger', 'Ultra-fast internet', '10% discount on drinks'],
        color: 'from-[#D4B895] to-[#C3A077]',
    },
    {
        id: 'duo',
        name: "Friends' Spot",
        description: 'Cozy table for 2 to 4 people, perfect for conversation.',
        price: '45',
        duration: 'Hour',
        icon: Users,
        features: ['Premium view', 'Fast hospitality service', 'Pre-booking available', 'Quiet corner'],
        isPopular: true,
        color: 'from-[#8C6239] to-[#6B4423]',
    },
    {
        id: 'meeting',
        name: 'Meeting Room',
        description: 'Fully equipped private space for formal meetings or workshops.',
        price: '150',
        duration: 'Hour',
        icon: Star,
        features: ['Smart display screen', 'Whiteboard', 'Complimentary coffee', 'Total privacy'],
        color: 'from-[#4A3B32] to-[#2E1F18]',
    }
];

export function BookingFormPage() {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState<BookingPlan | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '1',
        notes: ''
    });

    // Read ID from localStorage and find matching plan
    useEffect(() => {
        const planId = localStorage.getItem('selectedBookingPlanId');
        if (planId) {
            const foundPlan = bookingPlans.find(p => p.id === planId);
            if (foundPlan) {
                setSelectedPlan(foundPlan);
            } else {
                navigate('/book-table');
            }
        } else {
            navigate('/book-table');
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // TODO: Replace with actual API call when backend is ready
            // await apiClient.post('/bookings', { plan: selectedPlan, ...formData });
            await new Promise((resolve) => setTimeout(resolve, 1200));

            localStorage.removeItem('selectedBookingPlanId');
            toast.success('Booking confirmed successfully!');
            navigate('/');
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!selectedPlan) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F0EB]" role="status" aria-live="polite">
                <Loader2 className="animate-spin h-12 w-12 text-[#8C6239]" aria-hidden="true" />
                <span className="sr-only">Loading your selected plan...</span>
            </div>
        );
    }

    // Extract Icon as Component
    const PlanIcon = selectedPlan.icon;

    return (
        <div className="min-h-screen bg-[#F5F0EB] relative overflow-hidden font-sans pb-12">
            {/* Decorative background elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#E8DCC8] opacity-60 blur-[100px] pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#D4B895] opacity-40 blur-[120px] pointer-events-none" aria-hidden="true" />

            <div className="container mx-auto px-4 py-12 relative z-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/book-table')}
                    className="mb-8 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 text-[#4A3B32] hover:bg-[#4A3B32] hover:text-white transition-all duration-300 font-semibold"
                    aria-label="Back to booking plans"
                >
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                    Back to Plans
                </button>

                <div className="grid gap-10 lg:grid-cols-2 max-w-6xl mx-auto">

                    {/* Left: Selected Plan Summary */}
                    <section className="rounded-[2rem] border border-white/40 bg-white/25 backdrop-blur-xl shadow-2xl p-8" aria-labelledby="booking-plan-heading">
                        <h2 id="booking-plan-heading" className="text-2xl font-bold text-[#4A3B32] mb-6">Your Selection</h2>

                        <div className="flex items-center gap-4 mb-6">
                            <div className={`rounded-2xl p-4 bg-gradient-to-br ${selectedPlan.color} text-white shadow-lg`} aria-hidden="true">
                                <PlanIcon className="h-8 w-8" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#4A3B32]">{selectedPlan.name}</h3>
                                <p className="text-sm text-[#6B4423]/70">{selectedPlan.description}</p>
                            </div>
                        </div>

                        <div className="border-t border-white/40 pt-6 mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[#6B4423]/70">Price</span>
                                <span className="text-2xl font-bold text-[#4A3B32]">{selectedPlan.price} SAR/{selectedPlan.duration}</span>
                            </div>
                        </div>

                        <ul className="space-y-3 list-none p-0 m-0" aria-label={`${selectedPlan.name} features`}>
                            {selectedPlan.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-3 text-[#4A3B32]">
                                    <div className="rounded-full p-1 bg-[#8C6239]/20 text-[#8C6239]" aria-hidden="true">
                                        <Check className="h-4 w-4" strokeWidth={3} />
                                    </div>
                                    <span className="text-sm font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Right: Booking Form */}
                    <section className="rounded-[2rem] border border-white/40 bg-white/25 backdrop-blur-xl shadow-2xl p-8" aria-labelledby="booking-form-heading">
                        <h2 id="booking-form-heading" className="text-2xl font-bold text-[#4A3B32] mb-6">Complete Your Booking</h2>

                        <form onSubmit={handleSubmit} className="space-y-5" aria-busy={isSubmitting}>
                            <div>
                                <label htmlFor="booking-name" className="block text-sm font-semibold text-[#5F3A26] mb-2">Full Name</label>
                                <input
                                    id="booking-name"
                                    type="text"
                                    name="name"
                                    required
                                    disabled={isSubmitting}
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all disabled:opacity-50"
                                    placeholder="John Doe"
                                />
                            </div>

                            <fieldset className="grid gap-5 md:grid-cols-2 border-0 p-0 m-0">
                                <div>
                                    <label htmlFor="booking-email" className="block text-sm font-semibold text-[#5F3A26] mb-2">Email</label>
                                    <input
                                        id="booking-email"
                                        type="email"
                                        name="email"
                                        required
                                        disabled={isSubmitting}
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all disabled:opacity-50"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="booking-phone" className="block text-sm font-semibold text-[#5F3A26] mb-2">Phone</label>
                                    <input
                                        id="booking-phone"
                                        type="tel"
                                        name="phone"
                                        required
                                        disabled={isSubmitting}
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all disabled:opacity-50"
                                        placeholder="+20 100 123 4567"
                                    />
                                </div>
                            </fieldset>

                            <fieldset className="grid gap-5 md:grid-cols-2 border-0 p-0 m-0">
                                <div>
                                    <label htmlFor="booking-date" className="block text-sm font-semibold text-[#5F3A26] mb-2">Date</label>
                                    <input
                                        id="booking-date"
                                        type="date"
                                        name="date"
                                        required
                                        disabled={isSubmitting}
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all disabled:opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="booking-time" className="block text-sm font-semibold text-[#5F3A26] mb-2">Time</label>
                                    <input
                                        id="booking-time"
                                        type="time"
                                        name="time"
                                        required
                                        disabled={isSubmitting}
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all disabled:opacity-50"
                                    />
                                </div>
                            </fieldset>

                            <div>
                                <label htmlFor="booking-guests" className="block text-sm font-semibold text-[#5F3A26] mb-2">Number of Guests</label>
                                <select
                                    id="booking-guests"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all disabled:opacity-50"
                                >
                                    <option value="1">1 Person</option>
                                    <option value="2">2 People</option>
                                    <option value="3">3 People</option>
                                    <option value="4">4 People</option>
                                    <option value="5">5 People</option>
                                    <option value="6">6 People</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="booking-notes" className="block text-sm font-semibold text-[#5F3A26] mb-2">Special Requests (Optional)</label>
                                <textarea
                                    id="booking-notes"
                                    name="notes"
                                    rows={3}
                                    disabled={isSubmitting}
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all resize-none disabled:opacity-50"
                                    placeholder="Any special requirements..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8C6239] to-[#5F3A26] text-white font-bold text-lg transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                                aria-label={isSubmitting ? 'Confirming your booking, please wait' : 'Confirm your booking'}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                                        <span aria-live="polite">Confirming...</span>
                                    </>
                                ) : (
                                    'Confirm Booking'
                                )}
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}