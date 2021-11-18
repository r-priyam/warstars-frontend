<template>
	<div>
		<LoadingSpinner v-if="userPlayer.processing" />
		<NoLink v-if="!userPlayer.processing && !userPlayer.playerData.length" name="Player" />
		<div
			v-if="!userPlayer.processing && userPlayer.playerData.length"
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
							Players Linked
						</span>
					</div>
				</div>

				<div v-for="player in userPlayer.playerData" :key="player.tag">
					<div class="pt-6 sm:flex lg:items-end group">
						<div class="flex items-center justify-center flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
							<img
								class="object-contain w-24 h-24 mb-2 rounded-md md:w-32 md:h-32"
								:src="`/clash/townHall/14.5.png`"
								alt="townhall"
							/>
						</div>
						<div class="w-full">
							<div class="absolute top-auto inline-flex items-end justify-end p-2 ml-auto right-2">
								<div v-for="(labelUrl, name) in player.labels" :key="labelUrl" class="w-8 h-8 mr-2">
									<img :src="labelUrl" :alt="name" :title="name" class="w-8 h-8" />
								</div>
							</div>
							<div class="absolute inline-flex items-end justify-end p-2 mt-24 ml-auto right-2">
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
									><entypo:trophy class="w-5 h-5 mr-1 text-yellow-400" aria-hidden="true" />
									<span class="font-bold">
										{{ player.trophies }}
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
										{{ player.versus_trophies }}
									</span>
								</span>
							</div>
							<p
								class="text-xl font-extrabold leading-6 text-main-textDark-560 dark:text-main-textLight-560 lg:text-2xl"
							>
								{{ player.name }}
							</p>
							<span class="text-sm font-black text-main-textDark-600 dark:text-main-textLight-530">
								{{ player.tag }}
							</span>
							<div class="flex flex-wrap mt-5">
								<img :src="player.clan.badge || '/clash/clanless.png'" class="w-16 h-16 mr-2 -ml-2" />
								<div class="my-auto">
									<span class="text-base font-bold text-gray-800 dark:text-gray-300">{{ player.clan.name }}</span>
									<p v-if="player.clan.position !== 'None'" class="text-sm text-gray-800 dark:text-gray-300">
										{{ player.clan.position }}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="mt-3 border-t-2 border-gray-400 dark:border-gray-100"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { userPlayer as userPlayerOpeartions } from '~/stores/userplayer';
import LoadingSpinner from '~/components/Spinner.vue';
import { getCookie } from '~/utils/cookie';
import NoLink from '~/pages/dashboard/utils/NoLink.vue';

const userPlayer = userPlayerOpeartions();
async function getPlayers() {
	await userPlayer.fetchPlayersData(String(getCookie('_auth_token')));
}
onMounted(getPlayers);
</script>
