import config from './src/config';

export default {
	name: config.PWA_NAME,
	short_name: config.PWA_SHORT_NAME,
	description: 'Aplikasi Air Santri',
	theme_color: '#5e4b1f',
	background_color: '#ffffff',
	display: 'standalone',
	lang: 'id',
	icons: [
		{
			src: '/icons/icon-192x192.png',
			sizes: '192x192',
			type: 'image/png',
		},
		{
			src: '/icons/icon-512x512.png',
			sizes: '512x512',
			type: 'image/png',
		},
		{
			src: '/icons/icon-512x512.png',
			sizes: '512x512',
			type: 'image/png',
			purpose: 'any maskable',
		},
	],
};
