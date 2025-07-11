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
				window.location.href = '/login';
			},
		}),
		{ name: 'auth', storage: createJSONStorage(() => localStorage) },
	),
);

export default useAuthStore;
