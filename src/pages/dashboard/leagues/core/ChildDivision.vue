<template>
    <div v-for="(child, index) in childData" :key="index">
        <h1 v-if="child.divisions.length > 0" class="mt-6 text-center text-3xl font-bold text-green-700 dark:text-green-500 md:text-3xl">
            {{ child.name }}
        </h1>
        <div v-for="(division, dIndex) in child.divisions" :key="dIndex" class="-mt-2 flex flex-col p-8">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden rounded-t-lg">
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
                                        Abbreviation
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-4 text-sm font-semibold leading-tight text-main-textDark-500 dark:text-main-textLight-500"
                                    >
                                        Clans
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-gray-600 bg-main-light-330 dark:border-gray-400 dark:bg-main-dark-530">
                                    <td
                                        class="whitespace-nowrap px-6 py-4 text-sm font-medium text-main-textDark-500 dark:text-main-textLight-500"
                                    >
                                        {{ division.name }}
                                    </td>
                                    <td
                                        class="whitespace-nowrap px-6 py-4 text-sm font-normal text-main-textDark-500 dark:text-main-textLight-500"
                                    >
                                        {{ division.abbreviation }}
                                    </td>
                                    <td
                                        class="whitespace-nowrap px-6 py-4 text-sm font-normal text-main-textDark-500 dark:text-main-textLight-500"
                                    >
                                        {{ division.clansCount }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="divisionsData.length === 0">
        <h1 class="text-center text-6xl font-bold text-main-fail-650 dark:text-main-fail-400">Oops!</h1>
        <h1 class="mt-6 text-center text-xl font-semibold text-main-fail-550 dark:text-main-fail-300">Child Leagues Has No Division</h1>
        <div class="mt-2 flex flex-nowrap justify-center">
            <button
                class="mt-4 rounded-lg bg-main-fail-450 px-4 py-2 text-base font-semibold text-gray-100 shadow-md hover:bg-main-fail-500 focus:outline-none dark:bg-main-fail-500 dark:hover:bg-main-fail-600"
                @click="router.push({ name: 'Add Child Division' })"
            >
                Add Child Division
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TUserChildLeague, TUserChildLeagueDivisions } from '~/types';
withDefaults(defineProps<{ divisionsData: TUserChildLeagueDivisions[]; childData: TUserChildLeague[] }>(), {
    divisionsData: Array,
    childData: Array
});

const router = useRouter();
</script>
