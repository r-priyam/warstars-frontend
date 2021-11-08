import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';

const routes: RouteRecordRaw[] = [
	{ path: '/', name: 'Home', component: () => import('~/pages/HomePage.vue') },
	{ path: '/dashboard', name: 'Dashboard', component: () => import('~/pages/Dashboard.vue') },
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
