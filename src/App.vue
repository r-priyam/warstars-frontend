<template>
	<div class="grid min-h-full grid-layout">
		<Navbar />
		<div id="container" class="grid grid-layout-container lg:custom-scroll">
			<div class="transition-colors duration-1000 bg-gray-700 dark:bg-main-primary-700">
				<div
					class="
						max-w-6xl
						min-h-full
						p-1
						mx-auto
						transition-colors
						duration-1000
						bg-gray-500
						shadow-2xl
						dark:bg-main-primary-660
					"
				>
					<router-view />
				</div>
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
