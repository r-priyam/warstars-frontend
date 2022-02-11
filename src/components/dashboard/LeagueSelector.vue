<template>
    <div class="transparent max-w-full p-8 md:p-12">
        <div class="mb-8">
            <h1 class="text-center text-3xl font-bold text-red-700 dark:text-red-500">My Leagues</h1>
        </div>
        <div class="flex-col-1 mt-2 flex shrink-0 items-center justify-center">
            <div v-for="league in leaguesData" :key="league.leagueId" class="flex flex-wrap justify-center">
                <button
                    @click="
                        selectedLeague = {
                            leagueId: league.leagueId,
                            name: league.name,
                            abbreviation: league.abbreviation,
                            seasonId: league.seasonId,
                            iconUrl: league.iconUrl,
                            seasonActive: league.seasonActive
                        };
                        handleLeagueChange();
                    "
                >
                    <img
                        class="m-1 h-24 w-24 grow-0 rounded-full border-2 border-white p-1 text-center"
                        :class="[league.leagueId === selectedLeague?.leagueId ? 'border-red-700 dark:border-red-500' : '']"
                        :src="league.iconUrl"
                        :alt="league.name"
                        :title="league.name"
                    />
                </button>
            </div>
        </div>
        <h1 v-if="selectedLeague.leagueId === 0" class="mt-4 text-center text-base font-medium italic text-red-700 dark:text-red-500">
            Please select a League to get started
        </h1>
        <div v-if="selectedLeague.leagueId > 0">
            <div class="mt-6 mb-6">
                <transition-group
                    enter-active-class="transition duration-300 ease-out transform-gpu"
                    enter-from-class="translate-x-12 opacity-0"
                    enter-to-class="translate-x-0 opacity-100"
                >
                    <h1 v-if="selectedLeagueChild?.length === 0" class="text-center text-xl font-bold text-green-700 dark:text-green-500">
                        {{ selectedLeague.name }} has no child league
                    </h1>
                    <h1 v-else class="text-center text-xl font-bold text-green-700 dark:text-green-500">
                        {{ selectedLeague.name }} Child Leagues
                    </h1>
                    <div v-if="selectedLeagueChild?.length === 0" class="mt-2 flex flex-nowrap justify-center">
                        <router-link to="/dashboard/add-league-child">
                            <button
                                class="rounded-lg bg-green-700 px-4 py-2 text-base font-semibold text-gray-100 shadow-md hover:bg-green-800 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700"
                                @click="applyLeagueConfig()"
                            >
                                Add Child League
                            </button>
                        </router-link>
                    </div>
                </transition-group>
            </div>
            <div class="flex-col-1 mt-2 flex shrink-0 items-center justify-center">
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
                                    iconUrl: childLeague.iconUrl,
                                    seasonId: childLeague.seasonId,
                                    seasonActive: childLeague.seasonActive
                                }
                            "
                        >
                            <img
                                class="m-1 inline-flex h-24 w-24 grow-0 rounded-full border-2 border-white p-1 text-center"
                                :class="[childLeague.id === selectedChildLeague.id ? 'border-green-700 dark:border-green-500' : '']"
                                :src="childLeague.iconUrl"
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
                <h1 class="text-center text-xl font-bold text-indigo-700 dark:text-indigo-500">
                    {{ `${selectedLeague.abbreviation} ${selectedChildLeague.name}` }} has no division
                </h1>
                <h1 class="text-center text-sm italic text-red-700 dark:text-red-500">
                    All the changes will apply to {{ selectedChildLeague.name }} globally.
                </h1>
                <div v-if="selectedChildDivisions?.length === 0" class="mt-2 flex flex-nowrap justify-center">
                    <router-link to="/dashboard/add-child-division">
                        <button
                            class="rounded-lg bg-indigo-700 px-4 py-2 text-base font-semibold text-gray-100 shadow-md hover:bg-indigo-800 focus:outline-none dark:bg-indigo-600 dark:hover:bg-indigo-700"
                            @click="applyLeagueConfig()"
                        >
                            Add Division
                        </button>
                    </router-link>
                </div>
            </div>
            <div v-else class="mt-6 mb-6">
                <h1 class="text-center text-xl font-bold text-indigo-700 dark:text-indigo-500">
                    {{ `${selectedLeague.abbreviation} ${selectedChildLeague.name}` }} Divisions
                </h1>
                <h1 class="text-center text-sm italic text-red-700 dark:text-red-500">
                    If you will not select a division then any changes will apply to whole
                    {{ `${selectedLeague.abbreviation} ${selectedChildLeague.name}` }} globally
                </h1>
            </div>
            <div>
                <div class="mx-auto w-full max-w-md">
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
                                        checked ? 'bg-indigo-500 bg-opacity-75' : 'bg-indigo-400 hover:bg-indigo-500'
                                    ]"
                                    class="relative flex cursor-pointer rounded-lg px-5 py-2 shadow-md focus:outline-none"
                                >
                                    <div class="flex w-full items-center justify-between">
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
                                        <div v-show="checked" class="shrink-0 text-black">
                                            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
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
        <div class="mt-4 flex flex-nowrap justify-center space-x-4">
            <button
                class="inline-flex w-full justify-center rounded-md bg-main-textDark-560 px-4 py-2 text-base font-medium text-gray-100 shadow-sm hover:bg-main-textLight-560 focus:outline-none dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="handleReset()"
            >
                Reset
            </button>
            <button
                class="inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-base font-medium text-gray-100 shadow-sm hover:bg-red-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="applyLeagueConfig()"
            >
                Apply
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import type { TLocalLeagueData, TSelectedChild, TSelectedLeague, TUserChildLeagueDivisions, TUserLeagueData } from '~/types';
import { notifications } from '~/stores/notifications';
import { pushLeagueSaveRoute } from '~/router';
import { leagueManagement } from '~/stores/leagueManagement';
import { RawLeagueData, RawSelectedLeague } from '~/utils/leagueUtils';

const router = useRouter();
const leagueStore = leagueManagement();

// Check if a user is in any league or not. If not redirect back to league info page.
onBeforeMount(async () => {
    if (Object.keys(leagueStore.permissions).length === 1) {
        notifications().info("You aren't in any league.");
        await router.push({ name: 'League Register Info' });
    }
});

const leaguesData: TUserLeagueData[] = (JSON.parse(RawLeagueData.value) as TLocalLeagueData).value!;
const selectedLeague = ref<TSelectedLeague>({
    leagueId: 0,
    name: '',
    abbreviation: '',
    seasonId: null,
    iconUrl: '',
    seasonActive: null
});
const selectedChildLeague = ref<TSelectedChild>({
    id: 0,
    name: '',
    abbreviation: '',
    iconUrl: '',
    seasonId: null,
    seasonActive: null
});
const selectedDivision = ref<TUserChildLeagueDivisions>({
    id: 0,
    childId: 0,
    seasonId: 0,
    name: '',
    abbreviation: '',
    iconUrl: null,
    clansCount: 0
});

const selectedLeagueChild = computed(() => leaguesData.find((league) => league.leagueId === selectedLeague.value.leagueId)?.childLeagues);

const selectedChildDivisions = computed(
    () =>
        leaguesData
            .find((league) => league.leagueId === selectedLeague.value.leagueId)
            ?.childLeagues.find((child) => child.id === selectedChildLeague.value.id)?.divisions
);

const handleReset = () => {
    selectedLeague.value = {
        leagueId: 0,
        name: '',
        abbreviation: '',
        seasonId: null,
        iconUrl: '',
        seasonActive: null
    };
    selectedChildLeague.value = { id: 0, name: '', abbreviation: '', iconUrl: '', seasonId: null, seasonActive: null };
    selectedDivision.value = {
        id: 0,
        childId: 0,
        seasonId: 0,
        name: '',
        abbreviation: '',
        iconUrl: null,
        clansCount: 0
    };
};

const handleLeagueChange = () => {
    selectedChildLeague.value.id = 0;
    selectedChildLeague.value.name = '';
};

const applyLeagueConfig = async () => {
    RawSelectedLeague.value = JSON.stringify({
        league: selectedLeague.value,
        child: selectedChildLeague.value,
        division: selectedDivision.value
    });
    notifications().info('Settings saved successfully!');
    await router.push({ name: pushLeagueSaveRoute.value });
};
</script>
