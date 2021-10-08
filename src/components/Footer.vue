<!-- <span>&copy; {{ new Date().getFullYear() }} LeagueStats.</span> -->
<template>
	<footer class="border-t-2 bg-main-primary-560 border-main-primary-400">
		<div class="container flex flex-col items-center px-2 py-4 mx-auto sm:flex-row">
			<a class="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
				<span class="ml-3 text-xl">WarStars</span>
			</a>
			<p class="mt-4 text-sm text-gray-100 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0">
				&copy; {{ new Date().getFullYear() }} WarStars. All rights reserved.
			</p>
			<span class="inline-flex justify-center mt-4 sm:ml-auto sm:mt-0 sm:justify-start">
				<a class="text-gray-100">
					<mdi:discord />
				</a>
				<a class="ml-3 text-gray-100">
					<mdi:patreon />
				</a>
				<a class="ml-3 text-gray-100">
					<fa:envelope />
				</a>
			</span>
		</div>
	</footer>
</template>
