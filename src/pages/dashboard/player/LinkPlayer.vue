<template>
	<div>
		<div class="max-w-lg p-8 mx-auto bg-main-light-530 rounded-lg shadow-xl dark:bg-main-dark-500 md:p-12">
			<section>
				<h3 class="text-3xl font-black text-center text-main-textDark-600 dark:text-main-textLight-530">Link Player</h3>
			</section>
			<div class="mt-3 border-t-2 border-gray-200"></div>
			<section class="mt-10">
				<form class="flex flex-col" @submit.prevent="linkPlayer">
					<div>
						<label for="playerTag" class="block text-lg font-bold text-gray-800 dark:text-gray-100">Player Tag</label>
						<input
							id="playerTag"
							name="playerTag"
							type="playerTag"
							autocomplete="off"
							required="true"
							class="
								w-full
								px-3
								py-2
								mt-2
								text-gray-900
								placeholder-gray-500
								border border-gray-300
								rounded-lg
								shadow-sm
								appearance-none
								focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10
								sm:text-sm
							"
							placeholder="Your Player Tag"
						/>
					</div>
					<div>
						<label for="apiToken" class="block mt-6 text-lg font-bold text-gray-800 dark:text-gray-100"
							>Game API Token</label
						>
						<input
							id="apiToken"
							name="apiToken"
							type="text"
							autocomplete="off"
							required="true"
							class="
								block
								w-full
								px-3
								py-2
								mt-2
								text-gray-900
								placeholder-gray-500
								border border-gray-300
								rounded-lg
								shadow-sm
								select-none
								focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10
								sm:text-sm
							"
							placeholder="Game API Token"
						/>
					</div>
					<button
						v-if="!userPlayer.processing"
						class="
							py-2
							font-bold
							text-white
							transition
							duration-200
							mt-10
							border border-transparent
							rounded
							shadow-md
							bg-main-textDark-560
							hover:bg-main-textLight-560
							dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560
							hover:shadow-xl
						"
						type="submit"
					>
						Proceed
					</button>
					<button
						v-if="userPlayer.processing"
						class="
							inline-flex
							items-center
							justify-center
							py-2
							font-bold
							text-center text-white
							mt-10
							border border-transparent
							rounded
							cursor-not-allowed
							bg-main-textLight-560
							dark:bg-main-textDark-560
						"
						disabled
					>
						<svg
							class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Processing
					</button>
				</form>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { userPlayer as userPlayerOperations } from '~/stores/userplayer';
import { getCookie } from '~/utils/cookie';
const userPlayer = userPlayerOperations();

async function linkPlayer(event) {
	event.preventDefault();
	const playerTag = String(event.target.elements.playerTag?.value);
	const apiToken = String(event.target.elements.apiToken?.value);
	await userPlayer.linkPlayer(playerTag, apiToken, String(getCookie('_auth_token')));
}
</script>
