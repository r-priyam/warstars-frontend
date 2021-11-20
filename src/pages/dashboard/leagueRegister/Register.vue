<template>
	<div>
		<div class="max-w-lg p-8 mx-auto rounded-lg shadow-xl bg-main-light-530 dark:bg-main-dark-500 md:p-12">
			<section>
				<h3 class="text-3xl font-black text-center text-main-textDark-600 dark:text-main-textLight-530">
					Register League
				</h3>
			</section>
			<div class="mt-3 border-t-2 border-gray-200"></div>
			<section class="mt-10">
				<form id="register-league" class="flex flex-col" @submit.prevent="registerLeague">
					<div>
						<label class="register-form-input-label">Name</label>
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
						<label for="abbreviation" class="mt-4 register-form-input-label">Abbreviation</label>
						<input
							name="league-abbreviation"
							type="text"
							autocomplete="off"
							required="true"
							class="register-form-input"
							placeholder="League Abbreviation"
						/>
					</div>
					<div>
						<label class="mt-4 register-form-input-label">Head Name</label>
						<input
							readonly="true"
							class="register-form-input cursor-not-allowed focus-visible:ring-transparent"
							:placeholder="user.userData.user_name"
						/>
					</div>
					<div>
						<label class="mt-4 register-form-input-label">Head Discord ID</label>
						<input
							readonly="true"
							class="register-form-input cursor-not-allowed focus-visible:ring-transparent"
							:placeholder="user.userData.discord_id"
						/>
					</div>
					<div>
						<label class="mt-4 register-form-input-label"
							>Discord Invite<span class="text-xs ml-1 font-medium">(Optional)</span></label
						>
						<input name="discord-invite" type="text" class="register-form-input" placeholder="Discord Server Invite" />
					</div>
					<div>
						<label class="mt-4 register-form-input-label"
							>Twitter Handle<span class="text-xs ml-1 font-medium">(Optional)</span></label
						>
						<input name="twitter-handle" type="text" class="register-form-input" placeholder="Twitter User Name" />
					</div>
					<div>
						<label class="mt-4 register-form-input-label"
							>Website<span class="text-xs ml-1 font-medium">(Optional)</span></label
						>
						<input name="webiste-url" type="text" class="register-form-input" placeholder="Website URL" />
					</div>
					<div>
						<label class="mt-4 register-form-input-label"
							>Rules<span class="text-xs ml-1 font-medium">(Optional)</span></label
						>
						<input name="league-rules" type="text" class="register-form-input" placeholder="Rules Google Doc Link" />
					</div>
					<button
						v-if="!league.registerProcessing"
						class="
							py-2
							mt-10
							font-bold
							text-white
							transition
							duration-200
							border border-transparent
							rounded
							shadow-md
							bg-main-textDark-560
							hover:bg-main-textLight-560
							dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560
							hover:shadow-xl
						"
						type="submit"
					>
						Proceed
					</button>
					<button
						v-if="league.registerProcessing"
						class="
							inline-flex
							items-center
							justify-center
							py-2
							mt-10
							font-bold
							text-center text-white
							border border-transparent
							rounded
							cursor-not-allowed
							bg-main-textLight-560
							dark:bg-main-textDark-560
						"
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

<script lang="ts">
export default defineComponent({ name: 'LeagueRegister' });
</script>

<script setup lang="ts">
import { userStore } from '~/stores/user';
import { leagues } from '~/stores/leagues';
import { TLeagueRegister } from '~/types/leagues';

const user = userStore();
const league = leagues();

async function registerLeague() {
	const form: HTMLFormElement | null = document.querySelector('#register-league');
	const formData = new FormData(form!);
	const leagueRegisterData: TLeagueRegister = {
		name: formData.get('league-name') as string,
		abbreviation: formData.get('league-abbreviation') as string,
		head_admin: user.userData.user_name,
		discord_id: user.userData.discord_id,
	};
	if (formData.get('discord-invite')) leagueRegisterData.discord_invite = String(formData.get('discord-invite'));
	if (formData.get('twitter-handle')) leagueRegisterData.twitter_handle = String(formData.get('twitter-handle'));
	if (formData.get('website-url')) leagueRegisterData.website = String(formData.get('website-url'));
	if (formData.get('league-rules')) leagueRegisterData.rules = String(formData.get('league-rules'));
	await league.registerLeague(leagueRegisterData);
}
</script>
