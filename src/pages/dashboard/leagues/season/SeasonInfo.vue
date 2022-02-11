<template>
    <PopUp
        :title="popUpTitle"
        :description="popUpDescription"
        :open="showPopUp"
        :processing="popUpProcessing"
        @close-pop-up="() => (showPopUp = false)"
        @confirmation="
			async () => (
				(popUpProcessing = true),
				type === 'league' ? await league.endSeason({ seasonId: selectedLeagueData?.seasonId!, leagueId: selectedLeagueData?.leagueId! }) : await league.endChildSeason({ seasonId: clickedChildData.seasonId, leagueId: selectedLeagueData?.leagueId!, childLeagueId: clickedChildData.childId }),
				type === 'league' && forceEnd ? await router.push({ name: 'Season Core' }) : await router.push({ name: 'Season Core', query: { showChildSeason: 'true' } }),
				(popUpProcessing = false),
				(showPopUp = false),
				(forceEnd = false)
			)
		" />
    <LoadingSpinner v-if="league.leagueDataRefreshProcess" />
    <div v-else class="mx-auto bg-main-light-530 px-4 dark:bg-main-dark-500">
        <div class="mx-auto max-w-4xl">
            <div class="relative">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="w-full border-t border-black dark:border-white"></div>
                </div>
                <div class="jusify-start relative flex">
                    <span
                        class="bg-main-light-430 pl-2 pr-2 text-lg font-bold text-main-textDark-600 dark:bg-main-dark-600 dark:text-main-textLight-530">
                        Season Information
                    </span>
                </div>
            </div>

            <div v-if="selectedLeagueData">
                <div>
                    <div class="group mt-4 border-b border-gray-400 dark:border-gray-100 sm:flex lg:items-end">
                        <div class="flex shrink-0 items-center justify-center sm:mb-0 sm:mr-4">
                            <img
                                class="mb-4 h-24 w-24 rounded-full border-2 border-red-700 object-contain dark:border-red-500 md:h-32 md:w-32"
                                :src="selectedLeagueData.iconUrl"
                                :alt="`${selectedLeagueData.name} Icon`" />
                        </div>
                        <div class="h-32 w-full">
                            <div class="absolute right-2 mt-auto ml-auto inline-flex items-end justify-end lg:p-2">
                                <button
                                    v-if="selectedLeagueData.seasonActive"
                                    title="New Season"
                                    @click="
                                        popUpTitle = 'Warning';
                                        // eslint-disable-next-line prettier/prettier
                                        popUpDescription =
                                            'Are you sure you want to start a new season? One season is active, Confiriming will end the current season!';
                                        showPopUp = true;
                                        type = 'league';
                                        forceEnd = true;
                                    ">
                                    >
                                    <span
                                        class="mr-1 inline-flex rounded-md bg-main-light-430 px-2 py-1 text-sm font-bold text-green-600 hover:bg-main-light-500 dark:bg-main-dark-600 dark:hover:bg-main-dark-700"
                                        ><IconHelper icon="bx:bxs-calendar-plus" icon-style="mr-1 h-5 w-5" />New
                                    </span>
                                </button>
                                <router-link
                                    v-if="!selectedLeagueData.seasonActive || selectedLeagueData.seasonActive === null"
                                    :to="{ name: 'Season Core' }">
                                    <span
                                        class="mr-1 inline-flex rounded-md bg-main-light-430 px-2 py-1 text-sm font-bold text-green-600 hover:bg-main-light-500 dark:bg-main-dark-600 dark:hover:bg-main-dark-700"
                                        ><IconHelper icon="bx:bxs-calendar-plus" icon-style="mr-1 h-5 w-5" />New
                                    </span>
                                </router-link>
                                <button
                                    v-if="selectedLeagueData.seasonActive"
                                    title="End Season"
                                    @click="
                                        popUpTitle = 'End Season';
                                        popUpDescription = `Are you sure you want to end season ${selectedLeagueData?.specificId}? This action is irreversible`;
                                        showPopUp = true;
                                        type = 'league';
                                    ">
                                    <span
                                        class="mr-1 inline-flex rounded-md bg-main-light-430 px-2 py-1 text-sm font-bold text-red-600 hover:bg-main-light-500 dark:bg-main-dark-600 dark:hover:bg-main-dark-700"
                                        ><IconHelper icon="ph:calendar-x-fill" icon-style="mr-1 h-5 w-5" /> End
                                    </span>
                                </button>
                            </div>
                            <div class="absolute right-2 mt-[4.9rem] ml-auto inline-flex items-end justify-end lg:p-2">
                                <span
                                    v-if="selectedLeagueData.seasonActive"
                                    class="mr-1 inline-flex rounded-full bg-main-light-430 px-3 py-1 text-sm dark:bg-main-dark-600"
                                    ><IconHelper icon="bx:bxs-calendar-check" icon-style="mr-1 h-5 w-5 text-green-500" />
                                    <span class="font-bold text-green-600"> Season Active </span>
                                </span>
                                <span
                                    v-else
                                    class="mr-1 inline-flex rounded-full bg-main-light-430 px-3 py-1 text-sm font-bold text-red-500 dark:bg-main-dark-600"
                                    ><IconHelper icon="ph:calendar-x-fill" icon-style="mr-1 h-5 w-5" />
                                    <span> Not In A Season </span>
                                </span>
                            </div>
                            <p class="text-xl font-extrabold text-main-textDark-500 dark:text-main-textLight-500 lg:text-2xl">
                                {{ selectedLeagueData.abbreviation }}
                            </p>
                            <p
                                v-if="selectedLeagueData.seasonActive"
                                class="mt-2 text-base font-bold text-main-textDark-560 dark:text-main-textLight-560 lg:text-base">
                                Season {{ selectedLeagueData.specificId }}
                            </p>
                            <p v-else class="mt-2 text-base font-bold text-red-500 lg:text-base">No Season</p>
                            <p
                                v-if="selectedLeagueData.seasonActive !== null && selectedLeagueData.seasonActive"
                                class="text-base font-semibold text-gray-800 dark:text-gray-200 lg:text-base">
                                <span class="text-base font-bold text-main-textDark-560 dark:text-main-textLight-560 lg:text-base"
                                    >Start Date: </span
                                >{{ moment(selectedLeagueData.startTime).format('MMM DD, YYYY') }}
                            </p>
                            <p
                                v-if="selectedLeagueData.seasonActive !== null && selectedLeagueData.seasonActive"
                                class="text-base font-semibold text-gray-800 dark:text-gray-200 lg:text-base">
                                <span class="text-base font-bold text-main-textDark-560 dark:text-main-textLight-560 lg:text-base"
                                    >End Date: </span
                                >{{ moment(selectedLeagueData.endTime).format('MMM DD, YYYY') }}
                            </p>
                        </div>
                    </div>

                    <!-- Child Data -->
                    <div
                        v-for="child in selectedLeagueData.childLeagues"
                        :key="child.id"
                        class="group mt-4 border-b border-gray-400 dark:border-gray-100 sm:flex lg:items-end">
                        <div class="flex shrink-0 items-center justify-center sm:mb-0 sm:mr-4">
                            <img
                                class="mb-4 h-24 w-24 rounded-full border-2 border-green-700 object-contain dark:border-green-500 md:h-32 md:w-32"
                                :src="child.iconUrl"
                                :alt="`${child.name} Icon`" />
                        </div>
                        <div class="h-32 w-full">
                            <div class="absolute right-2 mt-auto ml-auto inline-flex items-end justify-end lg:p-2">
                                <button
                                    v-if="child.seasonActive"
                                    title="New Season"
                                    @click="
										popUpTitle = 'Warning';
										// eslint-disable-next-line prettier/prettier
										popUpDescription = 'Are you sure you want to start a new season? One season is active, Confiriming will end the current season!';
										showPopUp = true;
										type = 'childLeague';
										clickedChildData = { childId: child.id, seasonId: child.seasonId! };
										forceEnd = true;
									">
                                    <span
                                        class="mr-1 inline-flex rounded-md bg-main-light-430 px-2 py-1 text-sm font-bold text-green-600 hover:bg-main-light-500 dark:bg-main-dark-600 dark:hover:bg-main-dark-700"
                                        ><IconHelper icon="bx:bxs-calendar-plus" icon-style="mr-1 h-5 w-5" />New
                                    </span>
                                </button>
                                <router-link
                                    v-if="!child.seasonActive || child.seasonActive === null"
                                    :to="{ name: 'Season Core', query: { showChildSeason: 'true' } }"
                                    @click="saveForceSelectedLeague(child)">
                                    <span
                                        class="mr-1 inline-flex rounded-md bg-main-light-430 px-2 py-1 text-sm font-bold text-green-600 hover:bg-main-light-500 dark:bg-main-dark-600 dark:hover:bg-main-dark-700"
                                        ><IconHelper icon="bx:bxs-calendar-plus" icon-style="mr-1 h-5 w-5" />New
                                    </span>
                                </router-link>
                                <button
                                    v-if="child.seasonActive"
                                    title="End Season"
                                    @click="
										popUpTitle = 'End Season';
										popUpDescription = `Are you sure you want to end season ${child.specificId}? This action is irreversible`;
										showPopUp = true;
										type = 'childLeague';
										clickedChildData = { childId: child.id, seasonId: child.seasonId! };
									">
                                    <span
                                        class="mr-1 inline-flex rounded-md bg-main-light-430 px-2 py-1 text-sm font-bold text-red-600 hover:bg-main-light-500 dark:bg-main-dark-600 dark:hover:bg-main-dark-700"
                                        ><IconHelper icon="ph:calendar-x-fill" icon-style="mr-1 h-5 w-5" /> End
                                    </span>
                                </button>
                            </div>
                            <div class="absolute right-2 mt-[4.9rem] ml-auto inline-flex items-end justify-end lg:p-2">
                                <span
                                    v-if="child.seasonActive"
                                    class="mr-1 inline-flex rounded-full bg-main-light-430 px-3 py-1 text-sm dark:bg-main-dark-600"
                                    ><IconHelper icon="bx:bxs-calendar-check" icon-style="mr-1 h-5 w-5 text-green-500" />
                                    <span class="font-bold text-green-600"> Season Active </span>
                                </span>
                                <span
                                    v-else
                                    class="mr-1 inline-flex rounded-full bg-main-light-430 px-3 py-1 text-sm font-bold text-red-500 dark:bg-main-dark-600"
                                    ><IconHelper icon="ph:calendar-x-fill" icon-style="mr-1 h-5 w-5" />
                                    <span> Not In A Season </span>
                                </span>
                            </div>
                            <p class="text-xl font-extrabold text-main-textDark-500 dark:text-main-textLight-500 lg:text-2xl">
                                {{ `${selectedLeagueData.abbreviation} ${child.name}` }}
                            </p>
                            <p
                                v-if="child.seasonActive"
                                class="mt-2 text-base font-bold text-main-textDark-560 dark:text-main-textLight-560 lg:text-base">
                                Season {{ child.specificId }}
                            </p>
                            <p v-else class="mt-2 text-base font-bold text-red-500 lg:text-base">No Season</p>
                            <p
                                v-if="child.seasonActive !== null && child.seasonActive"
                                class="text-base font-semibold text-gray-800 dark:text-gray-200 lg:text-base">
                                <span class="text-base font-bold text-main-textDark-560 dark:text-main-textLight-560 lg:text-base"
                                    >Start Date: </span
                                >{{ moment(child.startTime).format('MMM DD, YYYY') }}
                            </p>
                            <p
                                v-if="child.seasonActive !== null && child.seasonActive"
                                class="text-base font-semibold text-gray-800 dark:text-gray-200 lg:text-base">
                                <span class="text-base font-bold text-main-textDark-560 dark:text-main-textLight-560 lg:text-base"
                                    >End Date: </span
                                >{{ moment(child.endTime).format('MMM DD, YYYY') }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import type { TLocalLeagueData, TUserChildLeague, TUserLeagueData } from '~/types';
import LoadingSpinner from '~/components/Spinner.vue';
import { RawLeagueData, checkLeague } from '~/utils/leagueUtils';
import { leagueManagement } from '~/stores/leagueManagement';
import PopUp from '~/pages/dashboard/utils/ConfirmationPopup.vue';

onBeforeMount(() => checkLeague());

const popUpTitle = ref('');
const popUpDescription = ref('');
const showPopUp = ref(false);
const popUpProcessing = ref(false);
const type = ref('');
const forceEnd = ref(false);
const router = useRouter();
const clickedChildData = ref({ childId: 0, seasonId: 0 });

const league = leagueManagement();
const leaguesData: TUserLeagueData[] = (JSON.parse(RawLeagueData.value) as TLocalLeagueData).value!;
const selectedLeagueData = computed(() =>
    leaguesData.find((leagueData) => leagueData.leagueId === league.getLeagueLocalConfig?.league.leagueId)
);

function saveForceSelectedLeague(child: TUserChildLeague) {
    RawLeagueData.value = JSON.stringify({
        league: league.getLeagueLocalConfig?.league,
        child: {
            id: child.id,
            name: child.name,
            abbreviation: child.abbreviation,
            iconUrl: child.iconUrl,
            seasonId: child.seasonId
        },
        division: league.getLeagueLocalConfig?.division
    });
}
</script>
