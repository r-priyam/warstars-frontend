<template>
	<PopUp
		title="Warning"
		description="'You haven't selected any child division. All the changes will apply to the child league!!"
		:open="showPopUp"
		@close-pop-up="(outsideClick: Boolean) => {if(!outsideClick) showPopUp = false; router.push({name: 'League Selector'}); notification.info('Please select a division to continue!')}"
		@confirmation="() => (showPopUp = false)"
	/>
	<div>
		<div class="mx-auto max-w-lg rounded-b-lg bg-main-light-530 p-8 shadow-xl dark:bg-main-dark-500 md:p-12">
			<h1 class="text-center text-3xl font-black text-main-textDark-600 dark:text-main-textLight-530">
				Add {{league.getLeagueLocalConfig!.division.id === 0 ? 'Child' : 'Division'}} Clans
			</h1>
			<div class="mt-3 border-t-2 border-gray-200"></div>
			<section class="mt-10">
				<form id="league-clans" class="flex flex-col" @submit.prevent="addClans">
					<div>
						<label class="register-form-input-label mt-4">Child Name & Abbreviation</label>
						<input
							readonly="true"
							class="register-form-input cursor-not-allowed focus-visible:ring-transparent"
							:placeholder="`${league.getLeagueLocalConfig!.child.name} (${league.getLeagueLocalConfig!.child.abbreviation})`"
						/>
					</div>
					<div>
						<label class="register-form-input-label mt-4">Division Name & Abbreviation</label>
						<input
							readonly="true"
							class="register-form-input cursor-not-allowed focus-visible:ring-transparent"
							:placeholder="`${league.getLeagueLocalConfig!.division.name || 'NA'} (${league.getLeagueLocalConfig!.division.abbreviation || 'NA'})`"
						/>
					</div>
					<div>
						<label class="register-form-input-label mt-4 mb-2"
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
import ProcessButton from '~/components/ProcessButton.vue';
import { notifications } from '~/stores/notifications';
import { leagueManagement } from '~/stores/leagueManagement';
import { formatTag, isValidTag } from '~/utils/clashUtils';
import type { TSeasoncClanAdd } from '~/types';

const router = useRouter();
const showPopUp = ref(false);
const league = leagueManagement();
const notification = notifications();
const leagueData = league.getLeagueLocalConfig;

onBeforeMount(async () => {
	if (league.getLeagueLocalConfig?.league.leagueId === 0 || !league.getLeagueLocalConfig) {
		notification.warning('Please config a league to continue!');
		await router.push({ name: 'League Selector' });
	} else if (league.getLeagueLocalConfig.child.id === 0) {
		notification.warning('Please select a child league to continue!');
		await router.push({ name: 'League Selector' });
	} else if (league.getLeagueLocalConfig.child.seasonId === null) {
		notification.warning('Child league has no active season. Please start new season first to add a clan!', 6000);
		await router.push({ name: 'Season Core', query: { showChildSeason: 'true' } });
	} else if (!league.getLeagueLocalConfig.child.seasonActive) {
		notification.warning('Child league has no active season. Please start new season first to add a clan!', 6000);
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
			notification.error(`${tag} isn't a valid clan tag. Please check the tag!`);
			return;
		}
	}

	const seasonClanRegisterData: TSeasoncClanAdd = {
		// Ignore typecheck here because since season check is
		// already being checked above before mounting the page.
		leagueId: leagueData!.league.leagueId,
		childId: leagueData!.child.id,
		divisionId: leagueData!.division.id, // @ts-expect-error, already checking for it when page is mounted
		leagueSeasonId: leagueData!.league.seasonId, // @ts-expect-error, already checking for it when page is mounted
		childSeasonId: leagueData!.child.seasonId,
		clanTags
	};
	await league.seasonClanAdd(seasonClanRegisterData);
}
</script>
