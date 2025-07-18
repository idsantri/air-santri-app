import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect } from 'react';
import useThemeStore from '../store/modeStore';

function ToggleMode({ className }) {
	const { toggleTheme, isDarkMode, initializeTheme } = useThemeStore();

	// Initialize theme on component mount
	useEffect(() => {
		initializeTheme();
	}, [initializeTheme]);

	const currentTheme = isDarkMode();

	return (
		<button
			onClick={toggleTheme}
			className={`${className} p-2 rounded-full border border-solid transition-colors duration-200 
                ${
					currentTheme
						? 'text-warning border-warning'
						: 'text-neutral-600 border-neutral-text-neutral-600'
				}`}
			title={`Switch to ${currentTheme ? 'light' : 'dark'} mode`}
		>
			<Icon
				icon={
					currentTheme
						? 'material-symbols-light:light-mode'
						: 'material-symbols-light:dark-mode'
				}
				width="24"
			/>
		</button>
	);
}

export default ToggleMode;
