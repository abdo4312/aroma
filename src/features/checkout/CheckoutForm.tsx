import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Resolver } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createOrder } from './order.api';
import { checkoutSchema, type CheckoutFormData } from './checkout.schema';
import { useCartStore } from '@/store/useCartStore';
import { FormField } from '@/shared/components/FormField';
import { type ApiError } from '@/shared/types/api';
import { CheckCircle, AlertCircle, Loader2, MapPin, User, Mail, Phone } from 'lucide-react';
import { formatCurrency } from '@/shared/utils/formatCurrency';

const paymentMethods = [
  { value: 'card', label: 'Card' },
  { value: 'cod', label: 'Cash' },
  { value: 'wallet', label: 'Wallet' },
];

export function CheckoutForm() {
  const navigate = useNavigate();

  const { items, clearCart, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  const formResolver = zodResolver(checkoutSchema) as Resolver<CheckoutFormData>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CheckoutFormData>({
    resolver: formResolver,
    defaultValues: { paymentMethod: 'card' },
  });

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-left" dir="ltr">
      {errors.root && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 animate-pulse"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle size={18} aria-hidden="true" />
          <span className="text-sm font-medium">{errors.root.message}</span>
        </div>
      )}

      {/* Step 1: Shipping Information */}
      <section className="space-y-6" aria-labelledby="checkout-shipping-heading">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8C6239] text-white text-sm font-bold" aria-hidden="true">1</div>
          <h2 id="checkout-shipping-heading" className="text-xl font-bold text-[#4A3B32]">Shipping Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            label="First Name"
            placeholder="John"
            icon={<User size={18} />}
            error={errors.firstName?.message}
            register={register('firstName')}
          />
          <FormField
            label="Last Name"
            placeholder="Doe"
            icon={<User size={18} />}
            error={errors.lastName?.message}
            register={register('lastName')}
          />
          <div className="md:col-span-2">
            <FormField
              label="Email Address"
              type="email"
              placeholder="john.doe@example.com"
              icon={<Mail size={18} />}
              error={errors.email?.message}
              register={register('email')}
            />
          </div>
          <div className="md:col-span-2">
            <FormField
              label="Phone Number"
              placeholder="05xxxxxxxx"
              icon={<Phone size={18} />}
              error={errors.phone?.message}
              register={register('phone')}
            />
          </div>
          <div className="md:col-span-2">
            <FormField
              label="Full Shipping Address"
              placeholder="Street, Building, Apartment number..."
              icon={<MapPin size={18} />}
              error={errors.address?.message}
              register={register('address')}
            />
          </div>
        </div>
      </section>

      {/* Step 2: Payment Method Selection */}
      <fieldset className="space-y-6 border-0 p-0 m-0">
        <legend className="flex items-center gap-3 border-b border-gray-100 pb-4 w-full">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8C6239] text-white text-sm font-bold" aria-hidden="true">2</div>
          <h2 className="text-xl font-bold text-[#4A3B32]">Payment Method</h2>
        </legend>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          role="radiogroup"
          aria-label="Payment method"
        >
          {paymentMethods.map((method) => (
            <label
              key={method.value}
              className="relative flex flex-col items-center p-5 rounded-2xl border-2 border-gray-100 hover:border-[#8C6239]/50 cursor-pointer transition-all bg-white/50 has-[:checked]:border-[#8C6239] has-[:checked]:bg-[#8C6239]/5"
            >
              <input
                type="radio"
                value={method.value}
                {...register('paymentMethod')}
                className="absolute top-4 right-4 accent-[#8C6239]"
                aria-label={`Pay with ${method.label}`}
              />
              <span className="text-sm font-bold text-[#4A3B32]">{method.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Submit Section */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={isSubmitting || items.length === 0}
          className="group relative w-full overflow-hidden rounded-2xl bg-[#5f3a26] py-4 text-white font-bold transition-all hover:bg-[#4c2d1e] disabled:opacity-50 active:scale-[0.98]"
          aria-label={isSubmitting ? 'Processing your order, please wait' : `Pay ${formatCurrency(totalPrice)} for your order`}
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            ) : (
              <CheckCircle className="h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
            )}
            <span aria-live="polite">{isSubmitting ? 'Processing Order...' : `Pay ${formatCurrency(totalPrice)}`}</span>
          </div>
        </button>
        <p className="mt-4 text-center text-xs text-gray-400">
          Secure checkout powered by Aroma Corner API
        </p>
      </div>
    </form>
  );
} 