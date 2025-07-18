import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useThemeStore = create(
	persist(
		(set, get) => ({
			theme: 'system', // 'light', 'dark', or 'system'

			setTheme: (mode) => {
				set({ theme: mode });
				// Update DOM immediately
				updateDOMTheme(mode);
			},

			toggleTheme: () => {
				const currentTheme = get().theme;
				const newTheme = currentTheme === 'light' ? 'dark' : 'light';
				set({ theme: newTheme });
				// Update DOM immediately
				updateDOMTheme(newTheme);
			},

			isDarkMode: () => {
				const state = get();
				if (state.theme === 'system') {
					return window.matchMedia('(prefers-color-scheme: dark)')
						.matches;
				}
				return state.theme === 'dark';
			},

			// Initialize theme on load
			initializeTheme: () => {
				const state = get();
				updateDOMTheme(state.theme);
			},
		}),
		{
			name: 'theme-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);

// Helper function to update DOM theme
const updateDOMTheme = (theme) => {
	const html = document.documentElement;

	// perlu sinkron dengan main.css
	const themeLight = 'lemonade';
	const themeDark = 'coffee';

	if (theme === 'system') {
		const prefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches;
		html.setAttribute('data-theme', prefersDark ? themeDark : themeLight);
	} else {
		html.setAttribute(
			'data-theme',
			theme === 'dark' ? themeDark : themeLight,
		);
	}
};

// Listen for system theme changes
if (typeof window !== 'undefined') {
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', (_e) => {
			const store = useThemeStore.getState();
			if (store.theme === 'system') {
				updateDOMTheme('system');
			}
		});
}

export default useThemeStore;
