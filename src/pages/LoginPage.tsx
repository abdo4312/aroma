import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Coffee, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { authService } from '@/api/services/auth.service';
import { useAuth } from '@/shared/hooks/useAuth';
import { FormField } from '@/shared/components/FormField';
import { AuthBackground } from '@/shared/components/AuthBackground';
import { type ApiError } from '@/shared/types/api';

export function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const login = useAuth((s) => s.login);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await authService.login(formData.email, formData.password);
            login(response.token, response.user, rememberMe);
            navigate(from, { replace: true });
        } catch (err: unknown) {
            const apiError = (err as { response?: { data?: ApiError } })?.response?.data;
            setError(apiError?.message || 'Invalid email or password.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="relative min-h-screen overflow-hidden font-sans flex items-center justify-center py-12">

            {/* ═════════ Background (Video + Overlay) ═════════ */}
            <AuthBackground />

            {/* ═════════ Login Card ═════════ */}
            <div className="relative z-20 w-full max-w-md mx-4">
                <div className="rounded-[2.5rem] border border-white/30 bg-white/15 backdrop-blur-2xl shadow-2xl p-8 md:p-10 text-left">

                    <div className="text-center mb-8">
                        <div
                            className="inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-coffee-500 to-coffee-900 text-white shadow-[0_8px_30px_-8px_rgba(95,58,38,0.6)] mb-5"
                            aria-hidden="true"
                        >
                            <Coffee size={32} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">Welcome Back</h1>
                        <p className="text-white/80 mt-2 text-sm">Login to access your coffee corner</p>
                    </div>

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
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            icon={<Mail size={20} />}
                            required
                            autoComplete="email"
                            labelClassName="text-white/90"
                        />

                        <div className="space-y-2 text-left">
                            <label htmlFor="login-password" className="block text-sm font-semibold text-white/90 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" aria-hidden="true">
                                    <Lock size={20} />
                                </div>
                                <input
                                    id="login-password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                    aria-invalid={error ? true : undefined}
                                    className="w-full rounded-xl border border-white/30 bg-white/15 backdrop-blur-md p-3 pl-11 pr-12 text-sm text-white placeholder-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    aria-pressed={showPassword}
                                >
                                    {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="remember-me" className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-white/40 bg-white/20 text-coffee-500 focus:ring-white/40 accent-coffee-500"
                                />
                                <span className="text-sm text-white/80 group-hover:text-white transition-colors">Remember me</span>
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-brand-cream hover:text-white transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-coffee-500 to-coffee-700 text-white font-bold text-lg transition-all hover:shadow-[0_10px_30px_-8px_rgba(95,58,38,0.8)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
                            aria-label={isLoading ? 'Signing in, please wait' : 'Sign in to your account'}
                        >
                            {isLoading && <Loader2 className="animate-spin h-5 w-5" aria-hidden="true" />}
                            <span aria-live="polite">{isLoading ? 'Signing in...' : 'Sign In'}</span>
                        </button>
                    </form>

                    <div className="flex items-center gap-4 my-7" aria-hidden="true">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <span className="text-xs text-white/50 font-medium">OR</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>

                    <p className="text-center text-sm text-white/80">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-brand-cream hover:text-white transition-colors underline underline-offset-2">
                            Create Account
                        </Link>
                    </p>
                </div>

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