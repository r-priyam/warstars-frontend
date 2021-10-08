<template>
	<div class="px-2 pt-12 pb-6 md:pt-20 md:px-0">
		<div class="max-w-lg p-8 mx-auto my-10 bg-gray-400 rounded-lg shadow-xl dark:bg-main-primary-600 md:p-12">
			<section>
				<h3 class="text-3xl font-black text-center text-main-primary-760">Register</h3>
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
							v-if="signUpError.error"
							class="
								relative
								px-4
								py-3
								mb-4
								border
								rounded
								bg-main-fail-100
								border-main-fail-700
								text-main-fail-600
								animate-pulse
							"
							role="alert"
						>
							<heroicons-solid:emoji-sad class="inline w-5 h-5 mb-1 text-main-fail-550" />
							<span class="font-bold text-main-fail-550">
								Error!
								<span class="font-medium text-main-fail-500">{{ `${signUpError.message} Please try again.` }}</span>
							</span>
						</div>
					</transition>
					<div>
						<label for="name" class="block text-lg font-semibold text-gray-50">Full Name</label>
						<input
							id="name"
							name="name"
							type="text"
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
							placeholder="Full name"
						/>
					</div>
					<div>
						<label for="email" class="block mt-4 text-lg font-semibold text-gray-50">Email</label>
						<input
							id="email-address"
							name="email"
							type="text"
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
						<label for="password" class="block mt-4 text-lg font-semibold text-gray-50">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							required="true"
							minlength="8"
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
								focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10
								sm:text-sm
							"
							placeholder="Password"
						/>
					</div>
					<div>
						<label for="_password" class="block mt-4 text-lg font-semibold text-gray-50">Confirm Password</label>
						<input
							id="_password"
							name="_password"
							type="password"
							required="true"
							minlength="8"
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
								focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10
								sm:text-sm
							"
							placeholder="Confirm Password"
						/>
					</div>
					<transition
						enter="transition transform-gpu duration-300 ease-out"
						enter-from="translate-x-12 opacity-0"
						enter-to="translate-x-0 opacity-100"
						leave="transition transform-gpu duration-300 ease-in"
						leave-from="opacity-100"
						leave-to="opacity-0"
					>
						<div
							v-if="showPasswordError"
							class="
								relative
								px-4
								py-3
								mt-6
								border
								rounded
								bg-main-fail-100
								border-main-fail-700
								text-main-fail-600
								animate-pulse
							"
							role="alert"
						>
							<heroicons-solid:lock-open class="inline w-5 h-5 mb-1 text-main-fail-550" />
							<span class="font-bold text-main-fail-550">
								Error
								<span class="font-medium text-main-fail-500">{{ passwordError }}</span>
							</span>
						</div>
					</transition>
					<button
						v-if="!signUpProcess"
						class="
							py-2
							mt-6
							font-bold
							text-white
							transition
							duration-200
							border border-transparent
							rounded
							shadow-md
							bg-main-primary-700
							hover:bg-main-primary-760 hover:shadow-xl
						"
						type="submit"
					>
						Register
					</button>
					<button
						v-if="signUpProcess"
						type="button"
						class="
							inline-flex
							items-center
							justify-center
							py-2
							mt-6
							font-bold
							text-center text-white
							transition
							duration-150
							ease-in-out
							border border-transparent
							rounded-md
							cursor-not-allowed
							bg-main-primary-660
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
						Register
					</button>
					<div class="flex justify-center mt-8">
						<p class="text-white">
							Already have an account?
							<a href="#" class="font-bold text-main-primary-800 hover:underline hover:text-main-primary-830">Login</a>
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
import { IUserProfileCreate } from '~/interfaces/user';
import { dispatchSignUp } from '~/store/user/actions';
import { readSignUpError, readUserProcessing } from '~/store/user/getters';
import { commitSetError, commitSetProcessing } from '~/store/user/mutations';

@Options({})
export default class logIn extends Vue {
	public showPasswordError = false;
	public passwordError = '';

	public passwordValidate(password: string, confirmedPassword: string) {
		const validPassword = RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
		if (!validPassword.test(password)) {
			this.passwordError =
				'Password must contain a lowercase letter, a capital letter, a number and minimum 6 characters.';
			return false;
		} else if (password !== confirmedPassword) {
			this.passwordError = 'Password and Confirm password differs.';
			return false;
		}
		return true;
	}

	public async submit(event) {
		event.preventDefault();
		this.showPasswordError = false;
		commitSetError(this.$store, { error: false, message: '' });
		if (this.passwordValidate(event.target.elements.password?.value, event.target.elements._password?.value)) {
			const password = await hash(event.target.elements.password?.value, 10);
			const newUser: IUserProfileCreate = {
				full_name: event.target.elements.name?.value,
				email: event.target.elements.email?.value,
				password: password,
			};
			await dispatchSignUp(this.$store, newUser);
		} else {
			this.showPasswordError = !this.showPasswordError;
		}
	}

	public get signUpProcess() {
		return readUserProcessing(this.$store);
	}

	public get signUpError() {
		return readSignUpError(this.$store);
	}

	public beforeMount() {
		commitSetError(this.$store, { error: false, message: '' });
		commitSetProcessing(this.$store, false);
	}
}
</script>
