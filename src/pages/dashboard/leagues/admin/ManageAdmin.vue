<template><div></div></template>

<script setup lang="ts">
import { checkLeague } from '~/utils/leagueUtils';

onBeforeMount(checkLeague);
</script>
