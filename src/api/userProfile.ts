import axios from 'axios';
import { apiUrl } from '~/env';
import { clanAddRemove, playerAddRemove } from '~/interfaces/userProfile';
import { authHeaders } from '~/utils/authHeader';

export const userProfile = {
	async me(authToken: string) {
		return axios.get(`${apiUrl}/api/v1/profile/@me`, authHeaders(authToken));
	},

	async players(authToken: string) {
		return axios.get(`${apiUrl}/api/v1/profile/players`, authHeaders(authToken));
	},

	async clans(authToken: string) {
		return axios.get(`${apiUrl}/api/v1/profile/clans`, authHeaders(authToken));
	},

	async addClan(data: clanAddRemove, authToken: string) {
		return axios.post<clanAddRemove>(`${apiUrl}/api/v1/profile/link-clan`, data, authHeaders(authToken));
	},

	async removeClan(data: clanAddRemove, authToken: string) {
		return axios.post<clanAddRemove>(`${apiUrl}/api/v1/profile/unlink-clan`, data, authHeaders(authToken));
	},

	async addPlayer(data: playerAddRemove, authToken: string) {
		return axios.post<playerAddRemove>(`${apiUrl}/api/v1/profile/link-player`, data, authHeaders(authToken));
	},

	async removePlayer(data: playerAddRemove, authToken: string) {
		return axios.post<playerAddRemove>(`${apiUrl}/api/v1/profile/unlink-player`, data, authHeaders(authToken));
	},
};
