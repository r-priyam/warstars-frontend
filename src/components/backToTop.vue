<template>
	<div class="fixed bottom-0 right-0 pb-4">
		<div class="px-6 lg:px-8">
			<button
				class="
					p-2
					leading-3
					text-gray-200
					rounded-md
					bg-main-primary-630
					hover:bg-main-primary-660 hover:text-white
					focus:outline-none
					focus-visible:ring-1 focus-visible:ring-gray-200
				"
				@click="scrollTo()"
			>
				<heroicons-outline-arrow-narrow-up class="w-6 h-6" />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const scrollTo = () => document.getElementById('container')?.scrollTo({ top: 0, behavior: 'smooth' });
</script>
