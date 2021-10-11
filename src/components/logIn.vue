<template>
	<div class="px-2 pt-12 pb-6 md:pt-20 md:px-0">
		<div class="max-w-lg p-8 mx-auto my-10 bg-main-light-530 rounded-lg shadow-xl dark:bg-main-dark-500 md:p-12">
			<section>
				<h3 class="text-3xl font-black text-center text-main-textDark-600 dark:text-main-textLight-530">Login</h3>
			</section>
			<div class="mt-3 border-t-2 border-gray-200"></div>
			<section class="mt-10">
				<form class="flex flex-col" @submit.prevent="submit">
					<div
						v-if="loginError()"
						v-motion-roll-left
						:initial="{ x: 400, opacity: 0 }"
						:enter="{
							x: 0,
							opacity: 1,
							transition: { delay: 200, type: 'spring', stiffness: 250, damping: 25, mass: 0.5 },
						}"
						:leave="{ x: 400, opacity: 0, transition: { type: 'spring', stiffness: 200, damping: 25, mass: 1 } }"
						class="
							relative
							px-4
							py-3
							mb-3
							border
							rounded
							bg-main-fail-100
							border-main-fail-700
							text-main-fail-600
							animate-pulse
						"
						role="alert"
					>
						<heroicons-solid:shield-exclamation class="inline w-5 h-5 mb-1 text-main-fail-550" />
						<span class="font-bold text-main-fail-550">
							Error!
							<span class="font-medium text-main-fail-500">Email or Password is wrong.</span>
						</span>
					</div>
					<div>
						<label for="email" class="block text-lg font-bold text-gray-800 dark:text-gray-100">Email</label>
						<input
							id="email-address"
							name="email"
							type="email"
							autocomplete="email"
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
							placeholder="Email address"
						/>
					</div>
					<div>
						<label for="password" class="block mt-6 text-lg font-bold text-gray-800 dark:text-gray-100">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
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
							placeholder="Password"
						/>
					</div>
					<div class="flex justify-end">
						<a
							href="#"
							class="
								text-sm
								mt-1.5
								font-bold
								text-main-textDark-600
								dark:text-main-textLight-600 dark:hover:text-main-textDark-600
								hover:text-main-textLight-600
								mb-6
								hover:underline
							"
							>Forgot password?</a
						>
					</div>
					<button
						v-if="!loginProcess()"
						class="
							py-2
							font-bold
							text-white
							transition
							duration-200
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
						Login
					</button>
					<button
						v-if="loginProcess()"
						type="button"
						class="
							inline-flex
							items-center
							justify-center
							py-2
							font-bold
							text-center text-white
							transition
							duration-150
							ease-in-out
							border border-transparent
							rounded-md
							cursor-not-allowed
							bg-main-textDark-500
							dark:bg-main-textLight-500
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
						Login
					</button>
					<div class="flex justify-center mt-12">
						<p class="font-semibold text-gray-800 dark:text-gray-100">
							Don't have an account?
							<router-link
								to="/register"
								class="
									font-bold
									text-main-textDark-600
									dark:text-main-textLight-600 dark:hover:text-main-textDark-600
									hover:text-main-textLight-600
								"
							>
								Register
							</router-link>
						</p>
					</div>
				</form>
			</section>
		</div>
	</div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { dispatchLogIn } from '~/store/main/actions';
import { readLoginError, readProcessing } from '~/store/main/getters';
import { commitSetLogInError, commitSetProcessing } from '~/store/main/mutations';
import { passwordToHex } from '~/utils/authHeader';

export default {
	setup() {
		const store = useStore();

		onBeforeMount(() => {
			// some users can be naughty, so well, yea!
			commitSetProcessing(store, false);
			commitSetLogInError(store, false);
		});

		const logIn = {
			async submit(event) {
				event.preventDefault();
				commitSetLogInError(store, false);
				const email = event.target.elements.email?.value;
				const password = passwordToHex(event.target.elements.password?.value);
				await dispatchLogIn(store, { email: email, password: password });
			},

			loginProcess() {
				return readProcessing(store);
			},

			loginError() {
				return readLoginError(store);
			},
		};

		return {
			submit: logIn.submit,
			loginProcess: logIn.loginProcess,
			loginError: logIn.loginError,
		};
	},
};
</script>
