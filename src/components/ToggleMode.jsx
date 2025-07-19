import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect } from 'react';
import useThemeStore from '../store/modeStore';

function ToggleMode({ className }) {
	const { toggleTheme, isDarkMode, initializeTheme } = useThemeStore();

	// Initialize theme on component mount
	useEffect(() => {
		initializeTheme();
	}, [initializeTheme]);

	const isDark = isDarkMode();

	return (
		<button
			onClick={toggleTheme}
			className={`${className} p-2 rounded-full border border-solid transition-colors duration-200 
                ${
					isDark
						? 'text-base-100 border-base-100 bg-warning'
						: 'text-accent border-accent bg-neutral-700'
				}`}
			title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
		>
			<Icon
				icon={
					isDark
						? 'material-symbols-light:light-mode'
						: 'material-symbols-light:dark-mode'
				}
				width="24"
			/>
		</button>
	);
}

export default ToggleMode;
