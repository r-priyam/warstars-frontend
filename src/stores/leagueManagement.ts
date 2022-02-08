import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { notifications } from './notifications';
import { HTTPError, RESTManager } from '~/api';
import type {
	TChildClans,
	TEndChildSeason,
	TEndLeagueSeason,
	TLeagueManagement,
	TLocalLeagueConfig,
	TLocalLeagueData,
	TNewChildSeason,
	TNewSeason,
	TRegisterChild,
	TRegisterDivision,
	TSeasoncClanAdd,
	TUserLeagueData,
} from '~/types';

interface TPermsData {
	epoch: string;
	value: string;
}

const API = new RESTManager();

export const leagueManagement = defineStore({
	id: 'leagueManagement',

	state: (): TLeagueManagement => ({
		permissions: {},
		childClans: {},
		childRegisterProcess: false,
		divisionRegisterProcess: false,
		newSeasonProcess: false,
		childSeasonProcess: false,
		seasonClanAddProcess: false,
		leagueDataRefreshProcess: false,
		fetchingChildClans: false,
		clanRemoveProcess: false,
	}),

	getters: {
		getLeagueLocalConfig: (state) => {
			// eslint-disable-next-line no-lone-blocks
			{
				if (Object.keys(state.permissions).length > 1) {
					const data = useStorage('selected-league-config', {
						league: { leagueId: 0, name: '', abbreviation: '', seasonId: null, iconUrl: '', seasonActive: null },
						child: { id: 0, name: '', abbreviation: '', iconUrl: '', seasonId: null, seasonActive: null },
						division: { id: 0, childId: 0, seasonId: 0, name: '', abbreviation: '', iconUrl: null, clansCount: 0 },
					});
					const dataToReturn: TLocalLeagueConfig = {
						league: data.value.league,
						child: data.value.child,
						division: data.value.division,
					};
					return dataToReturn;
				}
				localStorage.removeItem('selected-league-config');
				return null;
			}
		},
	},

	actions: {
		async syncPermsToken() {
			const notification = notifications();
			try {
				const request = await API.getUserLeaguePermissions();
				// return here since API won't give any data when user is in no league.
				if (request.status !== 200) {
					this.permissions = {};
					Cookies.remove('_league_permissions');
					return;
				}
				// Here if a response is successfull and user is in No League, i mean
				// if a user permissions is null then it won't set a cookie or not it will
				// return anything so return.
				if (!Cookies.get('_league_permissions')) return Cookies.remove('_league_permissions');
				const payloadData: TPermsData = jwt_decode(Cookies.get('_league_permissions')!);
				this.permissions = payloadData as unknown as Record<string, unknown>;
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			}
		},

		async syncPermissions() {
			const permissionsCookie = Cookies.get('_league_permissions');
			if (permissionsCookie) {
				const permsPayload: TPermsData = jwt_decode(permissionsCookie);
				const checkTwoMins = Date.now() - Number(permsPayload.epoch);
				// check for permissions change per 2 minutes
				if (checkTwoMins > 120000) await this.syncPermsToken();
				else this.permissions = permsPayload as unknown as Record<string, unknown>;
			} else await this.syncPermsToken();
		},

		async refreshLeaguesData() {
			const notification = notifications();
			this.leagueDataRefreshProcess = true;
			try {
				const request = await API.getUserLeagueData();
				if (!request.data) return localStorage.removeItem('leagues-data');
				localStorage.setItem(
					'leagues-data',
					JSON.stringify({ epoch: Date.now(), value: request.data as TUserLeagueData }),
				);
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			} finally {
				this.leagueDataRefreshProcess = false;
			}
		},

		async syncLeaguesData() {
			const localLeaguesData: TLocalLeagueData = JSON.parse(
				localStorage.getItem('leagues-data') ?? '{}',
			) as TLocalLeagueData;
			if (Object.keys(localLeaguesData).length === 0) {
				await this.refreshLeaguesData();
			} else {
				if (!localLeaguesData.epoch) await this.refreshLeaguesData();
				const checkFiveMins = Date.now() - Number(localLeaguesData.epoch);
				// check for league data change per 5 minutes
				if (checkFiveMins > 300000) await this.refreshLeaguesData();
			}
		},

		async registerChild(data: TRegisterChild) {
			const notification = notifications();
			this.childRegisterProcess = true;
			try {
				const response = await API.registerChildLeague(data);
				if (response.status === 200) notification.success('Registered child league');
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			} finally {
				this.childRegisterProcess = false;
			}
		},

		async registerDivision(data: TRegisterDivision) {
			const notification = notifications();
			this.divisionRegisterProcess = true;
			try {
				const response = await API.registerChildDivision(data);
				if (response.status === 200) notification.success('Registered division');
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			} finally {
				this.divisionRegisterProcess = false;
			}
		},

		async newSeason(data: TNewSeason) {
			const notification = notifications();
			this.newSeasonProcess = true;
			try {
				const response = await API.startNewSeason(data);
				if (response.status === 200) notification.success('Season created');
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			} finally {
				this.newSeasonProcess = false;
			}
		},

		async newChildSeason(data: TNewChildSeason) {
			const notification = notifications();
			this.childSeasonProcess = true;
			try {
				const response = await API.startNewChildSeason(data);
				if (response.status === 200) notification.success('Season created');
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			} finally {
				this.childSeasonProcess = false;
			}
		},

		async endSeason(data: TEndLeagueSeason) {
			const notification = notifications();
			try {
				const response = await API.endSeason(data);
				if (response.status === 200) notification.success('Season ended');
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			}
		},

		async endChildSeason(data: TEndChildSeason) {
			const notification = notifications();
			try {
				const response = await API.endChildSeason(data);
				if (response.status === 200) notification.success('Season ended');
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			}
		},

		async seasonClanAdd(data: TSeasoncClanAdd) {
			const notification = notifications();
			this.seasonClanAddProcess = true;
			try {
				const response = await API.addSeasonClans(data);
				if (response.status === 200) notification.success('Clans Added Successfully!');
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			} finally {
				this.seasonClanAddProcess = false;
			}
		},

		async seasonChildClans(childId: number, seasonId: number) {
			const notification = notifications();
			// eslint-disable-next-line no-prototype-builtins
			if (this.childClans.hasOwnProperty(childId)) return;
			this.fetchingChildClans = true;
			try {
				const response = await API.getLeagueChildClans(childId, seasonId);
				if (response.status === 200) this.childClans[childId] = response.data;
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			} finally {
				this.fetchingChildClans = false;
			}
		},

		async seasonRemoveClan(data: TChildClans) {
			const notification = notifications();
			this.clanRemoveProcess = true;
			try {
				const response = await API.removeSeasonClan(data);
				if (response.status === 200) notification.success('Clan Removed Successfully!');
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			} finally {
				this.clanRemoveProcess = false;
			}
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(leagueManagement, import.meta.hot));
}
