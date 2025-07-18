import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import PurgeIcons from 'vite-plugin-purge-icons';
import { VitePWA } from 'vite-plugin-pwa';
import ViteRadar from 'vite-plugin-radar';

export default defineConfig({
    clearScreen: false,
    resolve: {
        alias: {
            '~/': `${resolve(__dirname, 'src')}/`
        }
    },
    plugins: [
        vue({
            reactivityTransform: true
        }),
        PurgeIcons(),
        AutoImport({
            dts: 'src/auto-imports.d.ts',
            imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head']
        }),
        Components({
            dts: 'src/components.d.ts',
            resolvers: [
                IconsResolver({
                    prefix: false
                })
            ]
        }),
        Icons({
            autoInstall: true
        }),
        ViteRadar({
            analytics: {
                id: 'G-VPF07N5QBR'
            }
        }),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
            useCredentials: true,
            manifest: {
                name: 'War Stars',
                short_name: 'War Stars',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            }
        })
    ],
    ssgOptions: {
        script: 'async',
        formatting: 'minify'
    },
    optimizeDeps: {
        include: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
        exclude: ['vue-demi']
    }
});
