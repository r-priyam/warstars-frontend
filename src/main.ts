import '~/index.css';
import '@purge-icons/generated';

import { ViteSSG } from 'vite-ssg';

import App from '~/App.vue';
import routes from '~/router';

export const createApp = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, async (ctx) => {
    // https://github.com/antfu/vite-ssg/issues/103
    if (!ctx.isClient) {
        await ctx.router.isReady();
    }
    Object.values(import.meta.globEager('./modules/*.ts')).forEach((i) => i.install?.(ctx));
});
