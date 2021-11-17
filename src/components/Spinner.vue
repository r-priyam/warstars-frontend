<template>
	<div>
		<div class="relative inset-0 loading-height overflow-hidden flex flex-col items-center justify-center">
			<div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-12 w-12 mb-4"></div>
			<h2 class="text-center text-main-textDark-600 dark:text-main-textLight-530 text-xl font-bold">Loading...</h2>
			<p class="text-center font-semibold text-gray-800 dark:text-gray-300">
				This may take a few seconds, please don't close this page.
			</p>
		</div>
	</div>
</template>

<script lang="ts">
export default defineComponent({ name: 'LoadingSpinner' });
</script>

<style scoped>
.loading-height {
	height: calc(100vh - 8.8rem);
}
.loader {
	border-top-color: #0b3a59;
	-webkit-animation: spinner 1.5s linear infinite;
	animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spinner {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
