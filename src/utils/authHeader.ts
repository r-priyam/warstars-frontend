export function authHeaders(authToken: string) {
	return {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	};
}
