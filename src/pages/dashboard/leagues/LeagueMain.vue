<template>
	<div>
		<div class="grid grid-cols-3 gap-5 m-2">
			<button
				class="tab-item"
				:class="
					league === true
						? 'bg-main-textLight-560 dark:bg-main-textDark-560'
						: 'bg-main-textDark-560 dark:bg-main-textLight-560 '
				"
				@click="
					league = true;
					childLeague = false;
					division = false;
				"
			>
				League
			</button>
			<button
				class="tab-item"
				:class="
					childLeague === true
						? 'bg-main-textLight-560 dark:bg-main-textDark-560'
						: 'bg-main-textDark-560 dark:bg-main-textLight-560 '
				"
				@click="
					league = false;
					childLeague = true;
					division = false;
				"
			>
				Child Leagues
			</button>
			<button
				class="tab-item"
				:class="
					division === true
						? 'bg-main-textLight-560 dark:bg-main-textDark-560'
						: 'bg-main-textDark-560 dark:bg-main-textLight-560 '
				"
				@click="
					league = false;
					childLeague = false;
					division = true;
				"
			>
				Divisions
			</button>
		</div>
		<!-- A fake border just to have some good utility classes -->
		<div class="mx-6 mt-3 border-b-2 border-gray-900 dark:border-white"></div>
		<div v-if="league">
			<h1 class="mt-6 text-4xl font-bold text-center text-red-700 md:text-3xl dark:text-red-500">
				{{ leagueData?.name }}
			</h1>
			<div class="flex items-center justify-center mt-4">
				<img class="p-1 border-2 border-red-500 border-opacity-75 rounded-full w-36 h-36" :src="leagueData?.icon_url" />
			</div>

			<div class="p-5 mt-10 space-y-1 text-sm bg-transparent rounded-lg">
				<div class="league-info-item-box">
					<div class="league-info-item-dark">
						<span class="league-info-item-name">
							<mdi:notebook-check class="inline-flex w-4 h-4 mb-1" aria-hidden="true" />
							Abbreviation
						</span>
						<span class="league-info-item-data">{{ leagueData?.abbreviation }}</span>
					</div>
				</div>
				<div class="league-info-item-box">
					<div class="league-info-item-light">
						<span class="league-info-item-name">
							<subway:admin class="inline-flex w-4 h-3 mb-1" aria-hidden="true" />
							Head Name
						</span>
						<span class="league-info-item-data">{{ leagueData?.head_admin }}</span>
					</div>
				</div>
				<div class="league-info-item-box">
					<div class="league-info-item-dark">
						<span class="league-info-item-name">
							<ph:hash-bold class="inline-flex w-4 h-4 mb-1" aria-hidden="true" />
							Head Discord ID
						</span>
						<span class="league-info-item-data">{{ leagueData?.discord_id }}</span>
					</div>
				</div>
				<div class="league-info-item-box">
					<div class="league-info-item-light">
						<span class="league-info-item-name">
							<file-icons:moleculer class="inline-flex w-4 h-4 mb-1" aria-hidden="true" />
							Child Leagues
						</span>
						<span class="league-info-item-data">{{ leagueData?.child_leagues.length }}</span>
					</div>
				</div>
				<div class="league-info-item-box">
					<div class="league-info-item-dark">
						<span class="league-info-item-name">
							<ion:ios-people class="inline-flex w-4 h-4 mb-1" aria-hidden="true" />
							Total Admins
						</span>
						<span class="league-info-item-data">{{ leagueData?.total_admins }}</span>
					</div>
				</div>
				<div class="league-info-item-box">
					<div class="league-info-item-light">
						<span class="league-info-item-name">
							<iconoir:notes class="inline-flex w-4 h-4 mb-1" aria-hidden="true" />
							Rules
						</span>
						<span class="league-info-item-data">{{ leagueData?.rules || 'No Rules' }}</span>
					</div>
				</div>
				<div class="league-info-item-box">
					<div class="league-info-item-dark">
						<span class="league-info-item-name">
							<ic:baseline-discord class="inline-flex w-4 h-4 mb-1" aria-hidden="true" />
							Discord
						</span>
						<span v-if="leagueData?.discord_invite" class="league-info-item-data">{{
							leagueData?.discord_invite
						}}</span>
						<span else class="league-info-item-data">Not Provided</span>
					</div>
				</div>
				<div class="league-info-item-box">
					<div class="league-info-item-light">
						<span class="league-info-item-name">
							<mdi:twitter class="inline-flex w-4 h-4 mb-1" aria-hidden="true" />
							Twitter
						</span>
						<span v-if="leagueData?.twitter_handle" class="league-info-item-data">{{
							leagueData?.twitter_handle
						}}</span>
						<span v-else class="league-info-item-data">Not Provided</span>
					</div>
				</div>
				<div class="league-info-item-box">
					<div class="league-info-item-dark">
						<span class="league-info-item-name">
							<whh:website class="inline-flex w-4 h-4 mb-1" aria-hidden="true" />
							Website
						</span>
						<span v-if="leagueData?.website" class="league-info-item-data">{{ leagueData?.website }}</span>
						<span v-else class="league-info-item-data">Not Provided</span>
					</div>
				</div>
				<div class="league-info-item-box">
					<div class="league-info-item-light">
						<span class="league-info-item-name">
							<iwwa:year class="inline-flex w-4 h-4 mb-1" aria-hidden="true" />
							Registered On
						</span>
						<span v-if="leagueData?.registerd_on" class="league-info-item-data">{{
							moment(leagueData.registerd_on).format('MMMM-DD-YYYY')
						}}</span>
					</div>
				</div>
			</div>
		</div>
		<LeagueChild v-if="childLeague" :child-data="leagueData?.child_leagues" />
		<ChildDivision v-if="division" :child-data="leagueData?.child_leagues" :divisions-data="leagueDivisions()" />
	</div>
</template>

<script setup lang="ts">
import LeagueChild from '~/pages/dashboard/leagues/core/LeagueChild.vue';
import ChildDivision from '~/pages/dashboard/leagues/core/ChildDivision.vue';
import { TUserLeagueData, TUserChildLeagueDivisions } from '~/types/leagues';
import router from '~/router';
import { notifications } from '~/stores/notifications';
import { leagueManagement } from '~/stores/leagueManagement';
import moment from 'moment';

const leagueStore = leagueManagement();

async function checkEntry() {
	if (leagueStore.getLeagueLocalConfig?.league.league_id === 0 || !leagueStore.getLeagueLocalConfig) {
		notifications().notify({ title: 'Warning', text: 'Please select a league to continue!' });
		await router.push({ name: 'League Selector' });
	}
}
onBeforeMount(checkEntry);

const league = ref(true); // true by default to show the league main page.
const childLeague = ref(false);
const division = ref(false);
const leaguesData: TUserLeagueData[] = JSON.parse(localStorage.getItem('leagues-data') ?? '{}').value;

const leagueData = computed(() =>
	leaguesData.find((leagueData) => leagueData.league_id === leagueStore.getLeagueLocalConfig?.league.league_id),
);

const leagueDivisions = () => {
	const leagueData_ = leaguesData.find(
		(leagueData) => leagueData.league_id === leagueStore.getLeagueLocalConfig?.league.league_id,
	);
	if (!leagueData_?.child_leagues) return [];
	const divisions: Array<TUserChildLeagueDivisions> = [];
	leagueData_.child_leagues.forEach((element) => {
		divisions.push(...element.divisions);
	});
	return divisions;
};
</script>

<style scoped>
.tab-item {
	@apply text-white w-full p-2 font-bold rounded border border-transparent shadow-md
	hover:bg-main-textLight-560 dark:hover:bg-main-textDark-560
	hover:shadow-xl;
}

.league-info-item-box {
	@apply mx-auto px-0 md:px-2 rounded-sm w-full lg:w-1/2;
}

.league-info-item-dark {
	@apply w-full flex justify-between py-1 px-2 bg-main-light-530 dark:bg-main-dark-700 shadow;
}

.league-info-item-light {
	@apply w-full flex justify-between py-1 px-2 bg-main-light-430 dark:bg-main-dark-630;
}

.league-info-item-name {
	@apply text-main-textDark-500 dark:text-main-textLight-500 leading-tight font-bold;
}

.league-info-item-data {
	@apply text-gray-800 dark:text-gray-200 font-medium;
}
</style>
