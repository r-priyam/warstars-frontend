import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import ViteComponents from 'vite-plugin-components';

export default defineConfig({
	resolve: {
		alias: {
			'~/': `${resolve(__dirname, 'src')}/`,
		},
	},
	plugins: [
		vue(),
		AutoImport({
			dts: 'src/auto-imports.d.ts',
			imports: ['vue', '@vueuse/core'],
		}),
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
		open: true,
		port: 3333,
		strictPort: true,
	},
	clearScreen: false,
});
