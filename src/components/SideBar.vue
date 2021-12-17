<template>
	<div>
		<div class="flex items-center shrink-0 px-4">
			<img class="w-12 h-12 rounded-lg" :src="user.avatarUrl" />
			<div class="pl-2 overflow-hidden text-base">
				<h3 class="font-black leading-tight truncate text-main-textDark-600 dark:text-main-textLight-530">
					{{ user.userData.user_name }}
				</h3>
			</div>
			<div
				class="inline-flex items-end justify-end p-2 mb-8 ml-auto rounded-md focus:outline-none bg-main-light-560 dark:bg-main-dark-560 hover:bg-main-light-600 dark:hover:bg-main-dark-600 lg:hidden"
				@click="$emit('closeSidebar', false)"
			>
				<span class="sr-only">Close menu</span>
				<heroicons-outline:x class="w-6 h-6 text-main-textDark-600 dark:text-main-textLight-530" aria-hidden="true" />
			</div>
		</div>

		<div v-if="league.getLeagueLocalConfig !== null" class="items-center px-4 mt-4">
			<h1 class="text-base font-extrabold text-main-textDark-600 dark:text-main-textLight-530">Current League</h1>
			<div v-if="league.getLeagueLocalConfig.league.name === ''">
				<h3 class="font-bold leading-tight text-center text-red-700 truncate dark:text-red-500">No League Selected</h3>
			</div>
			<div v-else class="flex items-center shrink-0 mt-2">
				<img class="w-12 h-12 rounded-lg" :src="league.getLeagueLocalConfig.league.icon_url" />
				<div class="pl-2 overflow-hidden text-base">
					<h3 class="font-bold leading-tight text-red-700 truncate dark:text-red-500">
						{{ league.getLeagueLocalConfig.league.name }}
					</h3>
				</div>
			</div>
			<div v-if="league.getLeagueLocalConfig.child.name === ''">
				<h3 class="font-bold leading-tight text-center text-green-700 truncate dark:text-green-500">No Child League</h3>
			</div>
			<div v-if="league.getLeagueLocalConfig.child.icon_url !== ''" class="flex items-center shrink-0 mt-2">
				<img class="w-12 h-12 rounded-lg" :src="league.getLeagueLocalConfig.child.icon_url" />
				<div class="pl-2 overflow-hidden text-base">
					<h3 class="font-bold leading-tight text-green-700 truncate dark:text-green-500">
						{{
							`${league.getLeagueLocalConfig.child.name} (${
								league.getLeagueLocalConfig.division.name || 'No Division'
							})`
						}}
					</h3>
				</div>
			</div>
			<div class="flex justify-center shrink-0 mt-2">
				<router-link
					to="/dashboard/league-selector"
					class="p-1 text-sm font-bold text-white rounded bg-main-textDark-560 hover:bg-main-textLight-560 dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560"
					@click="$emit('closeSidebar', false)"
				>
					Change Config
				</router-link>
			</div>
		</div>

		<nav class="flex flex-col flex-1 px-3 mt-5 overflow-y-auto divide-y divide-gray-300" aria-label="Sidebar">
			<div v-for="(nav, index) in toggleNavigation" :key="index" :class="[index === 0 ? '' : 'pt-3 mt-3']">
				<div>
					<span
						v-if="nav.title"
						class="text-xs font-extrabold uppercase text-main-textDark-700 dark:text-main-textLight-430"
					>
						{{ nav.title }}
					</span>
					<router-link
						v-for="item in nav.items"
						:key="item.name"
						:to="item.href"
						class="flex items-center px-2 py-2 mt-1 text-sm font-semibold rounded-md text-main-textDark-600 dark:text-main-textLight-530 hover:bg-main-light-560 dark:hover:bg-main-dark-600 group"
						active-class="bg-main-light-600 dark:bg-main-dark-600"
						@click="$emit('closeSidebar', false)"
					>
						<component
							:is="item.icon"
							:class="[$route.path === item.href ? 'text-primary' : 'text-secondary-dark', 'shrink-0 w-6 h-6 mr-2']"
							aria-hidden="true"
						/>
						{{ item.name }}
					</router-link>
				</div>
			</div>
		</nav>
	</div>
</template>

<script setup lang="ts">
// @ts-ignore
import LinkPlayer from '~icons/mdi/account-plus'; // @ts-ignore
import LinkedPlayers from '~icons/mdi/account-check'; // @ts-ignore
import LinkClan from '~icons/mdi/account-multiple-plus'; // @ts-ignore
import LinkedClans from '~icons/mdi/account-multiple-check'; // @ts-ignore
import LeagueQuetions from '~icons/mdi/chat-question'; // @ts-ignore
import LeagueRegister from '~icons/heroicons-solid/pencil-alt'; // @ts-ignore
import LeagueInfo from '~icons/heroicons-solid/information-circle'; // @ts-ignore
import LeagueChild from '~icons/mdi/shield-plus'; // @ts-ignore
import LeagueChildDivision from '~icons/mdi/shield-plus-outline'; // @ts-ignore
import HeadAdmin from '~icons/ri/shield-user-fill'; // @ts-ignore
import ManageHeadAdmin from '~icons/ri/user-settings-fill'; // @ts-ignore
import HitRates from '~icons/mdi/fire'; // @ts-ignore
import SeasonCore from '~icons/icon-park-outline/manual-gear'; // @ts-ignore
import SeasonInfo from '~icons/mdi/calendar-star'; // @ts-ignore
import SeasonAddClans from '~icons/ic/baseline-group-add'; // @ts-ignore
import SeasonClans from '~icons/mdi/account-group'; // @ts-ignore
import SeasonMatches from '~icons/mdi/sword-cross'; // @ts-ignore
import SeasonResult from '~icons/mdi/email-newsletter'; // @ts-ignore
import SeasonLeaderBoard from '~icons/ic/baseline-leaderboard'; // @ts-ignore
import { userStore } from '~/stores/user';
import { leagueManagement } from '~/stores/leagueManagement';

defineEmits(['closeSidebar']);
const user = userStore();
const league = leagueManagement();
const navigation = [
	{
		title: 'Player',
		items: [
			{ name: 'Link Player', href: '/dashboard/player-link', icon: LinkPlayer },
			{ name: 'Linked Players', href: '/dashboard/players-linked', icon: LinkedPlayers },
		],
	},
	{
		title: 'Clan',
		items: [
			{ name: 'Link Clan', href: '/dashboard/clan-link', icon: LinkClan },
			{ name: 'Linked Clans', href: '/dashboard/clans-linked', icon: LinkedClans },
		],
	},
	{
		title: 'League Registration',
		items: [
			{ name: "What's This?", href: '/dashboard/league-register-info', icon: LeagueQuetions },
			{ name: 'Register', href: '/dashboard/register-league', icon: LeagueRegister },
		],
	},
	{
		title: 'League Core',
		href: '/',
		items: [
			{ name: 'Info', href: '/dashboard/league', icon: LeagueInfo },
			{ name: 'Add Child League', href: '/dashboard/add-league-child', icon: LeagueChild },
			{ name: 'Add Child Division', href: '/dashboard/add-child-division', icon: LeagueChildDivision },
		],
	},
	{
		title: 'League Admin',
		href: '/',
		items: [
			{ name: 'Admins Info', href: '/', icon: HeadAdmin },
			{ name: 'Manage Admins', href: '/', icon: ManageHeadAdmin },
		],
	},
	{
		title: 'League Season',
		href: '/',
		items: [
			{ name: 'Info', href: '/dashboard/season-info', icon: SeasonInfo },
			{ name: 'Core', href: '/dashboard/season-core', icon: SeasonCore },
			{ name: 'Clans', href: '/dashboard/season-clans', icon: SeasonClans },
			{ name: 'Add Clans', href: '/dashboard/season-clans-add', icon: SeasonAddClans },
			{ name: 'Matches', href: '/', icon: SeasonMatches },
			{ name: 'Results', href: '/', icon: SeasonResult },
			{ name: 'Leaderboard', href: '/', icon: SeasonLeaderBoard },
			{ name: 'Hit Rates', href: '/', icon: HitRates },
		],
	},
];

const toggleNavigation =
	Object.keys(league.permissions).length === 0 ? navigation.splice(-navigation.length - 3, 3) : navigation;
</script>
