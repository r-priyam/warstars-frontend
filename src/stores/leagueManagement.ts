import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { APILeague } from '~/api/leagues';
import { TLocalLeagueConfig, TRegisterChild, TRegisterDivision } from '~/types/leagues';
import { notifications } from './notifications';

interface TPermsData {
	epoch: string;
	value: string;
}

export const leagueManagement = defineStore({
	id: 'leagueManagement',
	state: () => ({ permissions: {}, childRegisterProcess: false, divisionRegisterProcess: false }),

	getters: {
		getLeagueLocalConfig: (state) => {
			{
				if (Object.keys(state.permissions).length > 0) {
					const data = useStorage('selected-league-config', {
						league: { league_id: 0, name: '', abbreviation: '', season_id: null, icon_url: '' },
						child: { id: 0, name: '', abbreviation: '', icon_url: '', season_id: null },
						division: { id: 0, child_id: 0, season_id: 0, name: '', abbreviation: '', icon_url: null, clans_count: 0 },
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
				const request = await APILeague.getUserLeaguePermissions();
				// return here since API won't give any data when user is in no league.
				if (request.status !== 200) {
					this.permissions = {};
					Cookies.remove('_league_permissions');
					return;
				}
				// Here if a response is successfull and user is in No League, i mean
				// if a user permissions is null then it won't set a cookie or not it will
				// return anything so return.
				if (!Cookies.get('_league_permissions')) return;
				const payloadData: TPermsData = jwt_decode(Cookies.get('_league_permissions')!);
				this.permissions = JSON.parse(payloadData.value.replace(/'/g, '"'));
			} catch (error) {
				if (axios.isAxiosError(error)) notification.notify({ title: 'Error', text: error.response?.data.detail });
				else notification.notify({ title: 'Error', text: 'Something went wrong!' });
			}
		},

		async syncPermissions() {
			const permissionsCookie = Cookies.get('_league_permissions');
			if (permissionsCookie) {
				const permsPayload: TPermsData = jwt_decode(permissionsCookie);
				const checkTwoMins = Date.now() - ~~permsPayload.epoch;
				// check for permissions change per 2 minutes
				if (checkTwoMins > 120000) await this.syncPermsToken();
				else this.permissions = JSON.parse(permsPayload.value.replace(/'/g, '"'));
			} else await this.syncPermsToken();
		},

		async refreshLeaguesData() {
			const notification = notifications();
			try {
				const request = await APILeague.getUserLeagueData();
				if (!request.data) return localStorage.removeItem('leagues-data');
				localStorage.setItem('leagues-data', JSON.stringify({ epoch: Date.now(), value: request.data }));
			} catch (error) {
				if (axios.isAxiosError(error)) notification.notify({ title: 'Error', text: error.response?.data.detail });
				else notification.notify({ title: 'Error', text: 'Something went wrong!' });
			}
		},

		async syncLeaguesData() {
			const localLeaguessData: TPermsData = JSON.parse(localStorage.getItem('leagues-data') ?? '{}');
			if (Object.keys(localLeaguessData).length === 0) {
				await this.refreshLeaguesData();
			} else {
				if (!localLeaguessData.epoch) await this.refreshLeaguesData();
				const checkFiveMins = Date.now() - ~~localLeaguessData.epoch;
				// check for league data change per 5 minutes
				if (checkFiveMins > 300000) await this.refreshLeaguesData();
			}
		},

		async registerChild(data: TRegisterChild) {
			const notification = notifications();
			this.childRegisterProcess = true;
			try {
				const response = await APILeague.registerChildLeague(data);
				if (response.status === 200) notification.notify({ title: 'Success', text: 'Registered child league' });
			} catch (error) {
				if (axios.isAxiosError(error)) notification.notify({ title: 'Error', text: error.response?.data.detail });
				else notification.notify({ title: 'Error', text: 'Something went wrong!' });
			}
			this.childRegisterProcess = false;
		},

		async registerDivision(data: TRegisterDivision) {
			const notification = notifications();
			this.divisionRegisterProcess = true;
			try {
				const response = await APILeague.registerChildDivision(data);
				if (response.status === 200) notification.notify({ title: 'Success', text: 'Registered division' });
			} catch (error) {
				if (axios.isAxiosError(error)) notification.notify({ title: 'Error', text: error.response?.data.detail });
				else notification.notify({ title: 'Error', text: 'Something went wrong!' });
			}
			this.divisionRegisterProcess = false;
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(leagueManagement, import.meta.hot));
}
