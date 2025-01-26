import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { secureStorage } from '@/lib/SecureStorage';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            token: null,
            isLoading: true,
            setToken: (token) => {
                secureStorage.set('auth_token', token);
                set({ token, isLoading: false });
            },
            clearToken: () => {
                secureStorage.remove('auth_token');
                set({ token: null });
            }, initializeAuth: () => {
                if (typeof window !== 'undefined') {
                    const storedToken = localStorage.getItem('auth_token');
                    if (storedToken) {
                        set({ token: storedToken, isLoading: false });
                    } else {
                        set({ isLoading: false });
                    }
                }
            },
            getToken: () => get().token
        }),
        {
            name: 'auth-store',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.initializeAuth();
            }
        }
    )
);