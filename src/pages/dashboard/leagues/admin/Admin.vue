<template><div></div></template>

<script setup lang="ts">
import { checkLeague } from '~/utils/leagueUtils';

defineComponent({ name: 'LeagueAdmin' });

onBeforeMount(() => checkLeague());
</script>
