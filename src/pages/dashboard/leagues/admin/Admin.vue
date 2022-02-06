<template><div></div></template>

<script lang="ts">
export default defineComponent({ name: 'LeagueAdmin' });
</script>

<script setup lang="ts">
import { checkLeague } from '~/utils/leagueUtils';

onBeforeMount(() => checkLeague());
</script>
