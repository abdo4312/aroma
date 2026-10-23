import apiClient from '@/services/apiClient';

export interface OrderPayload {
  items: { productId: string; quantity: number }[];
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: { full: string; city: string };
  };
  payment: { method: string; total: number };
}

export async function createOrder(payload: OrderPayload): Promise<{ orderId: string }> {
  const { data } = await apiClient.post<{ orderId: string }>('/orders', payload);
  return data;
}