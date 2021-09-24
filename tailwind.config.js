/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
	mode: 'jit',
	purge: ['./index.html', './src/**/*.{vue,js}'],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/aspect-ratio'),
	],
};
