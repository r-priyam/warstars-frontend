import HTTP from '~/api';
import { TPlayeData, TUserPlayerLink } from '~/types/userPlayer';

export const APIUserPlayer = {
	async players() {
		return HTTP.get<TPlayeData[]>('/account/players');
	},

	async addPlayer(data: TUserPlayerLink) {
		return HTTP.post('/account/link-player', data);
	},

	async removePlayer(playerTag: string) {
		return HTTP.delete('/account/unlink-player', { data: { player_tag: playerTag } });
	},
};
