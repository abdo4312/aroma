import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { FormField } from '@/shared/components/FormField';
import apiClient from '@/services/apiClient';
import { AuthBackground } from '@/shared/components/AuthBackground';

export function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await apiClient.post('/auth/forgot-password', { email });
            setIsSuccess(true);
        } catch {
            // Always show success — never reveal whether the email exists (security best practice)
            setIsSuccess(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden font-sans flex items-center justify-center py-12">

            {/* ═════════ Background (Video + Overlay) ═════════ */}
            <AuthBackground />

            {/* ═════════ Forgot Password Card ═════════ */}
            <div className="relative z-20 w-full max-w-md mx-4">
                <div className="rounded-[2.5rem] border border-white/30 bg-white/15 backdrop-blur-2xl shadow-2xl p-8 md:p-10 text-left">

                    {/* Success State */}
                    {isSuccess ? (
                        <div className="text-center py-4" role="status" aria-live="polite">
                            <div
                                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 text-green-400 mb-5"
                                role="img"
                                aria-label="Success"
                            >
                                <CheckCircle2 size={40} aria-hidden="true" />
                            </div>
                            <h1 className="text-2xl font-extrabold text-white mb-3 drop-shadow-lg">Check Your Email</h1>
                            <p className="text-sm text-white/80 mb-6 leading-relaxed">
                                If an account exists for <span className="font-semibold text-brand-cream">{email}</span>,
                                you'll receive a password reset link shortly.
                            </p>
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-coffee-500 to-coffee-700 text-white font-bold transition-all hover:shadow-[0_10px_30px_-8px_rgba(95,58,38,0.8)] hover:scale-[1.02] active:scale-[0.98]"
                                aria-label="Back to login page"
                            >
                                <ArrowLeft size={18} aria-hidden="true" /> Back to Login
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div
                                    className="inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-coffee-500 to-coffee-900 text-white shadow-[0_8px_30px_-8px_rgba(95,58,38,0.6)] mb-5"
                                    aria-hidden="true"
                                >
                                    <Mail size={32} />
                                </div>
                                <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">Forgot Password?</h1>
                                <p className="text-white/80 mt-2 text-sm leading-relaxed">
                                    No worries! Enter your email and we'll send you a reset link.
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div
                                    className="flex items-center gap-3 p-4 mb-5 rounded-2xl bg-red-50/90 border border-red-200/60 text-red-700 backdrop-blur-md"
                                    role="alert"
                                    aria-live="assertive"
                                >
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                    <span className="text-sm font-medium">{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <FormField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    icon={<Mail size={20} />}
                                    required
                                    autoComplete="email"
                                    labelClassName="text-white/90"
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-coffee-500 to-coffee-700 text-white font-bold text-lg transition-all hover:shadow-[0_10px_30px_-8px_rgba(95,58,38,0.8)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
                                    aria-label={isLoading ? 'Sending reset link, please wait' : 'Send password reset link'}
                                >
                                    {isLoading && <Loader2 className="animate-spin h-5 w-5" aria-hidden="true" />}
                                    <span aria-live="polite">{isLoading ? 'Sending...' : 'Send Reset Link'}</span>
                                </button>
                            </form>

                            {/* Back to Login */}
                            <div className="text-center mt-7">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-cream hover:text-white transition-colors"
                                >
                                    <ArrowLeft size={16} aria-hidden="true" /> Back to Login
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}