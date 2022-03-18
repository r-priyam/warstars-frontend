import type {
    TAddAdmin,
    TChildClans,
    TClanData,
    TDiscordUserData,
    TEndChildSeason,
    TEndLeagueSeason,
    TLeagueAdmin,
    TLeagueRegister,
    TNewChildSeason,
    TNewSeason,
    TPlayerData,
    TRegisterChild,
    TRegisterDivision,
    TRemoveAdmin,
    TSeasonClanAdd,
    TUpdateAdminPermission,
    TUserPlayerLink
} from '~/types';

import { RequestHandler } from './RequestHandler';

export class RESTManager {
    private readonly handler: RequestHandler;

    public constructor() {
        this.handler = new RequestHandler();
    }

    // user
    public user() {
        return this.handler.request<TDiscordUserData>('/discord/user');
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
        return this.handler.request('/account/clan/link-clan', 'POST', JSON.stringify({ clanTag }));
    }

    public removeClan(clanTag: string) {
        return this.handler.request('/account/clan/remove-clan', 'DELETE', JSON.stringify({ clanTag }));
    }

    // user player
    public players() {
        return this.handler.request<TPlayerData[]>('/account/player/players');
    }

    public addPlayer(payload: TUserPlayerLink) {
        return this.handler.request('/account/player/link-player', 'POST', JSON.stringify(payload));
    }

    public removePlayer(playerTag: string) {
        return this.handler.request('/account/player/unlink-player', 'DELETE', JSON.stringify({ playerTag }));
    }

    // admin
    public getAdmins(leagueId: number) {
        return this.handler.request<TLeagueAdmin[]>(`/league/admin/admins/${leagueId}`);
    }

    public addAdmin(payload: TAddAdmin) {
        return this.handler.request('/league/admin/add-admin', 'POST', JSON.stringify(payload));
    }

    public updateAdminPermission(payload: TUpdateAdminPermission) {
        return this.handler.request('/league/admin/update-permission', 'PUT', JSON.stringify(payload));
    }

    public removeAdmin(payload: TRemoveAdmin) {
        return this.handler.request('/league/admin/remove-admin', 'DELETE', JSON.stringify(payload));
    }

    // league core
    public getUserLeaguePermissions() {
        return this.handler.request('/league/core/user-league-permissions');
    }

    public getUserLeagueData() {
        return this.handler.request('/league/core/user-leagues');
    }

    // league register
    public registerLeague(payload: TLeagueRegister) {
        return this.handler.request('/league/register/league', 'POST', JSON.stringify(payload));
    }

    public registerChildLeague(payload: TRegisterChild) {
        return this.handler.request('/league/register/child-league', 'POST', JSON.stringify(payload), payload.leagueId);
    }

    public registerChildDivision(payload: TRegisterDivision) {
        return this.handler.request('/league/register/child-division', 'POST', JSON.stringify(payload), payload.leagueId);
    }

    // league season
    public getSeasonChildInfo(seasonId: number) {
        // TODO: add type
        return this.handler.request(`/league/season/child-info/${seasonId}`);
    }

    public getLeagueChildClans(childId: number, seasonId: number) {
        return this.handler.request<TChildClans[] | []>(`/league/season/child-clans/${childId}/${seasonId}`);
    }

    public startNewSeason(payload: TNewSeason) {
        return this.handler.request('/league/season/new', 'POST', JSON.stringify(payload), payload.leagueId);
    }

    public startNewChildSeason(payload: TNewChildSeason) {
        return this.handler.request('/league/season/new-child', 'POST', JSON.stringify(payload), payload.leagueId);
    }

    public endSeason(payload: TEndLeagueSeason) {
        return this.handler.request('/league/season/end', 'PUT', JSON.stringify(payload), payload.leagueId);
    }

    public endChildSeason(payload: TEndChildSeason) {
        return this.handler.request('/league/season/end-child', 'PUT', JSON.stringify(payload), payload.leagueId);
    }

    public addSeasonClans(payload: TSeasonClanAdd) {
        return this.handler.request('/league/season/add-clans', 'POST', JSON.stringify(payload), payload.leagueId);
    }

    public removeSeasonClan(payload: TChildClans) {
        return this.handler.request('/league/season/remove-clan', 'DELETE', JSON.stringify(payload), payload.leagueId);
    }
}
