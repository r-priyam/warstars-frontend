import axios from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { APIUserPlayer } from '~/api/userPlayer';
import { APIError } from '~/types/user';
import { TPlayerData, TUserPlayer, TUserPlayerLink } from '~/types/userPlayer';
import { notifications } from './notifications';

export const userPlayer = defineStore({
	id: 'userPlayer',

	state: (): TUserPlayer => ({
		playerData: [],
		playersDataProcessing: false,
		linkPlayerProcessing: false,
		removePlayerProcessing: false,
	}),

	getters: {
		getPlayerData: (state) => (playerTag: string) => {
			if (!state.playerData.length) return null;
			state.playerData.forEach((item) => {
				if (item.tag === playerTag) return item;
			});
		},
	},

	actions: {
		async fetchPlayersData() {
			const notification = notifications();
			this.playersDataProcessing = true;
			try {
				const response = await APIUserPlayer.players();
				if (response.status === 200) this.playerData = response.data;
			} catch (error) {
				if (axios.isAxiosError(error))
					return notification.error((error.response as APIError).data.detail);
				notification.error();
			} finally {
				this.playersDataProcessing = false;
			}
		},

		async linkPlayer(playerTag: string, apiToken: string) {
			const notification = notifications();
			this.linkPlayerProcessing = true;
			const data: TUserPlayerLink = { playerTag: playerTag, apiToken: apiToken };
			try {
				const response = await APIUserPlayer.addPlayer(data);
				if (response.status === 200) notification.success('Linked player successfully!');
			} catch (error) {
				if (axios.isAxiosError(error))
					return notification.error((error.response as APIError).data.detail);
				notification.error();
			} finally {
				this.linkPlayerProcessing = false;
			}
		},

		async removePlayer(playerTag: string) {
			const notification = notifications();
			this.removePlayerProcessing = true;
			try {
				const response = await APIUserPlayer.removePlayer(playerTag);
				if (response.status === 200) {
					notification.success('Removed player successfully!');
					this.playerData.splice(this.playerData.findIndex((data: TPlayerData) => data.tag === playerTag));
				}
			} catch (error) {
				if (axios.isAxiosError(error))
					return notification.error((error.response as APIError).data.detail);
				notification.error();
			} finally {
				this.removePlayerProcessing = false;
			}
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(userPlayer, import.meta.hot));
}
