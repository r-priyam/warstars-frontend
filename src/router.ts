import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';

const routes: RouteRecordRaw[] = [
	{ path: '/', component: () => import('~/pages/HomePage.vue') },
	{ path: '/dashboard', component: () => import('~/pages/DashBoard.vue') },
	{ path: '/:pathMatch(.*)*', component: () => import('~/pages/NotFound.vue') },
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
