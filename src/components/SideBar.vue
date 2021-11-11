<template>
	<div>
		<div class="flex items-center flex-shrink-0 px-4">
			<img class="w-12 h-12 rounded-lg" :src="user.avatarUrl" />
			<div class="pl-2 overflow-hidden text-base">
				<h3 class="font-black leading-tight truncate text-main-textDark-600 dark:text-main-textLight-530">
					{{ user.userData.user_name }}
				</h3>
			</div>
			<div
				class="
					inline-flex
					items-end
					justify-end
					p-2
					mb-8
					ml-auto
					rounded-md
					focus:outline-none
					bg-main-light-630
					dark:bg-main-dark-500
					hover:bg-main-light-560
					dark:hover:bg-main-dark-560
					lg:hidden
				"
				@click="$emit('closeSidebar', false)"
			>
				<span class="sr-only">Close menu</span>
				<heroicons-outline:x class="w-6 h-6 text-main-textDark-600 dark:text-main-textLight-530" aria-hidden="true" />
			</div>
		</div>

		<nav class="flex flex-col flex-1 px-3 mt-5 overflow-y-auto divide-y divide-gray-300" aria-label="Sidebar">
			<div v-for="(nav, index) in navigation" :key="index" :class="[index === 0 ? '' : 'pt-3 mt-3']">
				<div>
					<span
						v-if="nav.title"
						class="text-xs font-extrabold uppercase text-main-textDark-700 dark:text-main-textLight-430"
						>{{ nav.title }}</span
					>
					<router-link
						v-for="item in nav.items"
						:key="item.name"
						:to="item.href"
						class="
							text-main-textDark-600
							dark:text-main-textLight-530
							hover:bg-main-light-560
							dark:hover:bg-main-dark-600
							group
							flex
							items-center
							px-2
							py-2
							text-sm
							leading-6
							font-semibold
							rounded-md
						"
						active-class="bg-main-light-600 dark:bg-main-dark-600"
						@click="$emit('closeSidebar', false)"
					>
						<component
							:is="item.icon"
							:class="[
								$route.path === item.href ? 'text-primary' : 'text-secondary-dark',
								'flex-shrink-0 w-6 h-6 mr-2',
							]"
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
import LeagueFaqs from '~icons/bi/question-diamond-fill'; // @ts-ignore
import LeagueRegister from '~icons/heroicons-solid/pencil-alt'; // @ts-ignore
import LeagueInfo from '~icons/heroicons-solid/information-circle'; // @ts-ignore
import LeagueDivisions from '~icons/heroicons-solid/globe'; // @ts-ignore
import EditLeague from '~icons/mdi/shield-edit'; // @ts-ignore
import EditDivision from '~icons/mdi/shield-edit-outline'; // @ts-ignore
import HeadAdmin from '~icons/ri/shield-user-fill'; // @ts-ignore
import DivisionAdmin from '~icons/ri/shield-user-line'; // @ts-ignore
import ManageHeadAdmin from '~icons/ri/user-settings-fill'; // @ts-ignore
import ManageDivisionAdmin from '~icons/ri/user-settings-line'; // @ts-ignore
import HitRates from '~icons/mdi/fire'; // @ts-ignore
import SeasonCore from '~icons/icon-park-outline/manual-gear'; // @ts-ignore
import SeasonInfo from '~icons/mdi/calendar-star'; // @ts-ignore
import SeasonClans from '~icons/mdi/account-group'; // @ts-ignore
import SeasonMatches from '~icons/mdi/sword-cross'; // @ts-ignore
import SeasonResult from '~icons/mdi/email-newsletter'; // @ts-ignore
import SeasonLeaderBoard from '~icons/ic/baseline-leaderboard'; // @ts-ignore
import { userStore } from '~/stores/user';

defineEmits(['closeSidebar']);
const user = userStore();
const navigation = [
	{
		title: 'Player',
		items: [
			{ name: 'Link Player', href: '/dashboard/player-link', icon: LinkPlayer },
			{ name: 'Linked Players', href: '/', icon: LinkedPlayers },
		],
	},
	{
		title: 'Clan',
		items: [
			{ name: 'Link Clan', href: '/', icon: LinkClan },
			{ name: 'Linked Clans', href: '/', icon: LinkedClans },
		],
	},
	{
		title: 'League Registration',
		items: [
			{ name: "What's This?", href: '/', icon: LeagueQuetions },
			{ name: "FAQ's", href: '/', icon: LeagueFaqs },
			{ name: 'Register', href: '/', icon: LeagueRegister },
		],
	},
	{
		title: 'League Core',
		href: '/',
		items: [
			{ name: 'Info', href: '/', icon: LeagueInfo },
			{ name: 'Divisons', href: '/', icon: LeagueDivisions },
			{ name: 'Edit League', href: '/', icon: EditLeague },
			{ name: 'Edit Division', href: '/', icon: EditDivision },
		],
	},
	{
		title: 'League Admin',
		href: '/',
		items: [
			{ name: 'Head Admins', href: '/', icon: HeadAdmin },
			{ name: 'Division Admins', href: '/', icon: DivisionAdmin },
			{ name: 'Manage Head Admins', href: '/', icon: ManageHeadAdmin },
			{ name: 'Manage Division Admins', href: '/', icon: ManageDivisionAdmin },
		],
	},
	{
		title: 'League Season',
		href: '/',
		items: [
			{ name: 'Core', href: '/', icon: SeasonCore },
			{ name: 'Info', href: '/', icon: SeasonInfo },
			{ name: 'Clans', href: '/', icon: SeasonClans },
			{ name: 'Matches', href: '/', icon: SeasonMatches },
			{ name: 'Results', href: '/', icon: SeasonResult },
			{ name: 'Leaderboard', href: '/', icon: SeasonLeaderBoard },
			{ name: 'Hit Rates', href: '/', icon: HitRates },
		],
	},
];
</script>
