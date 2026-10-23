// ============================================================
// Aroma Corner — Orders Service
// Mock + Real API — تبديل تلقائي
// ============================================================

import { apiClient } from '@/services/apiClient';
import { ENDPOINTS } from '@/api/endpoints';
import type { Order, OrderItem } from '@/shared/types/api';

// ── Detect Mode ─────────────────────────────────────────────
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// ── Types ───────────────────────────────────────────────────
export interface CreateOrderPayload {
    items: OrderItem[];
    shippingAddress: string;
    paymentMethod: string;
}

export interface CreateOrderResponse {
    order: Order;
    message: string;
}

// ── Mock Implementations ────────────────────────────────────

const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD-001',
        items: [
            { productId: '1', quantity: 2 },
            { productId: '5', quantity: 1 },
        ],
        total: 157.5,
        status: 'delivered',
        createdAt: '2024-12-15T10:30:00Z',
    },
    {
        id: 'ORD-002',
        items: [{ productId: '3', quantity: 1 }],
        total: 85.0,
        status: 'shipped',
        createdAt: '2025-01-02T14:00:00Z',
    },
];

function mockGetOrders(): Order[] {
    return MOCK_ORDERS;
}

function mockGetOrderById(id: string): Order | undefined {
    return MOCK_ORDERS.find((o) => o.id === id);
}

function mockCreateOrder(payload: CreateOrderPayload): CreateOrderResponse {
    const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        items: payload.items,
        total: 0,
        status: 'pending',
        createdAt: new Date().toISOString(),
    };
    MOCK_ORDERS.unshift(newOrder);

    return {
        order: newOrder,
        message: 'Order placed successfully!',
    };
}

function mockCancelOrder(id: string): { success: boolean } {
    const order = MOCK_ORDERS.find((o) => o.id === id);
    if (order) {
        order.status = 'cancelled';
        return { success: true };
    }
    return { success: false };
}

// ── Real API Implementations ────────────────────────────────

async function apiGetOrders(): Promise<Order[]> {
    const { data } = await apiClient.get<Order[]>(ENDPOINTS.ORDERS.HISTORY);
    return data;
}

async function apiGetOrderById(id: string): Promise<Order> {
    const { data } = await apiClient.get<Order>(ENDPOINTS.ORDERS.BY_ID(id));
    return data;
}

async function apiCreateOrder(
    payload: CreateOrderPayload
): Promise<CreateOrderResponse> {
    const { data } = await apiClient.post<CreateOrderResponse>(
        ENDPOINTS.ORDERS.CREATE,
        payload
    );
    return data;
}

async function apiCancelOrder(id: string): Promise<{ success: boolean }> {
    const { data } = await apiClient.post<{ success: boolean }>(
        ENDPOINTS.ORDERS.CANCEL(id)
    );
    return data;
}

// ── Export — التبديل التلقائي ────────────────────────────────

export const ordersService = {
    getAll: USE_MOCK
        ? () => Promise.resolve(mockGetOrders())
        : async () => {
            try {
                return await apiGetOrders();
            } catch {
                return mockGetOrders();
            }
        },

    getById: USE_MOCK
        ? (id: string) => {
            const order = mockGetOrderById(id);
            if (!order) throw new Error('Order not found');
            return Promise.resolve(order);
        }
        : async (id: string) => {
            try {
                return await apiGetOrderById(id);
            } catch {
                const order = mockGetOrderById(id);
                if (!order) throw new Error('Order not found');
                return order;
            }
        },

    create: USE_MOCK
        ? (payload: CreateOrderPayload) =>
            Promise.resolve(mockCreateOrder(payload))
        : async (payload: CreateOrderPayload) => {
            try {
                return await apiCreateOrder(payload);
            } catch {
                return mockCreateOrder(payload);
            }
        },

    cancel: USE_MOCK
        ? (id: string) => Promise.resolve(mockCancelOrder(id))
        : async (id: string) => {
            try {
                return await apiCancelOrder(id);
            } catch {
                return mockCancelOrder(id);
            }
        },
};