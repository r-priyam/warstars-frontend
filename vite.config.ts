import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import ViteComponents from 'vite-plugin-components';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

export default defineConfig({
	resolve: {
		alias: {
			'~/': `${resolve(__dirname, 'src')}/`,
		},
	},
	plugins: [
		vue(),
		ViteComponents({
			customComponentResolvers: [
				IconsResolver({
					componentPrefix: '',
				}),
			],
		}),
		Icons(),
	],
	server: {
		host: true,
		open: false,
		port: 3333,
		strictPort: true,
	},
});
