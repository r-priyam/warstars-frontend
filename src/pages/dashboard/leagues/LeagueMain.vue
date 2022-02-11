<template>
    <div>
        <div class="m-2 grid grid-cols-3 gap-5">
            <button
                class="tab-item"
                :class="
                    league === true ? 'bg-main-textLight-560 dark:bg-main-textDark-560' : 'bg-main-textDark-560 dark:bg-main-textLight-560 '
                "
                @click="
                    league = true;
                    childLeague = false;
                    division = false;
                ">
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
                ">
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
                ">
                Divisions
            </button>
        </div>
        <!-- A fake border just to have some good utility classes -->
        <div class="mx-6 mt-3 border-b-2 border-gray-900 dark:border-white"></div>
        <div v-if="league">
            <h1 class="mt-6 text-center text-4xl font-bold text-red-700 dark:text-red-500 md:text-3xl">
                {{ leagueData?.name }}
            </h1>
            <div class="mt-4 flex items-center justify-center">
                <img class="h-36 w-36 rounded-full border-2 border-red-500 border-opacity-75 p-1" :src="leagueData?.iconUrl" />
            </div>

            <div class="mt-10 space-y-1 rounded-lg bg-transparent p-5 text-sm">
                <div class="league-info-item-box">
                    <div class="league-info-item-dark">
                        <span class="league-info-item-name">
                            <IconHelper icon="mdi:notebook-check" :icon-style="iconsDefault" /> Abbreviation
                        </span>
                        <span class="league-info-item-data">{{ leagueData?.abbreviation }}</span>
                    </div>
                </div>
                <div class="league-info-item-box">
                    <div class="league-info-item-light">
                        <span class="league-info-item-name"> <IconHelper icon="subway:admin" :icon-style="iconsDefault" /> Head Name </span>
                        <span class="league-info-item-data">{{ leagueData?.headAdmin }}</span>
                    </div>
                </div>
                <div class="league-info-item-box">
                    <div class="league-info-item-dark">
                        <span class="league-info-item-name">
                            <IconHelper icon="ph:hash-bold" :icon-style="iconsDefault" /> Head Discord ID
                        </span>
                        <span class="league-info-item-data">{{ leagueData?.discordId }}</span>
                    </div>
                </div>
                <div class="league-info-item-box">
                    <div class="league-info-item-light">
                        <span class="league-info-item-name">
                            <IconHelper icon="file-icons:moleculer" :icon-style="iconsDefault" /> Child Leagues
                        </span>
                        <span class="league-info-item-data">{{ leagueData?.childLeagues.length }}</span>
                    </div>
                </div>
                <div class="league-info-item-box">
                    <div class="league-info-item-dark">
                        <span class="league-info-item-name">
                            <IconHelper icon="ion:ios-people" :icon-style="iconsDefault" /> Total Admins
                        </span>
                        <span class="league-info-item-data">{{ leagueData?.totalAdmins }}</span>
                    </div>
                </div>
                <div class="league-info-item-box">
                    <div class="league-info-item-light">
                        <span class="league-info-item-name"> <IconHelper icon="iconoir:notes" :icon-style="iconsDefault" /> Rules </span>
                        <span class="league-info-item-data">{{ leagueData?.rules || 'No Rules' }}</span>
                    </div>
                </div>
                <div class="league-info-item-box">
                    <div class="league-info-item-dark">
                        <span class="league-info-item-name">
                            <IconHelper icon="ic:baseline-discord" :icon-style="iconsDefault" /> Discord
                        </span>
                        <span v-if="leagueData?.discordInvite" class="league-info-item-data">{{ leagueData?.discordInvite }}</span>
                        <span else class="league-info-item-data">Not Provided</span>
                    </div>
                </div>
                <div class="league-info-item-box">
                    <div class="league-info-item-light">
                        <span class="league-info-item-name"> <IconHelper icon="mdi:twitter" :icon-style="iconsDefault" /> Twitter </span>
                        <span v-if="leagueData?.twitterHandle" class="league-info-item-data">{{ leagueData?.twitterHandle }}</span>
                        <span v-else class="league-info-item-data">Not Provided</span>
                    </div>
                </div>
                <div class="league-info-item-box">
                    <div class="league-info-item-dark">
                        <span class="league-info-item-name"> <IconHelper icon="whh:website" :icon-style="iconsDefault" /> Website </span>
                        <span v-if="leagueData?.website" class="league-info-item-data">{{ leagueData?.website }}</span>
                        <span v-else class="league-info-item-data">Not Provided</span>
                    </div>
                </div>
                <div class="league-info-item-box">
                    <div class="league-info-item-light">
                        <span class="league-info-item-name inline-flex">
                            <IconHelper icon="iwwa:year" :icon-style="iconsDefault" />
                            Registered On
                        </span>
                        <span v-if="leagueData?.registerdOn" class="league-info-item-data">{{
                            moment(leagueData.registerdOn).format('MMMM-DD-YYYY')
                        }}</span>
                    </div>
                </div>
            </div>
        </div>
        <LeagueChild v-if="childLeague" :child-data="leagueData?.childLeagues" />
        <ChildDivision v-if="division" :child-data="leagueData?.childLeagues" :divisions-data="leagueDivisions()" />
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import LeagueChild from '~/pages/dashboard/leagues/core/LeagueChild.vue';
import ChildDivision from '~/pages/dashboard/leagues/core/ChildDivision.vue';
import type { TLocalLeagueData, TUserChildLeagueDivisions, TUserLeagueData } from '~/types';
import { RawLeagueData, checkLeague } from '~/utils/leagueUtils';
import { leagueManagement } from '~/stores/leagueManagement';

onBeforeMount(() => checkLeague());

const leagueStore = leagueManagement();
const league = $ref(true); // true by default to show the league main page.
const childLeague = $ref(false);
const division = $ref(false);
const leaguesData: TUserLeagueData[] = (JSON.parse(RawLeagueData.value) as TLocalLeagueData).value!;
const iconsDefault = 'mb-1 h-4 w-4 mr-1';

const leagueData = computed(() =>
    leaguesData.find((leagueData) => leagueData.leagueId === leagueStore.getLeagueLocalConfig?.league.leagueId)
);

const leagueDivisions = () => {
    const leagueData_ = leaguesData.find((leagueData) => leagueData.leagueId === leagueStore.getLeagueLocalConfig?.league.leagueId);
    if (!leagueData_?.childLeagues) return [];
    const divisions: Array<TUserChildLeagueDivisions> = [];
    leagueData_.childLeagues.forEach((element) => {
        divisions.push(...element.divisions);
    });
    return divisions;
};
</script>

<style scoped>
.tab-item {
    @apply w-full rounded border border-transparent p-2 font-bold text-white shadow-md
	hover:bg-main-textLight-560 hover:shadow-xl
	dark:hover:bg-main-textDark-560;
}

.league-info-item-box {
    @apply mx-auto w-full rounded-sm px-0 md:px-2 lg:w-1/2;
}

.league-info-item-dark {
    @apply flex w-full justify-between bg-main-light-530 py-1 px-2 shadow dark:bg-main-dark-700;
}

.league-info-item-light {
    @apply flex w-full justify-between bg-main-light-430 py-1 px-2 dark:bg-main-dark-630;
}

.league-info-item-name {
    @apply inline-flex font-bold leading-tight text-main-textDark-500 dark:text-main-textLight-500;
}

.league-info-item-data {
    @apply font-medium text-gray-800 dark:text-gray-200;
}
</style>
