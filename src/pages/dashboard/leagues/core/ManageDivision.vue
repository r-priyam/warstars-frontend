<template>
	<div>
		<div class="max-w-lg p-8 mx-auto rounded-b-lg shadow-xl bg-main-light-530 dark:bg-main-dark-500 md:p-12">
			<h1 class="text-3xl font-black text-center text-main-textDark-600 dark:text-main-textLight-530">
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
						<label class="mt-4 register-form-input-label">Abbreviation<span class="ml-0.5 text-red-500">*</span></label>
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
						<label class="mt-4 register-form-input-label">Child League Name</label>
						<input
							readonly="true"
							class="cursor-not-allowed register-form-input focus-visible:ring-transparent"
							:placeholder="league.getLeagueLocalConfig?.child.name"
						/>
					</div>
					<div>
						<label class="mt-4 register-form-input-label">Child League ID</label>
						<input
							readonly="true"
							class="cursor-not-allowed register-form-input focus-visible:ring-transparent"
							:placeholder="String(league.getLeagueLocalConfig?.child.id)"
						/>
					</div>
					<button
						v-if="!league.divisionRegisterProcess"
						class="py-2 mt-10 font-bold text-white transition duration-200 border border-transparent rounded shadow-md bg-main-textDark-560 hover:bg-main-textLight-560 dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560 hover:shadow-xl"
						type="submit"
					>
						Proceed
					</button>
					<button
						v-if="league.divisionRegisterProcess"
						class="inline-flex items-center justify-center py-2 mt-10 font-bold text-center text-white border border-transparent rounded cursor-not-allowed bg-main-textLight-560 dark:bg-main-textDark-560"
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
				</form>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { TRegisterDivision } from '~/types/leagues';
import router from '~/router';
import { notifications } from '~/stores/notifications';
import { leagueManagement } from '~/stores/leagueManagement';

const league = leagueManagement();

onBeforeMount(async () => {
	if (league.getLeagueLocalConfig?.league.league_id === 0 || !league.getLeagueLocalConfig) {
		notifications().notify({ title: 'Warning', text: 'Please config a league to continue!' });
		await router.push({ name: 'League Selector' });
	} else if (league.getLeagueLocalConfig.child.id === 0) {
		notifications().notify({ title: 'Warning', text: 'Please select a child league to continue!' });
		await router.push({ name: 'League Selector' });
	} else if (!league.getLeagueLocalConfig.child.season_active) {
		notifications().notify(
			{
				title: 'Warning',
				text: 'Child league has no active season. Please start new season first to add a division!',
			},
			6000,
		);
		await router.push({ name: 'Season Core', query: { showChildSeason: 'true' } });
	}
});

async function registerDivision() {
	const form: HTMLFormElement | null = document.querySelector('#register-division');
	const formData = new FormData(form!);
	const childDivisionData: TRegisterDivision = {
		league_id: league.getLeagueLocalConfig?.league.league_id ?? 0,
		child_id: league.getLeagueLocalConfig?.child.id ?? 0,
		season_id: league.getLeagueLocalConfig?.child.season_id ?? 0,
		name: formData.get('division-name') as string,
		abbreviation: formData.get('division-abbreviation') as string,
	};
	await league.registerDivision(childDivisionData);
}
</script>
