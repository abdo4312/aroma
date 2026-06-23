import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { userService } from '@/api/services/user.service';
import { ordersService } from '@/api/services/orders.service';
import { useAuth } from '@/shared/hooks/useAuth';
import { User, Package, MapPin, LogOut, Edit2, Loader2, AlertTriangle, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Order, UserProfile } from '@/shared/types/api';

interface ProfileFormValues {
    name: string;
    phone: string;
}

export function ProfilePage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const logout = useAuth((s) => s.logout);
    const updateUser = useAuth((s) => s.updateUser);
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaving, setIsSaving] = useState(false);

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
        formState: { isDirty },
    } = useForm<ProfileFormValues>({
        defaultValues: {
            name: user?.name || '',
            phone: user?.phone || '',
        },
    });

    // Reset form when user data loads or changes
    const handleLogout = () => {
        logout();
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
            updateUser({ name: updated.name, phone: updated.phone });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast.success('Profile updated successfully!');
        } catch {
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (userLoading || ordersLoading) {
        return (
            <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center">
                <div className="text-center space-y-4" role="status" aria-live="polite">
                    <Loader2 className="w-10 h-10 text-[#8C6239] animate-spin mx-auto" aria-hidden="true" />
                    <p className="text-[#6B4423]/70 font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (userError) {
        return (
            <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center">
                <div className="text-center space-y-4" role="alert">
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
            </div>
        );
    }

    const profileData = {
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
    };

    const tabs = [
        { id: 'profile', label: 'Profile Info', icon: User },
        { id: 'orders', label: 'Order History', icon: Package },
        { id: 'addresses', label: 'Addresses', icon: MapPin },
    ];

    return (
        <div className="min-h-screen bg-[#F5F0EB] relative overflow-hidden font-sans py-12">
            <div className="coffee-blob coffee-blob-a" aria-hidden="true" />
            <div className="coffee-blob coffee-blob-b" aria-hidden="true" />
            <div className="coffee-blob coffee-blob-c" aria-hidden="true" />

            <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                <div className="grid md:grid-cols-[250px_1fr] gap-8">

                    <div className="rounded-[2rem] border border-white/40 bg-white/25 backdrop-blur-xl shadow-2xl p-6 h-fit">
                        <div className="text-center mb-6">
                            <div
                                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8C6239] to-[#5F3A26] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-3"
                                role="img"
                                aria-label={`User avatar, first letter: ${profileData.name.charAt(0) || '?'}`}
                            >
                                {profileData.name.charAt(0) || '?'}
                            </div>
                            <h3 className="font-bold text-[#3f2518]">{profileData.name || 'User'}</h3>
                            <p className="text-xs text-[#6B4423]/70">{profileData.email}</p>
                        </div>

                        <nav className="space-y-2" role="tablist" aria-label="Profile sections">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        role="tab"
                                        aria-selected={isActive}
                                        aria-label={`View ${tab.label}`}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-[#8C6239] text-white shadow-lg' : 'text-[#4A3B32] hover:bg-white/40'}`}
                                    >
                                        <Icon size={18} aria-hidden="true" /> {tab.label}
                                    </button>
                                );
                            })}
                        </nav>

                        <button
                            onClick={handleLogout}
                            className="w-full mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50/50 transition-all"
                            aria-label="Logout from your account"
                        >
                            <LogOut size={18} aria-hidden="true" /> Logout
                        </button>
                    </div>

                    <div
                        className="rounded-[2rem] border border-white/40 bg-white/25 backdrop-blur-xl shadow-2xl p-8"
                        role="tabpanel"
                        aria-labelledby={`tab-${activeTab}`}
                    >

                        {activeTab === 'profile' && (
                            <div>
                                <h2 id="tab-profile" className="text-2xl font-bold text-[#3f2518] mb-6 flex items-center gap-2">
                                    <User size={24} aria-hidden="true" /> Profile Information
                                </h2>
                                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="profile-name" className="block text-sm font-semibold text-[#5F3A26] mb-2">Full Name</label>
                                            <input
                                                id="profile-name"
                                                type="text"
                                                {...register('name', { required: 'Name is required' })}
                                                className="w-full rounded-xl border border-white/50 bg-white/35 px-4 py-3 text-sm text-[#3f2518] focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="profile-phone" className="block text-sm font-semibold text-[#5F3A26] mb-2">Phone Number</label>
                                            <input
                                                id="profile-phone"
                                                type="tel"
                                                {...register('phone')}
                                                className="w-full rounded-xl border border-white/50 bg-white/35 px-4 py-3 text-sm text-[#3f2518] focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="profile-email" className="block text-sm font-semibold text-[#5F3A26] mb-2">Email Address</label>
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
                                        className="px-8 py-3 rounded-xl bg-[#553220] text-white font-bold text-sm transition-all hover:bg-[#422617] hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label={isSaving ? 'Saving profile changes' : 'Save profile changes'}
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" aria-hidden="true" /> <span aria-live="polite">Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save size={16} aria-hidden="true" /> Save Changes
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div>
                                <h2 id="tab-orders" className="text-2xl font-bold text-[#3f2518] mb-6 flex items-center gap-2">
                                    <Package size={24} aria-hidden="true" /> Order History
                                </h2>

                                {orders.length > 0 ? (
                                    <div className="overflow-x-auto rounded-xl border border-white/40">
                                        <table className="w-full text-sm">
                                            <caption className="sr-only">Your order history with status and total</caption>
                                            <thead className="bg-white/30 text-[#5F3A26]">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3 text-left font-semibold">Order ID</th>
                                                    <th scope="col" className="px-4 py-3 text-left font-semibold">Date</th>
                                                    <th scope="col" className="px-4 py-3 text-left font-semibold">Status</th>
                                                    <th scope="col" className="px-4 py-3 text-left font-semibold">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/30">
                                                {orders.map((order: Order) => (
                                                    <tr key={order.id} className="hover:bg-white/20 transition-colors">
                                                        <td className="px-4 py-3 font-medium text-[#4A3B32]">{order.id}</td>
                                                        <td className="px-4 py-3 text-[#6B4423]/80">
                                                            {new Date(order.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'delivered'
                                                                ? 'bg-green-100 text-green-700'
                                                                : order.status === 'cancelled'
                                                                    ? 'bg-red-100 text-red-700'
                                                                    : 'bg-yellow-100 text-yellow-700'
                                                                }`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 font-bold text-[#4A3B32]">{order.total}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 border border-dashed border-white/40 rounded-xl" role="status">
                                        <Package className="mx-auto h-12 w-12 text-[#6B4423]/30 mb-3" aria-hidden="true" />
                                        <p className="text-[#6B4423]/60">You haven't placed any orders yet.</p>
                                        <button
                                            onClick={() => navigate('/shop-beans')}
                                            className="mt-4 px-6 py-2 rounded-lg bg-[#8C6239] text-white text-sm font-bold hover:bg-[#5F3A26] transition-colors"
                                            aria-label="Start shopping for coffee beans"
                                        >
                                            Start Shopping
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div>
                                <h2 id="tab-addresses" className="text-2xl font-bold text-[#3f2518] mb-6 flex items-center gap-2">
                                    <MapPin size={24} aria-hidden="true" /> Saved Addresses
                                </h2>
                                {profileData.address ? (
                                    <div className="p-6 rounded-xl border border-white/40 bg-white/20">
                                        <p className="text-[#6B4423]/80 mb-4">{profileData.address}</p>
                                        <button
                                            className="text-sm font-bold text-[#8C6239] hover:text-[#5F3A26] flex items-center gap-1"
                                            aria-label="Edit your saved address"
                                        >
                                            <Edit2 size={14} aria-hidden="true" /> Edit Address
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 border border-dashed border-white/40 rounded-xl" role="status">
                                        <MapPin className="mx-auto h-12 w-12 text-[#6B4423]/30 mb-3" aria-hidden="true" />
                                        <p className="text-[#6B4423]/60">No saved addresses yet.</p>
                                        <button
                                            className="mt-4 px-6 py-2 rounded-lg bg-[#8C6239] text-white text-sm font-bold hover:bg-[#5F3A26] transition-colors"
                                            aria-label="Add a new delivery address"
                                        >
                                            Add Address
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}