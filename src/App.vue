<template>
	<div class="min-h-full grid grid-layout">
		<div id="container" class="grid grid-layout-container lg:custom-scroll">
			<div class="bg-white dark:bg-[#1d1d1d]">
				<router-view />
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
