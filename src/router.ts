import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '~/pages/HomePage.vue';
import NProgress from 'nprogress';
import NotFound from '~/pages/NotFound.vue';

const routes: RouteRecordRaw[] = [
	{ path: '/', component: Home },
	{ path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(() => {
	NProgress.start();
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
