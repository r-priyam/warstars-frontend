<template>
	<div class="max-w-6xl mx-auto p-10 md:p-12 bg-gray-300 dark:bg-main-primary-750 shadow-2xl">
		<div class="min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
			<div class="bg-gray-400 dark:bg-main-primary-700 max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
				<section>
					<h3 class="font-black text-3xl text-center text-main-primary-800">Login</h3>
				</section>
				<div class="mt-3 border border-gray-200"></div>
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
									rounded
									relative
									animate-pulse
								"
								role="alert"
							>
								<heroicons-solid:shield-exclamation class="h-5 w-5 mb-1 inline text-main-fail-550" />
								<span class="font-bold text-main-fail-550">
									Error!
									<span class="block font-medium text-main-fail-500">Email or Password is wrong.</span>
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
								"
								placeholder="Password"
							/>
						</div>
						<div class="flex justify-end">
							<a href="#" class="text-sm font-medium mt-1.5 text-gray-200 hover:text-gray-300 mb-6 hover:underline"
								>Forgot password?</a
							>
						</div>
						<button
							class="
								bg-main-primary-800
								hover:bg-main-primary-850
								text-white
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
						<div class="flex justify-center mt-12">
							<p class="text-white">
								Don't have an account? <a href="#" class="font-bold hover:underline hover:text-gray-200">Sign up</a>.
							</p>
						</div>
					</form>
				</section>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { readLoginError } from '~/store/main/getters';
import { dispatchLogIn } from '~/store/main/actions';

@Options({})
export default class logIn extends Vue {
	public async submit(event) {
		event.preventDefault();
		const email = event.target.elements.email?.value;
		const password = event.target.elements.password?.value;
		await dispatchLogIn(this.$store, { email: email, password: password });
	}

	public get loginError() {
		return readLoginError(this.$store);
	}
}
</script>
