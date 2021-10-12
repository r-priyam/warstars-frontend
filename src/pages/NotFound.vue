<template>
	<div class="px-2 pt-12 pb-6 md:pt-20 md:px-0">
		<div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
			<div class="max-w-md">
				<h3 class="mb-6 font-black text-center text-9xl text-main-fail-650 dark:text-main-fail-400">404</h3>
				<p class="text-5xl font-extrabold text-center text-main-fail-600 dark:text-main-fail-400">Oops!</p>
				<p class="mt-6 text-xl font-bold text-main-textDark-500 dark:text-main-textLight-500">
					The page you requested doesn't exist.
				</p>
				<p class="mt-4 mb-8 font-medium text-main-textDark-600 dark:text-main-textLight-530">
					But dont worry, i can help you with going back from where you came or you can watch this page. Choice is
					yours!
				</p>
				<div class="flex justify-center mt-2 flex-nowrap">
					<button
						class="
							flex-shrink-0
							px-4
							py-2
							text-base
							font-semibold
							text-white
							rounded-lg
							shadow-md
							bg-main-textDark-560
							hover:bg-main-textLight-560
							dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560
							focus:outline-none
						"
						type="button"
						@click="router.go(-1)"
					>
						Go Back
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import router from '~/router';
</script>
