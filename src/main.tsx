import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './App.tsx';
import useThemeStore from './store/modeStore.js';
import './utils/rupiah';

useThemeStore.getState().initializeTheme();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
