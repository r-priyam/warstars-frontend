<template>
	<div>
		<div class="max-w-lg p-8 mx-auto rounded-b-lg shadow-xl bg-main-light-530 dark:bg-main-dark-500 md:p-12">
			<h1 class="text-3xl font-black text-center text-main-textDark-600 dark:text-main-textLight-530">
				Register League
			</h1>
			<div class="mt-3 border-t-2 border-gray-200"></div>
			<section class="mt-10">
				<form id="register-league" class="flex flex-col" @submit.prevent="registerLeague">
					<div>
						<label class="register-form-input-label">Name<span class="text-red-500">*</span></label>
						<input
							name="league-name"
							type="text"
							autocomplete="off"
							required="true"
							class="register-form-input"
							placeholder="League Name"
						/>
					</div>
					<div>
						<label for="abbreviation" class="mt-4 register-form-input-label"
							>Abbreviation<span class="text-red-500">*</span></label
						>
						<input
							name="league-abbreviation"
							type="text"
							autocomplete="off"
							required="true"
							minlength="2"
							class="register-form-input"
							placeholder="League Abbreviation"
							oninput="this.value = this.value.toUpperCase()"
						/>
					</div>
					<div>
						<label class="mt-4 register-form-input-label">Head Name</label>
						<input
							readonly="true"
							class="cursor-not-allowed register-form-input focus-visible:ring-transparent"
							:placeholder="user.userData.username"
						/>
					</div>
					<div>
						<label class="mt-4 register-form-input-label">Head Discord ID</label>
						<input
							readonly="true"
							class="cursor-not-allowed register-form-input focus-visible:ring-transparent"
							:placeholder="user.userData.discordId"
						/>
					</div>
					<div>
						<label class="mt-4 register-form-input-label"
							>Discord Invite<span class="ml-1 text-xs font-medium">(Optional)</span></label
						>
						<input name="discord-invite" type="text" class="register-form-input" placeholder="Discord Server Invite" />
					</div>
					<div>
						<label class="mt-4 register-form-input-label"
							>Twitter Handle<span class="ml-1 text-xs font-medium">(Optional)</span></label
						>
						<input name="twitter-handle" type="text" class="register-form-input" placeholder="Twitter User Name" />
					</div>
					<div>
						<label class="mt-4 register-form-input-label"
							>Website<span class="ml-1 text-xs font-medium">(Optional)</span></label
						>
						<input name="webiste-url" type="text" class="register-form-input" placeholder="Website URL" />
					</div>
					<div>
						<label class="mt-4 register-form-input-label"
							>Rules<span class="ml-1 text-xs font-medium">(Optional)</span></label
						>
						<input name="league-rules" type="text" class="register-form-input" placeholder="Rules Google Doc Link" />
					</div>
					<ProcessButton :processing="league.registerProcessing" />
				</form>
			</section>
		</div>
	</div>
</template>

<script lang="ts">
export default defineComponent({ name: 'LeagueRegister' });
</script>

<script setup lang="ts">
import { userStore } from '~/stores/user';
import { leagues } from '~/stores/leagues';
import { TLeagueRegister } from '~/types/leagues';
import ProcessButton from '~/components/ProcessButton.vue';

const user = userStore();
const league = leagues();

async function registerLeague() {
	const form: HTMLFormElement | null = document.querySelector('#register-league');
	const formData = new FormData(form!);
	const leagueRegisterData: TLeagueRegister = {
		name: formData.get('league-name') as string,
		abbreviation: formData.get('league-abbreviation') as string,
		headAdmin: user.userData.username,
		discordId: user.userData.discordId,
	};
	if (formData.get('discord-invite')) leagueRegisterData.discordInvite = String(formData.get('discord-invite'));
	if (formData.get('twitter-handle')) leagueRegisterData.twitterHandle = String(formData.get('twitter-handle'));
	if (formData.get('website-url')) leagueRegisterData.website = String(formData.get('website-url'));
	if (formData.get('league-rules')) leagueRegisterData.rules = String(formData.get('league-rules'));
	await league.registerLeague(leagueRegisterData);
}
</script>
