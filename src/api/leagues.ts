import HTTP from '~/api';
import { TLeagueRegister } from '~/types/leagues';

export const APILeague = {
	async registerLeague(data: TLeagueRegister) {
		return HTTP.post('/league/register', data);
	},

	async getUserLeaguePermissions() {
		return HTTP.get('/league/user-permissions');
	},

	async getUserLeagueData() {
		return HTTP.get('league/user-leagues');
	},
};
