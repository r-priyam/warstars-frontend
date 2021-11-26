<template>
	<div class="max-w-full p-8 transparent md:p-12">
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-center text-red-700 dark:text-red-500">My Leagues</h1>
		</div>
		<div class="flex items-center justify-center flex-shrink-0 mt-2 flex-col-1">
			<div v-for="league in leaguesData" :key="league.league_id" class="flex flex-wrap justify-center">
				<button
					@click="
						selectedLeague = {
							league_id: league.league_id,
							name: league.name,
							abbreviation: league.abbreviation,
							season_id: league.season_id,
							icon_url: league.icon_url,
						};
						handleLeagueChange();
					"
				>
					<img
						class="flex-grow-0 w-24 h-24 p-1 m-1 text-center border-2 border-white rounded-full"
						:class="[league.league_id === selectedLeague?.league_id ? 'border-red-700 dark:border-red-500' : '']"
						:src="league.icon_url"
						:alt="league.name"
						:title="league.name"
					/>
				</button>
			</div>
		</div>
		<h1
			v-if="selectedLeague.league_id === 0"
			class="mt-4 text-base italic font-medium text-center text-red-700 dark:text-red-500"
		>
			Please select a League to get started
		</h1>
		<div v-if="selectedLeague.league_id > 0">
			<div class="mt-6 mb-6">
				<transition-group
					enter-active-class="transition duration-300 ease-out transform-gpu"
					enter-from-class="translate-x-12 opacity-0"
					enter-to-class="translate-x-0 opacity-100"
				>
					<h1
						v-if="selectedLeagueChild?.length === 0"
						class="text-xl font-bold text-center text-green-700 dark:text-green-500"
					>
						{{ selectedLeague.name }} has no child league
					</h1>
					<h1 v-else class="text-xl font-bold text-center text-green-700 dark:text-green-500">
						{{ selectedLeague.name }} Child Leagues
					</h1>
					<div v-if="selectedLeagueChild?.length === 0" class="flex justify-center mt-2 flex-nowrap">
						<button
							class="
								px-4
								py-2
								text-base
								font-semibold
								text-gray-100
								bg-green-700
								rounded-lg
								shadow-md
								hover:bg-green-800
								dark:bg-green-600 dark:hover:bg-green-700
								focus:outline-none
							"
						>
							Add Child League
						</button>
					</div>
				</transition-group>
			</div>
			<div class="flex items-center justify-center flex-shrink-0 mt-2 flex-col-1">
				<transition-group
					enter-active-class="transition duration-300 ease-out transform-gpu"
					enter-from-class="translate-x-12 opacity-0"
					enter-to-class="transition duration-300 ease-out transform-gpu"
				>
					<div v-for="childLeague in selectedLeagueChild" :key="childLeague.id" class="flex flex-wrap justify-center">
						<button
							@click="
								selectedChildLeague = {
									id: childLeague.id,
									name: childLeague.name,
									abbreviation: childLeague.abbreviation,
									icon_url: childLeague.icon_url,
									season_id: childLeague.season_id,
								}
							"
						>
							<img
								class="inline-flex flex-grow-0 w-24 h-24 p-1 m-1 text-center border-2 border-white rounded-full"
								:class="[childLeague.id === selectedChildLeague.id ? 'border-green-700 dark:border-green-500' : '']"
								:src="childLeague.icon_url"
								:alt="childLeague.name"
								:title="childLeague.name"
							/>
						</button>
					</div>
				</transition-group>
			</div>
		</div>
		<div v-if="selectedChildLeague.name !== ''">
			<div v-if="selectedChildDivisions?.length === 0" class="mt-6 mb-6">
				<h1 class="text-xl font-bold text-center text-indigo-700 dark:text-indigo-500">
					{{ `${selectedLeague.name} ${selectedChildLeague.name}` }} has no division
				</h1>
				<h1 class="text-sm italic text-center text-red-700 dark:text-red-500">
					All the changes will apply to {{ selectedChildLeague.name }} globally.
				</h1>
				<div v-if="selectedChildDivisions?.length === 0" class="flex justify-center mt-2 flex-nowrap">
					<button
						class="
							px-4
							py-2
							text-base
							font-semibold
							text-gray-100
							bg-indigo-700
							rounded-lg
							shadow-md
							hover:bg-indigo-800
							dark:bg-indigo-600 dark:hover:bg-indigo-700
							focus:outline-none
						"
					>
						Add Division
					</button>
				</div>
			</div>
			<div v-else class="mt-6 mb-6">
				<h1 class="text-xl font-bold text-center text-indigo-700 dark:text-indigo-500">
					{{ `${selectedLeague.abbreviation} ${selectedChildLeague.name}` }} Divisions
				</h1>
				<h1 class="text-sm italic text-center text-red-700 dark:text-red-500">
					If you will not select a division then any changes will apply to whole
					{{ `${selectedLeague.abbreviation} ${selectedChildLeague.name}` }} globally
				</h1>
			</div>
			<div>
				<div class="w-full max-w-md mx-auto">
					<RadioGroup v-model="selectedDivision">
						<div class="space-y-2">
							<RadioGroupOption
								v-for="division in selectedChildDivisions"
								:key="division.name"
								v-slot="{ active, checked }"
								as="template"
								:value="division"
							>
								<div
									:class="[
										// probably will change select colour in future..
										active ? '' : '',
										checked ? 'bg-indigo-500 bg-opacity-75' : 'bg-indigo-400 hover:bg-indigo-500',
									]"
									class="relative flex px-5 py-2 rounded-lg shadow-md cursor-pointer focus:outline-none"
								>
									<div class="flex items-center justify-between w-full">
										<div class="flex items-center">
											<div class="text-sm">
												<RadioGroupLabel as="p" class="font-bold text-black">
													{{ division.name }}
												</RadioGroupLabel>
												<RadioGroupDescription as="span" class="inline font-semibold text-gray-900">
													<span> Changes will only apply to {{ division.name }}</span>
												</RadioGroupDescription>
											</div>
										</div>
										<div v-show="checked" class="flex-shrink-0 text-black">
											<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
												<circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.2" />
												<path
													d="M7 13l3 3 7-7"
													stroke="#000"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</div>
									</div>
								</div>
							</RadioGroupOption>
						</div>
					</RadioGroup>
				</div>
			</div>
		</div>
		<div class="flex justify-center mt-4 space-x-4 flex-nowrap">
			<button
				class="
					inline-flex
					justify-center
					w-full
					px-4
					py-2
					text-base
					font-medium
					text-gray-100
					rounded-md
					shadow-sm
					bg-main-textDark-560
					hover:bg-main-textLight-560
					dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560
					focus:outline-none
					sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
				"
				@click="handleReset()"
			>
				Reset
			</button>
			<button
				class="
					inline-flex
					justify-center
					w-full
					px-4
					py-2
					text-base
					font-medium
					text-gray-100
					bg-red-600
					rounded-md
					shadow-sm
					hover:bg-red-700
					focus:outline-none
					sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
				"
				@click="applyLeagueConfig()"
			>
				Apply
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupDescription, RadioGroupOption } from '@headlessui/vue';
import { TUserLeagueData, TUserChildLeagueDivisions, TSelectedLeague, TSelectedChild } from '~/types/leagues';
import { notifications } from '~/stores/notifications';
import router from '~/router';

const leaguesData: TUserLeagueData[] = JSON.parse(localStorage.getItem('leagues-data') ?? '{}').value;
const selectedLeague = ref<TSelectedLeague>({
	league_id: 0,
	name: '',
	abbreviation: '',
	season_id: null,
	icon_url: '',
});
const selectedChildLeague = ref<TSelectedChild>({ id: 0, name: '', abbreviation: '', icon_url: '', season_id: null });
const selectedDivision = ref<TUserChildLeagueDivisions>({
	id: 0,
	child_id: 0,
	season_id: 0,
	name: '',
	abbreviation: '',
	icon_url: null,
});

const selectedLeagueChild = computed(
	() => leaguesData.find((league) => league.league_id === selectedLeague.value.league_id)?.child_leagues,
);

const selectedChildDivisions = computed(
	() =>
		leaguesData
			.find((league) => league.league_id === selectedLeague.value.league_id)
			?.child_leagues.find((child) => child.id === selectedChildLeague.value.id)?.divisions,
);

const handleReset = () => {
	selectedLeague.value = { league_id: 0, name: '', abbreviation: '', season_id: null, icon_url: '' };
	selectedChildLeague.value = { id: 0, name: '', abbreviation: '', icon_url: '', season_id: null };
	selectedDivision.value = { id: 0, child_id: 0, season_id: 0, name: '', abbreviation: '', icon_url: null };
};

const handleLeagueChange = () => {
	selectedChildLeague.value.id = 0;
	selectedChildLeague.value.name = '';
};

const applyLeagueConfig = async () => {
	localStorage.setItem(
		'selected-league-config',
		JSON.stringify({
			league: selectedLeague.value,
			child: selectedChildLeague.value,
			division: selectedDivision.value,
		}),
	);
	notifications().notify({ title: 'Success', text: 'Settings saved successfully!' });
	await router.push({ name: 'League Info' });
};
</script>
