import HTTP from '~/api';
import { TClanData } from '~/types/userClan';

export const APIUserClan = {
	async clans() {
		return HTTP.get<TClanData[]>('/account/clans');
	},

	async addClan(clanTag: string) {
		return HTTP.post('/account/link-clan', { clan_tag: clanTag });
	},

	async removeClan(clanTag: string) {
		return HTTP.delete('/account/unlink-clan', { data: { clan_tag: clanTag } });
	},
};
