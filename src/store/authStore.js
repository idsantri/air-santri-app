import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useAuthStore = create(
	persist(
		(set, get) => ({
			user: null,
			token: null,

			login: ({ user, token }) => set({ user, token }),

			setUser: (userData) => {
				set((state) => ({
					user: {
						...state.user,
						...userData,
					},
				}));
			},

			logout: () => {
				set({ user: null, token: null });
			},

			isLoggedIn: () => {
				const { token } = get();
				return typeof token === 'string' && token.length >= 10;
			},
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ user: state.user, token: state.token }),
		},
	),
);

export default useAuthStore;
