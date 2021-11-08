<template>
	<div>
		<div class="flex min-h-screen overflow-hidden bg-main-light-600 dark:bg-main-dark-630">
			<TransitionRoot as="template" :show="sidebarOpen">
				<Dialog
					as="div"
					static
					class="fixed inset-0 z-50 flex lg:hidden"
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
								<DashboardSidebar />
							</div>
						</div>
					</TransitionChild>
					<div class="flex-shrink-0 w-14" aria-hidden="true">
						<!-- Dummy element to force sidebar to shrink to fit close icon -->
					</div>
				</Dialog>
			</TransitionRoot>

			<!-- Static sidebar for desktop -->
			<div class="hidden max-h-screen lg:flex lg:flex-shrink-0">
				<div class="flex flex-col w-64">
					<div
						class="
							flex flex-col flex-grow
							pt-5
							pb-4
							overflow-y-auto
							border-r
							shadow-inner
							bg-main-light-560
							dark:bg-main-dark-560
						"
					>
						<DashboardSidebar />
					</div>
				</div>
			</div>

			<div class="flex-1 bg-main-light-560 dark:bg-main-dark-560 focus:outline-none">
				<div class="relative flex flex-shrink-0 h-16 border-gray-200 z-1 lg:border-none lg:hidden">
					<button
						class="
							px-4
							text-gray-400
							bg-white
							border-b border-r border-gray-200
							focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200
						"
						@click="sidebarOpen = true"
					>
						<span class="sr-only">Open sidebar</span>
						<heroicons-outline:menu-alt-1 class="w-6 h-6" aria-hidden="true" />
					</button>
				</div>
				<main class="relative z-0 flex-1 min-h-full pb-8">
					<div class="mt-8">
						<router-view />
					</div>
				</main>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import DashboardSidebar from '~/components/SideBar.vue';
import { Dialog, TransitionChild, TransitionRoot } from '@headlessui/vue';

export const sidebarOpen = ref(false);

export default defineComponent({
	name: 'AppDashboard',
	components: {
		Dialog,
		TransitionChild,
		TransitionRoot,
		DashboardSidebar,
	},
	setup() {
		const sidebarElement = ref(null);
		onClickOutside(sidebarElement, () => (sidebarOpen.value = false));
		return {
			sidebarOpen,
			sidebarElement,
		};
	},
});
</script>
