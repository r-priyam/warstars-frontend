<template>
    <div v-if="childData.length > 0" class="grid grid-cols-1 gap-5 p-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        <div
            v-for="childLeague in childData"
            :key="childLeague.leagueId"
            class="overflow-hidden rounded bg-main-light-530 shadow-lg dark:bg-main-dark-660"
        >
            <div class="flex items-center justify-center">
                <img
                    class="mt-1 h-36 w-36 rounded-full border-2 border-white border-opacity-80 p-1"
                    :src="childLeague.iconUrl"
                    :alt="childLeague.name"
                />
            </div>
            <div class="px-6 py-4">
                <div class="mb-2 text-center text-2xl font-extrabold text-green-600 dark:text-green-500">
                    {{ childLeague.name }}
                </div>
                <p class="item-name">
                    Abbreviation
                    <mdi:arrow-right-thin class="mb-0.5 inline-flex h-4 w-4" aria-hidden="true" />
                    <span class="item-data">{{ childLeague.abbreviation }}</span>
                </p>
                <p class="item-name">
                    Clans
                    <mdi:arrow-right-thin class="mb-0.5 inline-flex h-4 w-4" aria-hidden="true" />
                    <span class="item-data">{{ childLeague.clansCount }}</span>
                </p>
                <p class="item-name">
                    Season
                    <mdi:arrow-right-thin class="mb-0.5 inline-flex h-4 w-4" aria-hidden="true" />
                    <span class="item-data">{{ childLeague.specificId || 0 }}</span>
                </p>
                <p class="item-name">
                    Start Date
                    <mdi:arrow-right-thin class="mb-0.5 inline-flex h-4 w-4" aria-hidden="true" />
                    <span class="item-data">{{
                        childLeague.startTime !== null ? moment(childLeague.startTime).format('MMM DD, YYYY') : '--:--:----'
                    }}</span>
                </p>
                <p class="item-name">
                    End Date
                    <mdi:arrow-right-thin class="mb-0.5 inline-flex h-4 w-4" aria-hidden="true" />
                    <span class="item-data">{{
                        childLeague.endTime !== null ? moment(childLeague.endTime).format('MMM DD, YYYY') : '--:--:----'
                    }}</span>
                </p>
            </div>
        </div>
    </div>
    <div v-else>
        <h1 class="text-center text-6xl font-bold text-main-fail-650 dark:text-main-fail-400">Oops!</h1>
        <h1 class="mt-6 text-center text-xl font-semibold text-main-fail-550 dark:text-main-fail-300">No Child League Registered</h1>
        <div class="mt-2 flex flex-nowrap justify-center">
            <button
                class="mt-4 rounded-lg bg-main-fail-450 px-4 py-2 text-base font-semibold text-gray-100 shadow-md hover:bg-main-fail-500 focus:outline-none dark:bg-main-fail-500 dark:hover:bg-main-fail-600"
                @click="router.push({ name: 'Add Child League' })"
            >
                Add Child League
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import type { TUserChildLeague } from '~/types';
withDefaults(defineProps<{ childData: TUserChildLeague[] }>(), { childData: Array });

const router = useRouter();
</script>

<style scoped>
.item-name {
    @apply text-base font-bold leading-7 text-main-textDark-500 dark:text-main-textLight-500;
}

.item-data {
    @apply ml-1 text-sm font-medium text-gray-800 dark:text-gray-200;
}
</style>
