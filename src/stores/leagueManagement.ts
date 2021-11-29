import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { APILeague } from '~/api/leagues';
import { TLocalLeagueConfig, TUserLeaguePermissions } from '~/types/leagues';
import { notifications } from './notifications';

interface TPermsData {
	epoch?: number;
	value?: string;
}

export const leagueManagement = defineStore({
	id: 'leagueManagement',
	state: () => ({ permissions: {} }),

	getters: {
		getLeagueLocalConfig: (state) => {
			{
				if (Object.keys(state.permissions).length > 0) {
					const data = useStorage('selected-league-config', {
						league: { league_id: 0, name: '', abbreviation: '', season_id: null, icon_url: '' },
						child: { id: 0, name: '', abbreviation: '', icon_url: '', season_id: null },
						division: { id: 0, child_id: 0, season_id: 0, name: '', abbreviation: '', icon_url: null },
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
				if (!request.data) return (this.permissions = {});
				const payloadData: TUserLeaguePermissions = jwt_decode(request.data as string);

				if (request.status === 200) {
					this.permissions = JSON.parse(payloadData.leagues_permission.replace(/'/g, '"'));
					localStorage.setItem('leagues-permission', JSON.stringify({ epoch: Date.now(), value: request.data }));
				}
			} catch (error) {
				if (axios.isAxiosError(error)) notification.notify({ title: 'Error', text: error.response?.data.detail });
				else notification.notify({ title: 'Error', text: 'Something went wrong!' });
			}
		},

		async syncPermissions() {
			const localPermsData: TPermsData = JSON.parse(localStorage.getItem('leagues-permission') ?? '{}');
			if (Object.keys(localPermsData).length === 0) {
				await this.syncPermsToken();
			} else {
				if (!localPermsData.epoch) await this.syncPermsToken();
				if (!localPermsData.value) await this.syncPermissions();
				const checkTwoMins = Date.now() - localPermsData.epoch!;
				// check for permissions change per 2 minutes
				if (checkTwoMins > 120000) await this.syncPermsToken();
				else {
					// set value from local storage here since if a page is reloaded then data is lost
					const localPayload: TUserLeaguePermissions = jwt_decode(localPermsData.value as string);
					this.permissions = JSON.parse(localPayload.leagues_permission.replace(/'/g, '"'));
				}
			}
		},

		async refreshLeaguesData() {
			const notification = notifications();
			try {
				const request = await APILeague.getUserLeagueData();
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
				const checkFiveMins = Date.now() - localLeaguessData.epoch!;
				// check for league data change per 5 minutes
				if (checkFiveMins > 300000) await this.refreshLeaguesData();
			}
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(leagueManagement, import.meta.hot));
}
