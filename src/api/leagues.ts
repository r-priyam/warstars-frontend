import HTTP from '~/api';
import {
	TEndChildSeason,
	TEndLeagueSeason,
	TLeagueRegister,
	TNewChildSeason,
	TNewSeason,
	TRegisterChild,
	TRegisterDivision,
} from '~/types/leagues';

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

	async startNewSeason(data: TNewSeason) {
		return HTTP.post('/league/season/new', data);
	},

	async startNewChildSeason(data: TNewChildSeason) {
		return HTTP.post('/league/season/new-child', data);
	},

	async endSeason(data: TEndLeagueSeason) {
		return HTTP.put('/league/season/end', data);
	},

	async endChildSeason(data: TEndChildSeason) {
		return HTTP.put('/league/season/end-child', data);
	},
};
