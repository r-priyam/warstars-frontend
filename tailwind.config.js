/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
	mode: 'jit',
	purge: ['./index.html', './src/**/*.{vue,js}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				main: {
					600: '#0288D1',
					blue: {
						100: '#E1F5FE',
						130: '#B3E5FC',
						200: '#81D4FA',
						300: '#4FC3F7',
						400: '#29B6F6',
						500: '#03A9F4',
						600: '#039BE5',
						700: '#0288D1',
						800: '#0277BD',
						900: '#01579B',
					},
					red: {
						100: '#FDEDEC',
						130: '#FADBD8',
						200: '#F5B7B1',
						300: '#F1948A',
						400: '#EC7063',
						500: '#E74C3C',
						600: '#CB4335',
						700: '#B03A2E',
						800: '#943126',
						900: '#78281F',
					},
					green: {
						100: '#EAFAF1',
						130: '#D5F5E3',
						200: '#ABEBC6',
						300: '#82E0AA',
						400: '#58D68D',
						500: '#2ECC71',
						600: '#28B463',
						700: '#239B56',
						800: '#1D8348',
						900: '#186A3B',
					},
				},
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'code::before': false,
						'code::after': false,
						code: {
							fontWeight: 400,
							backgroundColor: '#f2f3f5',
							padding: theme('spacing.1'),
							borderRadius: theme('borderRadius.md'),
						},
						pre: {
							color: theme('colors.gray.700'),
							backgroundColor: '#f2f3f5',
						},
						a: {
							textDecoration: 'none',
						},
					},
				},
				light: {
					css: [
						{
							color: theme('colors.gray.400'),
							'[class~="lead"]': {
								color: theme('colors.gray.300'),
							},
							a: {
								color: theme('colors.main.blue.400'),
							},
							strong: {
								color: theme('colors.white'),
							},
							'ol > li::before': {
								color: theme('colors.gray.400'),
							},
							'ul > li::before': {
								backgroundColor: theme('colors.gray.600'),
							},
							hr: {
								borderColor: theme('colors.gray.200'),
							},
							blockquote: {
								color: theme('colors.gray.200'),
								borderLeftColor: theme('colors.gray.600'),
							},
							h1: {
								color: theme('colors.white'),
							},
							h2: {
								color: theme('colors.white'),
							},
							h3: {
								color: theme('colors.white'),
							},
							h4: {
								color: theme('colors.white'),
							},
							'figure figcaption': {
								color: theme('colors.gray.400'),
							},
							'a code': {
								color: theme('colors.white'),
							},
							code: {
								color: theme('colors.gray.100'),
								backgroundColor: '#2f3136',
							},
							pre: {
								color: theme('colors.gray.200'),
								backgroundColor: '#2f3136',
							},
							thead: {
								color: theme('colors.white'),
								borderBottomColor: theme('colors.gray.400'),
							},
							'tbody tr': {
								borderBottomColor: theme('colors.gray.600'),
							},
						},
					],
				},
			}),
		},
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
