<template>
	<div>
		<div class="max-w-lg p-8 mx-auto bg-main-light-530 rounded-lg shadow-xl dark:bg-main-dark-500 md:p-12">
			<section>
				<h3 class="text-3xl font-black text-center text-main-textDark-600 dark:text-main-textLight-530">Link Player</h3>
			</section>
			<div class="mt-3 border-t-2 border-gray-200"></div>
			<section class="mt-10">
				<form id="player-link" class="flex flex-col" @submit.prevent="linkPlayer">
					<div>
						<label for="playerTag" class="block text-lg font-bold text-gray-800 dark:text-gray-100">Player Tag</label>
						<input
							name="player-tag"
							type="text"
							autocomplete="off"
							required="true"
							class="w-full px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
							placeholder="Your Player Tag"
							oninput="this.value = this.value.toUpperCase()"
						/>
					</div>
					<div>
						<label for="apiToken" class="block mt-6 text-lg font-bold text-gray-800 dark:text-gray-100"
							>Game API Token</label
						>
						<input
							name="api-token"
							type="text"
							autocomplete="off"
							required="true"
							class="block w-full px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm select-none focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
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
