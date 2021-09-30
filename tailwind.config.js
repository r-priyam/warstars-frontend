/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
	mode: 'jit',
	purge: ['./index.html', './src/**/*.{vue,js}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				main: {
					600: '#1574d3',
					primary: {
						100: '#c8e3fd',
						150: '#b0d6fd',
						200: '#96c9fd',
						250: '#7cbcfc',
						300: '#62aefb',
						350: '#49a1fa',
						400: '#3495f8',
						450: '#238bf5',
						500: '#1b85f0',
						550: '#187ee5',
						600: '#1574d3',
						650: '#1267bd',
						700: '#0e59a5',
						750: '#0b4b8b',
						800: '#093c70',
						850: '#062d54',
						900: '#041f3a',
					},
					info: {
						100: '#c7eef9',
						150: '#b3e6f5',
						200: '#9ddef1',
						250: '#87d4eb',
						300: '#71cae4',
						350: '#5cc0dd',
						400: '#47b4d4',
						450: '#35a9cb',
						500: '#249bbe',
						550: '#198db0',
						600: '#1280a0',
						650: '#0e7390',
						700: '#0b6580',
						750: '#08586f',
						800: '#074a5e',
						850: '#053c4d',
						900: '#042f3b',
					},
					green: {
						100: '#cef6bf',
						150: '#bdeeaa',
						200: '#ace597',
						250: '#9cdb84',
						300: '#8dd074',
						350: '#7ec364',
						400: '#70b656',
						450: '#62a748',
						500: '#53943a',
						550: '#447f2d',
						600: '#366c22',
						650: '#2b5a18',
						700: '#214b11',
						750: '#193d0b',
						800: '#133207',
						850: '#0f2905',
						900: '#0c2203',
					},
					warning: {
						100: '#fdf4cd',
						150: '#fcf0b9',
						200: '#fbeca3',
						250: '#fae78b',
						300: '#f8e173',
						350: '#f5da5b',
						400: '#f1d243',
						450: '#ebc92d',
						500: '#e0bd19',
						550: '#d1af10',
						600: '#c0a00b',
						650: '#ad9009',
						700: '#9a8007',
						750: '#856f06',
						800: '#6f5d06',
						850: '#594b05',
						900: '#433804',
					},
					fail: {
						100: '#fca5a5',
						150: '#fc8a8a',
						200: '#fb7676',
						250: '#fa6666',
						300: '#f75858',
						350: '#f24b4b',
						400: '#ea3f3f',
						450: '#de3434',
						500: '#d02a2a',
						550: '#bf2121',
						600: '#ad1a1a',
						650: '#9b1414',
						700: '#891010',
						750: '#770c0c',
						800: '#640909',
						850: '#500606',
						900: '#3c0404',
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
