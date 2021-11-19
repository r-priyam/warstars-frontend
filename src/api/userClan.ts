import HTTP from '~/api';
import { TClanData } from '~/types/userClan';
import { authHeaders } from '~/utils/authHeader';

export const APIUserClan = {
	async clans(authToken: string) {
		return HTTP.get<TClanData[]>('/account/clans', authHeaders(authToken));
	},

	async addClan(clanTag: string, authToken: string) {
		return HTTP.post('/account/link-clan', { clan_tag: clanTag }, authHeaders(authToken));
	},

	async removeClan(clanTag: string, authToken: string) {
		return HTTP.delete(`/account/unlink-clan/${clanTag}`, authHeaders(authToken));
	},
};
