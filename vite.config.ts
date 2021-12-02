import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import ViteRadar from 'vite-plugin-radar';

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
		ViteRadar({
			analytics: {
				id: 'G-VPF07N5QBR',
			},
		}),
	],
	server: {
		host: true,
		open: true,
		port: 3333,
		strictPort: true,
	},
	clearScreen: false,
});
