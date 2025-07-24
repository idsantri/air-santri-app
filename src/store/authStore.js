import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const initAuth = {
	isAuthenticated: false,
	token: null,
	user: null,
};

const useAuthStore = create(
	persist(
		(set) => ({
			auth: initAuth,
			login: (authData) => {
				set({ auth: authData });
			},
			logout: () => {
				set({ auth: initAuth });
			},
			setUser: (userData) => {
				set((state) => ({
					auth: {
						...state.auth, // Pertahankan properti lain dari objek 'auth'
						user: {
							...state.auth.user, // Pertahankan properti lain dari objek 'user' yang sudah ada
							...userData, // Gabungkan (timpa jika ada) dengan data user yang baru
						},
					},
				}));
			},
		}),
		{ name: 'auth', storage: createJSONStorage(() => localStorage) },
	),
);

export default useAuthStore;
