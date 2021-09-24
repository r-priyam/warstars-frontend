import axios from 'axios';
import { apiUrl } from '~/env';
import { IUserProfileCreate } from '~/interfaces/user';

export const api = {
	async logIn(email: string, password: string) {
		const params = new URLSearchParams();
		params.append('username', email); // send email as username because of fast api oauthform
		params.append('password', password);

		return axios.post(`${apiUrl}/api/v1/login`, params);
	},

	async logOut() {
		return axios.post(`${apiUrl}/api/v1/logout`);
	},

	async createUser(userData: IUserProfileCreate) {
		return axios.post(`${apiUrl}/api/v1/user/sign-up`, userData);
	},

	async deleteUser() {
		return axios.post(`${apiUrl}/api/v1/user/delete-account`);
	},

	async updateUser() {
		return axios.post(``);
	},
};
