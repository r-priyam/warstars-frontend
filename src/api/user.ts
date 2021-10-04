import axios from 'axios';
import { apiUrl } from '~/env';
import { IUserProfileCreate, IUserProfileUpdate } from '~/interfaces/user';
import { authHeaders } from '~/utils/authHeader';

export const user = {
	async createUser(userData: IUserProfileCreate) {
		return axios.post(`${apiUrl}/api/v1/user/sign-up`, userData);
	},

	async deleteUser(authToken: string) {
		return axios.post(`${apiUrl}/api/v1/user/delete-account`, authHeaders(authToken));
	},

	async updateUser(authToken: string, data: IUserProfileUpdate) {
		return axios.put(`${apiUrl}/api/v1/`, data, authHeaders(authToken));
	},
};
