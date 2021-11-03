import HTTP from '~/api';
import { clanAddRemove, playerAddRemove } from '~/interfaces/userProfile';
import { authHeaders } from '~/utils/authHeader';

export const userProfile = {
	async me(authToken: string) {
		return HTTP.get('/api/v1/profile/@me', authHeaders(authToken));
	},

	async players(authToken: string) {
		return HTTP('/api/v1/profile/players', authHeaders(authToken));
	},

	async clans(authToken: string) {
		return HTTP('/api/v1/profile/clans', authHeaders(authToken));
	},

	async addClan(data: clanAddRemove, authToken: string) {
		return HTTP.post<clanAddRemove>('/profile/link-clan', data, authHeaders(authToken));
	},

	async removeClan(data: clanAddRemove, authToken: string) {
		return HTTP.post<clanAddRemove>('/profile/unlink-clan', data, authHeaders(authToken));
	},

	async addPlayer(data: playerAddRemove, authToken: string) {
		return HTTP.post<playerAddRemove>('/profile/link-player', data, authHeaders(authToken));
	},

	async removePlayer(data: playerAddRemove, authToken: string) {
		return HTTP.post<playerAddRemove>('/profile/unlink-player', data, authHeaders(authToken));
	},
};
