<script setup lang="ts">
import ProcessButton from '~/components/ProcessButton.vue';
import { userClan as userClanOperations } from '~/stores/userClan';

const userClan = userClanOperations();

async function linkClan() {
    const form: HTMLFormElement | null = document.querySelector('#clan-link');
    const formData = new FormData(form!);
    const clanTag = formData.get('clan-tag') as string;
    await userClan.linkClan(clanTag);
}
</script>

<template>
    <div>
        <div class="mx-auto max-w-lg rounded-lg bg-main-light-530 p-8 shadow-xl dark:bg-main-dark-500 md:p-12">
            <section>
                <h3 class="text-center text-3xl font-black text-main-textDark-600 dark:text-main-textLight-530">Link Clan</h3>
            </section>
            <div class="mt-3 border-t-2 border-gray-200"></div>
            <section class="mt-10">
                <form id="clan-link" class="flex flex-col" @submit.prevent="linkClan">
                    <div>
                        <label for="clan-tag" class="block text-lg font-bold text-gray-800 dark:text-gray-100">Clan Tag</label>
                        <input
                            name="clan-tag"
                            type="text"
                            autocomplete="off"
                            required="true"
                            class="mt-2 w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                            placeholder="Your Clan Tag"
                            oninput="this.value = this.value.toUpperCase()" />
                    </div>
                    <ProcessButton :processing="userClan.linkClanProcessing" />
                </form>
            </section>
        </div>
    </div>
</template>
