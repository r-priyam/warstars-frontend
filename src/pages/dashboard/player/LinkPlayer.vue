<template>
	<div>
		<div class="mx-auto max-w-lg rounded-lg bg-main-light-530 p-8 shadow-xl dark:bg-main-dark-500 md:p-12">
			<section>
				<h3 class="text-center text-3xl font-black text-main-textDark-600 dark:text-main-textLight-530">
					Link Player
				</h3>
			</section>
			<div class="mt-3 border-t-2 border-gray-200"></div>
			<section class="mt-10">
				<form id="player-link" class="flex flex-col" @submit.prevent="linkPlayer">
					<div>
						<label for="playerTag" class="block text-lg font-bold text-gray-800 dark:text-gray-100"
							>Player Tag</label
						>
						<input
							name="player-tag"
							type="text"
							autocomplete="off"
							required="true"
							class="mt-2 w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
							placeholder="Your Player Tag"
							oninput="this.value = this.value.toUpperCase()"
						/>
					</div>
					<div>
						<label for="apiToken" class="mt-6 block text-lg font-bold text-gray-800 dark:text-gray-100"
							>Game API Token</label
						>
						<input
							name="api-token"
							type="text"
							autocomplete="off"
							required="true"
							class="mt-2 block w-full select-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
							placeholder="Game API Token"
						/>
					</div>
					<ProcessButton :processing="userPlayer.linkPlayerProcessing" />
				</form>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { userPlayer as userPlayerOperations } from '~/stores/userPlayer';
import ProcessButton from '~/components/ProcessButton.vue';
const userPlayer = userPlayerOperations();

async function linkPlayer() {
	const form: HTMLFormElement | null = document.querySelector('#player-link');
	const formData = new FormData(form!);
	const playerTag = formData.get('player-tag') as string;
	const apiToken = formData.get('api-token') as string;
	await userPlayer.linkPlayer(playerTag, apiToken);
}
</script>
