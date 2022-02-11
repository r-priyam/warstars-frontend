<template>
    <div>
        <div class="mx-auto max-w-lg rounded-b-lg bg-main-light-530 p-8 shadow-xl dark:bg-main-dark-500 md:p-12">
            <h1 class="text-center text-3xl font-black text-main-textDark-600 dark:text-main-textLight-530">Register League</h1>
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
                            placeholder="League Name" />
                    </div>
                    <div>
                        <label for="abbreviation" class="register-form-input-label mt-4"
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
                            oninput="this.value = this.value.toUpperCase()" />
                    </div>
                    <div>
                        <label class="register-form-input-label mt-4">Head Name</label>
                        <input
                            readonly="true"
                            class="register-form-input cursor-not-allowed focus-visible:ring-transparent"
                            :placeholder="user.userData.username" />
                    </div>
                    <div>
                        <label class="register-form-input-label mt-4">Head Discord ID</label>
                        <input
                            readonly="true"
                            class="register-form-input cursor-not-allowed focus-visible:ring-transparent"
                            :placeholder="user.userData.discordId" />
                    </div>
                    <div>
                        <label class="register-form-input-label mt-4"
                            >Discord Invite<span class="ml-1 text-xs font-medium">(Optional)</span></label
                        >
                        <input name="discord-invite" type="text" class="register-form-input" placeholder="Discord Server Invite" />
                    </div>
                    <div>
                        <label class="register-form-input-label mt-4"
                            >Twitter Handle<span class="ml-1 text-xs font-medium">(Optional)</span></label
                        >
                        <input name="twitter-handle" type="text" class="register-form-input" placeholder="Twitter User Name" />
                    </div>
                    <div>
                        <label class="register-form-input-label mt-4"
                            >Website<span class="ml-1 text-xs font-medium">(Optional)</span></label
                        >
                        <input name="webiste-url" type="text" class="register-form-input" placeholder="Website URL" />
                    </div>
                    <div>
                        <label class="register-form-input-label mt-4">Rules<span class="ml-1 text-xs font-medium">(Optional)</span></label>
                        <input name="league-rules" type="text" class="register-form-input" placeholder="Rules Google Doc Link" />
                    </div>
                    <ProcessButton :processing="league.registerProcessing" />
                </form>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { userStore } from '~/stores/user';
import { leagues } from '~/stores/leagues';
import type { TLeagueRegister } from '~/types';
import ProcessButton from '~/components/ProcessButton.vue';

defineComponent({ name: 'LeagueRegister' });

const user = userStore();
const league = leagues();

async function registerLeague() {
    const form: HTMLFormElement | null = document.querySelector('#register-league');
    const formData = new FormData(form!);
    const leagueRegisterData: TLeagueRegister = {
        name: formData.get('league-name') as string,
        abbreviation: formData.get('league-abbreviation') as string,
        headAdmin: user.userData.username,
        discordId: user.userData.discordId
    };
    if (formData.get('discord-invite')) leagueRegisterData.discordInvite = String(formData.get('discord-invite'));
    if (formData.get('twitter-handle')) leagueRegisterData.twitterHandle = String(formData.get('twitter-handle'));
    if (formData.get('website-url')) leagueRegisterData.website = String(formData.get('website-url'));
    if (formData.get('league-rules')) leagueRegisterData.rules = String(formData.get('league-rules'));
    await league.registerLeague(leagueRegisterData);
}
</script>
