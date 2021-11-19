export function setCookie(name: string, val: string) {
	const date = new Date();
	const value = val;

	// Set cookie to expire in 2 hours.
	date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
	document.cookie = `${name}=${value}; secure; expires=${date.toUTCString()}; path=/`;
}

export function getCookie(cookieName: string): string {
	const name = `${cookieName}=`;
	const cookies = decodeURIComponent(document.cookie).split(';');
	let cookieValue;

	cookies.forEach((value) => {
		if (value.indexOf(name) === 0) cookieValue = value.substring(name.length);
	});
	return String(cookieValue);
}

export function deleteCookie(name: string) {
	const date = new Date();

	// Set it expire in -1 day.
	date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=; expires=${date.toUTCString()}; path=/`;
}
