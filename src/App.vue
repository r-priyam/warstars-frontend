<template>
	<div v-if="showBetaNotice" class="bg-main-light-560 dark:bg-main-dark-560">
		<div class="px-2 py-1 mx-auto max-w-7xl sm:px-6 lg:px-6">
			<div class="flex flex-wrap items-center justify-between">
				<div class="flex items-center flex-1 w-0">
					<span class="flex p-2 rounded-lg bg-main-light-500 dark:bg-main-dark-500">
						<heroicons-outline:speakerphone class="w-6 h-6 text-red-500" aria-hidden="true" />
					</span>
					<p class="ml-3 font-medium text-red-500 truncate">
						<span class="md:hidden">Site is under active development</span>
						<span class="hidden text-red-500 md:inline">
							Site is under heavy development and it doesn't represent the final version. Thank you!
						</span>
					</p>
				</div>
				<div class="flex-shrink-0 order-2 sm:order-3 sm:ml-3">
					<button
						type="button"
						class="flex p-2 -mr-1 rounded-md hover:bg-main-light-500 dark:hover:bg-main-dark-500 focus:outline-none sm:-mr-2"
						@click="setBetaNoticeValue()"
					>
						<span class="sr-only">Dismiss</span>
						<heroicons-outline:x class="w-6 h-6 text-red-500" aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="grid min-h-[calc(100vh-57.98px)] grid-layout">
		<Navbar />
		<div id="container" class="grid grid-layout-container">
			<div class="bg-main-light-600 dark:bg-main-dark-630">
				<div
					v-if="!router.currentRoute.value.path.includes('/dashboard')"
					class="max-w-6xl min-h-full mx-auto bg-main-light-560 dark:bg-main-dark-560"
				>
					<router-view />
				</div>
				<div
					v-if="router.currentRoute.value.path.includes('/dashboard')"
					class="max-w-6xl mx-auto bg-main-light-560 dark:bg-main-dark-560"
				>
					<router-view />
				</div>
				<Footer v-if="!router.currentRoute.value.path.includes('/dashboard')" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';
import router from '~/router';

const showBetaNotice = ref(false);
const setBetaNoticeValue = () => {
	localStorage.setItem('beta-warning', 'false');
	showBetaNotice.value = false;
};
onMounted(() => {
	if (localStorage.getItem('beta-warning') !== 'false') {
		showBetaNotice.value = true;
	}
});
</script>

<style>
.grid-layout {
	grid-template-rows: auto 1fr;
}
.grid-layout-container {
	grid-template-rows: 1fr auto;
}
</style>
