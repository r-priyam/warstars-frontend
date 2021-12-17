<template>
	<PopUp
		title="Warning"
		description="'You haven't selected any child division. All the changes will apply to the child league!!"
		:open="showPopUp"
		@close-pop-up="(outsideClick: Boolean) => {if(!outsideClick) showPopUp = false; router.push({name: 'League Selector'}); notification.notify({ title: 'Info', text: 'Please select a division to continue!' })}"
		@confirmation="() => (showPopUp = false)"
	/>
	<div>
		<div class="max-w-lg p-8 mx-auto rounded-b-lg shadow-xl bg-main-light-530 dark:bg-main-dark-500 md:p-12">
			<h1 class="text-3xl font-black text-center text-main-textDark-600 dark:text-main-textLight-530">
				Add {{league.getLeagueLocalConfig!.division.id === 0 ? 'Child' : 'Division'}} Clans
			</h1>
			<div class="mt-3 border-t-2 border-gray-200"></div>
			<section class="mt-10">
				<form id="league-clans" class="flex flex-col" @submit.prevent="addClans">
					<div>
						<label class="mt-4 register-form-input-label">Child Name & Abbreviation</label>
						<input
							readonly="true"
							class="cursor-not-allowed register-form-input focus-visible:ring-transparent"
							:placeholder="`${league.getLeagueLocalConfig!.child.name} (${league.getLeagueLocalConfig!.child.abbreviation})`"
						/>
					</div>
					<div>
						<label class="mt-4 register-form-input-label">Division Name & Abbreviation</label>
						<input
							readonly="true"
							class="cursor-not-allowed register-form-input focus-visible:ring-transparent"
							:placeholder="`${league.getLeagueLocalConfig!.division.name || 'NA'} (${league.getLeagueLocalConfig!.division.abbreviation || 'NA'})`"
						/>
					</div>
					<div>
						<label class="mt-4 mb-2 register-form-input-label"
							>Clan Tags <span class="text-xs font-bold text-red-600">(Clan tags must start with #)</span></label
						>
						<textarea name="clan-tags" class="register-form-input" rows="1" required></textarea>
					</div>
					<button
						v-if="!league.seasonClanAddProcess"
						class="py-2 mt-10 font-bold text-white transition duration-200 border border-transparent rounded shadow-md bg-main-textDark-560 hover:bg-main-textLight-560 dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560 hover:shadow-xl"
						type="submit"
					>
						Proceed
					</button>
					<button
						v-if="league.seasonClanAddProcess"
						class="inline-flex items-center justify-center py-2 font-bold text-center text-white mt-10 border border-transparent rounded cursor-not-allowed bg-main-textLight-560 dark:bg-main-textDark-560"
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
import PopUp from '~/pages/dashboard/utils/ConfirmationPopup.vue';
import router from '~/router';
import { notifications } from '~/stores/notifications';
import { leagueManagement } from '~/stores/leagueManagement';
import { formatTag, isValidTag } from '~/utils/clashUtils';
import { TSeasoncClanAdd } from '~/types/leagues';

const showPopUp = ref(false);
const league = leagueManagement();
const notification = notifications();
const leagueData = league.getLeagueLocalConfig;

onBeforeMount(async () => {
	if (league.getLeagueLocalConfig?.league.league_id === 0 || !league.getLeagueLocalConfig) {
		notification.notify({ title: 'Warning', text: 'Please config a league to continue!' });
		await router.push({ name: 'League Selector' });
	} else if (league.getLeagueLocalConfig.child.id === 0) {
		notification.notify({ title: 'Warning', text: 'Please select a child league to continue!' });
		await router.push({ name: 'League Selector' });
	} else if (league.getLeagueLocalConfig.child.season_id === null) {
		notification.notify(
			{
				title: 'Warning',
				text: 'Child league has no active season. Please start new season first to add a clan!',
			},
			6000,
		);
		await router.push({ name: 'Season Core', query: { showChildSeason: 'true' } });
	} else if (!league.getLeagueLocalConfig.child.season_active) {
		notification.notify(
			{
				title: 'Warning',
				text: 'Child league has no active season. Please start new season first to add a clan!',
			},
			6000,
		);
		await router.push({ name: 'Season Core', query: { showChildSeason: 'true' } });
	} else if (league.getLeagueLocalConfig.division.id === 0) {
		showPopUp.value = true;
	}
});

async function addClans() {
	const form: HTMLFormElement | null = document.querySelector('#league-clans');
	const formData = new FormData(form!);

	const clanTags = String(formData.get('clan-tags'))
		.replace(/\n/g, '')
		.split('#')
		.filter((e) => e)
		.map((tag) => formatTag(tag));

	for (const tag of clanTags) {
		if (!isValidTag(tag)) {
			notification.notify({ title: 'Error', text: `${tag} isn't a valid clan tag. Please check the tag!` });
			return;
		}
	}

	const seasonClanRegisterData: TSeasoncClanAdd = {
		// Ignore typecheck here because since season check is
		// already being checked above before mounting the page.
		league_id: leagueData!.league.league_id,
		child_id: leagueData!.child.id,
		division_id: leagueData!.division.id, // @ts-ignore
		league_season_id: leagueData!.league.season_id, // @ts-ignore
		child_season_id: leagueData!.child.season_id,
		clan_tags: clanTags,
	};
	await league.seasonClanAdd(seasonClanRegisterData);
}
</script>
