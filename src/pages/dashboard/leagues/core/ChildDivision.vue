<template>
	<div v-if="divisionsData.length > 0" class="flex flex-col">
		<div class="overflow-x-auto m-2">
			<div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
				<div class="overflow-hidden rounded-lg shadow-md">
					<table class="min-w-full">
						<thead class="bg-gray-50 dark:bg-gray-700">
							<tr>
								<th
									scope="col"
									class="
										text-xs
										font-medium
										text-gray-700
										px-6
										py-3
										text-left
										uppercase
										tracking-normal
										dark:text-gray-400
									"
								>
									Name
								</th>
								<th
									scope="col"
									class="
										text-xs
										font-medium
										text-gray-700
										px-6
										py-3
										text-left
										uppercase
										tracking-normal
										dark:text-gray-400
									"
								>
									Child League
								</th>
								<th
									scope="col"
									class="
										text-xs
										font-medium
										text-gray-700
										px-6
										py-3
										text-left
										uppercase
										tracking-normal
										dark:text-gray-400
									"
								>
									Clans
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="division in divisionsData"
								:key="division.id"
								class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
							>
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
									{{ `${division.name}(${division.abbreviation})` }}
								</td>
								<td class="text-sm text-gray-500 px-6 py-4 whitespace-nowrap dark:text-gray-400">{{ division.id }}</td>
								<td class="text-sm text-gray-500 px-6 py-4 whitespace-nowrap dark:text-gray-400">
									{{ division.clans_count }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div v-else>
		<h1 class="text-6xl font-bold text-center text-main-fail-650 dark:text-main-fail-400">Oops!</h1>
		<h1 class="mt-6 text-xl font-semibold text-center text-main-fail-550 dark:text-main-fail-300">
			Child Leagues Has No Division
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
				@click="router.push({ name: 'Child Division' })"
			>
				Add Child League
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
// TODO: Heavy development needed here
import router from '~/router';
import { TUserChildLeagueDivisions, TUserChildLeague } from '~/types/leagues';
withDefaults(defineProps<{ divisionsData: TUserChildLeagueDivisions[]; childData: TUserChildLeague[] }>(), {
	divisionsData: Array,
	childData: Array,
});
</script>
