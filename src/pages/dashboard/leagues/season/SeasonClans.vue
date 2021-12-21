<template>
	<LoadingSpinner v-if="leagueStore.fetchingChildClans" />
	<div v-else class="px-4 mx-auto bg-main-light-530 dark:bg-main-dark-500">
		<div class="max-w-4xl mx-auto">
			<div class="relative">
				<div class="absolute inset-0 flex items-center" aria-hidden="true">
					<div class="w-full border-t border-black dark:border-white"></div>
				</div>
				<div class="relative flex justify-start">
					<span
						class="pl-2 pr-2 text-lg font-bold text-main-textDark-600 dark:text-main-textLight-530 bg-main-light-430 dark:bg-main-dark-600"
					>
						Season Clans
					</span>
				</div>
			</div>
		</div>
		<div>
			<div class="mt-2 text-xl font-semibold text-main-textDark-600 dark:text-main-textLight-530">
				<div class="flex flex-col p-2 -mt-2">
					<div class="overflow-x-auto sm:-mx-6 lg:-mx-6">
						<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
							<div class="p-2 rounded-md bg-main-light-400 dark:bg-main-dark-560">
								<span class="text-base font-bold">Showing Data For {{ selectedOption.name }}</span>
								<Listbox v-model="selectedOption">
									<div class="absolute top-auto inline-flex right-6 sm:right-6 lg:right-[1.8rem]">
										<ListboxButton
											class="relative mr-[0.130rem] cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
										>
											<heroicons-solid:filter
												class="relative inline-flex w-6 mb-2 rounded-md h-7 text-main-textDark-500 dark:text-main-textLight-500 hover:bg-main-light-560 dark:hover:bg-main-dark-660"
												aria-hidden="true"
											/>
										</ListboxButton>

										<transition
											leave-active-class="transition duration-100 ease-in"
											leave-from-class="opacity-100"
											leave-to-class="opacity-0"
										>
											<ListboxOptions
												class="absolute py-1 right-0 top-[1.8rem] overflow-auto text-sm bg-main-light-460 dark:bg-main-dark-560 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
											>
												<ListboxOption
													v-for="data in filterOptions"
													v-slot="{ active, selected }"
													:key="data.name"
													:value="data"
													as="template"
												>
													<li
														:class="[
															active
																? 'bg-main-light-600 dark:bg-main-dark-600'
																: 'text-main-textDark-600 dark:text-main-textLight-530 hover:bg-main-light-560 dark:hover:bg-main-dark-600',
															'cursor-default select-none relative py-2 pl-10 pr-4',
														]"
													>
														<span
															:class="[
																selected ? 'font-bold' : 'font-semibold',
																'block truncate text-main-textDark-600 dark:text-main-textLight-530 hover:bg-main-light-560 dark:hover:bg-main-dark-600',
															]"
															>{{ data.name }}</span
														>
														<span
															v-if="selected"
															class="absolute inset-y-0 left-0 flex items-center pl-3 text-main-textDark-600 dark:text-main-textLight-530 hover:bg-main-light-560 dark:hover:bg-main-dark-600"
														>
															<heroicons-solid:check class="w-5 h-5" aria-hidden="true" />
														</span>
													</li>
												</ListboxOption>
											</ListboxOptions>
										</transition>
									</div>
								</Listbox>
							</div>

							<div v-if="selectedOptionClans.length > 0" class="mt-1 overflow-hidden rounded-t-lg">
								<table class="min-w-full text-center">
									<thead class="border-b border-gray-600 dark:border-gray-400 bg-main-light-430 dark:bg-main-dark-630">
										<tr>
											<th
												scope="col"
												class="px-6 py-4 text-sm font-semibold leading-tight text-main-textDark-500 dark:text-main-textLight-500"
											>
												Name
											</th>
											<th
												scope="col"
												class="px-6 py-4 text-sm font-semibold leading-tight text-main-textDark-500 dark:text-main-textLight-500"
											>
												Clan Tag
											</th>
											<th
												scope="col"
												class="px-6 py-4 text-sm font-semibold leading-tight text-main-textDark-500 dark:text-main-textLight-500"
											></th>
										</tr>
									</thead>
									<tbody v-for="clan in selectedOptionClans" :key="clan.tag">
										<tr class="border-b border-gray-600 bg-main-light-330 dark:bg-main-dark-530 dark:border-gray-400">
											<td
												class="px-6 py-4 text-sm font-medium text-main-textDark-500 dark:text-main-textLight-500 whitespace-nowrap"
											>
												{{ clan.name }}
											</td>
											<td
												class="px-6 py-4 text-sm font-normal text-main-textDark-500 dark:text-main-textLight-500 whitespace-nowrap"
											>
												{{ clan.tag }}
											</td>
											<td class="px-6 py-4 text-sm text-red-500 cursor-pointer hover:text-red-600 whitespace-nowrap">
												<button>Remove</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div v-else class="mt-8 text-2xl font-bold text-center text-red-500">No Clan Linked</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import { leagueManagement } from '~/stores/leagueManagement';
import LoadingSpinner from '~/components/Spinner.vue';
import { TChildClans, TUserChildLeagueDivisions, TUserLeagueData } from '~/types/leagues';

const leagueStore = leagueManagement();
const filterOptions = ref([
	{ name: leagueStore.getLeagueLocalConfig!.child.name, id: leagueStore.getLeagueLocalConfig!.child.id },
	{ name: 'Test', id: 10 },
]);
const selectedOption = ref(filterOptions.value[0]);
const leaguesData: TUserLeagueData[] = JSON.parse(localStorage.getItem('leagues-data') ?? '{}').value;
const clansData = ref<TChildClans[] | null>(null);

const selectedChildDivisions = () =>
	leaguesData
		.find((league) => league.league_id === leagueStore.getLeagueLocalConfig!.league.league_id)
		?.child_leagues.find((child) => child.id === leagueStore.getLeagueLocalConfig!.child.id)!
		.divisions.map((data: TUserChildLeagueDivisions) => filterOptions.value.push({ name: data.name, id: data.id }));

const getSeasonChildClans = async () => {
	await leagueStore.seasonChildClans(
		leagueStore.getLeagueLocalConfig?.child.id ?? 0,
		leagueStore.getLeagueLocalConfig?.child.season_id ?? 0,
	);
	clansData.value = leagueStore.childClans[leagueStore.getLeagueLocalConfig!.child.id];
	console.log(leagueStore.childClans[leagueStore.getLeagueLocalConfig!.child.id]);
};

const selectedOptionClans = computed(() => {
	if (!clansData.value) return [];
	if (selectedOption.value === filterOptions.value[0]) return clansData.value;
	return clansData.value.filter((data) => data.division_id === selectedOption.value.id);
});
onMounted(selectedChildDivisions);
onMounted(getSeasonChildClans);
</script>
