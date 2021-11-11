<template>
	<div class="grid min-h-[calc(100vh-68px)] grid-layout">
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
</script>

<style>
.grid-layout {
	grid-template-rows: auto 1fr;
}
.grid-layout-container {
	grid-template-rows: 1fr auto;
}
</style>
