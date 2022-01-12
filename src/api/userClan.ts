import HTTP from '~/api';
import { TClanData } from '~/types/userClan';

export const APIUserClan = {
	async clans() {
		return HTTP.get<TClanData[]>('/account/clan/clans');
	},

	async addClan(clanTag: string) {
		return HTTP.post('/account/clan/link-clan', { clanTag: clanTag });
	},

	async removeClan(clanTag: string) {
		return HTTP.delete('/account/clan/remove-clan', { data: { clanTag: clanTag } });
	},
};
