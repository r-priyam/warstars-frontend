<template>
	<div>
		<div class="max-w-lg p-8 mx-auto bg-main-light-530 rounded-lg shadow-xl dark:bg-main-dark-500 md:p-12">
			<section>
				<h3 class="text-3xl font-black text-center text-main-textDark-600 dark:text-main-textLight-530">Link Clan</h3>
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
							class="w-full px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
							placeholder="Your Clan Tag"
							oninput="this.value = this.value.toUpperCase()"
						/>
					</div>
					<ProcessButton :processing="userClan.linkClanProcessing" />
				</form>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { userClan as userClanOperations } from '~/stores/userClan';
import ProcessButton from '~/components/ProcessButton.vue';

const userClan = userClanOperations();

async function linkClan() {
	const form: HTMLFormElement | null = document.querySelector('#clan-link');
	const formData = new FormData(form!);
	const clanTag = formData.get('clan-tag') as string;
	await userClan.linkClan(clanTag);
}
</script>
