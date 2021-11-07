<template>
	<div>
		<div class="flex items-center flex-shrink-0 px-4">
			<img
				class="w-12 h-12 rounded-lg"
				src="https://cdn.discordapp.com/avatars/554882868091027456/f23bfea38c3d262beb31059c70dc3295.png?size=1024"
			/>
			<div class="pl-2 overflow-hidden text-base">
				<h3 class="font-black leading-tight truncate text-main-textDark-600 dark:text-main-textLight-530">
					CAPT. BARBOSSA
				</h3>
			</div>
			<div
				class="
					inline-flex
					items-end
					justify-end
					p-2
					mb-8
					ml-12
					rounded-md
					focus:outline-none
					bg-main-light-630
					dark:bg-main-dark-500
					hover:bg-main-light-560
					dark:hover:bg-main-dark-560
					lg:hidden
				"
				@click="sideBarOpen = false"
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
						:class="[
							$route.path === item.href
								? 'text-main-textDark-700 dark:text-main-textLight-630'
								: 'text-main-textDark-600 dark:text-main-textLight-530',
							'hover:bg-main-light-560 dark:hover:bg-main-dark-560 group flex items-center px-2 py-2 text-sm leading-6 font-semibold rounded-md',
						]"
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

			<div v-for="(nav, index) in leagueNavigation" :key="index" :class="[index === 0 ? '' : 'pt-3 mt-3']">
				<div>
					<span
						v-if="nav.title"
						class="text-xs font-extrabold uppercase text-main-textDark-700 dark:text-main-textLight-430"
						>{{ nav.title }}</span
					>
					<div>
						<span
							v-for="item in nav.items"
							:key="item.name"
							class="
								flex
								items-center
								px-2
								py-2
								text-sm
								font-semibold
								leading-6
								rounded-md
								text-main-textDark-600
								dark:text-main-textLight-530
								group
							"
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
							<div class="flex flex-row"><br />Test</div>
						</span>
					</div>
				</div>
			</div>
		</nav>
	</div>
</template>

<script lang="ts">
import { sideBarOpen } from '~/pages/DashBoard.vue'; // @ts-ignore
import LinkPlayer from '~icons/mdi/account-plus'; // @ts-ignore
import LinkedPlayers from '~icons/mdi/account-check'; // @ts-ignore
import LinkClan from '~icons/mdi/account-multiple-plus'; // @ts-ignore
import LinkedClans from '~icons/mdi/account-multiple-check'; // @ts-ignore
import LeagueQuetions from '~icons/mdi/chat-question'; // @ts-ignore
import LeagueFaqs from '~icons/bi/question-diamond-fill'; // @ts-ignore
import LeagueRegister from '~icons/heroicons-solid/pencil-alt';
const navigation = [
	{
		title: 'Player',
		items: [
			{ name: 'Link Player', href: '/dashboard/fieldtest', icon: LinkPlayer },
			{ name: 'Linked Players', href: '/dashboard/example', icon: LinkedPlayers },
		],
	},
	{
		title: 'Clan',
		items: [
			{ name: 'Link Clan', href: '/status', icon: LinkClan },
			{ name: 'Linked Clans', href: '/support', icon: LinkedClans },
		],
	},
	{
		title: 'League Registration',
		items: [
			{ name: "What's This?", href: '/dashboard/guild', icon: LeagueQuetions },
			{ name: "FAQ's", href: '/dashboard/settings', icon: LeagueFaqs },
			{ name: 'Register', href: '/dashboard/guild', icon: LeagueRegister },
		],
	},
];

const leagueNavigation = [
	{
		title: 'League',
		items: [
			{
				name: 'Core',
				href: '/dashboard/example',
				icon: LinkedPlayers,
				items: [
					{ name: 'Info', href: '/', icon: LinkPlayer },
					{ name: 'Divisons', href: '/', icon: LinkPlayer },
					{ name: 'Edit League', href: '/', icon: LinkPlayer },
					{ name: 'Edit Division', href: '/', icon: LinkPlayer },
				],
			},
			{
				name: 'Admin',
				href: '/dashboard/fieldtest',
				icon: LinkPlayer,
				items: [
					{ name: 'Head Admins', href: '/', icon: LinkPlayer },
					{ name: 'Division Admins', href: '/', icon: LinkPlayer },
				],
			},
			// { name: 'Clans', href: '/dashboard/example', icon: LinkedPlayers, items: [] },
			{
				name: 'Season',
				href: '/',
				icon: LinkedPlayers,
				items: [
					{ name: 'Core', href: '/', icon: LinkPlayer },
					{ name: 'Info', href: '/', icon: LinkPlayer },
					{ name: 'Clans', href: '/', icon: LinkPlayer },
					{ name: 'Matches', href: '/', icon: LinkPlayer },
					{ name: 'Results', href: '/', icon: LinkPlayer },
					{ name: 'Leaderboard', href: '/', icon: LinkPlayer },
				],
			},
		],
	},
];
export default {
	setup() {
		return {
			navigation,
			leagueNavigation,
			sideBarOpen,
		};
	},
};
</script>
