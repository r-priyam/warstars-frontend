import axios from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { APIUserClan } from '~/api/userClan';
import { TUserClan } from '~/types/userClan';
import { notifications } from './notifications';

export const userClan = defineStore({
	id: 'userClan',

	state: (): TUserClan => ({
		clanData: [],
		clansDataProcessing: false,
		linkClanProcessing: false,
		removeClanProcessing: false,
	}),

	actions: {
		async fetchClansData(authToken: string) {
			const notification = notifications();
			this.clansDataProcessing = true;
			try {
				const response = await APIUserClan.clans(authToken);
				if (response.status === 200) this.clanData = response.data;
			} catch (error) {
				if (axios.isAxiosError(error)) notification.notify({ title: 'Error', text: error.response?.data.detail });
				else notification.notify({ title: 'Error', text: 'Something went wrong!' });
			}
			this.clansDataProcessing = false;
		},

		async linkClan(clanTag: string, authToken: string) {
			const notification = notifications();
			this.linkClanProcessing = true;
			try {
				const response = await APIUserClan.addClan(clanTag, authToken);
				if (response.status === 200) notification.notify({ title: 'Success', text: 'Linked clan successfully!' });
			} catch (error) {
				if (axios.isAxiosError(error)) notification.notify({ title: 'Error', text: error.response?.data.detail });
				else notification.notify({ title: 'Error', text: 'Something went wrong!' });
			}
			this.linkClanProcessing = false;
		},

		async removeClan(clanTag: string, authToken: string) {
			const notification = notifications();
			this.removeClanProcessing = true;
			try {
				const response = await APIUserClan.removeClan(clanTag, authToken);
				if (response.status === 200) notification.notify({ title: 'Success', text: 'Removed clan successfully!' });
			} catch (error) {
				if (axios.isAxiosError(error)) notification.notify({ title: 'Error', text: error.response?.data.detail });
				else notification.notify({ title: 'Error', text: 'Something went wrong!' });
			}
			this.removeClanProcessing = false;
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(userClan, import.meta.hot));
}
