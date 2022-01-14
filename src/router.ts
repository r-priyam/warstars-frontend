import NProgress from 'nprogress';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { leagueManagement } from '~/stores/leagueManagement';
import { APIUser } from './api/user';
import { userStore } from './stores/user';

export const pushLeagueSaveRoute = ref('');

const routes: RouteRecordRaw[] = [
	{ path: '/', name: 'Home', component: () => import('~/pages/HomePage.vue') },
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import('~/pages/Dashboard.vue'),
		children: [
			{
				path: 'league-selector',
				name: 'League Selector',
				component: () => import('~/components/dashboard/LeagueSelector.vue'),
				beforeEnter: (_to, from) => {
					if (!from.name) pushLeagueSaveRoute.value = 'League Info';
					if (
						from.fullPath !== '/dashboard/player-link' &&
						from.fullPath !== '/dashboard/players-linked' &&
						from.fullPath !== '/dashboard/clan-link' &&
						from.fullPath !== '/dashboard/clans-linked' &&
						from.fullPath !== '/dashboard/league-register-info' &&
						from.fullPath !== '/dashboard/register-league'
					)
						pushLeagueSaveRoute.value = String(from.name);
					else pushLeagueSaveRoute.value = 'League Info';
				},
			},
			// player section
			{ path: 'player-link', name: 'Player Link', component: () => import('~/pages/dashboard/player/LinkPlayer.vue') },
			{
				path: 'players-linked',
				name: 'Players Linked',
				component: () => import('~/pages/dashboard/player/LinkedPlayers.vue'),
			},
			// clan section
			{ path: 'clan-link', name: 'Clan Link', component: () => import('~/pages/dashboard/clan/LinkClan.vue') },
			{ path: 'clans-linked', name: 'Clans Linked', component: () => import('~/pages/dashboard/clan/LinkedClans.vue') },
			// league registration section
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
			// league core section
			{ path: 'league', name: 'League Info', component: () => import('~/pages/dashboard/leagues/LeagueMain.vue') },
			{
				path: 'add-league-child',
				name: 'Add Child League',
				component: () => import('~/pages/dashboard/leagues/core/ManageChild.vue'),
			},
			{
				path: 'add-child-division',
				name: 'Add Child Division',
				component: () => import('~/pages/dashboard/leagues/core/ManageDivision.vue'),
			},
			// league season section
			{
				path: 'season-info',
				name: 'Season Info',
				component: () => import('~/pages/dashboard/leagues/season/SeasonInfo.vue'),
			},
			{
				path: 'season-core',
				name: 'Season Core',
				component: () => import('~/pages/dashboard/leagues/season/SeasonCore.vue'),
				props: (route) => ({ showChildSeason: Boolean(route.query.showChildSeason) }),
			},
			{
				path: 'season-clans',
				name: 'Season Clans',
				component: () => import('~/pages/dashboard/leagues/season/SeasonClans.vue'),
			},
			{
				path: 'season-clans-add',
				name: 'Season Add Clans',
				component: () => import('~/pages/dashboard/leagues/season/SeasonClansadd.vue'),
			},
			{
				path: '/dashboard/:pathMatch(.*)',
				name: 'Dashboard Not Found',
				component: () => import('~/pages/NotFound.vue'),
			},
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
	const league = leagueManagement();

	try {
		const checkAuthenticated = await APIUser.checkAuthenticated();
		if (checkAuthenticated.status === 200) {
			if (user.userData.discordId === '') await user.setUserData();
			await league.syncPermissions();
			await league.syncLeaguesData();
		}
	} catch (error) {
		user.loggedIn = false;
		if (!to.fullPath.includes('/dashboard')) return true;
		await router.push({ name: 'Home' });
	}
});

router.afterEach((to) => {
	NProgress.done();
	if (!to.name) document.title = 'WarStars';
	if (to.name) document.title = `WarStars - ${String(to.name)}`;
});

export default router;
