<template>
	<div>
		<PopUp
			title="Remove Clan"
			:description="`Are you sure you want to remove ${clanName} (${clanTag})? You can add it later again!`"
			:open="showPopUp"
			:processing="popUpProcessing"
			@close-pop-up="() => (showPopUp = false)"
			@confirmation="
				async () => (
					(popUpProcessing = true), await userClan.removeClan(clanTag), (popUpProcessing = false), (showPopUp = false)
				)
			"
		/>
		<LoadingSpinner v-if="userClan.clansDataProcessing" />
		<NoLink v-if="!userClan.clansDataProcessing && !userClan.clanData.length" name="Clan" />
		<div
			v-if="!userClan.clansDataProcessing && userClan.clanData.length"
			class="mx-auto bg-main-light-530 px-4 dark:bg-main-dark-500"
		>
			<div class="mx-auto max-w-4xl">
				<div class="relative">
					<div class="absolute inset-0 flex items-center" aria-hidden="true">
						<div class="w-full border-t border-black dark:border-white"></div>
					</div>
					<div class="relative flex justify-start">
						<span
							class="bg-main-light-430 pl-2 pr-2 text-lg font-bold text-main-textDark-600 dark:bg-main-dark-600 dark:text-main-textLight-530"
						>
							Clans Linked
						</span>
					</div>
				</div>

				<div v-for="clan in userClan.clanData" :key="clan.tag">
					<div class="group pt-6 sm:flex lg:items-end">
						<div class="mb-4 flex shrink-0 items-center justify-center sm:mb-0 sm:mr-4">
							<img
								class="mb-2 h-24 w-24 rounded-md object-contain md:h-32 md:w-32"
								:src="clan.badge || '/clash/clanless.png'"
								alt="clan-badge"
							/>
						</div>
						<div class="h-32 w-full">
							<div class="absolute top-auto right-2 ml-auto inline-flex items-end justify-end" aria-hidden="true">
								<div v-for="(labelUrl, labelName) in clan.labels" :key="labelUrl" class="mr-2 h-8 w-8">
									<img :src="labelUrl" :alt="labelName" :title="labelName" class="h-8 w-8" />
								</div>
							</div>
							<div class="absolute right-2 mt-20 ml-auto inline-flex items-end justify-end lg:p-2">
								<span
									class="mr-1 inline-flex rounded-full bg-main-light-430 px-3 py-1 text-sm text-main-textDark-600 dark:bg-main-dark-600 dark:text-main-textLight-530"
									><entypo:trophy class="mr-1 h-5 w-5 text-yellow-400" aria-hidden="true" />
									<span class="font-bold">
										{{ clan.trophies }}
									</span>
								</span>
								<span
									class="inline-flex rounded-full bg-main-light-430 px-3 py-1 text-sm text-main-textDark-600 dark:bg-main-dark-600 dark:text-main-textLight-530"
									><mdi:trophy class="mr-1 h-5 w-5 text-yellow-600" aria-hidden="true" />
									<span class="font-bold">
										{{ clan.versusTrophies }}
									</span>
								</span>
							</div>
							<p class="text-xl font-extrabold text-main-textDark-500 dark:text-main-textLight-500 lg:text-2xl">
								{{ clan.name }}
								<span class="text-sm font-bold text-main-textDark-530 dark:text-main-textLight-530">
									({{ clan.tag }})
								</span>
								<button
									@click="
										clanName = clan.name;
										clanTag = clan.tag;
										showPopUp = true;
									"
								>
									<heroicons-solid:trash class="mt-0.5 -ml-1 inline-flex h-6 w-6 p-1 text-red-500" aria-hidden="true" />
								</button>
							</p>
							<p class="mt-4 text-sm font-semibold text-red-500 lg:text-base">
								<span class="text-sm font-bold text-main-textDark-560 dark:text-main-textLight-560 lg:text-base"
									>Leader: </span
								><span class="text-yellow-400">👑</span> {{ clan.leader }}
							</p>
							<p class="text-sm font-semibold text-gray-800 dark:text-gray-200 lg:text-base">
								<span class="text-sm font-bold text-main-textDark-560 dark:text-main-textLight-560 lg:text-base"
									>Location: </span
								>{{ clan.location }}
							</p>
							<p class="text-sm font-semibold text-gray-800 dark:text-gray-200 lg:text-base">
								<span class="text-sm font-bold text-main-textDark-560 dark:text-main-textLight-560 lg:text-base"
									>Members: </span
								>{{ clan.members }}/50
							</p>
						</div>
					</div>
					<div class="mt-3 border-t-2 border-gray-400 dark:border-gray-100"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { userClan as userClanOpeartions } from '~/stores/userClan';
import LoadingSpinner from '~/components/Spinner.vue';
import NoLink from '~/pages/dashboard/utils/NoLink.vue';
import PopUp from '~/pages/dashboard/utils/ConfirmationPopup.vue';

const userClan = userClanOpeartions();
onMounted(userClan.fetchClansData);

const clanName = ref('');
const clanTag = ref('');

const showPopUp = ref(false);
const popUpProcessing = ref(false);
</script>
