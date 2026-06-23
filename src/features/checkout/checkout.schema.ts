import { z } from 'zod'

export const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName:  z.string().min(2, 'Last name must be at least 2 characters'),
  email:     z.string().email('Email is invalid'),
  phone:     z.string().regex(/^01[0125]\d{8}$/, 'Phone number is invalid'),
  address:   z.string().min(10, 'Address must be at least 10 characters'),
  city:      z.string().min(2, 'Please select a city'),
  paymentMethod: z.enum(['card', 'cod', 'wallet']),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>