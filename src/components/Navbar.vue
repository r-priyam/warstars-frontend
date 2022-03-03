<template>
    <PopUp
        title="Log Out"
        :description="`Are you sure to logout?`"
        :open="showPopUp"
        @close-pop-up="() => (showPopUp = false)"
        @confirmation="() => (user.logOut(), (showPopUp = false))" />
    <header class="sticky top-0 z-40 border-b-2 border-main-light-600 bg-main-light-500 dark:border-main-dark-460 dark:bg-main-dark-500">
        <Popover class="sticky top-0">
            <div class="mx-auto max-w-7xl px-2 sm:px-6">
                <!-- padding to maintain navbar height -->
                <div class="flex items-center justify-between border-gray-100 py-2.5 md:justify-start md:py-1">
                    <div class="flex justify-start text-3xl font-bold lg:w-0 lg:flex-1">
                        <router-link to="/">
                            <span class="text-main-dark-500 dark:text-white">War</span>
                            <span class="text-main-textDark-600 dark:text-main-textLight-530">Stars</span>
                        </router-link>
                    </div>
                    <div class="-my-2 -mr-2 md:hidden">
                        <Menu v-if="user.loggedIn" as="div" class="inline-flex items-center justify-center p-2">
                            <div>
                                <MenuButton class="flex rounded-full text-sm">
                                    <img
                                        class="h-6 w-6 rounded-full"
                                        :src="`https://cdn.discordapp.com/avatars/${user.userData.discordId}/${user.userData.avatar}.png?size=1024`" />
                                </MenuButton>
                            </div>
                            <transition
                                enter-active-class="transition duration-100 ease-out"
                                enter-from-class="transform scale-95 opacity-0"
                                enter-to-class="transform scale-100 opacity-100"
                                leave-active-class="transition duration-75 ease-in"
                                leave-from-class="transform scale-100 opacity-100"
                                leave-to-class="transform scale-95 opacity-0">
                                <MenuItems
                                    class="absolute mt-32 w-48 origin-top-right rounded-md bg-main-light-500 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-main-dark-500">
                                    <MenuItem v-slot="{ active }">
                                        <router-link
                                            to="/dashboard"
                                            :class="[
                                                active ? 'hover:bg-main-light-560 dark:hover:bg-main-dark-560' : '',
                                                'group flex items-center rounded-md px-4 py-2 text-sm font-semibold text-main-textDark-600 dark:text-main-textLight-530'
                                            ]"
                                            ><IconHelper icon="ic:sharp-dashboard" icon-style="mr-1" />Dashboard</router-link
                                        >
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                        <button
                                            :class="[
                                                active ? 'hover:bg-main-light-560 dark:hover:bg-main-dark-560' : '',
                                                'group flex w-full items-center rounded-md px-4 py-2 text-sm font-semibold text-main-textDark-600 dark:text-main-textLight-530'
                                            ]"
                                            @click="showPopUp = true">
                                            <IconHelper icon="bx:bx-log-out" icon-style="mr-1" />Log out
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                        <button
                            class="inline-flex items-center justify-center rounded-md p-2 hover:bg-main-light-560 focus:outline-none dark:hover:bg-main-dark-560"
                            :aria-label="`Switch to ${isDarkMode ? 'light theme' : 'dark theme'}`"
                            @click="toggleDarkMode()">
                            <transition
                                enter-active-class="transition transform duration-[0.15s] ease-linear"
                                leave-active-class="transition transform duration-[0.15s] ease-linear"
                                enter-from-class="-translate-y-full tranform"
                                enter-to-class="transform translate-y-0"
                                leave-from-class="transform translate-y-0"
                                leave-to-class="transform translate-y-full"
                                mode="out-in">
                                <IconHelper
                                    v-if="!isDarkMode"
                                    icon="heroicons-outline:sun"
                                    icon-style="h-6 w-6 fill-current text-main-textDark-600 dark:text-main-textLight-530" />
                                <IconHelper
                                    v-else
                                    icon="heroicons-outline:moon"
                                    icon-style="h-6 w-6 fill-current text-main-textDark-600 dark:text-main-textLight-530" />
                            </transition>
                        </button>
                        <PopoverButton
                            class="navbar-open-menu text-gray-800 hover:bg-main-light-560 dark:text-gray-100 dark:hover:bg-main-dark-560">
                            <span class="sr-only">Open menu</span>
                            <IconHelper
                                icon="heroicons-outline:menu"
                                icon-style="h-6 w-6 text-main-textDark-600 dark:text-main-textLight-530" />
                        </PopoverButton>
                    </div>
                    <PopoverGroup as="nav" class="hidden space-x-2 md:flex">
                        <router-link to="/" class="navbar-item">
                            <IconHelper icon="heroicons-outline:home" icon-style="mr-1 h-5 w-5" />
                            <span>Home</span>
                        </router-link>
                        <router-link to="/clans" class="navbar-item">
                            <IconHelper icon="heroicons-outline:shield-check" icon-style="mr-1 h-5 w-5" />
                            <span>Clans</span>
                        </router-link>
                        <router-link to="/leagues" class="navbar-item">
                            <IconHelper icon="heroicons-outline:globe" icon-style="mr-1 h-5 w-5" />
                            <span>Leagues</span>
                        </router-link>
                        <router-link to="/docs" class="navbar-item">
                            <IconHelper icon="heroicons-outline:document-text" icon-style="mr-1 h-5 w-5" />
                            <span>Docs</span>
                        </router-link>
                    </PopoverGroup>
                    <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        <button
                            class="inline-flex items-center justify-center rounded-md p-2 transition duration-500 ease-in-out hover:bg-main-light-560 hover:text-gray-200 focus:outline-none dark:hover:bg-main-dark-560"
                            :aria-label="`Switch to ${isDarkMode ? 'light theme' : 'dark theme'}`"
                            @click="toggleDarkMode()">
                            <transition
                                enter-active-class="transition transform duration-[0.15s] ease-linear"
                                leave-active-class="transition transform duration-[0.15s] ease-linear"
                                enter-from-class="-translate-y-full tranform"
                                enter-to-class="transform translate-y-0"
                                leave-from-class="transform translate-y-0"
                                leave-to-class="transform translate-y-full"
                                mode="out-in">
                                <IconHelper
                                    v-if="!isDarkMode"
                                    icon="heroicons-outline:sun"
                                    icon-style="h-6 w-6 fill-current text-main-textDark-600 dark:text-main-textLight-530" />
                                <IconHelper
                                    v-else
                                    icon="heroicons-outline:moon"
                                    icon-style="h-6 w-6 fill-current text-main-textDark-600 dark:text-main-textLight-530" />
                            </transition>
                        </button>
                        <a
                            v-if="!user.loggedIn"
                            class="ml-2 inline-flex items-center rounded-md bg-main-light-560 px-4 py-2 text-base font-semibold text-main-textDark-600 hover:bg-main-light-660 focus:outline-none focus-visible:ring-1 focus-visible:ring-white dark:bg-main-dark-560 dark:text-main-textLight-530 dark:hover:bg-main-dark-660"
                            :href="`${apiUrl}/discord/login`">
                            <IconHelper icon="mdi:discord" icon-style="mr-1 h-5 w-5" />
                            <span>Login</span>
                        </a>
                        <Menu v-if="user.loggedIn" as="div" class="relative ml-3">
                            <div>
                                <MenuButton class="flex rounded-full text-sm">
                                    <span class="sr-only">Open user menu</span>
                                    <img
                                        class="h-9 w-9 rounded-full"
                                        :src="`https://cdn.discordapp.com/avatars/${user.userData.discordId}/${user.userData.avatar}.png?size=1024`" />
                                    <IconHelper
                                        icon="heroicons-solid:chevron-down"
                                        icon-style="ml-1 mt-2.5 h-5 w-5 text-main-textDark-600 hover:text-violet-100 dark:text-main-textLight-530" />
                                </MenuButton>
                            </div>
                            <transition
                                enter-active-class="transition duration-100 ease-out"
                                enter-from-class="transform scale-95 opacity-0"
                                enter-to-class="transform scale-100 opacity-100"
                                leave-active-class="transition duration-75 ease-in"
                                leave-from-class="transform scale-100 opacity-100"
                                leave-to-class="transform scale-95 opacity-0">
                                <MenuItems
                                    class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-main-light-500 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-main-dark-500">
                                    <MenuItem v-slot="{ active }">
                                        <router-link
                                            to="/dashboard"
                                            :class="[
                                                active ? 'hover:bg-main-light-560 dark:hover:bg-main-dark-560' : '',
                                                'group flex items-center rounded-md px-4 py-2 text-sm font-semibold text-main-textDark-600 dark:text-main-textLight-530'
                                            ]"
                                            ><IconHelper icon="ic:sharp-dashboard" icon-style="mr-1" />Dashboard</router-link
                                        >
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                        <button
                                            :class="[
                                                active ? 'hover:bg-main-light-560 dark:hover:bg-main-dark-560' : '',
                                                'group flex w-full items-center rounded-md px-4 py-2 text-sm font-semibold text-main-textDark-600 dark:text-main-textLight-530'
                                            ]"
                                            @click="showPopUp = true">
                                            <IconHelper icon="bx:bx-log-out" icon-style="mr-1" />Log out
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </div>

            <transition
                enter-active-class="duration-200 ease-out"
                enter-from-class="scale-95 opacity-0"
                enter-to-class="scale-100 opacity-100"
                leave-active-class="duration-100 ease-in"
                leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0">
                <PopoverPanel
                    v-slot="{ close }"
                    focus
                    class="max-w-screen absolute inset-x-0 top-0 left-1/2 z-20 w-screen origin-top-right -translate-x-1/2 transform rounded-md transition sm:px-0 md:hidden">
                    <div class="divide-y-2 divide-gray-200 rounded-lg bg-main-light-500 shadow-2xl dark:bg-main-dark-500">
                        <div class="px-5 pt-5 pb-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <!-- <img class="w-auto h-12" src="../assets/favicon.svg" alt="LeagueStats" /> -->
                                </div>
                                <div class="-mr-2">
                                    <PopoverButton
                                        class="inline-flex items-center justify-center rounded-md p-2 hover:bg-main-light-560 focus:outline-none dark:hover:bg-main-dark-560">
                                        <span class="sr-only">Close menu</span>
                                        <IconHelper
                                            icon="heroicons-outline:x"
                                            icon-style="h-6 w-6 text-main-textDark-600 dark:text-main-textLight-530" />
                                    </PopoverButton>
                                </div>
                            </div>

                            <div class="mt-6">
                                <nav class="grid gap-y-8">
                                    <router-link to="/" class="navbar-mobile-item" @click="close()">
                                        <IconHelper icon="heroicons-outline:home" icon-style="h-5 w-5" />
                                        <span class="navbar-mobile-item-name">Home</span>
                                    </router-link>

                                    <router-link to="/clans" class="navbar-mobile-item" @click="close()">
                                        <IconHelper icon="heroicons-outline:shield-check" icon-style="h-5 w-5" />
                                        <span class="navbar-mobile-item-name">Clans</span>
                                    </router-link>

                                    <router-link to="/league" class="navbar-mobile-item" @click="close()">
                                        <IconHelper icon="heroicons-outline:globe" icon-style="h-5 w-5" />
                                        <span class="navbar-mobile-item-name">Leagues</span>
                                    </router-link>

                                    <router-link to="/docs" class="navbar-mobile-item" @click="close()">
                                        <IconHelper icon="heroicons-outline:document-text" icon-style="h-5 w-5" />
                                        <span class="navbar-mobile-item-name">Documentation</span>
                                    </router-link>
                                </nav>
                            </div>
                        </div>

                        <div class="space-y-6 px-5 py-6">
                            <div>
                                <a
                                    v-if="!user.loggedIn"
                                    :href="`${apiUrl}/discord/login`"
                                    class="flex w-full items-center justify-center rounded-md border border-transparent bg-main-textDark-560 px-4 py-2 text-base font-medium text-gray-200 shadow-sm hover:bg-main-textLight-560 dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560"
                                    @click="close()">
                                    <IconHelper icon="mdi:discord" icon-style="mr-1 h-5 w-5" />Login with Discord
                                </a>
                            </div>
                        </div>
                    </div>
                </PopoverPanel>
            </transition>
        </Popover>
    </header>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue';
import { userStore } from '~/stores/user';
import { apiUrl } from '~/env';
import { isDarkMode, toggleDarkMode } from '~/utils/darkMode';
import PopUp from '~/pages/dashboard/utils/ConfirmationPopup.vue';

const user = userStore();
const showPopUp = $ref(false);
</script>
