import { discordUserData } from '~/types/user';
import { RequestHandler } from './RequestHandler';
import { TClanData } from '~/types/userClan';
import { TPlayerData, TUserPlayerLink } from '~/types/userPlayer';
import {
	TAddAdmin,
	TChildClans,
	TEndChildSeason,
	TEndLeagueSeason,
	TLeagueAdmin,
	TLeagueRegister,
	TNewChildSeason,
	TNewSeason,
	TRegisterChild,
	TRegisterDivision,
	TRemoveAdmin,
	TSeasoncClanAdd,
	TUpdateAdminPermission,
} from '~/types/leagues';

export class RESTManager {
	private readonly handler: RequestHandler;

	public constructor() {
		this.handler = new RequestHandler();
	}

	// user
	public user() {
		return this.handler.request<discordUserData>('/discord/user');
	}

	public checkAuthenticated() {
		return this.handler.request('/discord/check');
	}

	public logOut() {
		// https://github.com/fastify/fastify/issues/419#issuecomment-341091497
		return this.handler.request('/discord/logout', 'POST', '{}');
	}

	// user clan
	public clans() {
		return this.handler.request<TClanData[]>('/account/clan/clans');
	}

	public addClan(clanTag: string) {
		return this.handler.request('/account/clan/link-clan', 'POST', JSON.stringify({ clanTag: clanTag }));
	}

	public removeClan(clanTag: string) {
		return this.handler.request('/account/clan/remove-clan', 'DELETE', JSON.stringify({ clanTag: clanTag }));
	}

	// user player
	public players() {
		return this.handler.request<TPlayerData[]>('/account/player/players');
	}

	public addPlayer(data: TUserPlayerLink) {
		return this.handler.request('/account/player/link-player', 'POST', JSON.stringify(data));
	}

	public removePlayer(playerTag: string) {
		return this.handler.request('/account/player/unlink-player', 'DELETE', JSON.stringify({ playerTag: playerTag }));
	}

	// admin
	public getAdmins(leagueId: number) {
		return this.handler.request<TLeagueAdmin[]>(`/league/admin/admins/${leagueId}`)
	}

	public addAdmin (payload: TAddAdmin) {
		return this.handler.request('/league/admin/add-admin', 'POST', JSON.stringify(payload))
	}

	public updateAdminPermission (payload: TUpdateAdminPermission) {
		return this.handler.request('/league/admin/update-permission', 'PUT', JSON.stringify(payload))
	}

	public removeAdmin (payload: TRemoveAdmin) {
		return this.handler.request('/league/admin/remove-admin', 'DELETE', JSON.stringify(payload))
	}

	// league core
	public getUserLeaguePermissions() {
		return this.handler.request('/league/core/user-league-permissions');
	}

	public getUserLeagueData() {
		return this.handler.request('/league/core/user-leagues');
	}

	// league register
	public registerLeague(data: TLeagueRegister) {
		return this.handler.request('/league/register/league', 'POST', JSON.stringify(data));
	}

	public registerChildLeague(data: TRegisterChild) {
		return this.handler.request('/league/register/child-league', 'POST', JSON.stringify(data));
	}

	public registerChildDivision(data: TRegisterDivision) {
		return this.handler.request('/league/register/child-division', 'POST', JSON.stringify(data));
	}

	// league season
	public getSeasonChildInfo(seasonId: number) {
		// TODO: add type
		return this.handler.request(`/league/season/child-info/${seasonId}`);
	}

	public getLeagueChildClans(childId: number, seasonId: number) {
		return this.handler.request<TChildClans | []>(`/league/season/child-clans/${childId}/${seasonId}`);
	}

	public startNewSeason(data: TNewSeason) {
		return this.handler.request('/league/season/new', 'POST', JSON.stringify(data));
	}

	public startNewChildSeason(data: TNewChildSeason) {
		return this.handler.request('/league/season/new-child', 'POST', JSON.stringify(data));
	}

	public endSeason(data: TEndLeagueSeason) {
		return this.handler.request('/league/season/end', 'PUT', JSON.stringify(data));
	}

	public endChildSeason(data: TEndChildSeason) {
		return this.handler.request('/league/season/end-child', 'PUT', JSON.stringify(data));
	}

	public addSeasonClans(data: TSeasoncClanAdd) {
		return this.handler.request('/league/season/add-clans', 'POST', JSON.stringify(data));
	}

	public removeSeasonClan(data: TChildClans) {
		return this.handler.request('/league/season/remove-clan', 'DELETE', JSON.stringify({ data: data }));
	}
}
