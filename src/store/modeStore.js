import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useThemeStore = create(
	persist(
		(set) => ({
			theme: 'system', // 'light', 'dark', or 'system'

			setTheme: (mode) => set({ theme: mode }),

			toggleTheme: () =>
				set((state) => ({
					theme: state.theme === 'light' ? 'dark' : 'light',
				})),

			isDarkMode: () => {
				// ---------------------------------------------
				// not implemented yet
				return false;
				// ---------------------------------------------

				// const state = useThemeStore.getState();
				// if (state.theme === 'system') {
				// 	return window.matchMedia('(prefers-color-scheme: dark)').matches;
				// }
				// return state.theme === 'dark';
			},
		}),
		{
			name: 'theme-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useThemeStore;
