<template>
    <footer class="relative border-t-2 border-main-light-600 bg-main-light-500 dark:border-main-dark-460 dark:bg-main-dark-500">
        <div class="container mx-auto flex flex-col items-center px-2 py-2.5 sm:flex-row">
            <a class="title-font flex items-center justify-center font-medium text-gray-900 md:justify-start">
                <span class="ml-3 text-xl font-bold text-main-textDark-600 dark:text-main-textLight-530">WarStars</span>
            </a>
            <p
                class="mt-4 text-sm font-semibold text-main-textDark-630 dark:text-main-textLight-560 sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4"
            >
                &copy; {{ new Date().getFullYear() }} WarStars. All rights reserved.
            </p>
            <span class="mt-4 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start">
                <a class="text-gray-100">
                    <mdi:discord class="text-main-textDark-600 dark:text-main-textLight-530" />
                </a>
                <a class="ml-3 text-gray-100">
                    <mdi:patreon class="text-main-textDark-600 dark:text-main-textLight-530" />
                </a>
                <a class="ml-3 text-gray-100">
                    <fa:envelope class="text-main-textDark-600 dark:text-main-textLight-530" />
                </a>
            </span>
        </div>
    </footer>
</template>

<script lang="ts">
export default defineComponent({ name: 'SiteFooter' });
</script>
