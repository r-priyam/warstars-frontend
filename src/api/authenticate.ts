import axios from 'axios';
import { apiUrl } from '~/env';
import { authHeaders } from '~/utils/authHeader';

export const auth = {
	async logIn(email: string, password: string) {
		const params = new URLSearchParams();
		params.append('username', email); // send email as username because of fast api oauthform
		params.append('password', password);

		return axios.post(`${apiUrl}/api/v1/login`, params);
	},

	async logOut(authToken: string) {
		return axios.post(`${apiUrl}/api/v1/logout`, authHeaders(authToken));
	},
};
