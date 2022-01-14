import HTTP from '~/api';
import {
	TChildClans,
	TEndChildSeason,
	TEndLeagueSeason,
	TLeagueRegister,
	TNewChildSeason,
	TNewSeason,
	TRegisterChild,
	TRegisterDivision,
	TSeasoncClanAdd,
} from '~/types/leagues';

export const APILeague = {
	// admin
	// core
	async getUserLeaguePermissions() {
		return HTTP.get('/league/core/user-league-permissions');
	},

	async getUserLeagueData() {
		return HTTP.get('league/core/user-leagues');
	},

	// register
	async registerLeague(data: TLeagueRegister) {
		return HTTP.post('/league/register/league', data);
	},

	async registerChildLeague(data: TRegisterChild) {
		return HTTP.post('/league/register/child-league', data);
	},

	async registerChildDivision(data: TRegisterDivision) {
		return HTTP.post('/league/register/child-division', data);
	},

	// season
	async getSeasonChildInfo(seasonId: number) {
		// TODO: add type
		return HTTP.get(`/league/season/child-info/${seasonId}`)
	},

	async getLeagueChildClans(childId: number, seasonId: number) {
		return HTTP.get<TChildClans | []>(`/league/season/child-clans/${childId}/${seasonId}`);
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

	async addSeasonClans(data: TSeasoncClanAdd) {
		return HTTP.post('/league/season/add-clans', data);
	},

	async removeSeasonClan(data: TChildClans) {
		return HTTP.delete('/league/season/remove-clan', { data: data });
	},
};
