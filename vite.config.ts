import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import analyze from 'rollup-plugin-analyzer';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

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
			imports: ['vue', 'vue-router', '@vueuse/core'],
		}),
		Components({
			resolvers: [
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
	build: {
		rollupOptions: {
			plugins: [analyze()],
		},
	},
});
