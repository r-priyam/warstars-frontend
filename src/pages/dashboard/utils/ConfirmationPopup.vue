<template>
	<TransitionRoot as="template" :show="open">
		<Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="$emit('closePopUp')">
			<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<TransitionChild
					as="template"
					enter="ease-out duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="ease-in duration-200"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</TransitionChild>

				<!-- This element is to trick the browser into centering the modal contents. -->
				<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
				<TransitionChild
					as="template"
					enter="ease-out duration-300"
					enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					enter-to="opacity-100 translate-y-0 sm:scale-100"
					leave="ease-in duration-200"
					leave-from="opacity-100 translate-y-0 sm:scale-100"
					leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				>
					<div
						class="inline-block align-bottom bg-main-light-560 dark:bg-main-dark-560 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
					>
						<div class="bg-main-light-560 dark:bg-main-dark-560 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<div class="sm:flex sm:items-start">
								<div
									class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-300 sm:mx-0 sm:h-10 sm:w-10"
								>
									<heroicons-outline:exclamation class="h-6 w-6 text-red-600" aria-hidden="true" />
								</div>
								<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<DialogTitle as="h3" class="text-lg leading-6 font-bold text-red-500">
										{{ title }}
									</DialogTitle>
									<div class="mt-2">
										<p class="text-sm font-semibold text-main-textDark-600 dark:text-main-textLight-430">
											{{ description }}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="bg-main-light-560 dark:bg-main-dark-560 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<button
								v-if="!processing"
								type="button"
								class="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
								@click="$emit('confirmation')"
							>
								Confirm
							</button>
							<button
								v-else
								class="items-center text-center border border-transparent cursor-not-allowed w-full inline-flex justify-center rounded-md shadow-sm px-6 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
								disabled
							>
								<svg
									class="w-5 h-5 text-white animate-spin"
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
							</button>
							<button
								ref="cancelButtonRef"
								type="button"
								class="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium text-gray-100 bg-main-textDark-560 hover:bg-main-textLight-560 dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
								@click="$emit('closePopUp')"
							>
								Cancel
							</button>
						</div>
					</div>
				</TransitionChild>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

defineEmits(['closePopUp', 'confirmation']);
withDefaults(defineProps<{ title: string; description: string; open: boolean; processing?: boolean }>(), {
	title: '',
	description: '',
	open: false,
	processing: false,
});
</script>
