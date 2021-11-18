import NProgress from 'nprogress';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getCookie } from '~/utils/cookie';
import { userStore } from './stores/user';

const routes: RouteRecordRaw[] = [
	{ path: '/', component: () => import('~/pages/HomePage.vue') },
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import('~/pages/Dashboard.vue'),
		children: [
			{ path: 'player-link', name: 'PlayerLink', component: () => import('~/pages/dashboard/player/LinkPlayer.vue') },
			{
				path: 'players-linked',
				name: 'PlayersLinked',
				component: () => import('~/pages/dashboard/player/LinkedPlayers.vue'),
			},
			{ path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('~/pages/NotFound.vue') },
		],
	},
	{ path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('~/pages/NotFound.vue') },
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

router.afterEach((to) => {
	NProgress.done();
	if (!to.name) document.title = 'WarStars';
	if (to.name) document.title = `WarStars - ${String(to.name)}`;
});

export default router;
