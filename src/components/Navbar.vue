<template>
	<Popover class="sticky top-0 z-0 bg-main-blue-530">
		<div class="max-w-7xl mx-auto px-4 sm:px-6">
			<div class="flex justify-between items-center border-gray-100 py-2 md:justify-start">
				<div class="flex justify-start lg:w-0 lg:flex-1">
					<a href="#">
						<span class="sr-only" />
						<img class="h-10" src="../assets/favicon.svg" alt="LeagueStats" />
					</a>
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
							hover:text-gray-200 hover:bg-main-blue-630
							focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:bg-main-blue-600
						"
						:aria-label="`Switch to ${isDarkMode ? 'light theme' : 'dark theme'}`"
						@click="toggleDarkMode()"
					>
						<heroicons-outline-sun v-if="!isDarkMode" class="fill-current text-gray-200 h-6 w-6" aria-hidden="true" />
						<heroicons-outline-moon v-else class="fill-current text-gray-200 h-6 w-6" aria-hidden="true" />
					</button>
					<PopoverButton class="navbar-open-menu text-gray-200 hover:text-gray-200 hover:bg-main-blue-630">
						<span class="sr-only">Open menu</span>
						<heroicons-outline-menu class="h-6 w-6" aria-hidden="true" />
					</PopoverButton>
				</div>
				<PopoverGroup as="nav" class="hidden md:flex space-x-4">
					<router-link to="/" class="navbar-item" active-class="bg-main-blue-600"
						><heroicons-outline:home class="h-5 w-5" /> <span class="ml-1">Home</span>
					</router-link>
					<router-link to="/clans" class="navbar-item" active-class="bg-main-blue-600"
						><heroicons-outline:shield-check class="h-5 w-5" /> <span class="ml-1">Clans</span>
					</router-link>
					<router-link to="/leagues" class="navbar-item" active-class="bg-main-blue-600"
						><heroicons-outline:globe class="h-5 w-5" /><span class="ml-1">Leagues</span>
					</router-link>
					<router-link to="/docs" class="navbar-item" active-class="bg-main-blue-600"
						><heroicons-outline:document-text class="h-5 w-5" /><span class="ml-1">Docs</span>
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
							hover:text-gray-200 hover:bg-main-blue-630
							focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:bg-main-blue-600
						"
						:aria-label="`Switch to ${isDarkMode ? 'light theme' : 'dark theme'}`"
						@click="toggleDarkMode()"
					>
						<heroicons-outline-sun v-if="!isDarkMode" class="fill-current text-gray-200 h-6 w-6" aria-hidden="true" />
						<heroicons-outline-moon v-else class="fill-current text-gray-200 h-6 w-6" aria-hidden="true" />
					</button>
					<router-link
						to="/sign-in"
						class="navbar-item bg-main-blue-700 hover:bg-main-blue-730"
						active-class="bg-main-blue-600"
						>Login</router-link
					>
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
			<PopoverPanel focus class="absolute inset-x-0 md:hidden origin-top-right top-0 transform transition z-20">
				<div class="bg-main-blue-530 divide-gray-200 divide-y-2 ring-2 ring-main-blue-600 rounded-lg shadow-2xl">
					<div class="px-5 pt-5 pb-6">
						<div class="flex items-center justify-between">
							<div>
								<img class="h-12 w-auto" src="../assets/favicon.svg" alt="LeagueStats" />
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
										hover:text-gray-200 hover:bg-main-blue-630
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
								<router-link to="/" class="navbar-mobile-item">
									<heroicons-outline:home /><span class="navbar-mobile-item-name">Home</span>
								</router-link>
								<router-link to="/clans" class="navbar-mobile-item">
									<heroicons-outline:shield-check /><span class="navbar-mobile-item-name">Clans</span>
								</router-link>
								<router-link to="/league" class="navbar-mobile-item">
									<heroicons-outline:globe /><span class="navbar-mobile-item-name">Leagues</span>
								</router-link>
								<router-link to="/docs" class="navbar-mobile-item">
									<heroicons-outline:document-text /><span class="navbar-mobile-item-name">Documentation</span>
								</router-link>
							</nav>
						</div>
					</div>
					<div class="py-6 px-5 space-y-6">
						<div>
							<router-link
								to="/sign-up"
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
									bg-main-blue-630-m-10
									hover:bg-main-blue-660
								"
								>Sign up
							</router-link>
							<p class="mt-6 text-center text-base font-medium text-gray-200">
								Existing user?
								{{ ' ' }}
								<router-link to="/sign-in" class="text-main-blue-660 hover:text-main-blue-700">Sign in</router-link>
							</p>
							<br />
							<div class="text-center"></div>
						</div>
					</div>
				</div>
			</PopoverPanel>
		</transition>
	</Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue';
import { isDarkMode, toggleDarkMode } from '~/utils/darkMode';
</script>
