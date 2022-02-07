import { acceptHMRUpdate, defineStore } from 'pinia';
import { RESTManager, HTTPError } from '~/api';
import { TClanData, TUserClan } from '~/types';
import { notifications } from './notifications';

const API = new RESTManager();

export const userClan = defineStore({
	id: 'userClan',

	state: (): TUserClan => ({
		clanData: [],
		clansDataProcessing: false,
		linkClanProcessing: false,
		removeClanProcessing: false,
	}),

	actions: {
		async fetchClansData() {
			const notification = notifications();
			this.clansDataProcessing = true;
			try {
				const response = await API.clans();
				if (response.status === 200) this.clanData = response.data;
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			} finally {
				this.clansDataProcessing = false;
			}
		},

		async linkClan(clanTag: string) {
			const notification = notifications();
			this.linkClanProcessing = true;
			try {
				const response = await API.addClan(clanTag);
				if (response.status === 200) notification.success('Linked clan successfully!');
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			} finally {
				this.linkClanProcessing = false;
			}
		},

		async removeClan(clanTag: string) {
			const notification = notifications();
			this.removeClanProcessing = true;
			try {
				const response = await API.removeClan(clanTag);
				if (response.status === 200) {
					notification.success('Removed clan successfully!');
					this.clanData.splice(this.clanData.findIndex((data: TClanData) => data.tag === clanTag));
				}
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			} finally {
				this.removeClanProcessing = false;
			}
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(userClan, import.meta.hot));
}
