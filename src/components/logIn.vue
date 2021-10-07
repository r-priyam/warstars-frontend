<template>
	<div class="pt-12 md:pt-20 pb-6 px-2 md:px-0">
		<div class="bg-gray-400 dark:bg-main-primary-600 max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-xl">
			<section>
				<h3 class="font-black text-3xl text-center text-main-primary-760">Login</h3>
			</section>
			<div class="mt-3 border-t-2 border-gray-200"></div>
			<section class="mt-10">
				<form class="flex flex-col" @submit.prevent="submit">
					<transition
						enter="transition transform-gpu duration-300 ease-out"
						enter-from="translate-x-12 opacity-0"
						enter-to="translate-x-0 opacity-100"
						leave="transition transform-gpu duration-300 ease-in"
						leave-from="opacity-100"
						leave-to="opacity-0"
					>
						<div
							v-if="loginError"
							class="
								bg-main-fail-100
								border border-main-fail-700
								text-main-fail-600
								px-4
								py-3
								mb-3
								rounded
								relative
								animate-pulse
							"
							role="alert"
						>
							<heroicons-solid:shield-exclamation class="h-5 w-5 mb-1 inline text-main-fail-550" />
							<span class="font-bold text-main-fail-550">
								Error!
								<span class="font-medium text-main-fail-500">Email or Password is wrong.</span>
								<!-- <span class="absolute top-0 bottom-0 right-0 px-3 py-3">
										<button>
											<heroicons-solid:x class="border border-main-fail-700 text-main-fail-600 h-5 w-5" />
										</button>
									</span> -->
							</span>
						</div>
					</transition>
					<div>
						<label for="email" class="block text-lg font-semibold text-gray-50">Email</label>
						<input
							id="email-address"
							name="email"
							type="email"
							autocomplete="email"
							required="true"
							class="
								appearance-none
								w-full
								px-3
								py-2
								mt-2
								border border-gray-300
								placeholder-gray-500
								text-gray-900
								rounded-lg
								shadow-sm
								focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10
								sm:text-sm
							"
							placeholder="Email address"
						/>
					</div>
					<div>
						<label for="password" class="block text-lg mt-6 font-semibold text-gray-50">Password</label>
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
								border border-gray-300
								placeholder-gray-500
								text-gray-900
								rounded-lg
								shadow-sm
								focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10
								sm:text-sm
								select-none
							"
							placeholder="Password"
						/>
					</div>
					<div class="flex justify-end">
						<a
							href="#"
							class="text-sm font-medium mt-1.5 text-main-primary-760 hover:text-main-primary-800 mb-6 hover:underline"
							>Forgot password?</a
						>
					</div>
					<button
						v-if="!loginProcess"
						class="
							bg-main-primary-700
							hover:bg-main-primary-760
							text-white
							border border-transparent
							font-bold
							py-2
							rounded
							shadow-lg
							hover:shadow-xl
							transition
							duration-200
						"
						type="submit"
					>
						Login
					</button>
					<div v-if="loginProcess" class="flex justify-around">
						<span class="inline-flex rounded-md shadow-sm">
							<button
								type="button"
								class="
									inline-flex
									items-center
									px-[10.74rem]
									py-2
									border border-transparent
									font-bold
									rounded-md
									text-white
									bg-main-primary-660
									transition
									ease-in-out
									duration-150
									cursor-not-allowed
								"
								disabled
							>
								<svg
									class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
						</span>
					</div>
					<div class="flex justify-center mt-12">
						<p class="text-white">
							Don't have an account?
							<a href="#" class="text-main-primary-800 font-bold hover:underline hover:text-main-primary-830"
								>Sign up</a
							>
						</p>
					</div>
				</form>
			</section>
		</div>
	</div>
</template>

<script lang="ts">
import { hash } from 'bcryptjs';
import { Options, Vue } from 'vue-class-component';
import { dispatchLogIn } from '~/store/main/actions';
import { readLoginError, readProcessing } from '~/store/main/getters';
import { commitSetLogInError, commitSetProcessing } from '~/store/main/mutations';

@Options({})
export default class logIn extends Vue {
	public async submit(event) {
		event.preventDefault();
		const email = event.target.elements.email?.value;
		const password = await hash(event.target.elements.password?.value, 10);
		await dispatchLogIn(this.$store, { email: email, password: password });
	}

	public get loginProcess() {
		return readProcessing(this.$store);
	}

	public get loginError() {
		return readLoginError(this.$store);
	}

	public beforeMount() {
		commitSetProcessing(this.$store, false);
		commitSetLogInError(this.$store, false);
	}
}
</script>
