import HTTP from '~/api';
import { TPlayerData, TUserPlayerLink } from '~/types/userPlayer';

export const APIUserPlayer = {
	async players() {
		return HTTP.get<TPlayerData[]>('/account/players');
	},

	async addPlayer(data: TUserPlayerLink) {
		return HTTP.post('/account/link-player', data);
	},

	async removePlayer(playerTag: string) {
		return HTTP.delete('/account/unlink-player', { data: { player_tag: playerTag } });
	},
};
