<template>
	<header class="bg-main-light-500 dark:bg-main-dark-500">
		<Popover class="sticky top-0 z-40">
			<div class="px-2 mx-auto max-w-7xl sm:px-6">
				<div class="flex items-center justify-between py-2 border-gray-100 md:justify-start">
					<div class="flex justify-start lg:w-0 lg:flex-1">
						<router-link to="/">
							<img class="h-10" alt="Logo" />
						</router-link>
					</div>
					<div class="-my-2 -mr-2 md:hidden">
						<button
							class="
								inline-flex
								items-center
								justify-center
								p-2
								mr-2
								rounded-md
								hover:bg-main-light-560
								dark:hover:bg-main-dark-560
								focus:outline-none
							"
							:aria-label="`Switch to ${isDarkMode ? 'light theme' : 'dark theme'}`"
							@click="toggleDarkMode()"
						>
							<heroicons-outline-sun
								v-if="!isDarkMode"
								class="w-6 h-6 text-main-textDark-600 dark:text-main-textLight-530 fill-current"
								aria-hidden="true"
							/>
							<heroicons-outline-moon
								v-else
								class="w-6 h-6 text-main-textDark-600 dark:text-main-textLight-530 fill-current"
								aria-hidden="true"
							/>
						</button>
						<PopoverButton
							class="
								navbar-open-menu
								text-gray-800
								dark:text-gray-100
								hover:bg-main-light-560
								dark:hover:bg-main-dark-560
							"
						>
							<span class="sr-only">Open menu</span>
							<heroicons-outline-menu
								class="w-6 h-6 text-main-textDark-600 dark:text-main-textLight-530"
								aria-hidden="true"
							/>
						</PopoverButton>
					</div>
					<PopoverGroup as="nav" class="hidden space-x-2 md:flex">
						<router-link to="/" class="navbar-item" active-class="bg-main-light-600 dark:bg-main-dark-600"
							><heroicons-outline:home class="w-5 h-5 mr-1" /> <span>Home</span>
						</router-link>
						<router-link to="/clans" class="navbar-item" active-class="bg-main-light-600 dark:bg-main-dark-600"
							><heroicons-outline:shield-check class="w-5 h-5 mr-1" /> <span>Clans</span>
						</router-link>
						<router-link to="/leagues" class="navbar-item" active-class="bg-main-light-600 dark:bg-main-dark-600"
							><heroicons-outline:globe class="w-5 h-5 mr-1" /><span>Leagues</span>
						</router-link>
						<router-link to="/docs" class="navbar-item" active-class="bg-main-light-600 dark:bg-main-dark-600"
							><heroicons-outline:document-text class="w-5 h-5 mr-1" /><span>Docs</span>
						</router-link>
					</PopoverGroup>
					<div class="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
						<button
							class="
								inline-flex
								items-center
								justify-center
								px-4
								py-3
								mr-2
								rounded-md
								hover:bg-main-light-560
								dark:hover:bg-main-dark-560
								hover:text-gray-200
								focus:outline-none
								transition
								duration-500
								ease-in-out
							"
							:aria-label="`Switch to ${isDarkMode ? 'light theme' : 'dark theme'}`"
							@click="toggleDarkMode()"
						>
							<heroicons-outline-sun
								v-if="!isDarkMode"
								class="w-6 h-6 text-main-textDark-600 dark:text-main-textLight-530 fill-current"
								aria-hidden="true"
							/>
							<heroicons-outline-moon
								v-else
								class="w-6 h-6 text-main-textDark-600 dark:text-main-textLight-530 fill-current"
								aria-hidden="true"
							/>
						</button>
						<router-link to="/register" class="mr-2 navbar-item" active-class="bg-main-light-600 dark:bg-main-dark-600"
							><heroicons-outline:pencil-alt class="w-5 h-5 mr-1" /><span>Register</span>
						</router-link>
						<router-link
							to="/sign-in"
							class="navbar-item bg-main-light-660 dark:bg-main-dark-660"
							active-class="bg-main-light-600 dark:bg-main-dark-600"
							><heroicons-solid:logout class="w-5 h-5 mr-1" /><span>Login</span>
						</router-link>
					</div>
				</div>
			</div>

			<transition
				enter-active-class="duration-200 ease-out"
				enter-from-class="scale-95 opacity-0"
				enter-to-class="scale-100 opacity-100"
				leave-active-class="duration-100 ease-in"
				leave-from-class="scale-100 opacity-100"
				leave-to-class="scale-95 opacity-0"
			>
				<PopoverPanel
					v-slot="{ close }"
					focus
					class="
						absolute
						inset-x-0
						top-0
						w-screen
						z-20
						transition
						origin-top-right
						transform
						md:hidden
						left-1/2
						-translate-x-1/2
						max-w-screen
						rounded-md
						sm:px-0
					"
				>
					<div class="divide-y-2 divide-gray-200 rounded-lg shadow-2xl bg-main-light-500 dark:bg-main-dark-500">
						<div class="px-5 pt-5 pb-6">
							<div class="flex items-center justify-between">
								<div>
									<!-- <img class="w-auto h-12" src="../assets/favicon.svg" alt="LeagueStats" /> -->
								</div>
								<div class="-mr-2">
									<PopoverButton
										class="
											inline-flex
											items-center
											justify-center
											p-2
											rounded-md
											focus:outline-none
											hover:bg-main-light-560
											dark:hover:bg-main-dark-560
										"
									>
										<span class="sr-only">Close menu</span>
										<heroicons-outline:x
											class="w-6 h-6 text-main-textDark-600 dark:text-main-textLight-530"
											aria-hidden="true"
										/>
									</PopoverButton>
								</div>
							</div>

							<div class="mt-6">
								<nav class="grid gap-y-8">
									<router-link
										to="/"
										class="navbar-mobile-item"
										active-class="bg-main-light-600 dark:bg-main-dark-600"
										@click="close()"
									>
										<heroicons-outline:home />
										<span class="navbar-mobile-item-name"> Home </span>
									</router-link>

									<router-link
										to="/clans"
										class="navbar-mobile-item"
										active-class="bg-main-light-600 dark:bg-main-dark-600"
										@click="close()"
									>
										<heroicons-outline:shield-check /><span class="navbar-mobile-item-name">Clans</span>
									</router-link>

									<router-link
										to="/league"
										class="navbar-mobile-item"
										active-class="bg-main-light-600 dark:bg-main-dark-600"
										@click="close()"
									>
										<heroicons-outline:globe /><span class="navbar-mobile-item-name">Leagues</span>
									</router-link>

									<router-link
										to="/docs"
										class="navbar-mobile-item"
										active-class="bg-main-light-600 dark:bg-main-dark-600"
										@click="close()"
									>
										<heroicons-outline:document-text /><span class="navbar-mobile-item-name">Documentation</span>
									</router-link>
								</nav>
							</div>
						</div>

						<div class="px-5 py-6 space-y-6">
							<div>
								<router-link
									to="/register"
									class="
										flex
										items-center
										justify-center
										w-full
										px-4
										py-2
										text-base
										font-medium
										text-gray-200
										border border-transparent
										rounded-md
										shadow-sm
										bg-main-textDark-560
										hover:bg-main-textLight-560
										dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560
									"
									@click="close()"
									>Register
								</router-link>
								<p class="mt-6 text-base text-center font-medium text-gray-800 dark:text-gray-100">
									Existing user?
									{{ ' ' }}
									<router-link
										to="/sign-in"
										class="
											font-bold
											text-main-textDark-600
											dark:text-main-textLight-600 dark:hover:text-main-textDark-600
											hover:text-main-textLight-600
										"
										@click="close()"
										>Login</router-link
									>
								</p>
								<br />
								<div class="text-center"></div>
							</div>
						</div>
					</div>
				</PopoverPanel>
			</transition>
		</Popover>
	</header>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue';
import { isDarkMode, toggleDarkMode } from '~/utils/darkMode';
</script>
