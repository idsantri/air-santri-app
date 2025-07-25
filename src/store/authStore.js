import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useAuthStore = create(
	persist(
		(set, get) => ({
			user: null,
			token: null,
			roles: null,

			login: ({ user, token, roles }) => set({ user, token, roles }),

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
			partialize: (state) => ({
				user: state.user,
				token: state.token,
				roles: state.roles,
			}),
		},
	),
);

export default useAuthStore;
