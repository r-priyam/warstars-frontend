<template>
	<button
		v-if="!processing"
		class="py-2 mt-10 font-bold text-white transition duration-200 border border-transparent rounded shadow-md bg-main-textDark-560 hover:bg-main-textLight-560 dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560 hover:shadow-xl"
		type="submit"
	>
		Proceed
	</button>
	<button
		v-else
		class="inline-flex items-center justify-center py-2 font-bold text-center text-white mt-10 border border-transparent rounded cursor-not-allowed bg-main-textLight-560 dark:bg-main-textDark-560"
		disabled
	>
		<svg
			class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
		Processing
	</button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ processing: boolean }>(), {
	processing: false,
});
</script>
