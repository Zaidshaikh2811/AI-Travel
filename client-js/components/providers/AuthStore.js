import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


export const useAuthStore = create()(
    persist(
        (set, get) => ({
            token: null,
            setToken: (token) => {
                console.log('Setting token:', token);
                set({ token });
            },
            clearToken: () => set({ token: null }),
            getToken: () => get().token
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ token: state.token }),
            onRehydrateStorage: (state) => {
                console.log('Hydrating state:', state);
                return (rehydratedState, error) => {
                    if (error) {
                        console.error('Error rehydrating state:', error);
                    } else {
                        console.log('Rehydrated state:', rehydratedState);
                    }
                };
            }
        }
    )
);