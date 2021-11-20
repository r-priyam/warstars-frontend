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
			{ path: 'player-link', name: 'Player Link', component: () => import('~/pages/dashboard/player/LinkPlayer.vue') },
			{
				path: 'players-linked',
				name: 'Players Linked',
				component: () => import('~/pages/dashboard/player/LinkedPlayers.vue'),
			},
			{ path: 'clan-link', name: 'Clan Link', component: () => import('~/pages/dashboard/clan/LinkClan.vue') },
			{ path: 'clans-linked', name: 'Clans Linked', component: () => import('~/pages/dashboard/clan/LinkedClans.vue') },
			{
				path: 'league-register-info',
				name: 'League Register Info',
				component: () => import('~/pages/dashboard/leagueRegister/Info.vue'),
			},
			{
				path: 'register-league',
				name: 'Register League',
				component: () => import('~/pages/dashboard/leagueRegister/Register.vue'),
			},
			{ path: '/:pathMatch(.*)*', name: 'Not Found', component: () => import('~/pages/NotFound.vue') },
		],
	},
	{ path: '/:pathMatch(.*)*', name: 'Not Found', component: () => import('~/pages/NotFound.vue') },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to) => {
	NProgress.start();
	const user = userStore();
	const authenticated = getCookie('_auth_token');
	if (typeof authenticated !== 'undefined') user.setTokenData(authenticated);
	if (!to.fullPath.includes('/dashboard')) return true;
	if (typeof authenticated === 'undefined') await router.push({ name: 'Home' });
});

router.afterEach((to) => {
	NProgress.done();
	if (!to.name) document.title = 'WarStars';
	if (to.name) document.title = `WarStars - ${String(to.name)}`;
});

export default router;
