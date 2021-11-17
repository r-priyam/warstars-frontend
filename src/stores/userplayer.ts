import axios from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { APIUserPlayer } from '~/api/userPlayer';
import { TUserPlayer, TUserPlayerLink } from '~/types/userPlayer';
import { notifications } from './notifications';

export const userPlayer = defineStore({
	id: 'userPlayer',

	state: (): TUserPlayer => ({ playerData: [], processing: false }),

	getters: {
		getPlayerData: (state) => {
			return (playerTag: string) => {
				if (!state.playerData.length) return null;
				state.playerData.forEach((item) => {
					if (item.tag === playerTag) return item;
				});
			};
		},
	},

	actions: {
		async fetchPlayersData(authToken: string) {
			const notification = notifications();
			this.processing = true;
			try {
				const response = await APIUserPlayer.players(authToken);
				if (response.status === 200) this.playerData = response.data;
			} catch (error) {
				if (axios.isAxiosError(error)) notification.notify({ title: 'Error', text: error.response?.data.detail });
				else notification.notify({ title: 'Error', text: 'Something went wrong!' });
			}
			this.processing = false;
		},

		async linkPlayer(playerTag: string, apiToken: string, authToken: string) {
			const notification = notifications();
			this.processing = true;
			const data: TUserPlayerLink = { player_tag: playerTag, token: apiToken };
			try {
				const response = await APIUserPlayer.addPlayer(data, authToken);
				if (response.status === 200) notification.notify({ title: 'Success', text: 'Linked player successfully!' });
			} catch (error) {
				if (axios.isAxiosError(error)) notification.notify({ title: 'Error', text: error.response?.data.detail });
				else notification.notify({ title: 'Error', text: 'Something went wrong!' });
			}
			this.processing = false;
		},

		async removePlayer(playerTag: string, authToken: string) {
			const notification = notifications();
			this.processing = true;
			try {
				const response = await APIUserPlayer.removePlayer(playerTag, authToken);
				if (response.status === 200) notification.notify({ title: 'Success', text: 'Removed player successfully!' });
			} catch (error) {
				if (axios.isAxiosError(error)) notification.notify({ title: 'Error', text: error.response?.data.detail });
				else notification.notify({ title: 'Error', text: 'Something went wrong!' });
			}
			this.processing = false;
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(userPlayer, import.meta.hot));
}
