
import { apiClient } from '@/services/apiClient';
import { ENDPOINTS } from '@/api/endpoints';
import type { UserProfile } from '@/shared/types/api';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export interface UpdateProfilePayload {
    name?: string;
    phone?: string;
    address?: string;
    avatar?: string;
}

export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
}

export interface Address {
    id: string;
    label: string;
    address: string;
    city: string;
    isDefault: boolean;
}


function mockGetProfile(): UserProfile {
    try {
        const raw = localStorage.getItem('user');
        if (raw) return JSON.parse(raw);
    } catch { /* ignore */ }

    return {
        id: 'mock-dev',
        name: 'Dev User',
        email: 'dev@aroma.com',
        phone: '0500000000',
        address: '',
    };
}

function mockUpdateProfile(
    payload: UpdateProfilePayload
): UserProfile {
    const current = mockGetProfile();
    const updated = { ...current, ...payload };

    try {
        localStorage.setItem('user', JSON.stringify(updated));
    } catch { /* ignore */ }

    return updated;
}

function mockChangePassword(
    _payload: ChangePasswordPayload
): { success: boolean } {
    return { success: true };
}

function mockGetAddresses(): Address[] {
    return [
        {
            id: 'addr-1',
            label: 'Home',
            address: '123 King Fahd Road, Riyadh',
            city: 'Riyadh',
            isDefault: true,
        },
    ];
}

function mockAddAddress(address: Omit<Address, 'id'>): Address {
    const newAddress: Address = {
        ...address,
        id: `addr-${Date.now()}`,
    };
    return newAddress;
}


async function apiGetProfile(): Promise<UserProfile> {
    const { data } = await apiClient.get<UserProfile>(
        ENDPOINTS.USER.PROFILE
    );
    return data;
}

async function apiUpdateProfile(
    payload: UpdateProfilePayload
): Promise<UserProfile> {
    const { data } = await apiClient.put<UserProfile>(
        ENDPOINTS.USER.UPDATE,
        payload
    );
    return data;
}

async function apiChangePassword(
    payload: ChangePasswordPayload
): Promise<{ success: boolean }> {
    const { data } = await apiClient.post<{ success: boolean }>(
        ENDPOINTS.USER.CHANGE_PASSWORD,
        payload
    );
    return data;
}

async function apiGetAddresses(): Promise<Address[]> {
    const { data } = await apiClient.get<Address[]>(
        ENDPOINTS.USER.ADDRESSES
    );
    return data;
}

async function apiAddAddress(
    address: Omit<Address, 'id'>
): Promise<Address> {
    const { data } = await apiClient.post<Address>(
        ENDPOINTS.USER.ADD_ADDRESS,
        address
    );
    return data;
}


export const userService = {
    getProfile: USE_MOCK
        ? () => Promise.resolve(mockGetProfile())
        : async () => {
            try {
                return await apiGetProfile();
            } catch {
                return mockGetProfile();
            }
        },

    updateProfile: USE_MOCK
        ? (payload: UpdateProfilePayload) =>
            Promise.resolve(mockUpdateProfile(payload))
        : async (payload: UpdateProfilePayload) => {
            try {
                return await apiUpdateProfile(payload);
            } catch {
                return mockUpdateProfile(payload);
            }
        },

    changePassword: USE_MOCK
        ? (payload: ChangePasswordPayload) =>
            Promise.resolve(mockChangePassword(payload))
        : async (payload: ChangePasswordPayload) => {
            try {
                return await apiChangePassword(payload);
            } catch {
                return mockChangePassword(payload);
            }
        },

    getAddresses: USE_MOCK
        ? () => Promise.resolve(mockGetAddresses())
        : async () => {
            try {
                return await apiGetAddresses();
            } catch {
                return mockGetAddresses();
            }
        },

    addAddress: USE_MOCK
        ? (address: Omit<Address, 'id'>) =>
            Promise.resolve(mockAddAddress(address))
        : async (address: Omit<Address, 'id'>) => {
            try {
                return await apiAddAddress(address);
            } catch {
                return mockAddAddress(address);
            }
        },
};