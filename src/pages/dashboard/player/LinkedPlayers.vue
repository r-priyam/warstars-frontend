<template>
    <div>
        <PopUp
            title="Remove Player"
            :description="`Are you sure you want to remove ${playerData.name} (${playerData.tag})? You can add it later again!`"
            :open="showPopUp"
            :processing="popUpProcessing"
            @close-pop-up="() => (showPopUp = false)"
            @confirmation="
                async () => (
                    (popUpProcessing = true),
                    await userPlayer.removePlayer(playerData.tag),
                    ((popUpProcessing = false), (showPopUp = false))
                )
            " />
        <LoadingSpinner v-if="userPlayer.playersDataProcessing" />
        <NoLink v-if="!userPlayer.playersDataProcessing && !userPlayer.playerData.length" name="Player" />
        <div
            v-if="!userPlayer.playersDataProcessing && userPlayer.playerData.length"
            class="mx-auto bg-main-light-530 px-4 dark:bg-main-dark-500">
            <div class="mx-auto max-w-4xl">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-black dark:border-white"></div>
                    </div>
                    <div class="relative flex justify-start">
                        <span
                            class="bg-main-light-430 pl-2 pr-2 text-lg font-bold text-main-textDark-600 dark:bg-main-dark-600 dark:text-main-textLight-530">
                            Players Linked
                        </span>
                    </div>
                </div>

                <div v-for="player in userPlayer.playerData" :key="player.tag">
                    <div class="group pt-6 sm:flex lg:items-end">
                        <div class="mb-4 flex shrink-0 items-center justify-center sm:mb-0 sm:mr-4">
                            <img
                                class="mb-2 h-24 w-24 rounded-md object-contain md:h-32 md:w-32"
                                :src="`/clash/townHall/14.5.png`"
                                alt="townhall" />
                        </div>
                        <div class="w-full">
                            <div class="absolute top-auto right-2 ml-auto inline-flex items-end justify-end p-2">
                                <div v-for="(labelUrl, labelName) in player.labels" :key="labelUrl" class="mr-2 h-8 w-8">
                                    <img :src="labelUrl" :alt="labelName" :title="labelName" class="h-8 w-8" />
                                </div>
                            </div>
                            <div class="absolute right-2 mt-24 ml-auto inline-flex items-end justify-end p-2">
                                <span
                                    class="mr-1 inline-flex rounded-full bg-main-light-430 px-3 py-1 text-sm text-main-textDark-600 dark:bg-main-dark-600 dark:text-main-textLight-530"
                                    ><IconHelper icon="entypo:trophy" icon-style="mr-1 h-5 w-5 text-yellow-400" />
                                    <span class="font-bold">
                                        {{ player.trophies }}
                                    </span>
                                </span>
                                <span
                                    class="inline-flex rounded-full bg-main-light-430 px-3 py-1 text-sm text-main-textDark-600 dark:bg-main-dark-600 dark:text-main-textLight-530"
                                    ><IconHelper icon="mdi:trophy" icon-style="mr-1 h-5 w-5 text-yellow-600" />
                                    <span class="font-bold">
                                        {{ player.versusTrophies }}
                                    </span>
                                </span>
                            </div>
                            <p class="text-xl font-extrabold leading-6 text-main-textDark-560 dark:text-main-textLight-560 lg:text-2xl">
                                {{ player.name }}
                                <button
                                    @click="
                                        playerData.name = player.name;
                                        playerData.tag = player.tag;
                                        showPopUp = true;
                                    ">
                                    <IconHelper icon="heroicons-solid:trash" icon-style="-ml-1 inline-flex h-6 w-6 p-1 text-red-500" />
                                </button>
                            </p>
                            <span class="text-sm font-black text-main-textDark-600 dark:text-main-textLight-530">
                                {{ player.tag }}
                            </span>
                            <div class="mt-5 flex flex-wrap">
                                <img :src="player.clan.badge || '/clash/clanless.png'" class="mr-2 -ml-2 h-16 w-16" />
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
import { userPlayer as userPlayerOpeartions } from '~/stores/userPlayer';
import NoLink from '~/pages/dashboard/utils/NoLink.vue';
import PopUp from '~/pages/dashboard/utils/ConfirmationPopup.vue';

const userPlayer = userPlayerOpeartions();
onMounted(() => userPlayer.fetchPlayersData());

const playerData = ref({ name: '', tag: '' });
const showPopUp = ref(false);
const popUpProcessing = ref(false);
</script>
