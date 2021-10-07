import axios from 'axios';
import { apiUrl } from '~/env';
import {
	clanAdd,
	clanAdded,
	clanRemove,
	clanRemoved,
	playerAdd,
	playerAdded,
	playerRemove,
	playerRemoved,
} from '~/interfaces/userProfile';
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

	async addClan(data: clanAdd, authToken: string) {
		return axios.post<clanAdded>(`${apiUrl}/api/v1/profile/link-clan`, data, authHeaders(authToken));
	},

	async removeClan(data: clanRemove, authToken: string) {
		return axios.post<clanRemoved>(`${apiUrl}/api/v1/profile/unlink-clan`, data, authHeaders(authToken));
	},

	async addPlayer(data: playerAdd, authToken: string) {
		return axios.post<playerAdded>(`${apiUrl}/api/v1/profile/link-player`, data, authHeaders(authToken));
	},

	async removePlayer(data: playerRemove, authToken: string) {
		return axios.post<playerRemoved>(`${apiUrl}/api/v1/profile/unlink-player`, data, authHeaders(authToken));
	},
};
