import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';

export default tseslint.config([
	globalIgnores(['dist', 'node_modules', 'dev-dist', 'public']),
	{
		files: ['**/*.{ts,js,tsx,jsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
			prettier,
		],
		plugins: {
			react,
			prettier: prettierPlugin,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_', // Untuk catch block
					destructuredArrayIgnorePattern: '^_', // Untuk array destructuring
				},
			],
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
	},
]);
