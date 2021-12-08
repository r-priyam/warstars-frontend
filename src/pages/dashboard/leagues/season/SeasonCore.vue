<template>
	<div>
		<div class="max-w-lg p-8 mx-auto rounded-b-lg shadow-lg bg-main-light-530 dark:bg-main-dark-500 md:p-12">
			<div class="grid grid-cols-2 gap-5 mb-8">
				<button
					class="tab-item"
					:class="
						leagueSeason === true
							? 'bg-main-textLight-560 dark:bg-main-textDark-560'
							: 'bg-main-textDark-560 dark:bg-main-textLight-560 '
					"
					@click="
						leagueSeason = true;
						childSeason = false;
					"
				>
					League Season
				</button>
				<button
					class="tab-item"
					:class="
						childSeason === true
							? 'bg-main-textLight-560 dark:bg-main-textDark-560'
							: 'bg-main-textDark-560 dark:bg-main-textLight-560 '
					"
					@click="
						leagueSeason = false;
						childSeason = true;
					"
				>
					Child League Season
				</button>
			</div>
			<h1 class="text-3xl font-black text-center text-main-textDark-600 dark:text-main-textLight-530">
				{{ `${leagueSeason ? 'League Season' : 'Child League Season'}` }}
			</h1>
			<div class="mt-3 border-t-2 border-gray-200"></div>
			<section class="mt-10">
				<form id="season" class="flex flex-col" @submit.prevent="registerSeason">
					<div>
						<label class="register-form-input-label">Start Date<span class="ml-0.5 text-red-500">*</span></label>
						<input name="start-date" type="date" placeholder="DD-MM-YY" required="true" class="register-form-input" />
					</div>
					<div>
						<label class="mt-4 register-form-input-label">End Date<span class="ml-0.5 text-red-500">*</span></label>
						<input id="end-date" name="end-date" type="date" required="true" class="register-form-input" />
					</div>
					<div>
						<label class="mt-4 register-form-input-label">Main League Name</label>
						<input
							readonly="true"
							class="cursor-not-allowed register-form-input focus-visible:ring-transparent"
							:placeholder="league.getLeagueLocalConfig?.league.name"
						/>
					</div>
					<div v-if="childSeason">
						<label class="mt-4 register-form-input-label">Child League Name</label>
						<input
							readonly="true"
							class="cursor-not-allowed register-form-input focus-visible:ring-transparent"
							:placeholder="league.getLeagueLocalConfig?.child.name"
						/>
					</div>
					<div v-if="selectedLeagueChild?.length !== 0 && !childSeason" class="block mt-4">
						<span class="register-form-input-label">Select child leagues to start season for</span>
						<div class="mt-2">
							<div v-for="child in selectedLeagueChild" :key="child.id">
								<label class="inline-flex items-center">
									<input
										v-model="selectedChilds"
										:value="child.id"
										class="rounded shadow-sm text-main-textDark-600 dark:text-main-textLight-600 focus:ring focus:ring-offset-0 focus:ring-main-textLight-460 focus:ring-opacity-40"
										type="checkbox"
									/>
									<span class="ml-2 font-semibold text-main-textDark-500 dark:text-main-textLight-500">
										{{ child.name }}
									</span>
								</label>
							</div>
						</div>
					</div>
					<button
						v-if="!league.newSeasonProcess"
						class="py-2 mt-10 font-bold text-white transition duration-200 border border-transparent rounded shadow-md bg-main-textDark-560 hover:bg-main-textLight-560 dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560 hover:shadow-xl"
						type="submit"
					>
						Proceed
					</button>
					<button
						v-if="league.newSeasonProcess || league.childSeasonProcess"
						class="inline-flex items-center justify-center py-2 font-bold text-center text-white mt-10 border border-transparent rounded cursor-not-allowed bg-main-textLight-560 dark:bg-main-textDark-560"
						disabled
					>
						<svg
							class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Processing
					</button>
				</form>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import moment from 'moment';
import router from '~/router';
import { notifications } from '~/stores/notifications';
import { leagueManagement } from '~/stores/leagueManagement';
import { TUserLeagueData, TNewSeason, TNewChildSeason } from '~/types/leagues';

const prop = withDefaults(defineProps<{ showChildSeason?: boolean }>(), { showChildSeason: false });

const league = leagueManagement();
const leagueSeason = ref(!prop.showChildSeason);
const childSeason = ref(prop.showChildSeason);
const selectedChilds = ref([]);
const leaguesData: TUserLeagueData[] = JSON.parse(localStorage.getItem('leagues-data') ?? '{}').value;
const selectedLeagueChild = computed(
	() => leaguesData.find((child) => child.league_id === league.getLeagueLocalConfig?.league.league_id)?.child_leagues,
);

onBeforeMount(async () => {
	if (league.getLeagueLocalConfig?.league.league_id === 0 || !league.getLeagueLocalConfig) {
		notifications().notify({ title: 'Warning', text: 'Please select a league to continue!' });
		await router.push({ name: 'League Selector' });
	}
	if (childSeason.value && league.getLeagueLocalConfig?.child.id === 0) {
		notifications().notify({ title: 'Warning', text: 'Please select a child league to continue!' });
		await router.push({ name: 'League Selector' });
	}
});

watch(childSeason, async (now) => {
	if (now && league.getLeagueLocalConfig?.child.id === 0) {
		notifications().notify({ title: 'Warning', text: 'Please select a child league to continue!' });
		await router.push({ name: 'League Selector' });
	}
});

async function registerSeason() {
	const form: HTMLFormElement | null = document.querySelector('#season');
	const formData = new FormData(form!);
	if (moment(new Date(formData.get('start-date') as string)).isBefore(new Date()))
		return notifications().notify({ title: 'Error', text: 'Start date is in past' });
	else if (moment(new Date(formData.get('end-date') as string)).isBefore(new Date()))
		return notifications().notify({ title: 'Error', text: 'End date is in past' });
	else if (
		moment(new Date(formData.get('end-date') as string)).diff(new Date(formData.get('start-date') as string), 'days') <=
		13
	)
		return notifications().notify({ title: 'Error', text: 'Season duration must be 2 weeks or grater than it' });

	if (leagueSeason.value) {
		const newSeasonData: TNewSeason = {
			league_id: league.getLeagueLocalConfig?.league.league_id ?? 0,
			start_time: formData.get('start-date') as string,
			end_time: formData.get('end-date') as string,
			child_data: selectedChilds.value,
		};
		await league.newSeason(newSeasonData);
	} else {
		const childSeasonData: TNewChildSeason = {
			league_id: league.getLeagueLocalConfig?.league.league_id ?? 0,
			child_league_id: league.getLeagueLocalConfig?.child.id ?? 0,
			start_time: formData.get('start-date') as string,
			end_time: formData.get('end-date') as string,
		};
		await league.newChildSeason(childSeasonData);
	}
}
</script>

<style scoped>
.tab-item {
	@apply text-white w-full p-2 font-bold rounded border border-transparent shadow-md
	hover:bg-main-textLight-560 dark:hover:bg-main-textDark-560
	hover:shadow-xl;
}

input {
	position: relative;
	overflow: hidden;
}
input::-webkit-calendar-picker-indicator {
	display: block;
	top: 0;
	left: 0;
	background: #0000;
	position: absolute;
	transform: scale(12);
}
</style>
