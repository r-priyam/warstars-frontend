<template>
	<div>
		<PopUp
			title="Remove Clan"
			:description="popUpMessage"
			:open="showPopUp"
			:processing="popUpProcessing"
			@close-pop-up="() => (showPopUp = false)"
			@confirmation="
				async () => (
					(popUpProcessing = true), await leagueStore.seasonRemoveClan(removeClanData!), (popUpProcessing = false), (showPopUp = false), clansData?.splice(clansData.indexOf(removeClanData!), 1)
				)
			"
		/>
	</div>
	<LoadingSpinner v-if="leagueStore.fetchingChildClans" />
	<div v-else class="mx-auto bg-main-light-530 px-4 dark:bg-main-dark-500">
		<div class="mx-auto max-w-4xl">
			<div class="relative">
				<div class="absolute inset-0 flex items-center" aria-hidden="true">
					<div class="w-full border-t border-black dark:border-white"></div>
				</div>
				<div class="relative flex justify-start">
					<span
						class="bg-main-light-430 pl-2 pr-2 text-lg font-bold text-main-textDark-600 dark:bg-main-dark-600 dark:text-main-textLight-530"
						>Season Clans</span
					>
				</div>
			</div>
		</div>
		<div>
			<div class="mt-2 text-xl font-semibold text-main-textDark-600 dark:text-main-textLight-530">
				<div class="-mt-2 flex flex-col p-2">
					<div class="overflow-x-auto sm:-mx-6 lg:-mx-6">
						<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
							<div v-if="selectedOptionClans.length > 0" class="rounded-md bg-main-light-400 p-2 dark:bg-main-dark-560">
								<span class="text-base font-bold">Showing Data For {{ selectedOption.name }}</span>
								<Listbox v-model="selectedOption">
									<div class="absolute top-auto right-6 inline-flex sm:right-6 lg:right-[1.8rem]">
										<ListboxButton
											class="relative mr-[0.130rem] cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm"
										>
											<heroicons-solid:filter
												class="relative mb-2 inline-flex h-7 w-6 rounded-md text-main-textDark-500 hover:bg-main-light-560 dark:text-main-textLight-500 dark:hover:bg-main-dark-660"
												aria-hidden="true"
											/>
										</ListboxButton>

										<transition
											leave-active-class="transition duration-100 ease-in"
											leave-from-class="opacity-100"
											leave-to-class="opacity-0"
										>
											<ListboxOptions
												class="absolute right-0 top-[1.8rem] max-h-60 overflow-auto rounded-md bg-main-light-460 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-main-dark-560 sm:text-sm"
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
																: 'text-main-textDark-600 hover:bg-main-light-560 dark:text-main-textLight-530 dark:hover:bg-main-dark-600',
															'relative cursor-default select-none py-2 pl-10 pr-4'
														]"
													>
														<span
															:class="[
																selected ? 'font-bold' : 'font-semibold',
																'block truncate text-main-textDark-600 hover:bg-main-light-560 dark:text-main-textLight-530 dark:hover:bg-main-dark-600'
															]"
															>{{ data.name }}</span
														>
														<span
															v-if="selected"
															class="absolute inset-y-0 left-0 flex items-center pl-3 text-main-textDark-600 hover:bg-main-light-560 dark:text-main-textLight-530 dark:hover:bg-main-dark-600"
														>
															<heroicons-solid:check class="h-5 w-5" aria-hidden="true" />
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
									<thead class="border-b border-gray-600 bg-main-light-430 dark:border-gray-400 dark:bg-main-dark-630">
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
										<tr class="border-b border-gray-600 bg-main-light-330 dark:border-gray-400 dark:bg-main-dark-530">
											<td
												class="whitespace-nowrap px-6 py-4 text-sm font-medium text-main-textDark-500 dark:text-main-textLight-500"
											>
												{{ clan.name }}
											</td>
											<td
												class="whitespace-nowrap px-6 py-4 text-sm font-normal text-main-textDark-500 dark:text-main-textLight-500"
											>
												{{ clan.tag }}
											</td>
											<td class="cursor-pointer whitespace-nowrap px-6 py-4 text-sm text-red-500 hover:text-red-600">
												<button
													@click="
														removeClanData = clan;
														popUpMessage = `Are you sure you want to remove ${clan.name}(${clan.tag}) for the season?`;
														showPopUp = true;
													"
												>
													Remove
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div v-else class="mt-8 text-center text-2xl font-bold text-red-500">No Clan Linked</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { leagueManagement } from '~/stores/leagueManagement';
import LoadingSpinner from '~/components/Spinner.vue';
import PopUp from '~/pages/dashboard/utils/ConfirmationPopup.vue';
import type { TChildClans, TLocalLeagueData, TUserChildLeagueDivisions, TUserLeagueData } from '~/types';
import { notifications } from '~/stores/notifications';
import router from '~/router';

const leagueStore = leagueManagement();
const filterOptions = ref([
	{ name: leagueStore.getLeagueLocalConfig!.child.name, id: leagueStore.getLeagueLocalConfig!.child.id }
]);
const selectedOption = ref(filterOptions.value[0]);
const leaguesData: TUserLeagueData[] = (JSON.parse(localStorage.getItem('leagues-data') ?? '{}') as TLocalLeagueData)
	.value!;
const clansData = ref<TChildClans[] | null>(null);

const showPopUp = ref(false);
const popUpProcessing = ref(false);
const popUpMessage = ref('');
const removeClanData = ref<TChildClans | null>(null);

const selectedChildDivisions = () =>
	leaguesData
		.find((league) => league.leagueId === leagueStore.getLeagueLocalConfig!.league.leagueId)
		?.childLeagues.find((child) => child.id === leagueStore.getLeagueLocalConfig!.child.id)!
		.divisions.map((data: TUserChildLeagueDivisions) => filterOptions.value.push({ name: data.name, id: data.id }));

const getSeasonChildClans = async () => {
	await leagueStore.seasonChildClans(
		leagueStore.getLeagueLocalConfig?.child.id ?? 0,
		leagueStore.getLeagueLocalConfig?.child.seasonId ?? 0
	);
	clansData.value = leagueStore.childClans[leagueStore.getLeagueLocalConfig!.child.id] as TChildClans[];
};

const selectedOptionClans = computed(() => {
	if (!clansData.value) return [];
	if (selectedOption.value === filterOptions.value[0]) return clansData.value;
	return clansData.value.filter((data) => data.divisionId === selectedOption.value.id);
});
onMounted(async () => {
	selectedChildDivisions();
	await getSeasonChildClans();
});

onBeforeMount(async () => {
	if (leagueStore.getLeagueLocalConfig?.league.leagueId === 0 || !leagueStore.getLeagueLocalConfig) {
		notifications().warning('Please config a league to continue!');
		await router.push({ name: 'League Selector' });
	} else if (leagueStore.getLeagueLocalConfig.child.id === 0) {
		notifications().warning('Please select a child league to continue!');
		await router.push({ name: 'League Selector' });
	}
});
</script>
