<script setup lang="ts">
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

import { notifications } from '~/stores/notifications';
import { PermissionsConstant } from '~/types/Leagues';

const emit = defineEmits(['closePopUp', 'addAdmin']);
const props = defineProps({
    open: { type: Boolean, required: true },
    processing: { type: Boolean, required: true },
    permissions: Number
});

let administratorSelected = $ref(false);
let newAdmin = $ref({ discordId: '', permissions: [0] });

watch(
    () => newAdmin.permissions,
    (newValue: number[]) => {
        if (newValue.includes(8)) {
            administratorSelected = true;
        } else {
            administratorSelected = false;
        }
    }
);
watch(
    () => props.open,
    (newValue: boolean) => {
        if (!newValue) {
            administratorSelected = false;
            newAdmin = { discordId: '', permissions: [] };
        }
    }
);

function handleConfirmation() {
    if (!newAdmin.discordId) {
        return notifications().warning('Enter new admin discord id');
    }
    if (newAdmin.permissions.length === 1) {
        return notifications().warning('No permissions selected!');
    }
    emit('addAdmin', newAdmin);
}
</script>

<template>
    <TransitionRoot as="template" :show="props.open">
        <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" @close="$emit('closePopUp', true)">
            <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100"
                    leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div
                        class="inline-block transform overflow-hidden rounded-lg bg-main-light-560 text-left align-bottom shadow-xl transition-all dark:bg-main-dark-560 sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                        <div class="bg-main-light-560 px-4 pt-5 pb-4 dark:bg-main-dark-560 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div
                                    class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-300 sm:mx-0 sm:h-10 sm:w-10">
                                    <IconHelper icon="gridicons:notice-outline" icon-style="h-6 w-6 text-green-600" />
                                </div>
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle as="h3" class="text-lg font-bold leading-6 text-green-500"> Add Admin </DialogTitle>
                                    <div class="mt-2">
                                        <p class="text-sm font-semibold text-main-textDark-500 dark:text-main-textLight-500">
                                            Enter Admin Discord Id and select Permissions to give.
                                        </p>
                                    </div>
                                    <div>
                                        <input
                                            v-model="newAdmin.discordId"
                                            type="text"
                                            autocomplete="off"
                                            required="true"
                                            class="mt-2 h-9 w-full appearance-none rounded-lg border border-gray-300 px-3 text-gray-900 placeholder-gray-500 shadow-sm focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                            placeholder="Discord Id (Required)" />
                                    </div>
                                    <div v-for="(name, key) in Object.keys(PermissionsConstant)" :key="key" class="mt-2 text-left">
                                        <div>
                                            <label class="inline-flex items-center">
                                                <input
                                                    :id="name"
                                                    v-model="newAdmin.permissions"
                                                    :value="PermissionsConstant[name]"
                                                    type="checkbox"
                                                    :disabled="name !== 'Administrator' && administratorSelected"
                                                    class="focus:none rounded text-green-600 shadow-sm focus:ring-transparent focus:ring-offset-0 disabled:opacity-50" />
                                                <span
                                                    class="ml-2 text-sm font-semibold text-main-textDark-530 dark:text-main-textLight-530">
                                                    {{ name }}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-main-light-560 px-4 py-3 dark:bg-main-dark-560 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                v-if="!props.processing"
                                type="button"
                                class="inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                @click="handleConfirmation">
                                Confirm
                            </button>
                            <button
                                v-else
                                class="inline-flex w-full cursor-not-allowed items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-2 text-center text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                disabled>
                                <svg
                                    class="h-5 w-5 animate-spin text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </button>
                            <button
                                ref="cancelButtonRef"
                                type="button"
                                class="mt-3 inline-flex w-full justify-center rounded-md bg-main-textDark-560 px-4 py-2 text-base font-medium text-gray-100 shadow-sm hover:bg-main-textLight-560 focus:outline-none dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                @click="$emit('closePopUp')">
                                Cancel
                            </button>
                        </div>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
