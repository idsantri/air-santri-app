import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	/**
	 * TODO: add manifest from env
	 */
	const _env = loadEnv(mode, process.cwd());
	return {
		plugins: [
			react(),
			tailwindcss(),
			VitePWA({
				registerType: 'autoUpdate', // Untuk otomatis memperbarui service worker
				includeAssets: [
					'favicon.svg',
					'favicon.ico',
					'robots.txt',
					'apple-touch-icon.png',
				], // Tambahkan aset tambahan
				manifest: manifest,
			}),
		],
		server: {
			host: '0.0.0.0', // Ensure the server listens on all network interfaces
			port: 5173, // Ensure the port matches your script
		},
	};
});
