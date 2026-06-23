import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, User, Phone, MessageSquare, Wrench, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function ConsultationPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        experience: 'beginner',
        budget: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // TODO: Replace with actual API call when backend is ready
            // await apiClient.post('/consultations', formData);
            await new Promise((resolve) => setTimeout(resolve, 1200));

            toast.success('Your request has been submitted! Our barista will contact you shortly.');
            navigate('/brew-gear');
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-[#F5F0EB] relative overflow-hidden font-sans flex items-center justify-center py-12 px-4">
            {/* Animated backgrounds */}
            <div className="coffee-blob coffee-blob-a" aria-hidden="true" />
            <div className="coffee-blob coffee-blob-b" aria-hidden="true" />
            <div className="coffee-blob coffee-blob-c" aria-hidden="true" />

            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="fixed left-6 top-24 z-50 p-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl text-[#4A3B32] hover:bg-[#4A3B32] hover:text-white transition-all duration-300 group"
                aria-label="Go back to previous page"
            >
                <ArrowLeft size={28} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            </button>

            <div className="relative z-10 w-full max-w-xl">
                <div className="rounded-[2.5rem] border border-white/40 bg-white/25 backdrop-blur-xl shadow-2xl p-8 md:p-12">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8C6239] to-[#5F3A26] text-white shadow-lg mb-4"
                            role="img"
                            aria-label="Barista consultation service"
                        >
                            <Wrench size={28} aria-hidden="true" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-[#3f2518]">Barista Consultation</h1>
                        <p className="text-[#6B4423]/70 mt-2 text-sm">Get personalized advice on choosing the perfect gear.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5" aria-busy={isSubmitting}>
                        <div>
                            <label htmlFor="consult-name" className="block text-sm font-semibold text-[#5F3A26] mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B4423]/50" aria-hidden="true" />
                                <input
                                    id="consult-name"
                                    type="text"
                                    name="name"
                                    required
                                    disabled={isSubmitting}
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm pl-12 pr-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all disabled:opacity-50"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="consult-phone" className="block text-sm font-semibold text-[#5F3A26] mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B4423]/50" aria-hidden="true" />
                                <input
                                    id="consult-phone"
                                    type="tel"
                                    name="phone"
                                    required
                                    disabled={isSubmitting}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm pl-12 pr-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all disabled:opacity-50"
                                    placeholder="+20 100 123 4567"
                                />
                            </div>
                        </div>

                        <fieldset className="grid grid-cols-2 gap-4 border-0 p-0 m-0">
                            <div>
                                <label htmlFor="consult-experience" className="block text-sm font-semibold text-[#5F3A26] mb-2">Experience</label>
                                <select
                                    id="consult-experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all disabled:opacity-50"
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="pro">Professional</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="consult-budget" className="block text-sm font-semibold text-[#5F3A26] mb-2">Budget (SAR)</label>
                                <input
                                    id="consult-budget"
                                    type="text"
                                    name="budget"
                                    disabled={isSubmitting}
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all disabled:opacity-50"
                                    placeholder="e.g. 500 - 1000"
                                />
                            </div>
                        </fieldset>

                        <div>
                            <label htmlFor="consult-message" className="block text-sm font-semibold text-[#5F3A26] mb-2">What do you need help with?</label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-[#6B4423]/50" aria-hidden="true" />
                                <textarea
                                    id="consult-message"
                                    name="message"
                                    rows={4}
                                    required
                                    disabled={isSubmitting}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm pl-12 pr-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all resize-none disabled:opacity-50"
                                    placeholder="I want to make pour-over coffee at home..."
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8C6239] to-[#5F3A26] text-white font-bold text-lg transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                            aria-label={isSubmitting ? 'Submitting your consultation request, please wait' : 'Submit consultation request'}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                                    <span aria-live="polite">Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <Send size={20} aria-hidden="true" />
                                    Submit Request
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}