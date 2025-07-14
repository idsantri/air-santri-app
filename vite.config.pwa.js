import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			devOptions: {
				enabled: true, // Aktifkan PWA untuk development
			},
			registerType: 'autoUpdate', // Service worker akan otomatis diperbarui
			manifest: manifest,
		}),
	],
	server: {
		host: '0.0.0.0', // Ensure the server listens on all network interfaces
		port: 5173, // Ensure the port matches your script
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
		extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
	},
});
