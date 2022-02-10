<template>
    <div>
        <div class="fixed z-20 flex shrink-0 lg:hidden">
            <button
                class="inline-flex items-center rounded-br-md bg-main-light-600 p-2 text-base font-semibold hover:bg-main-light-630 dark:bg-main-dark-660 dark:hover:bg-main-dark-600"
                @click="sidebarOpen = true"
            >
                <span class="sr-only">Open sidebar</span>
                <IconHelper icon="heroicons-outline:menu-alt-1" icon-style="h-6 w-6 text-main-textDark-600 dark:text-main-textLight-530" />
            </button>
        </div>
        <div class="scrolling-touch sidebar-height flex overflow-hidden bg-main-light-600 dark:bg-main-dark-630">
            <!-- Static sidebar for desktop -->
            <div class="hidden lg:flex lg:shrink-0">
                <div
                    class="custom-scroll relative flex w-64 flex-grow flex-col overflow-y-auto border-r bg-main-light-530 pt-5 pb-4 shadow-inner dark:bg-main-dark-530"
                >
                    <DashboardSidebar />
                </div>
            </div>
            <!-- Sidebar for mobile -->
            <TransitionRoot as="template" :show="sidebarOpen">
                <Dialog
                    static
                    class="fixed bottom-0 left-0 right-0 top-14 z-50 flex lg:hidden"
                    :open="sidebarOpen"
                    @close="sidebarOpen = false"
                >
                    <TransitionChild
                        as="template"
                        enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full"
                        enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leave-from="translate-x-0"
                        leave-to="-translate-x-full"
                    >
                        <div
                            class="relative flex w-full max-w-xs flex-1 flex-col border-r bg-main-light-530 shadow-inner dark:bg-main-dark-530"
                        >
                            <div ref="sidebarElement" class="custom-scroll overflow-hidden overflow-y-auto pt-5 pb-4">
                                <DashboardSidebar @close-sidebar="handleSidebarEvent" />
                            </div>
                        </div>
                    </TransitionChild>
                    <div class="w-14 shrink-0" aria-hidden="true">
                        <!-- Dummy element to force sidebar to shrink to fit close icon -->
                    </div>
                </Dialog>
            </TransitionRoot>

            <div class="router-view-height custom-scroll flex-1 overflow-y-auto bg-main-light-560 focus:outline-none dark:bg-main-dark-560">
                <div class="flex justify-end">
                    <div class="pointer-events-none absolute top-10 z-20 overflow-hidden p-6 px-0 py-4">
                        <div class="w-72">
                            <transition-group
                                :enter-active-class="
                                    notification.notifications.length > 1
                                        ? 'transform ease-out duration-300 transition delay-300'
                                        : 'transform ease-out duration-300 transition'
                                "
                                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
                                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                                leave-active-class="transition duration-500 ease-in"
                                leave-from-class="opacity-100"
                                leave-to-class="opacity-0"
                                move-class="transition duration-500"
                            >
                                <div
                                    v-for="noti in notification.notifications"
                                    :key="noti.id"
                                    class="mx-auto mt-2 flex w-full max-w-sm overflow-hidden rounded-lg bg-main-light-500 shadow-md dark:bg-main-dark-500"
                                >
                                    <div class="-mx-3 px-4 py-2">
                                        <div class="mx-3">
                                            <span :class="`${notificationColor(noti.title)} font-semibold`">
                                                {{ noti.title }}
                                            </span>
                                            <p class="text-sm text-gray-800 dark:text-gray-100">{{ noti.text }}</p>
                                        </div>
                                    </div>
                                </div>
                            </transition-group>
                        </div>
                    </div>
                </div>
                <main class="relative z-0 flex-1 pb-8">
                    <div class="mt-11 lg:mt-0">
                        <router-view />
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Dialog, TransitionChild, TransitionRoot } from '@headlessui/vue';
import DashboardSidebar from '~/components/SideBar.vue';
import { notifications } from '~/stores/notifications';
const notification = notifications();

const sidebarElement = ref(null);
const sidebarOpen = ref(false);
const handleSidebarEvent = (eventPayload: boolean) => (sidebarOpen.value = eventPayload);
onClickOutside(sidebarElement, () => (sidebarOpen.value = false));

// Just pass the whole class as it's causing some problem in rendering
const notificationColor = (type: string) => {
    switch (type) {
        case 'Info':
            return 'text-blue-500';
        case 'Warning':
            return 'text-yellow-500';
        case 'Error':
            return 'text-red-500';
        case 'Success':
            return 'text-green-500';
    }
};
</script>

<style>
.sidebar-height {
    height: calc(100vh - 3.64rem);
}

.router-view-height {
    height: calc(100vh - 1.68rem);
}
.custom-scroll {
    scrollbar-width: thin;
    scrollbar-color: theme('colors.main.textDark.460') #1d1d1d;
}

.custom-scroll::-webkit-scrollbar {
    height: 8px;
    width: 8px;
}

.custom-scroll::-webkit-scrollbar-thumb {
    background: theme('colors.main.textDark.460');
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
    background: theme('colors.main.textDark.430');
}

.custom-scroll::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.07);
}

#container.custom-scroll::-webkit-scrollbar-track {
    background: #ffffff;
}

.dark #container.custom-scroll::-webkit-scrollbar-track {
    background: #1d1d1d;
}
</style>
