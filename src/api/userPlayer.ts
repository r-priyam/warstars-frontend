import HTTP from '~/api';
import { TPlayerData, TUserPlayerLink } from '~/types/userPlayer';

export const APIUserPlayer = {
	async players() {
		return HTTP.get<TPlayerData[]>('/account/player/players');
	},

	async addPlayer(data: TUserPlayerLink) {
		return HTTP.post('/account/player/link-player', data);
	},

	async removePlayer(playerTag: string) {
		return HTTP.delete('/account/player/unlink-player', { data: { playerTag: playerTag } });
	},
};
