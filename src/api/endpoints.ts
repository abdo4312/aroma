
export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        ME: '/auth/me',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },

    PRODUCTS: {
        ALL: '/products',
        BY_ID: (id: string) => `/products/${id}`,
        FEATURED: '/products/featured',
        SEARCH: '/products/search',
    },

    CART: {
        GET: '/cart',
        ADD: '/cart/items',
        UPDATE: (id: string) => `/cart/items/${id}`,
        REMOVE: (id: string) => `/cart/items/${id}`,
        CLEAR: '/cart',
    },

    ORDERS: {
        CREATE: '/orders',
        HISTORY: '/orders',
        BY_ID: (id: string) => `/orders/${id}`,
        CANCEL: (id: string) => `/orders/${id}/cancel`,
    },

    WISHLIST: {
        GET: '/wishlist',
        ADD: '/wishlist/items',
        REMOVE: (id: string) => `/wishlist/items/${id}`,
        TOGGLE: '/wishlist/items/toggle',
    },

    USER: {
        PROFILE: '/user/profile',
        UPDATE: '/user/profile',
        CHANGE_PASSWORD: '/user/change-password',
        ADDRESSES: '/user/addresses',
        ADD_ADDRESS: '/user/addresses',
        UPDATE_ADDRESS: (id: string) => `/user/addresses/${id}`,
        DELETE_ADDRESS: (id: string) => `/user/addresses/${id}`,
    },
} as const;