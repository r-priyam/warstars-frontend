<script setup lang="ts">
withDefaults(defineProps<{ processing: boolean }>(), {
    processing: false
});
</script>

<template>
    <button
        v-if="!processing"
        class="mt-10 rounded border border-transparent bg-main-textDark-560 py-2 font-bold text-white shadow-md transition duration-200 hover:bg-main-textLight-560 hover:shadow-xl dark:bg-main-textLight-560 dark:hover:bg-main-textDark-560"
        type="submit">
        Proceed
    </button>
    <button
        v-else
        class="mt-10 inline-flex cursor-not-allowed items-center justify-center rounded border border-transparent bg-main-textLight-560 py-2 text-center font-bold text-white dark:bg-main-textDark-560"
        disabled>
        <svg class="mr-3 -ml-1 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing
    </button>
</template>
