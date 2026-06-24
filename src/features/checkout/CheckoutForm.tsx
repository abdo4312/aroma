import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Resolver } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createOrder } from './order.api';
import { checkoutSchema, type CheckoutFormData } from './checkout.schema';
import { useCartStore } from '@/store/useCartStore';
import { FormField } from '@/shared/components/FormField';
import { type ApiError } from '@/shared/types/api';
import { CheckCircle, AlertCircle, Loader2, MapPin, User, Mail, Phone, CreditCard, Wallet, Banknote } from 'lucide-react';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { cn } from '@/shared/utils/cn';

const paymentMethods = [
  { value: 'card', label: 'Credit Card', icon: CreditCard },
  { value: 'cod', label: 'Cash on Delivery', icon: Banknote },
  { value: 'wallet', label: 'Digital Wallet', icon: Wallet },
];

export function CheckoutForm() {
  const navigate = useNavigate();

  const { items, clearCart, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  const formResolver = zodResolver(checkoutSchema) as Resolver<CheckoutFormData>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CheckoutFormData>({
    resolver: formResolver,
    defaultValues: { paymentMethod: 'card' },
  });

  const selectedPaymentMethod = watch('paymentMethod');

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const orderPayload = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: { full: data.address, city: data.city },
        },
        payment: { method: data.paymentMethod, total: totalPrice },
      };

      const result = await createOrder(orderPayload);
      clearCart();
      navigate('/order-success', { state: { orderId: result.orderId } });
    } catch (error: unknown) {
      const apiError = (error as { response?: { data?: ApiError } }).response?.data;
      setError('root', { message: apiError?.message || 'Order processing failed.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" dir="ltr">
      {errors.root && (
        <div
          className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700"
          role="alert"
        >
          <AlertCircle size={18} />
          <span className="text-sm font-bold">{errors.root.message}</span>
        </div>
      )}

      {/* ─── SHIPPING SECTION ─── */}
      <section className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-coffee-400 px-1">Shipping Details</h2>
        <div className="bg-white rounded-[2rem] border border-coffee-100 p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="First Name"
              placeholder="John"
              icon={<User size={18} />}
              error={errors.firstName?.message}
              register={register('firstName')}
              className="bg-coffee-50/50 border-coffee-100"
            />
            <FormField
              label="Last Name"
              placeholder="Doe"
              icon={<User size={18} />}
              error={errors.lastName?.message}
              register={register('lastName')}
              className="bg-coffee-50/50 border-coffee-100"
            />
          </div>
          <FormField
            label="Email"
            type="email"
            placeholder="john@example.com"
            icon={<Mail size={18} />}
            error={errors.email?.message}
            register={register('email')}
            className="bg-coffee-50/50 border-coffee-100"
          />
          <FormField
            label="Phone"
            placeholder="05xxxxxxxx"
            icon={<Phone size={18} />}
            error={errors.phone?.message}
            register={register('phone')}
            className="bg-coffee-50/50 border-coffee-100"
          />
          <FormField
            label="City"
            placeholder="Riyadh"
            icon={<MapPin size={18} />}
            error={errors.city?.message}
            register={register('city')}
            className="bg-coffee-50/50 border-coffee-100"
          />
          <FormField
            label="Address"
            placeholder="District, Street, Building..."
            icon={<MapPin size={18} />}
            error={errors.address?.message}
            register={register('address')}
            className="bg-coffee-50/50 border-coffee-100"
          />
        </div>
      </section>

      {/* ─── PAYMENT SECTION ─── */}
      <section className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-coffee-400 px-1">Payment Method</h2>
        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedPaymentMethod === method.value;
            return (
              <label
                key={method.value}
                className={cn(
                  "flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer bg-white",
                  isSelected
                    ? "border-coffee-900 shadow-lg shadow-coffee-900/5 bg-coffee-50/30"
                    : "border-coffee-100 hover:border-coffee-300"
                )}
              >
                <input
                  type="radio"
                  value={method.value}
                  {...register('paymentMethod')}
                  className="sr-only"
                />
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                  isSelected ? "bg-coffee-900 text-white" : "bg-coffee-50 text-coffee-600"
                )}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <p className="font-black text-coffee-900">{method.label}</p>
                  <p className="text-xs text-coffee-500 font-medium">Secure Payment</p>
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                  isSelected ? "border-coffee-900 bg-coffee-900" : "border-coffee-200"
                )}>
                  {isSelected && <CheckCircle size={14} className="text-white" />}
                </div>
              </label>
            );
          })}
        </div>
      </section>

      {/* ─── ORDER SUMMARY ─── */}
      <section className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-coffee-400 px-1">Order Summary</h2>
        <div className="bg-white rounded-[2rem] border border-coffee-100 p-6 shadow-sm space-y-3">
          <div className="flex justify-between text-sm font-bold text-coffee-600">
            <span>Subtotal</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-coffee-600">
            <span>Shipping</span>
            <span className="text-emerald-600">Free</span>
          </div>
          <div className="pt-3 border-t border-coffee-50 flex justify-between items-center">
            <span className="font-black text-coffee-900">Total</span>
            <span className="text-xl font-black text-coffee-900">{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      </section>

      {/* ─── STICKY SUBMIT BUTTON ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-coffee-100 p-4 pb-safe">
        <div className="max-w-2xl mx-auto">
          <button
            type="submit"
            disabled={isSubmitting || items.length === 0}
            className="w-full py-4 rounded-[1.5rem] bg-coffee-900 text-white font-black text-lg flex items-center justify-between px-8 shadow-2xl active:scale-[0.98] disabled:opacity-50 transition-all"
          >
            <div className="flex items-center gap-3">
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <CheckCircle className="h-5 w-5" />
              )}
              <span>{isSubmitting ? 'Processing...' : 'Place Order'}</span>
            </div>
            <span className="text-coffee-300">
              {formatCurrency(totalPrice)}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
