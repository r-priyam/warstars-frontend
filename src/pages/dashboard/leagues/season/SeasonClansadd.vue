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
					<ProcessButton :processing="league.seasonClanAddProcess" />
				</form>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import PopUp from '~/pages/dashboard/utils/ConfirmationPopup.vue';
import router from '~/router';
import ProcessButton from '~/components/ProcessButton.vue';
import { notifications } from '~/stores/notifications';
import { leagueManagement } from '~/stores/leagueManagement';
import { formatTag, isValidTag } from '~/utils/clashUtils';
import { TSeasoncClanAdd } from '~/types/leagues';

const showPopUp = ref(false);
const league = leagueManagement();
const notification = notifications();
const leagueData = league.getLeagueLocalConfig;

onBeforeMount(async () => {
	if (league.getLeagueLocalConfig?.league.leagueId === 0 || !league.getLeagueLocalConfig) {
		notification.notify({ title: 'Warning', text: 'Please config a league to continue!' });
		await router.push({ name: 'League Selector' });
	} else if (league.getLeagueLocalConfig.child.id === 0) {
		notification.notify({ title: 'Warning', text: 'Please select a child league to continue!' });
		await router.push({ name: 'League Selector' });
	} else if (league.getLeagueLocalConfig.child.seasonId === null) {
		notification.notify(
			{
				title: 'Warning',
				text: 'Child league has no active season. Please start new season first to add a clan!',
			},
			6000,
		);
		await router.push({ name: 'Season Core', query: { showChildSeason: 'true' } });
	} else if (!league.getLeagueLocalConfig.child.seasonActive) {
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
		leagueId: leagueData!.league.leagueId,
		childId: leagueData!.child.id,
		divisionId: leagueData!.division.id, // @ts-expect-error
		leagueSeasonId: leagueData!.league.seasonId, // @ts-expect-error
		childSeasonId: leagueData!.child.seasonId,
		clanTags: clanTags,
	};
	await league.seasonClanAdd(seasonClanRegisterData);
}
</script>
