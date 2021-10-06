<!-- <span>&copy; {{ new Date().getFullYear() }} LeagueStats.</span> -->
<template>
	<footer class="bg-main-primary-560 border-t-2 border-main-primary-400">
		<div class="container px-2 py-4 mx-auto flex items-center sm:flex-row flex-col">
			<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
				<span class="ml-3 text-xl">WarStars</span>
			</a>
			<p class="text-sm text-gray-100 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
				&copy; {{ new Date().getFullYear() }} WarStars. All rights reserved.
			</p>
			<span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
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
