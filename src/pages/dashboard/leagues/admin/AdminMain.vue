<template>
    <div>
        <PopUp
            title="Remove Admin"
            :description="`Are you sure to remove ${selectedAdmin.name} as an admin for ${leagueStore.getLeagueLocalConfig!.league.name}?`"
            :open="showPopUp"
            :processing="popUpProcessing"
            @close-pop-up="() => (showPopUp = false)"
            @confirmation="async () => await removeAdmin()" />

        <AddAdmin
            :open="addDialog"
            :processing="addProcessing"
            @close-pop-up="() => (addDialog = false)"
            @add-admin="async (payload) => await addAdmin(payload)" />

        <EditPermissions
            :open="editDialog"
            :processing="editProcessing"
            :name="editAdmin.name"
            :permissions="editAdmin.permissions"
            @close-pop-up="() => (editDialog = false)"
            @update-admin="async (newPermissions) => await editPermissions(newPermissions)" />

        <LoadingSpinner v-if="leagueStore.fetchingLeagueAdmins" />

        <div
            v-if="!leagueStore.fetchingLeagueAdmins && leagueStore.leagueAdmins?.length"
            class="mx-auto bg-main-light-530 px-4 dark:bg-main-dark-500">
            <div class="mx-auto max-w-4xl">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-black dark:border-white"></div>
                    </div>
                    <div class="relative flex justify-start">
                        <span
                            class="bg-main-light-430 pl-2 pr-2 text-lg font-bold text-main-textDark-600 dark:bg-main-dark-600 dark:text-main-textLight-530">
                            League Admins
                        </span>
                    </div>
                </div>

                <div v-for="admin in leagueStore.leagueAdmins" :key="admin.id">
                    <div class="group pt-6 sm:flex lg:items-end">
                        <div class="mb-4 flex shrink-0 items-center justify-center sm:mb-0 sm:mr-4">
                            <img
                                v-if="admin.avatar"
                                class="mb-2 h-24 w-24 rounded-md object-contain md:h-32 md:w-32"
                                :src="`https://cdn.discordapp.com/avatars/${admin.discordId}/${admin.avatar}.png?size=1024`"
                                alt="user-avatar" />
                            <img
                                v-else
                                class="mb-2 h-24 w-24 rounded-md object-contain md:h-32 md:w-32"
                                src="/utility/No_Avatar.png"
                                alt="user-avatar" />
                        </div>

                        <div class="h-32 w-full">
                            <div class="absolute right-2 mt-20 ml-auto inline-flex items-end justify-end lg:p-2">
                                <button v-if="admin.headAdmin" @click="addDialog = true">
                                    <span
                                        class="-mr-auto inline-flex rounded-full bg-main-light-430 px-3 py-1 text-sm text-main-textDark-600 dark:bg-main-dark-600 dark:text-main-textLight-530"
                                        ><IconHelper icon="ic:sharp-person-add-alt" icon-style="mr-1 h-5 w-5 text-green-500" />
                                        <span class="font-semibold">Add</span>
                                    </span>
                                </button>
                                <button
                                    v-if="user.userData.discordId === headAdmin && !admin.headAdmin"
                                    class="mr-2"
                                    @click="
                                        editAdmin = {
                                            name: admin.username,
                                            adminId: admin.id,
                                            permissions: admin.permissions,
                                            leagueId: admin.leagueId
                                        };
                                        editDialog = true;
                                    ">
                                    <span
                                        class="-mr-auto inline-flex rounded-full bg-main-light-430 px-3 py-1 text-sm text-main-textDark-600 dark:bg-main-dark-600 dark:text-main-textLight-530"
                                        ><IconHelper icon="mdi:lead-pencil" icon-style="mr-1 h-5 w-5 text-yellow-500" />
                                        <span class="font-semibold">Edit</span>
                                    </span>
                                </button>
                                <button
                                    v-if="user.userData.discordId === headAdmin && !admin.headAdmin"
                                    @click="
                                        selectedAdmin = { name: admin.username, adminId: admin.id, leagueId: admin.leagueId };
                                        showPopUp = true;
                                    ">
                                    <span
                                        class="-mr-auto inline-flex rounded-full bg-main-light-430 px-3 py-1 text-sm text-main-textDark-600 dark:bg-main-dark-600 dark:text-main-textLight-530"
                                        ><IconHelper icon="ic:sharp-person-remove-alt-1" icon-style="mr-1 h-5 w-5 text-red-500" />
                                        <span class="font-semibold">Remove</span>
                                    </span>
                                </button>
                            </div>
                            <p class="text-xl font-extrabold text-main-textDark-500 dark:text-main-textLight-500 lg:text-2xl">
                                {{ admin.username }}
                                <span class="inline-flex">
                                    <span class="text-sm font-bold text-main-textDark-530 dark:text-main-textLight-530">
                                        #{{ admin.discriminator }}
                                    </span>
                                    <IconHelper v-if="admin.headAdmin" icon="ph:crown-fill" icon-style="ml-2 h-5 w-5 text-yellow-500" />
                                </span>
                            </p>
                            <p class="mt-3 text-sm font-semibold text-gray-800 dark:text-gray-200 lg:text-base">
                                <span class="text-sm font-bold text-main-textDark-560 dark:text-main-textLight-560 lg:text-base"
                                    >Discord ID:
                                </span>
                                {{ admin.discordId }}
                            </p>
                            <p class="text-sm font-semibold text-gray-800 dark:text-gray-200 lg:text-base">
                                <span class="text-sm font-bold text-main-textDark-560 dark:text-main-textLight-560 lg:text-base"
                                    >Added At: </span
                                >{{ dayjs(admin.addedAt).format('MMM DD, YYYY') }}
                            </p>
                        </div>
                    </div>
                    <div class="mt-3 border-t-2 border-gray-400 dark:border-gray-100"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

import { HTTPError, RESTManager } from '~/api';
import PopUp from '~/pages/dashboard/utils/ConfirmationPopup.vue';
import { leagueManagement } from '~/stores/leagueManagement';
import { notifications } from '~/stores/notifications';
import { userStore } from '~/stores/user';
import { CheckLeague } from '~/utils/leagueUtils';

import AddAdmin from './AddAdmin.vue';
import EditPermissions from './EditPermissions.vue';

const leagueStore = leagueManagement();
const user = userStore();

onBeforeMount(() => CheckLeague());
onMounted(async () => await leagueStore.getLeagueAdmins(leagueStore.getLeagueLocalConfig!.league.leagueId));

const API = new RESTManager();
const notification = notifications();
let showPopUp = $ref(false);
let popUpProcessing = $ref(false);

let addDialog = $ref(false);
let addProcessing = $ref(false);

let editDialog = $ref(false);
let editProcessing = $ref(false);

const selectedAdmin = $ref({ name: '', adminId: 0, leagueId: 0 });
const editAdmin = $ref({ name: '', adminId: 0, permissions: 0, leagueId: 0 });

const headAdmin = computed(() => leagueStore.leagueAdmins?.find((x) => x.headAdmin)?.discordId);

async function addAdmin(payload: { discordId: string; permissions: number[] }) {
    addProcessing = true;
    try {
        const res = await API.addAdmin({
            discordId: payload.discordId,
            leagueId: leagueStore.getLeagueLocalConfig!.league.leagueId,
            permissions: payload.permissions.includes(8) ? 8 : payload.permissions.reduce((x, y) => x + y)
        });
        if (res.ok) notification.info('Successfully added admin!');
    } catch (error) {
        if (error instanceof HTTPError) notification.error(error.message);
    } finally {
        addDialog = false;
        addProcessing = false;
    }
}

async function removeAdmin() {
    popUpProcessing = true;
    try {
        const res = await API.removeAdmin({ adminId: selectedAdmin.adminId, leagueId: selectedAdmin.leagueId });
        if (res.ok)
            notification.info(`Successfully removed ${selectedAdmin.name} from ${leagueStore.getLeagueLocalConfig!.league.name} admins`);
    } catch (error) {
        if (error instanceof HTTPError) notification.error(error.message);
    } finally {
        showPopUp = false;
        popUpProcessing = false;
    }
}

async function editPermissions(newPermissionVal: number) {
    editProcessing = true;
    try {
        const res = await API.updateAdminPermission({
            adminId: editAdmin.adminId,
            leagueId: leagueStore.getLeagueLocalConfig!.league.leagueId,
            permissions: newPermissionVal
        });
        if (res.ok) notification.info(`Successfully updated ${editAdmin.name} for ${leagueStore.getLeagueLocalConfig!.league.name}`);
    } catch (error) {
        if (error instanceof HTTPError) notification.error(error.message);
    } finally {
        editProcessing = false;
        editDialog = false;
    }
}
</script>
