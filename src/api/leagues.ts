import HTTP from '~/api';
import { TLeagueRegister } from '~/types/leagues';

export const APILeague = {
	async registerLeague(data: TLeagueRegister) {
		return HTTP.post('/league/register', data);
	},
};
