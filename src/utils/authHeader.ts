// Function to set the auth token cookie as header to verify process.

export function authHeaders(authToken: string) {
	return {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	};
}

// Function to change password into HEX to send over API route.
// Since password hasing is done at server side, so a way to send the password in HEX format.
// In last, No method is safe on the internet.

export function passwordToHex(password: string) {
	let result = '';
	for (let i = 0; i < password.length; i++) {
		result += password.charCodeAt(i).toString(16);
	}
	return result;
}
