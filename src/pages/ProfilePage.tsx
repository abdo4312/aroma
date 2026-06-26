import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { userService } from '@/api/services/user.service';
import { ordersService } from '@/api/services/orders.service';
import { useAuth } from '@/shared/hooks/useAuth';
import {
    Package,
    MapPin,
    LogOut,
    Edit2,
    Loader2,
    AlertTriangle,
    Save,
    Bell,
    CreditCard,
    HelpCircle,
    ChevronRight,
    ShoppingBag,
} from 'lucide-react';
import toast from 'react-hot-toast';
import type { Order, UserProfile } from '@/shared/types/api';

interface ProfileFormValues {
    name: string;
    phone: string;
}

export function ProfilePage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // useAuth selectors — wrapped defensively in case the API differs
    const authState = useAuth() as {
        user?: UserProfile;
        logout: () => void;
        updateUser: (patch: Partial<UserProfile>) => void;
    };
    const logout = authState?.logout;
    const updateUser = authState?.updateUser;

    const [isSaving, setIsSaving] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const { data: user, isLoading: userLoading, error: userError } = useQuery<UserProfile>({
        queryKey: ['profile'],
        queryFn: () => userService.getProfile(),
    });

    const { data: orders = [], isLoading: ordersLoading } = useQuery<Order[]>({
        queryKey: ['my-orders'],
        queryFn: () => ordersService.getAll() as unknown as Order[],
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty },
    } = useForm<ProfileFormValues>({
        defaultValues: {
            name: user?.name || '',
            phone: user?.phone || '',
        },
    });

    // Reset form when user data loads
    if (user && !showEditForm) {
        // sync defaults when not editing
    }

    const handleLogout = () => {
        logout?.();
        queryClient.clear();
        navigate('/login');
    };

    const onSubmit = async (data: ProfileFormValues) => {
        setIsSaving(true);
        try {
            const updated = await userService.updateProfile({
                name: data.name,
                phone: data.phone,
            });
            updateUser?.({ name: updated.name, phone: updated.phone });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast.success('Profile updated successfully!');
            setShowEditForm(false);
        } catch {
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    /* ─── Loading ─── */
    if (userLoading || ordersLoading) {
        return (
            <main className="min-h-screen bg-[radial-gradient(circle_at_20%_15%,#fff8f1_0%,#f9e8d8_35%,#efdac7_65%,#e3ccb8_100%)] flex items-center justify-center">
                <div className="text-center space-y-4" role="status" aria-live="polite">
                    <Loader2 className="w-10 h-10 text-[#8C6239] animate-spin mx-auto" aria-hidden="true" />
                    <p className="text-[#6B4423]/70 font-medium">Loading profile...</p>
                </div>
            </main>
        );
    }

    /* ─── Error ─── */
    if (userError) {
        return (
            <main className="min-h-screen bg-[radial-gradient(circle_at_20%_15%,#fff8f1_0%,#f9e8d8_35%,#efdac7_65%,#e3ccb8_100%)] flex items-center justify-center p-4">
                <div className="text-center space-y-4 max-w-md bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white" role="alert">
                    <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" aria-hidden="true" />
                    <p className="text-[#6B4423]/70 font-medium">Failed to load profile. Please login again.</p>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 rounded-xl bg-[#8C6239] text-white font-bold hover:bg-[#5F3A26] transition-colors"
                        aria-label="Go to login page"
                    >
                        Go to Login
                    </button>
                </div>
            </main>
        );
    }

    const profileData = {
        name: user?.name || 'User',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
    };

    const initials = profileData.name
        .split(' ')
        .map((n) => n.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase() || '?';

    /* ─── Settings list items (matching the HTML mockup structure) ─── */
    const settingsItems = [
        { id: 'orders', label: 'Order History', icon: Package, value: orders.length, action: () => { /* could navigate */ } },
        { id: 'addresses', label: 'Saved Addresses', icon: MapPin, value: profileData.address ? 1 : 0, action: () => { /* could navigate */ } },
        { id: 'payment', label: 'Payment Methods', icon: CreditCard, value: 0, action: () => { /* placeholder */ } },
        { id: 'notifications', label: 'Notifications', icon: Bell, value: 0, action: () => { /* placeholder */ } },
        { id: 'help', label: 'Help & Support', icon: HelpCircle, value: 0, action: () => navigate('/support') },
    ];

    return (
        <main className="relative min-h-screen bg-[radial-gradient(circle_at_20%_15%,#fff8f1_0%,#f9e8d8_35%,#efdac7_65%,#e3ccb8_100%)] text-[#2e1a12] pb-24 md:pb-12">
            <div className="coffee-blob coffee-blob-a" aria-hidden="true" />
            <div className="coffee-blob coffee-blob-b" aria-hidden="true" />

            <div className="relative z-10 mx-auto max-w-2xl px-4 py-6 md:py-10">

                {/* ─── Profile Header (Avatar + Name + Email) ─── */}
                <section className="flex flex-col items-center justify-center py-4 mb-6">
                    <div
                        className="relative w-24 h-24 mb-4 rounded-full shadow-[0px_4px_12px_rgba(46,26,18,0.15)] bg-gradient-to-br from-[#8C6239] to-[#5F3A26] overflow-hidden border-2 border-white flex items-center justify-center"
                        role="img"
                        aria-label={`User avatar, initials: ${initials}`}
                    >
                        <span className="text-3xl font-black text-white">{initials}</span>
                    </div>
                    <h1 className="font-headline-sm text-2xl font-bold text-[#4A3B32] text-center">{profileData.name}</h1>
                    <p className="font-body-md text-sm text-[#6B4423]/70 text-center mt-1">{profileData.email}</p>

                    {/* Edit button — inline under the name */}
                    <button
                        onClick={() => {
                            reset({ name: profileData.name, phone: profileData.phone });
                            setShowEditForm(!showEditForm);
                        }}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#8C6239] hover:text-[#5F3A26] transition-colors"
                        aria-label={showEditForm ? 'Close edit form' : 'Edit profile information'}
                        aria-expanded={showEditForm}
                    >
                        <Edit2 size={12} aria-hidden="true" />
                        {showEditForm ? 'Cancel Edit' : 'Edit Profile'}
                    </button>
                </section>

                {/* ─── Edit Form (collapsible) ─── */}
                {showEditForm && (
                    <section className="mb-6 rounded-2xl border border-white/50 bg-white/60 backdrop-blur-xl p-4 shadow-md">
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="profile-name" className="block text-xs font-bold text-[#5F3A26] mb-1.5 uppercase tracking-wide">Full Name</label>
                                <input
                                    id="profile-name"
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full rounded-xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-[#3f2518] focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20"
                                />
                            </div>
                            <div>
                                <label htmlFor="profile-phone" className="block text-xs font-bold text-[#5F3A26] mb-1.5 uppercase tracking-wide">Phone Number</label>
                                <input
                                    id="profile-phone"
                                    type="tel"
                                    {...register('phone')}
                                    className="w-full rounded-xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-[#3f2518] focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20"
                                />
                            </div>
                            <div>
                                <label htmlFor="profile-email" className="block text-xs font-bold text-[#5F3A26] mb-1.5 uppercase tracking-wide">Email Address</label>
                                <input
                                    id="profile-email"
                                    type="email"
                                    defaultValue={profileData.email}
                                    readOnly
                                    aria-readonly="true"
                                    className="w-full rounded-xl border border-white/50 bg-gray-100/50 px-4 py-3 text-sm text-[#3f2518]/60 cursor-not-allowed"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSaving || !isDirty}
                                className="w-full py-3 rounded-xl bg-[#4A3B32] text-white font-bold text-sm transition-all hover:bg-[#5F3A26] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label={isSaving ? 'Saving profile changes' : 'Save profile changes'}
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                                        <span aria-live="polite">Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} aria-hidden="true" /> Save Changes
                                    </>
                                )}
                            </button>
                        </form>
                    </section>
                )}

                {/* ─── Stats Row (Bento-ish) ─── */}
                <section className="grid grid-cols-2 gap-3 mb-6" aria-label="Account statistics">
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 flex flex-col items-center shadow-[0px_4px_12px_rgba(46,26,18,0.08)] border border-white/50">
                        <span className="text-2xl font-black text-[#4A3B32] mb-1">{orders.length}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B4423]/70">Orders</span>
                    </div>
                    <button
                        onClick={() => navigate('/shop-beans')}
                        className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 flex flex-col items-center shadow-[0px_4px_12px_rgba(46,26,18,0.08)] border border-white/50 hover:bg-white transition-colors text-center"
                        aria-label="Continue shopping"
                    >
                        <span className="text-2xl font-black text-[#4A3B32] mb-1 flex items-center gap-1">
                            <ShoppingBag size={20} aria-hidden="true" />
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B4423]/70">Shop</span>
                    </button>
                </section>

                {/* ─── Order History Preview (if any) ─── */}
                {orders.length > 0 && (
                    <section className="mb-6" aria-labelledby="recent-orders-heading">
                        <div className="flex items-center justify-between mb-2 px-1">
                            <h2 id="recent-orders-heading" className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a5a46]">Recent Orders</h2>
                            <button
                                onClick={() => navigate('/shop-beans')}
                                className="text-xs font-bold text-[#8C6239] hover:text-[#5F3A26]"
                            >
                                View all
                            </button>
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/70 backdrop-blur-xl shadow-md">
                            {orders.slice(0, 3).map((order: Order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between px-4 py-3 border-b border-[#8C6239]/10 last:border-b-0"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#5f3a26]/8 text-[#7d4930]">
                                            <Package size={16} aria-hidden="true" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-[#3f2518] truncate">{order.id}</p>
                                            <p className="text-xs text-[#6f503d]/80">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${order.status === 'delivered'
                                                ? 'bg-green-100 text-green-700'
                                                : order.status === 'cancelled'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                        <span className="text-sm font-bold text-[#4A3B32]">{order.total} SAR</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ─── Settings List (app-like) ─── */}
                <section className="mb-6" aria-labelledby="settings-heading">
                    <h2 id="settings-heading" className="mb-2 px-1 text-xs font-bold uppercase tracking-[0.18em] text-[#7a5a46]">Settings</h2>
                    <div className="overflow-hidden rounded-2xl border border-white/50 shadow-md bg-white/70 backdrop-blur-xl">
                        {settingsItems.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={item.action}
                                    className={`w-full flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-white active:scale-[0.99] ${i < settingsItems.length - 1 ? 'border-b border-[#8C6239]/10' : ''
                                        }`}
                                    aria-label={item.label}
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#5f3a26]/8 text-[#7d4930]">
                                        <Icon size={18} aria-hidden="true" />
                                    </span>
                                    <span className="flex-1 text-left text-[15px] font-semibold text-[#3f2518]">{item.label}</span>
                                    {item.value > 0 && (
                                        <span className="text-xs font-bold text-[#8C6239] bg-[#8C6239]/10 px-2 py-0.5 rounded-full">
                                            {item.value}
                                        </span>
                                    )}
                                    <ChevronRight className="h-4 w-4 text-[#8c6239]/50" aria-hidden="true" />
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* ─── Saved Addresses (if any) ─── */}
                {profileData.address && (
                    <section className="mb-6" aria-labelledby="address-heading">
                        <h2 id="address-heading" className="mb-2 px-1 text-xs font-bold uppercase tracking-[0.18em] text-[#7a5a46]">Default Address</h2>
                        <div className="rounded-2xl border border-white/50 bg-white/70 backdrop-blur-xl p-4 shadow-md flex items-start gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#5f3a26]/8 text-[#7d4930] mt-0.5">
                                <MapPin size={18} aria-hidden="true" />
                            </span>
                            <p className="flex-1 text-sm text-[#3f2518] leading-relaxed">{profileData.address}</p>
                            <button
                                className="text-xs font-bold text-[#8C6239] hover:text-[#5F3A26] flex items-center gap-1 shrink-0"
                                aria-label="Edit your saved address"
                            >
                                <Edit2 size={12} aria-hidden="true" /> Edit
                            </button>
                        </div>
                    </section>
                )}

                {/* ─── Logout Button ─── */}
                <button
                    onClick={handleLogout}
                    className="w-full bg-white/70 backdrop-blur-xl text-[#EF4444] font-bold py-4 rounded-2xl hover:bg-red-50/50 transition-colors flex items-center justify-center gap-2 border border-white/50 shadow-sm"
                    aria-label="Logout from your account"
                >
                    <LogOut size={18} aria-hidden="true" />
                    Log Out
                </button>

                {/* ─── Footer note ─── */}
                <p className="mt-6 text-center text-xs text-[#6f503d]/60">
                    Aroma Corner · Freshly roasted, delivered fresh
                </p>
            </div>
        </main>
    );
}