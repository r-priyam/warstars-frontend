<script setup lang="ts">
useHead({
    title: 'WarStars',
    meta: [{ name: 'description', content: 'Complete package for  Clash of Clans tournament leagues.' }]
});

const router = useRouter();
const showBetaNotice = useStorage('beta-warning', true);
</script>

<template>
    <div v-if="showBetaNotice" class="bg-main-light-560 dark:bg-main-dark-560">
        <div class="mx-auto max-w-7xl px-2 py-1 sm:px-6 lg:px-6">
            <div class="flex flex-wrap items-center justify-between">
                <div class="flex w-0 flex-1 items-center">
                    <span class="flex rounded-lg bg-main-light-500 p-2 dark:bg-main-dark-500">
                        <IconHelper icon="heroicons-outline:speakerphone" icon-style="h-6 w-6 text-red-500" />
                    </span>
                    <p class="ml-3 truncate font-medium text-red-500">
                        <span class="md:hidden">Site is under active development</span>
                        <span class="hidden text-red-500 md:inline">
                            Site is under heavy development and it doesn't represent the final version. Thank you!
                        </span>
                    </p>
                </div>
                <div class="order-2 shrink-0 sm:order-3 sm:ml-3">
                    <button
                        type="button"
                        class="-mr-1 flex rounded-md p-2 hover:bg-main-light-500 focus:outline-none dark:hover:bg-main-dark-500 sm:-mr-2"
                        @click="showBetaNotice = false">
                        <span class="sr-only">Dismiss</span>
                        <IconHelper icon="heroicons-outline:x" icon-style="h-6 w-6 text-red-500" />
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="grid-layout grid min-h-[calc(100vh-57.98px)]">
        <Navbar />
        <div id="container" class="grid-layout-container grid">
            <div class="bg-main-light-600 dark:bg-main-dark-630">
                <div
                    v-if="!router.currentRoute.value.path.includes('/dashboard')"
                    class="mx-auto min-h-full max-w-6xl bg-main-light-560 dark:bg-main-dark-560">
                    <router-view />
                </div>
                <div
                    v-if="router.currentRoute.value.path.includes('/dashboard')"
                    class="mx-auto max-w-6xl bg-main-light-560 dark:bg-main-dark-560">
                    <router-view />
                </div>
                <Footer v-if="!router.currentRoute.value.path.includes('/dashboard')" />
            </div>
        </div>
    </div>
</template>

<style>
.grid-layout {
    grid-template-rows: auto 1fr;
}
.grid-layout-container {
    grid-template-rows: 1fr auto;
}
</style>
