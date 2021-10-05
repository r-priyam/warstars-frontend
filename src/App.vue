<template>
	<div class="min-h-full grid grid-layout">
		<Navbar />
		<div id="container" class="grid grid-layout-container lg:custom-scroll">
			<div class="bg-gray-200 dark:bg-main-primary-800">
				<router-view />
			</div>
			<Footer />
		</div>
	</div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';
</script>

<style>
.grid-layout {
	grid-template-rows: auto 1fr;
}
.grid-layout-container {
	grid-template-rows: 1fr auto;
}
</style>
