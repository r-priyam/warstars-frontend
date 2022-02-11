<template>
    <div>
        <div class="flex shrink-0 items-center px-4">
            <img
                class="h-12 w-12 rounded-lg"
                :src="`https://cdn.discordapp.com/avatars/${user.userData.discordId}/${user.userData.avatar}.png?size=1024`" />
            <div class="overflow-hidden pl-2 text-base">
                <h3 class="truncate font-black leading-tight text-main-textDark-600 dark:text-main-textLight-530">
                    {{ user.userData.username }}
                </h3>
            </div>
            <div
                class="mb-8 ml-auto inline-flex items-end justify-end rounded-md bg-main-light-560 p-2 hover:bg-main-light-600 focus:outline-none dark:bg-main-dark-560 dark:hover:bg-main-dark-600 lg:hidden"
                @click="$emit('closeSidebar', false)">
                <span class="sr-only">Close menu</span>
                <IconHelper icon="heroicons-outline:x" icon-style="h-6 w-6 text-main-textDark-600 dark:text-main-textLight-530" />
            </div>
        </div>

        <div v-if="league.getLeagueLocalConfig !== null" class="mt-4 items-center px-4">
            <h1 class="text-base font-extrabold text-main-textDark-600 dark:text-main-textLight-530">Current League</h1>
            <div v-if="league.getLeagueLocalConfig.league.name === ''">
                <h3 class="truncate text-center font-bold leading-tight text-red-700 dark:text-red-500">No League Selected</h3>
            </div>
            <div v-else class="mt-2 flex shrink-0 items-center">
                <img class="h-12 w-12 rounded-lg" :src="league.getLeagueLocalConfig.league.iconUrl" />
                <div class="overflow-hidden pl-2 text-base">
                    <h3 class="truncate font-bold leading-tight text-red-700 dark:text-red-500">
                        {{ league.getLeagueLocalConfig.league.name }}
                    </h3>
                </div>
            </div>
            <div v-if="league.getLeagueLocalConfig.child.name === ''">
                <h3 class="truncate text-center font-bold leading-tight text-green-700 dark:text-green-500">No Child League</h3>
            </div>
            <div v-if="league.getLeagueLocalConfig.child.iconUrl !== ''" class="mt-2 flex shrink-0 items-center">
                <img class="h-12 w-12 rounded-lg" :src="league.getLeagueLocalConfig.child.iconUrl" />
                <div class="overflow-hidden pl-2 text-base">
                    <h3 class="truncate font-bold leading-tight text-green-700 dark:text-green-500">
                        {{ `${league.getLeagueLocalConfig.child.name} (${league.getLeagueLocalConfig.division.name || 'No Division'})` }}
                    </h3>
                </div>
            </div>
            <div class="mt-2 flex shrink-0 justify-center">
                <router-link
                    to="/dashboard/league-selector"
                    class="rounded bg-main-textDark-560 p-1 text-sm font-bold text-white hover:bg-main-textLight-560 dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560"
                    @click="$emit('closeSidebar', false)">
                    Change Config
                </router-link>
            </div>
        </div>

        <nav class="mt-5 flex flex-1 flex-col divide-y divide-gray-300 overflow-y-auto px-3" aria-label="Sidebar">
            <div v-for="(nav, index) in toggleNavigation" :key="index" :class="[index === 0 ? '' : 'mt-3 pt-3']">
                <div>
                    <span v-if="nav.title" class="text-xs font-extrabold uppercase text-main-textDark-700 dark:text-main-textLight-430">
                        {{ nav.title }}
                    </span>
                    <router-link
                        v-for="item in nav.items"
                        :key="item.name"
                        :to="item.href"
                        class="group mt-1 flex items-center rounded-md px-2 py-2 text-sm font-semibold text-main-textDark-600 hover:bg-main-light-560 dark:text-main-textLight-530 dark:hover:bg-main-dark-600"
                        active-class="bg-main-light-600 dark:bg-main-dark-600"
                        @click="$emit('closeSidebar', false)">
                        <IconHelper :icon="item.icon" icon-style="mr-2 h-6 w-6 shrink-0" />
                        {{ item.name }}
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { userStore } from '~/stores/user';
import { leagueManagement } from '~/stores/leagueManagement';

defineEmits(['closeSidebar']);
const user = userStore();
const league = leagueManagement();
const navigation = [
    {
        title: 'Player',
        items: [
            { name: 'Link Player', href: '/dashboard/player-link', icon: 'mdi:account-plus' },
            { name: 'Linked Players', href: '/dashboard/players-linked', icon: 'mdi:account-check' }
        ]
    },
    {
        title: 'Clan',
        items: [
            { name: 'Link Clan', href: '/dashboard/clan-link', icon: 'mdi:account-multiple-plus' },
            { name: 'Linked Clans', href: '/dashboard/clans-linked', icon: 'mdi:account-multiple-check' }
        ]
    },
    {
        title: 'League Registration',
        items: [
            { name: "What's This?", href: '/dashboard/league-register-info', icon: 'mdi:chat-question' },
            { name: 'Register', href: '/dashboard/register-league', icon: 'heroicons-solid:pencil-alt' }
        ]
    },
    {
        title: 'League Core',
        href: '/',
        items: [
            { name: 'Info', href: '/dashboard/league', icon: 'heroicons-solid:information-circle' },
            { name: 'Add Child League', href: '/dashboard/add-league-child', icon: 'mdi:shield-plus' },
            { name: 'Add Child Division', href: '/dashboard/add-child-division', icon: 'mdi:shield-plus-outline' }
        ]
    },
    {
        title: 'League Admin',
        href: '/',
        items: [
            { name: 'Admins Info', href: '/dashboard/league-admin', icon: 'ri:shield-user-fill' },
            { name: 'Manage Admins', href: '/dashboard/league-admin-manage', icon: 'ri:user-settings-fill' }
        ]
    },
    {
        title: 'League Season',
        href: '/',
        items: [
            { name: 'Info', href: '/dashboard/season-info', icon: 'mdi:calendar-star' },
            { name: 'Core', href: '/dashboard/season-core', icon: 'icon-park-outline:manual-gear' },
            { name: 'Clans', href: '/dashboard/season-clans', icon: 'mdi:account-group' },
            { name: 'Add Clans', href: '/dashboard/season-clans-add', icon: 'ic:baseline-group-add' },
            { name: 'Matches', href: '/', icon: 'mdi:sword-cross' },
            { name: 'Results', href: '/', icon: 'mdi:email-newsletter' },
            { name: 'Leaderboard', href: '/', icon: 'ic:baseline-leaderboard' },
            { name: 'Hit Rates', href: '/', icon: 'mdi:fire' }
        ]
    }
];

const toggleNavigation = Object.keys(league.permissions).length === 1 ? navigation.splice(-navigation.length - 3, 3) : navigation;
</script>
