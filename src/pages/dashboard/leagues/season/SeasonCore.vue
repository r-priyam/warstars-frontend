<template>
    <div>
        <div class="mx-auto max-w-lg rounded-b-lg bg-main-light-530 p-8 shadow-lg dark:bg-main-dark-500 md:p-12">
            <div class="mb-8 grid grid-cols-2 gap-5">
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
                    ">
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
                    ">
                    Child League Season
                </button>
            </div>
            <h1 class="text-center text-3xl font-black text-main-textDark-600 dark:text-main-textLight-530">
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
                        <label class="register-form-input-label mt-4">End Date<span class="ml-0.5 text-red-500">*</span></label>
                        <input id="end-date" name="end-date" type="date" required="true" class="register-form-input" />
                    </div>
                    <div>
                        <label class="register-form-input-label mt-4">Main League Name</label>
                        <input
                            readonly="true"
                            class="register-form-input cursor-not-allowed focus-visible:ring-transparent"
                            :placeholder="league.getLeagueLocalConfig?.league.name" />
                    </div>
                    <div v-if="childSeason">
                        <label class="register-form-input-label mt-4">Child League Name</label>
                        <input
                            readonly="true"
                            class="register-form-input cursor-not-allowed focus-visible:ring-transparent"
                            :placeholder="league.getLeagueLocalConfig?.child.name" />
                    </div>
                    <div v-if="selectedLeagueChild?.length !== 0 && !childSeason" class="mt-4 block">
                        <span class="register-form-input-label">Select child leagues to start season for</span>
                        <div class="mt-2">
                            <div v-for="child in selectedLeagueChild" :key="child.id">
                                <label class="inline-flex items-center">
                                    <input
                                        v-model="selectedChilds"
                                        :value="child.id"
                                        class="rounded text-main-textDark-600 shadow-sm focus:ring focus:ring-main-textLight-460 focus:ring-opacity-40 focus:ring-offset-0 dark:text-main-textLight-600"
                                        type="checkbox" />
                                    <span class="ml-2 font-semibold text-main-textDark-500 dark:text-main-textLight-500">
                                        {{ child.name }}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <ProcessButton :processing="league.newSeasonProcess || league.childSeasonProcess" />
                </form>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { notifications } from '~/stores/notifications';
import ProcessButton from '~/components/ProcessButton.vue';
import { leagueManagement } from '~/stores/leagueManagement';
import type { TLocalLeagueData, TNewChildSeason, TNewSeason, TUserLeagueData } from '~/types';
import { RawLeagueData } from '~/utils/leagueUtils';

const prop = withDefaults(defineProps<{ showChildSeason?: boolean }>(), { showChildSeason: false });

const router = useRouter();
const league = leagueManagement();
const leagueSeason = $ref(!prop.showChildSeason);
const childSeason = $ref(prop.showChildSeason);
const selectedChilds = $ref([]);
const leaguesData: TUserLeagueData[] = (JSON.parse(RawLeagueData.value) as TLocalLeagueData).value!;
const selectedLeagueChild = computed(
    () => leaguesData.find((child) => child.leagueId === league.getLeagueLocalConfig?.league.leagueId)?.childLeagues
);

onBeforeMount(async () => {
    if (league.getLeagueLocalConfig?.league.leagueId === 0 || !league.getLeagueLocalConfig) {
        notifications().warning('Please select a league to continue!');
        await router.push({ name: 'League Selector' });
    }
    if (childSeason && league.getLeagueLocalConfig?.child.id === 0) {
        notifications().warning('Please select a child league to continue!');
        await router.push({ name: 'League Selector' });
    }
});

watch(childSeason, async (now) => {
    if (now && league.getLeagueLocalConfig?.child.id === 0) {
        notifications().warning('Please select a child league to continue!');
        await router.push({ name: 'League Selector' });
    }
});

async function registerSeason() {
    const form: HTMLFormElement | null = document.querySelector('#season');
    const formData = new FormData(form!);
    if (moment(new Date(formData.get('start-date') as string)).isBefore(new Date())) return notifications().error('Start date is in past');
    else if (moment(new Date(formData.get('end-date') as string)).isBefore(new Date())) return notifications().error('End date is in past');
    else if (moment(new Date(formData.get('end-date') as string)).diff(new Date(formData.get('start-date') as string), 'days') <= 13)
        return notifications().error('Season duration must be 2 weeks or grater than it');

    if (leagueSeason) {
        const newSeasonData: TNewSeason = {
            leagueId: league.getLeagueLocalConfig?.league.leagueId ?? 0,
            startTime: formData.get('start-date') as string,
            endTime: formData.get('end-date') as string,
            childData: selectedChilds
        };
        await league.newSeason(newSeasonData);
    } else {
        const childSeasonData: TNewChildSeason = {
            leagueId: league.getLeagueLocalConfig?.league.leagueId ?? 0,
            childLeagueId: league.getLeagueLocalConfig?.child.id ?? 0,
            startTime: formData.get('start-date') as string,
            endTime: formData.get('end-date') as string
        };
        await league.newChildSeason(childSeasonData);
    }
}
</script>

<style scoped>
.tab-item {
    @apply w-full rounded border border-transparent p-2 font-bold text-white shadow-md
	hover:bg-main-textLight-560 hover:shadow-xl
	dark:hover:bg-main-textDark-560;
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
