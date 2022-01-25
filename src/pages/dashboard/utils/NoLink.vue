<template>
	<div class="px-2 pt-12 pb-6 md:px-0 md:pt-20">
		<div class="container mx-auto my-8 flex flex-col items-center justify-center px-5">
			<div class="max-w-md">
				<p class="text-center text-6xl font-extrabold text-main-fail-600 dark:text-main-fail-400">Oops!</p>
				<p class="mt-6 text-xl font-bold text-main-textDark-500 dark:text-main-textLight-500">
					There is no {{ name }} linked for your account. To link a {{ name }} please click on the button below.
				</p>
				<div class="mt-2 flex flex-nowrap justify-center">
					<button
						class="mt-6 shrink-0 rounded-lg bg-main-textDark-560 px-4 py-2 text-base font-semibold text-white shadow-md hover:bg-main-textLight-560 focus:outline-none dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560"
						type="button"
						@click="router.push({ name: `${name} Link` })"
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
