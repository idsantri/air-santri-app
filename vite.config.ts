import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	// test: {
	// 	environment: 'jsdom',
	// },
	server: {
		host: '0.0.0.0', // Ensure the server listens on all network interfaces
		port: 5173, // Ensure the port matches your script
	},
});
