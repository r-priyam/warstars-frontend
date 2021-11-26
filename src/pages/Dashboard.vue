<template>
	<div class="fixed bottom-0 left-0 right-0 z-20 flex items-start justify-end p-6 px-0 py-6 pointer-events-none top-10">
		<div class="w-full max-w-sm">
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
					class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden rounded-lg shadow-md bg-main-light-500 dark:bg-main-dark-500 lg:rounded-none"
				>
					<div class="px-4 py-2 -mx-3">
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
	<div>
		<div class="fixed z-20 flex flex-shrink-0 lg:hidden">
			<button
				class="inline-flex items-center p-2 text-base font-semibold rounded-br-md bg-main-light-630 dark:bg-main-dark-660 hover:bg-main-light-660 dark:hover:bg-main-dark-600"
				@click="sidebarOpen = true"
			>
				<span class="sr-only">Open sidebar</span>
				<heroicons-outline:menu-alt-1
					class="w-6 h-6 text-main-textDark-600 dark:text-main-textLight-530"
					aria-hidden="true"
				/>
			</button>
		</div>
		<div class="flex overflow-hidden scrolling-touch sidebar-height bg-main-light-600 dark:bg-main-dark-630">
			<!-- Static sidebar for desktop -->
			<div class="hidden lg:flex lg:flex-shrink-0">
				<div
					class="relative flex flex-col flex-grow w-64 pt-5 pb-4 overflow-y-auto border-r shadow-inner bg-main-light-600 custom-scroll dark:bg-main-dark-560"
				>
					<DashboardSidebar />
				</div>
			</div>
			<!-- Sidebar for mobile -->
			<TransitionRoot as="template" :show="sidebarOpen">
				<Dialog
					static
					class="fixed bottom-0 left-0 right-0 z-50 flex top-16 lg:hidden"
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
							class="relative flex flex-col flex-1 w-full max-w-xs border-r shadow-inner bg-main-light-600 dark:bg-main-dark-630"
						>
							<div ref="sidebarElement" class="pt-5 pb-4 overflow-hidden overflow-y-auto custom-scroll">
								<DashboardSidebar @close-sidebar="handleSidebarEvent" />
							</div>
						</div>
					</TransitionChild>
					<div class="flex-shrink-0 w-14" aria-hidden="true">
						<!-- Dummy element to force sidebar to shrink to fit close icon -->
					</div>
				</Dialog>
			</TransitionRoot>

			<div class="flex-1 overflow-y-auto bg-main-light-560 dark:bg-main-dark-560 focus:outline-none custom-scroll">
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
	height: calc(100vh - 3.99rem);
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
