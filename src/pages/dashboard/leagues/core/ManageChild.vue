<template>
	<div>
		<div class="mx-auto max-w-lg rounded-b-lg bg-main-light-530 p-8 shadow-xl dark:bg-main-dark-500 md:p-12">
			<h1 class="text-center text-3xl font-black text-main-textDark-600 dark:text-main-textLight-530">
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
						<label class="register-form-input-label mt-4">Abbreviation<span class="ml-0.5 text-red-500">*</span></label>
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
						<label class="register-form-input-label mt-4">Main League Name</label>
						<input
							readonly="true"
							class="register-form-input cursor-not-allowed focus-visible:ring-transparent"
							:placeholder="league.getLeagueLocalConfig?.league.name"
						/>
					</div>
					<div>
						<label class="register-form-input-label mt-4">Main League ID</label>
						<input
							readonly="true"
							class="register-form-input cursor-not-allowed focus-visible:ring-transparent"
							:placeholder="String(league.getLeagueLocalConfig?.league.leagueId)"
						/>
					</div>
					<div>
						<label class="register-form-input-label mt-4">Logo URL<span class="ml-0.5 text-red-500">*</span></label>
						<input name="icon-url" type="text" class="register-form-input" placeholder="Child Logo URL" />
					</div>
					<ProcessButton :processing="league.childRegisterProcess" />
				</form>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { TRegisterChild } from '~/types';
import { checkLeague } from '~/utils/leagueUtils';
import ProcessButton from '~/components/ProcessButton.vue';
import { leagueManagement } from '~/stores/leagueManagement';

onBeforeMount(() => checkLeague());

const league = leagueManagement();

async function registerChild() {
	const form: HTMLFormElement | null = document.querySelector('#register-child');
	const formData = new FormData(form!);
	const childRegisterData: TRegisterChild = {
		leagueId: league.getLeagueLocalConfig?.league.leagueId ?? 0,
		name: formData.get('child-name') as string,
		abbreviation: formData.get('child-abbreviation') as string,
		iconUrl: formData.get('icon-url') as string
	};
	await league.registerChild(childRegisterData);
}
</script>
