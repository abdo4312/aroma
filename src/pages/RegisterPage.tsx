import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Coffee, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { authService } from '@/api/services/auth.service';
import { useAuth } from '@/shared/hooks/useAuth';
import { FormField } from '@/shared/components/FormField';
import { type ApiError } from '@/shared/types/api';
import { AuthBackground } from '@/shared/components/AuthBackground';

export function RegisterPage() {
    const navigate = useNavigate();
    const login = useAuth((s) => s.login);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            });

            login(response.token, response.user, true);
            navigate('/');
        } catch (err: unknown) {
            const apiError = (err as { response?: { data?: ApiError } })?.response?.data;
            setError(apiError?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const getPasswordStrength = (password: string) => {
        if (!password) return { level: 0, label: '', color: '' };
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 1) return { level: 1, label: 'Weak', color: 'bg-red-400' };
        if (score <= 2) return { level: 2, label: 'Fair', color: 'bg-yellow-400' };
        if (score <= 3) return { level: 3, label: 'Good', color: 'bg-blue-400' };
        return { level: 4, label: 'Strong', color: 'bg-green-500' };
    };

    const strength = getPasswordStrength(formData.password);
    const passwordsMismatch = formData.confirmPassword && formData.password !== formData.confirmPassword;

    return (
        <div className="relative min-h-screen overflow-hidden font-sans flex items-center justify-center py-12">

            {/* ═════════ Background (Video + Overlay) ═════════ */}
            <AuthBackground />

            {/* ═════════ Register Card ═════════ */}
            <div className="relative z-20 w-full max-w-md mx-4">
                <div className="rounded-[2.5rem] border border-white/30 bg-white/15 backdrop-blur-2xl shadow-2xl p-8 md:p-10 text-left">

                    <div className="text-center mb-7">
                        <div
                            className="inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-coffee-500 to-coffee-900 text-white shadow-[0_8px_30px_-8px_rgba(95,58,38,0.6)] mb-5"
                            aria-hidden="true"
                        >
                            <Coffee size={32} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">Create Account</h1>
                        <p className="text-white/80 mt-2 text-sm">Join us and start your coffee journey</p>
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

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormField
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Ahmed Mohamed"
                            icon={<User size={18} />}
                            required
                            autoComplete="name"
                            labelClassName="text-white/90"
                        />
                        <FormField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            icon={<Mail size={18} />}
                            required
                            autoComplete="email"
                            labelClassName="text-white/90"
                        />
                        <FormField
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="05xxxxxxxx"
                            icon={<Phone size={18} />}
                            required
                            autoComplete="tel"
                            labelClassName="text-white/90"
                        />

                        <div className="space-y-2 text-left">
                            <label htmlFor="register-password" className="block text-sm font-semibold text-white/90 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" aria-hidden="true">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="register-password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                    autoComplete="new-password"
                                    aria-describedby="password-strength"
                                    className="w-full rounded-xl border border-white/30 bg-white/15 p-3 pl-11 pr-12 text-sm text-white placeholder-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-white/40"
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
                            {formData.password && (
                                <div
                                    id="password-strength"
                                    className="space-y-1"
                                    role="status"
                                    aria-live="polite"
                                >
                                    <div className="flex gap-1" aria-hidden="true">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength.level ? strength.color : 'bg-white/10'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[11px] text-white/60 font-medium">
                                        Password strength: {strength.label}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2 text-left">
                            <label htmlFor="register-confirm-password" className="block text-sm font-semibold text-white/90 mb-1">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" aria-hidden="true">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="register-confirm-password"
                                    name="confirmPassword"
                                    type={showConfirm ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="new-password"
                                    aria-invalid={passwordsMismatch ? true : undefined}
                                    aria-describedby={passwordsMismatch ? 'confirm-mismatch' : undefined}
                                    className="w-full rounded-xl border border-white/30 bg-white/15 p-3 pl-11 pr-12 text-sm text-white placeholder-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-white/40"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1"
                                    aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                                    aria-pressed={showConfirm}
                                >
                                    {showConfirm ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                                </button>
                            </div>
                            {passwordsMismatch && (
                                <p id="confirm-mismatch" role="alert" className="text-[11px] text-red-400 font-medium font-sans">
                                    Passwords don't match
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-coffee-500 to-coffee-700 text-white font-bold text-lg transition-all hover:shadow-[0_10px_30px_-8px_rgba(95,58,38,0.8)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
                            aria-label={isLoading ? 'Creating account, please wait' : 'Create your account'}
                        >
                            {isLoading && <Loader2 className="animate-spin h-5 w-5" aria-hidden="true" />}
                            <span aria-live="polite">{isLoading ? 'Creating Account...' : 'Sign Up'}</span>
                        </button>
                    </form>

                    <div className="flex items-center gap-4 my-7" aria-hidden="true">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <span className="text-xs text-white/50 font-medium">OR</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>

                    <p className="text-center text-sm text-white/80 font-sans">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-brand-cream hover:text-white transition-colors underline underline-offset-2">
                            Sign In
                        </Link>
                    </p>
                </div>

                <div className="text-center mt-6">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}