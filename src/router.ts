import { userStore } from './stores/user';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getCookie } from '~/utils/cookie';
import NProgress from 'nprogress';

const routes: RouteRecordRaw[] = [
	{ path: '/', name: 'Home', component: () => import('~/pages/HomePage.vue') },
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import('~/pages/Dashboard.vue'),
		children: [{ path: 'player-link', component: () => import('~/pages/dashboard/player/LinkPlayer.vue') }],
	},
	{ path: '/:pathMatch(.*)*', component: () => import('~/pages/NotFound.vue') },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to) => {
	NProgress.start();
	const user = userStore();
	const authenticated = await getCookie('_auth_token');
	if (typeof authenticated !== 'undefined') user.setTokenData(String(authenticated));
	if (!to.fullPath.includes('/dashboard')) return true;
	if (typeof authenticated === 'undefined') await router.push({ name: 'Home' });
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
