import HTTP from '~/api';
import { TPlayeData, TUserPlayerLink } from '~/types/userPlayer';
import { authHeaders } from '~/utils/authHeader';

export const APIUserPlayer = {
	async players(authToken: string) {
		return HTTP.get<TPlayeData[]>('/account/players', authHeaders(authToken));
	},

	async addPlayer(data: TUserPlayerLink, authToken: string) {
		return HTTP.post('/account/link-player', data, authHeaders(authToken));
	},

	async removePlayer(playerTag: string, authToken: string) {
		return HTTP.delete(`/account/unlink-player/${playerTag}`, authHeaders(authToken));
	},
};
