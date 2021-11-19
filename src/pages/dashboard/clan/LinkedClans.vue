<template>
	<div>
		<LoadingSpinner v-if="userClan.clansDataProcessing" />
		<NoLink v-if="!userClan.clansDataProcessing && !userClan.clanData.length" name="Clan" />
		<div
			v-if="!userClan.clansDataProcessing && userClan.clanData.length"
			class="px-4 mx-auto bg-main-light-530 dark:bg-main-dark-500"
		>
			<div class="max-w-4xl mx-auto">
				<div class="relative">
					<div class="absolute inset-0 flex items-center" aria-hidden="true">
						<div class="w-full border-t border-black dark:border-white"></div>
					</div>
					<div class="relative flex justify-start">
						<span
							class="
								pl-2
								pr-2
								text-lg
								font-bold
								text-main-textDark-600
								dark:text-main-textLight-530
								bg-main-light-430
								dark:bg-main-dark-600
							"
						>
							Clans Linked
						</span>
					</div>
				</div>

				<div v-for="clan in userClan.clanData" :key="clan.tag">
					<div class="pt-6 sm:flex lg:items-end group">
						<div class="flex items-center justify-center flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
							<img
								class="object-contain w-24 h-24 mb-2 rounded-md md:w-32 md:h-32"
								:src="clan.badge || '/clash/clanless.png'"
								alt="clan-badge"
							/>
						</div>
						<div class="w-full h-32">
							<div class="absolute top-auto inline-flex items-end justify-end ml-auto right-2" aria-hidden="true">
								<div v-for="(labelUrl, name) in clan.labels" :key="labelUrl" class="w-8 h-8 mr-2">
									<img :src="labelUrl" :alt="name" :title="name" class="w-8 h-8" />
								</div>
							</div>
							<div class="absolute inline-flex items-end lg:p-2 justify-end mt-20 ml-auto right-2">
								<span
									class="
										inline-flex
										px-3
										py-1
										text-sm
										rounded-full
										mr-1
										text-main-textDark-600
										dark:text-main-textLight-530
										bg-main-light-430
										dark:bg-main-dark-600
									"
									><entypo:trophy class="w-5 h-5 mr-1 text-yellow-400" aria-hidden="true" />
									<span class="font-bold">
										{{ clan.trophies }}
									</span>
								</span>
								<span
									class="
										inline-flex
										px-3
										py-1
										text-sm
										rounded-full
										text-main-textDark-600
										dark:text-main-textLight-530
										bg-main-light-430
										dark:bg-main-dark-600
									"
									><mdi:trophy class="w-5 h-5 mr-1 text-yellow-600" aria-hidden="true" />
									<span class="font-bold">
										{{ clan.versus_trophies }}
									</span>
								</span>
							</div>
							<p class="text-xl font-extrabold text-main-textDark-500 dark:text-main-textLight-500 lg:text-2xl">
								{{ clan.name }}
								<span class="text-sm font-bold text-main-textDark-530 dark:text-main-textLight-530">
									({{ clan.tag }})
								</span>
							</p>
							<p class="text-sm font-semibold text-red-500 lg:text-base mt-4">
								<span class="text-sm font-bold text-main-textDark-560 dark:text-main-textLight-560 lg:text-base"
									>Leader: </span
								>👑 {{ clan.leader }}
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
import { getCookie } from '~/utils/cookie';
import NoLink from '~/pages/dashboard/utils/NoLink.vue';

const userClan = userClanOpeartions();
async function getClans() {
	await userClan.fetchClansData(getCookie('_auth_token'));
}
onMounted(getClans);
</script>
