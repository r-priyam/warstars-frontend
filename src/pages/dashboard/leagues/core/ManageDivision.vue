<template>
	<div>
		<div class="mx-auto max-w-lg rounded-b-lg bg-main-light-530 p-8 shadow-xl dark:bg-main-dark-500 md:p-12">
			<h1 class="text-center text-3xl font-black text-main-textDark-600 dark:text-main-textLight-530">
				Add Child Division
			</h1>
			<div class="mt-3 border-t-2 border-gray-200"></div>
			<section class="mt-10">
				<form id="register-division" class="flex flex-col" @submit.prevent="registerDivision">
					<div>
						<label class="register-form-input-label">Name<span class="ml-0.5 text-red-500">*</span></label>
						<input
							name="division-name"
							type="text"
							autocomplete="off"
							required="true"
							class="register-form-input"
							placeholder="Division Name"
						/>
					</div>
					<div>
						<label class="register-form-input-label mt-4">Abbreviation<span class="ml-0.5 text-red-500">*</span></label>
						<input
							name="division-abbreviation"
							type="text"
							autocomplete="off"
							required="true"
							minlength="3"
							class="register-form-input"
							placeholder="Division Abbreviation"
							oninput="this.value = this.value.toUpperCase()"
						/>
					</div>
					<div>
						<label class="register-form-input-label mt-4">Child League Name</label>
						<input
							readonly="true"
							class="register-form-input cursor-not-allowed focus-visible:ring-transparent"
							:placeholder="league.getLeagueLocalConfig?.child.name"
						/>
					</div>
					<div>
						<label class="register-form-input-label mt-4">Child League ID</label>
						<input
							readonly="true"
							class="register-form-input cursor-not-allowed focus-visible:ring-transparent"
							:placeholder="String(league.getLeagueLocalConfig?.child.id)"
						/>
					</div>
					<ProcessButton :processing="league.divisionRegisterProcess" />
				</form>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { TRegisterDivision } from '~/types';
import router from '~/router';
import { notifications } from '~/stores/notifications';
import { leagueManagement } from '~/stores/leagueManagement';
import ProcessButton from '~/components/ProcessButton.vue';

const league = leagueManagement();

onBeforeMount(async () => {
	if (league.getLeagueLocalConfig?.league.leagueId === 0 || !league.getLeagueLocalConfig) {
		notifications().warning('Please config a league to continue!');
		await router.push({ name: 'League Selector' });
	} else if (league.getLeagueLocalConfig.child.id === 0) {
		notifications().warning('Please select a child league to continue!');
		await router.push({ name: 'League Selector' });
	} else if (!league.getLeagueLocalConfig.child.seasonActive) {
		notifications().warning(
			'Child league has no active season. Please start new season first to add a division!',
			6000,
		);
		await router.push({ name: 'Season Core', query: { showChildSeason: 'true' } });
	}
});

async function registerDivision() {
	const form: HTMLFormElement | null = document.querySelector('#register-division');
	const formData = new FormData(form!);
	const childDivisionData: TRegisterDivision = {
		leagueId: league.getLeagueLocalConfig?.league.leagueId ?? 0,
		childId: league.getLeagueLocalConfig?.child.id ?? 0,
		seasonId: league.getLeagueLocalConfig?.child.seasonId ?? 0,
		name: formData.get('division-name') as string,
		abbreviation: formData.get('division-abbreviation') as string,
	};
	await league.registerDivision(childDivisionData);
}
</script>
