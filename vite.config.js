import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	return {
		plugins: [
			react(),
			tailwindcss(),
			VitePWA({
				devOptions: {
					enabled: false, // Aktifkan PWA untuk development
				},
				registerType: 'autoUpdate', // Untuk otomatis memperbarui service worker
				includeAssets: [
					'favicon.svg',
					'favicon.ico',
					'robots.txt',
					'apple-touch-icon.png',
				], // Tambahkan aset tambahan
				manifest: {
					...manifest,
					name: env.VITE_APP_LONG_NAME,
					short_name: env.VITE_APP_SHORT_NAME,
					description: env.VITE_APP_DESCRIPTION,
				},
			}),
		],
		server: {
			host: '0.0.0.0', // Ensure the server listens on all network interfaces
			port: 5173, // Ensure the port matches your script
		},
	};
});
