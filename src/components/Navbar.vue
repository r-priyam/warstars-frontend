<template>
	<header class="bg-main-primary-560 border-b-2 border-main-primary-400">
		<Popover class="sticky top-0 z-40">
			<div class="max-w-7xl mx-auto px-2 sm:px-6">
				<div class="flex justify-between items-center border-gray-100 py-2 md:justify-start">
					<div class="flex justify-start lg:w-0 lg:flex-1">
						<router-link to="/">
							<img class="h-10" alt="Logo" />
						</router-link>
					</div>
					<div class="-mr-2 -my-2 md:hidden">
						<button
							class="
								rounded-md
								p-2
								mr-2
								inline-flex
								items-center
								justify-center
								text-gray-200
								hover:text-gray-200 hover:bg-main-primary-630
								focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:bg-main-primary-600
							"
							:aria-label="`Switch to ${isDarkMode ? 'light theme' : 'dark theme'}`"
							@click="toggleDarkMode()"
						>
							<heroicons-outline-sun v-if="!isDarkMode" class="fill-current text-gray-200 h-6 w-6" aria-hidden="true" />
							<heroicons-outline-moon v-else class="fill-current text-gray-200 h-6 w-6" aria-hidden="true" />
						</button>
						<PopoverButton class="navbar-open-menu text-gray-200 hover:text-gray-200 hover:bg-main-primary-630">
							<span class="sr-only">Open menu</span>
							<heroicons-outline-menu class="h-6 w-6" aria-hidden="true" />
						</PopoverButton>
					</div>
					<PopoverGroup as="nav" class="hidden md:flex space-x-2">
						<router-link to="/" class="navbar-item" active-class="bg-main-primary-600"
							><heroicons-outline:home class="h-5 w-5 mr-1" /> <span>Home</span>
						</router-link>
						<router-link to="/clans" class="navbar-item" active-class="bg-main-primary-600"
							><heroicons-outline:shield-check class="h-5 w-5 mr-1" /> <span>Clans</span>
						</router-link>
						<router-link to="/leagues" class="navbar-item" active-class="bg-main-primary-600"
							><heroicons-outline:globe class="h-5 w-5 mr-1" /><span>Leagues</span>
						</router-link>
						<router-link to="/docs" class="navbar-item" active-class="bg-main-primary-600"
							><heroicons-outline:document-text class="h-5 w-5 mr-1" /><span>Docs</span>
						</router-link>
					</PopoverGroup>
					<div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
						<button
							class="
								rounded-md
								py-3
								px-4
								mr-2
								inline-flex
								items-center
								justify-center
								text-gray-200
								hover:text-gray-200 hover:bg-main-primary-630
								focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:bg-main-primary-630
							"
							:aria-label="`Switch to ${isDarkMode ? 'light theme' : 'dark theme'}`"
							@click="toggleDarkMode()"
						>
							<heroicons-outline-sun v-if="!isDarkMode" class="fill-current text-gray-200 h-6 w-6" aria-hidden="true" />
							<heroicons-outline-moon v-else class="fill-current text-gray-200 h-6 w-6" aria-hidden="true" />
						</button>
						<router-link
							to="/register"
							class="navbar-item bg-main-primary-600 hover:bg-main-primary-630 mr-2"
							active-class="bg-main-primary-600"
							><heroicons-outline:pencil-alt class="h-5 w-5 mr-1" /><span>Register</span>
						</router-link>
						<router-link
							to="/sign-in"
							class="navbar-item bg-main-primary-730 hover:bg-main-primary-700"
							active-class="bg-main-primary-600"
							><heroicons-solid:logout class="h-5 w-5 mr-1" /><span>Login</span>
						</router-link>
					</div>
				</div>
			</div>

			<transition
				enter-active-class="transition transform-gpu duration-300 ease-out"
				enter-from-class="translate-x-12 opacity-0"
				enter-to-class="translate-x-0 opacity-100"
				leave-active-class="duration-200 ease-in"
				leave-from-class="opacity-100 scale-100"
				leave-to-class="opacity-0 scale-95"
			>
				<PopoverPanel
					v-slot="{ close }"
					focus
					class="absolute inset-x-0 md:hidden origin-top-right top-0 transform transition z-20"
				>
					<div
						class="bg-main-primary-560 divide-gray-200 divide-y-2 ring-2 ring-main-primary-460 rounded-lg shadow-2xl"
					>
						<div class="px-5 pt-5 pb-6">
							<div class="flex items-center justify-between">
								<div>
									<!-- <img class="h-12 w-auto" src="../assets/favicon.svg" alt="LeagueStats" /> -->
								</div>
								<div class="-mr-2">
									<PopoverButton
										class="
											rounded-md
											p-2
											inline-flex
											items-center
											justify-center
											text-gray-200
											hover:text-gray-200 hover:bg-main-primary-630
											focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
										"
									>
										<span class="sr-only">Close menu</span>
										<heroicons-outline:x class="h-6 w-6" aria-hidden="true" />
									</PopoverButton>
								</div>
							</div>

							<div class="mt-6">
								<nav class="grid gap-y-8">
									<router-link to="/" class="navbar-mobile-item" active-class="bg-main-primary-600" @click="close()">
										<heroicons-outline:home />
										<span class="navbar-mobile-item-name"> Home </span>
									</router-link>

									<router-link
										to="/clans"
										class="navbar-mobile-item"
										active-class="bg-main-primary-600"
										@click="close()"
									>
										<heroicons-outline:shield-check /><span class="navbar-mobile-item-name">Clans</span>
									</router-link>

									<router-link
										to="/league"
										class="navbar-mobile-item"
										active-class="bg-main-primary-600"
										@click="close()"
									>
										<heroicons-outline:globe /><span class="navbar-mobile-item-name">Leagues</span>
									</router-link>

									<router-link
										to="/docs"
										class="navbar-mobile-item"
										active-class="bg-main-primary-600"
										@click="close()"
									>
										<heroicons-outline:document-text /><span class="navbar-mobile-item-name">Documentation</span>
									</router-link>
								</nav>
							</div>
						</div>

						<div class="py-6 px-5 space-y-6">
							<div>
								<router-link
									to="/register"
									class="
										w-full
										flex
										items-center
										justify-center
										px-4
										py-2
										border border-transparent
										rounded-md
										shadow-sm
										text-base
										font-medium
										text-gray-200
										bg-main-primary-700
										hover:bg-main-primary-760
									"
									@click="close()"
									>Register
								</router-link>
								<p class="mt-6 text-center text-base font-medium text-gray-200">
									Existing user?
									{{ ' ' }}
									<router-link to="/sign-in" class="text-main-primary-730 hover:text-main-primary-800" @click="close()"
										>Signin</router-link
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
