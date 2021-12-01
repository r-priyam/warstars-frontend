import HTTP from '~/api';
import { TLeagueRegister, TRegisterChild, TRegisterDivision } from '~/types/leagues';

export const APILeague = {
	async registerLeague(data: TLeagueRegister) {
		return HTTP.post('/league/register', data);
	},

	async registerChildLeague(data: TRegisterChild) {
		return HTTP.post('/league/register/child-league', data);
	},

	async registerChildDivision(data: TRegisterDivision) {
		return HTTP.post('/league/register/division', data);
	},

	async getUserLeaguePermissions() {
		return HTTP.get('/league/user-permissions');
	},

	async getUserLeagueData() {
		return HTTP.get('league/user-leagues');
	},
};
