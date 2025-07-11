import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		include: [
			'src/**/*.test.{js,ts,jsx,tsx}', // Test file JS & TS
		],
		globals: true,
		coverage: {
			reporter: ['text', 'json', 'html'],
		},
	},
});
