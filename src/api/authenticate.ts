import axios from 'axios';
import { apiUrl } from '~/env';
import { authHeaders } from '~/utils/authHeader';

export const auth = {
	async logIn(email: string, password: string) {
		const params = new URLSearchParams();
		params.append('username', email);
		params.append('password', password);

		return axios.post(`${apiUrl}/api/v1/login`, params, { withCredentials: true });
	},

	async logOut(authToken: string) {
		return axios.post(`${apiUrl}/api/v1/logout`, authHeaders(authToken), { withCredentials: true });
	},
};
