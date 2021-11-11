<template>
	<div>
		<div class="fixed z-20 flex flex-shrink-0 lg:hidden">
			<button
				class="
					inline-flex
					items-center
					p-2
					text-base
					font-semibold
					rounded-br-md
					bg-main-light-630
					dark:bg-main-dark-660
					hover:bg-main-light-660
					dark:hover:bg-main-dark-600
				"
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
					class="
						relative
						flex flex-col flex-grow
						w-64
						pt-5
						pb-4
						overflow-y-auto
						border-r
						shadow-inner
						bg-main-light-560
						custom-scroll
						dark:bg-main-dark-560
					"
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
							class="
								relative
								flex flex-col flex-1
								w-full
								max-w-xs
								border-r
								shadow-inner
								bg-main-light-600
								dark:bg-main-dark-630
							"
						>
							<div ref="sidebarElement" class="pt-5 pb-4 overflow-hidden overflow-y-auto">
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
					<div class="mt-10">
						<router-view />
					</div>
				</main>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import DashboardSidebar from '~/components/SideBar.vue';
import { Dialog, TransitionChild, TransitionRoot } from '@headlessui/vue';

const sidebarElement = ref(null);
const sidebarOpen = ref(false);
const handleSidebarEvent = (eventPayload: boolean) => (sidebarOpen.value = eventPayload);
onClickOutside(sidebarElement, () => (sidebarOpen.value = false));
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
