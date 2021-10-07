<template>
	<div class="pt-12 md:pt-20 pb-6 px-2 md:px-0">
		<div class="bg-gray-400 dark:bg-main-primary-600 max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-xl">
			<section>
				<h3 class="font-black text-3xl text-center text-main-primary-760">Register</h3>
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
								bg-main-fail-100
								border border-main-fail-700
								text-main-fail-600
								px-4
								mb-4
								py-3
								rounded
								relative
								animate-pulse
							"
							role="alert"
						>
							<heroicons-solid:emoji-sad class="h-5 w-5 mb-1 inline text-main-fail-550" />
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
						<label for="password" class="block text-lg mt-4 font-semibold text-gray-50">Password</label>
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
					<div>
						<label for="_password" class="block text-lg mt-4 font-semibold text-gray-50">Confirm Password</label>
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
								border border-gray-300
								placeholder-gray-500
								text-gray-900
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
								bg-main-fail-100
								border border-main-fail-700
								text-main-fail-600
								px-4
								py-3
								mt-6
								rounded
								relative
								animate-pulse
							"
							role="alert"
						>
							<heroicons-solid:lock-open class="h-5 w-5 mb-1 inline text-main-fail-550" />
							<span class="font-bold text-main-fail-550">
								Error
								<span class="font-medium text-main-fail-500">{{ passwordError }}</span>
							</span>
						</div>
					</transition>
					<button
						class="
							bg-main-primary-700
							hover:bg-main-primary-760
							text-gray-200
							font-bold
							py-2
							mt-6
							rounded
							shadow-lg
							hover:shadow-xl
							transition
							duration-200
						"
						type="submit"
					>
						Register
					</button>
					<div class="flex justify-center mt-8">
						<p class="text-white">
							Already have an account?
							<a href="#" class="text-main-primary-800 font-bold hover:underline hover:text-main-primary-830">Login</a>
						</p>
					</div>
				</form>
			</section>
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { IUserProfileCreate } from '~/interfaces/user';
import { dispatchSignUp } from '~/store/user/actions';
import { readSignUpError } from '~/store/user/getters';
import { commitSetError } from '~/store/user/mutations';

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
			const newUser: IUserProfileCreate = {
				full_name: event.target.elements.name?.value,
				email: event.target.elements.email?.value,
				password: event.target.elements.password?.value,
			};
			await dispatchSignUp(this.$store, newUser);
		} else {
			this.showPasswordError = !this.showPasswordError;
		}
	}

	public get signUpError() {
		return readSignUpError(this.$store);
	}
}
</script>
