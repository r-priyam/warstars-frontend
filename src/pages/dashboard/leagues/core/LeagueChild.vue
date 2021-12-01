<template>
	<div
		v-if="childData.length > 0"
		class="grid grid-cols-1 gap-5 p-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
	>
		<div
			v-for="childLeague in childData"
			:key="childLeague.league_id"
			class="overflow-hidden rounded shadow-lg bg-main-light-530 dark:bg-main-dark-660"
		>
			<div class="flex items-center justify-center">
				<img
					class="p-1 mt-1 border-2 border-white rounded-full border-opacity-80 w-36 h-36"
					:src="childLeague.icon_url"
					:alt="childLeague.name"
				/>
			</div>
			<div class="px-6 py-4">
				<div class="mb-2 text-2xl font-extrabold text-center text-green-600 dark:text-green-500">
					{{ childLeague.name }}
				</div>
				<p class="item-name">
					Abbreviation
					<mdi:arrow-right-thin class="inline-flex w-4 h-4 mb-0.5" aria-hidden="true" />
					<span class="item-data">{{ childLeague.abbreviation }}</span>
				</p>
				<p class="item-name">
					Clans
					<mdi:arrow-right-thin class="inline-flex w-4 h-4 mb-0.5" aria-hidden="true" />
					<span class="item-data">{{ childLeague.clans_count }}</span>
				</p>
				<p class="item-name">
					Season
					<mdi:arrow-right-thin class="inline-flex w-4 h-4 mb-0.5" aria-hidden="true" />
					<span class="item-data">{{ childLeague.specific_id || 0 }}</span>
				</p>
				<p class="item-name">
					Start Date
					<mdi:arrow-right-thin class="inline-flex w-4 h-4 mb-0.5" aria-hidden="true" />
					<span class="item-data">{{
						childLeague.start_time !== null ? moment(childLeague.start_time).format('MMMM-DD-YYYY') : '--:--:----'
					}}</span>
				</p>
				<p class="item-name">
					End Date
					<mdi:arrow-right-thin class="inline-flex w-4 h-4 mb-0.5" aria-hidden="true" />
					<span class="item-data">{{
						childLeague.end_time !== null ? moment(childLeague.end_time).format('MMMM-DD-YYYY') : '--:--:----'
					}}</span>
				</p>
			</div>
		</div>
	</div>
	<div v-else>
		<h1 class="text-6xl font-bold text-center text-main-fail-650 dark:text-main-fail-400">Oops!</h1>
		<h1 class="mt-6 text-xl font-semibold text-center text-main-fail-550 dark:text-main-fail-300">
			No Child League Registered
		</h1>
		<div class="flex justify-center mt-2 flex-nowrap">
			<button
				class="
					px-4
					py-2
					mt-4
					text-base
					font-semibold
					text-gray-100
					rounded-lg
					shadow-md
					bg-main-fail-450
					hover:bg-main-fail-500
					dark:bg-main-fail-500 dark:hover:bg-main-fail-600
					focus:outline-none
				"
				@click="router.push({ name: 'League Child' })"
			>
				Add Child League
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import moment from 'moment';
import router from '~/router';
import { TUserChildLeague } from '~/types/leagues';
withDefaults(defineProps<{ childData: TUserChildLeague[] }>(), { childData: Array });
</script>

<style scoped>
.item-name {
	@apply text-base font-bold leading-7 text-main-textDark-500 dark:text-main-textLight-500;
}

.item-data {
	@apply ml-1 text-sm text-gray-800 dark:text-gray-200 font-medium;
}
</style>
