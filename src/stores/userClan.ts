import axios from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { APIUserClan } from '~/api/userClan';
import { APIError } from '~/types/user';
import { TClanData, TUserClan } from '~/types/userClan';
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
		async fetchClansData() {
			const notification = notifications();
			this.clansDataProcessing = true;
			try {
				const response = await APIUserClan.clans();
				if (response.status === 200) this.clanData = response.data;
			} catch (error) {
				if (axios.isAxiosError(error))
					return notification.notify({ title: 'Error', text: (error.response as APIError).data.detail });
				notification.notify({ title: 'Error', text: 'Something went wrong!' });
			} finally {
				this.clansDataProcessing = false;
			}
		},

		async linkClan(clanTag: string) {
			const notification = notifications();
			this.linkClanProcessing = true;
			try {
				const response = await APIUserClan.addClan(clanTag);
				if (response.status === 200) notification.notify({ title: 'Success', text: 'Linked clan successfully!' });
			} catch (error) {
				if (axios.isAxiosError(error))
					return notification.notify({ title: 'Error', text: (error.response as APIError).data.detail });
				notification.notify({ title: 'Error', text: 'Something went wrong!' });
			} finally {
				this.linkClanProcessing = false;
			}
		},

		async removeClan(clanTag: string) {
			const notification = notifications();
			this.removeClanProcessing = true;
			try {
				const response = await APIUserClan.removeClan(clanTag);
				if (response.status === 200) {
					notification.notify({ title: 'Success', text: 'Removed clan successfully!' });
					this.clanData.splice(this.clanData.findIndex((data: TClanData) => data.tag === clanTag));
				}
			} catch (error) {
				if (axios.isAxiosError(error))
					return notification.notify({ title: 'Error', text: (error.response as APIError).data.detail });
				notification.notify({ title: 'Error', text: 'Something went wrong!' });
			} finally {
				this.removeClanProcessing = false;
			}
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(userClan, import.meta.hot));
}
