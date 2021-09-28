/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
	mode: 'jit',
	purge: ['./index.html', './src/**/*.{vue,js}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				main: {
					530: '#2f89c5',
					blue: {
						100: '#f7f7fe',
						130: '#ebf5fb',
						160: '#f0f1fe',
						200: '#e7e9fd',
						230: '#D6eaf8',
						260: '#d6eaf8',
						300: '#c2e0f4',
						330: '#aed6f1',
						360: '#9acced',
						400: '#85c1e9',
						430: '#71b7e6',
						460: '#5dade2',
						500: '#48a2df',
						530: '#2f89c5',
						560: '#2a7aaf',
						600: '#246a99',
						630: '#1f5b83',
						660: '#1a4c6e',
						700: '#153d58',
						730: '#102e42',
						760: '#0a1e2c',
						800: '#0a1c28',
						830: '#050f16',
						860: '#0d0f24',
						900: '#04050c',
					},
					red: {
						130: '#fdeeee',
						160: '#fce4e4',
						200: '#fbd9da',
						230: '#facecf',
						260: '#f9c2c3',
						300: '#f8b3b5',
						330: '#f69c9e',
						360: '#f38688',
						400: '#f1686a',
						430: '#f05d60',
						460: '#ee5154',
						500: '#ed4245',
						530: '#d83c3f',
						560: '#c03538',
						600: '#a12d2f',
						630: '#8c2729',
						660: '#7a2224',
						700: '#5f1a1c',
						730: '#59191a',
						760: '#521718',
						800: '#471415',
						830: '#370f10',
						860: '#240a0a',
						900: '#0c0303',
					},
					green: {
						100: '#f7fef9',
						130: '#f0fef4',
						160: '#e7fdee',
						200: '#ddfce7',
						230: '#d3fce0',
						260: '#c9fbd8',
						300: '#bcfacf',
						330: '#a7f8c0',
						360: '#93f7b2',
						400: '#79f59f',
						430: '#6ff498',
						460: '#64f391',
						500: '#57f287',
						530: '#4fdc7b',
						560: '#46c46d',
						600: '#3ba55c',
						630: '#338f50',
						660: '#2d7d46',
						700: '#236136',
						730: '#215b32',
						760: '#1e532e',
						800: '#1a4929',
						830: '#14381f',
						860: '#0d2414',
						900: '#040c07',
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
