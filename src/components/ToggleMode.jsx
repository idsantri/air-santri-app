import { Icon } from '@iconify/react/dist/iconify.js';
import useThemeStore from '../store/modeStore';

function ToggleMode({ className }) {
	const { toggleTheme, isDarkMode } = useThemeStore();

	const currentTheme = isDarkMode();

	return (
		<button
			onClick={toggleTheme}
			className={`${className} p-2 rounded-full border border-solid
                ${
					currentTheme
						? 'text-yellow-400 border-yellow-400'
						: 'text-blue-900 border-blue-900'
				}`}
			title={`Switch to ${currentTheme ? 'light' : 'dark'} mode`}
		>
			<Icon
				icon={
					currentTheme
						? 'material-symbols-light:dark-mode'
						: 'material-symbols-light:light-mode'
				}
				width="24"
			/>
		</button>
	);
}

export default ToggleMode;
