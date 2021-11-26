<template>
	<div class="px-2 pt-12 pb-6 md:pt-20 md:px-0">
		<div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
			<div class="max-w-md">
				<p class="text-6xl font-extrabold text-center text-main-fail-600 dark:text-main-fail-400">Oops!</p>
				<p class="mt-6 text-xl font-bold text-main-textDark-500 dark:text-main-textLight-500">
					There is no {{ name }} linked for your account. To link a {{ name }} please click on the button below.
				</p>
				<div class="flex justify-center mt-2 flex-nowrap">
					<button
						class="flex-shrink-0 px-4 py-2 mt-6 text-base font-semibold text-white rounded-lg shadow-md bg-main-textDark-560 hover:bg-main-textLight-560 dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560 focus:outline-none"
						type="button"
						@click="router.push('/dashboard/player-link')"
					>
						Link {{ name }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import router from '~/router';

withDefaults(defineProps<{ name?: string }>(), { name: '' });
</script>
