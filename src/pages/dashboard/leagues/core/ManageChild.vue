<template>
	<div>
		<div class="max-w-lg p-8 mx-auto rounded-b-lg shadow-xl bg-main-light-530 dark:bg-main-dark-500 md:p-12">
			<h1 class="text-3xl font-black text-center text-main-textDark-600 dark:text-main-textLight-530">
				Register Child
			</h1>
			<div class="mt-3 border-t-2 border-gray-200"></div>
			<section class="mt-10">
				<form id="register-child" class="flex flex-col" @submit.prevent="registerChild">
					<div>
						<label class="register-form-input-label">Name<span class="ml-0.5 text-red-500">*</span></label>
						<input
							name="child-name"
							type="text"
							autocomplete="off"
							required="true"
							class="register-form-input"
							placeholder="Child Name"
						/>
					</div>
					<div>
						<label class="mt-4 register-form-input-label">Abbreviation<span class="ml-0.5 text-red-500">*</span></label>
						<input
							name="child-abbreviation"
							type="text"
							autocomplete="off"
							required="true"
							minlength="3"
							class="register-form-input"
							placeholder="Child Abbreviation"
							oninput="this.value = this.value.toUpperCase()"
						/>
					</div>
					<div>
						<label class="mt-4 register-form-input-label">Main League Name</label>
						<input
							readonly="true"
							class="cursor-not-allowed register-form-input focus-visible:ring-transparent"
							:placeholder="league.getLeagueLocalConfig?.league.name"
						/>
					</div>
					<div>
						<label class="mt-4 register-form-input-label">Main League ID</label>
						<input
							readonly="true"
							class="cursor-not-allowed register-form-input focus-visible:ring-transparent"
							:placeholder="String(league.getLeagueLocalConfig?.league.league_id)"
						/>
					</div>
					<div>
						<label class="mt-4 register-form-input-label">Logo URL<span class="ml-0.5 text-red-500">*</span></label>
						<input name="icon-url" type="text" class="register-form-input" placeholder="Child Logo URL" />
					</div>
					<button
						v-if="!league.childRegisterProcess"
						class="py-2 mt-10 font-bold text-white transition duration-200 border border-transparent rounded shadow-md bg-main-textDark-560 hover:bg-main-textLight-560 dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560 hover:shadow-xl"
						type="submit"
					>
						Proceed
					</button>
					<button
						v-if="league.childRegisterProcess"
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
import { TRegisterChild } from '~/types/leagues';
import { checkLeague } from '~/utils/leagueUtils';
import { leagueManagement } from '~/stores/leagueManagement';

onBeforeMount(checkLeague);

const league = leagueManagement();

async function registerChild() {
	const form: HTMLFormElement | null = document.querySelector('#register-child');
	const formData = new FormData(form!);
	const childRegisterData: TRegisterChild = {
		league_id: league.getLeagueLocalConfig?.league.league_id ?? 0,
		name: formData.get('child-name') as string,
		abbreviation: formData.get('child-abbreviation') as string,
		icon_url: formData.get('icon-url') as string,
	};
	await league.registerChild(childRegisterData);
}
</script>
