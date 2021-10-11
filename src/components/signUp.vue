<template>
	<div class="px-2 pt-12 pb-6 md:pt-20 md:px-0">
		<div class="max-w-lg p-8 mx-auto my-10 bg-main-light-530 rounded-lg shadow-xl dark:bg-main-dark-500 md:p-12">
			<section>
				<h3 class="text-3xl font-black text-center text-main-textDark-600 dark:text-main-textLight-530">Register</h3>
			</section>
			<div class="mt-3 border-t-2 border-gray-200"></div>
			<section class="mt-10">
				<form class="flex flex-col" @submit.prevent="submit">
					<div
						v-if="signUpError().error"
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
							<span class="font-medium text-main-fail-500">{{ `${signUpError().message} Please try again.` }}</span>
						</span>
					</div>
					<div>
						<label for="name" class="block text-lg font-semibold text-gray-800 dark:text-gray-100">Full Name</label>
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
						<label for="email" class="block mt-4 text-lg font-semibold text-gray-800 dark:text-gray-100">Email</label>
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
						<label for="password" class="block mt-4 text-lg font-semibold text-gray-800 dark:text-gray-100"
							>Password</label
						>
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
						<label for="_password" class="block mt-4 text-lg font-semibold text-gray-800 dark:text-gray-100"
							>Confirm Password</label
						>
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
					<div
						v-if="showPasswordError"
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
					<button
						v-if="!signUpProcess()"
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
							bg-main-textDark-560
							hover:bg-main-textLight-560
							dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560
							hover:shadow-xl
						"
						type="submit"
					>
						Register
					</button>
					<button
						v-if="signUpProcess()"
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
						Register
					</button>
					<div class="flex justify-center mt-8">
						<p class="font-semibold text-gray-800 dark:text-gray-100">
							Already have an account?
							<a
								href="#"
								class="
									font-bold
									text-main-textDark-600
									dark:text-main-textLight-600 dark:hover:text-main-textDark-600
									hover:text-main-textLight-600
								"
								>Login</a
							>
						</p>
					</div>
				</form>
			</section>
		</div>
	</div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { IUserProfileCreate } from '~/interfaces/user';
import { dispatchSignUp } from '~/store/user/actions';
import { readSignUpError, readUserProcessing } from '~/store/user/getters';
import { commitSetError, commitSetProcessing } from '~/store/user/mutations';
import { passwordToHex } from '~/utils/authHeader';

export default {
	setup() {
		const store = useStore();
		const showPasswordError = ref(false);
		const passwordError = ref('');

		onBeforeMount(() => {
			commitSetError(store, { error: false, message: '' });
			commitSetProcessing(store, false);
		});

		function passwordValidate(password: string, confirmedPassword: string) {
			const validPassword = RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
			if (!validPassword.test(password)) {
				passwordError.value =
					'Password must contain a lowercase letter, a capital letter, a number and minimum 6 characters.';
				return false;
			} else if (password !== confirmedPassword) {
				passwordError.value = 'Password and Confirm password differs.';
				return false;
			}
			return true;
		}

		const register = {
			async submit(event) {
				event.preventDefault();
				showPasswordError.value = false;
				commitSetError(store, { error: false, message: '' });
				if (passwordValidate(event.target.elements.password?.value, event.target.elements._password?.value)) {
					const newUser: IUserProfileCreate = {
						full_name: event.target.elements.name?.value,
						email: event.target.elements.email?.value,
						password: passwordToHex(event.target.elements.password?.value),
					};
					await dispatchSignUp(store, newUser);
				} else {
					showPasswordError.value = !showPasswordError.value;
				}
			},

			signUpProcess() {
				return readUserProcessing(store);
			},

			signUpError() {
				return readSignUpError(store);
			},
		};

		return {
			passwordError,
			showPasswordError,
			submit: register.submit,
			signUpProcess: register.signUpProcess,
			signUpError: register.signUpError,
		};
	},
};
</script>
