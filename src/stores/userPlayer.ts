import { acceptHMRUpdate, defineStore } from 'pinia';
import { notifications } from './notifications';
import { HTTPError, RESTManager } from '~/api';
import type { TPlayerData, TUserPlayer, TUserPlayerLink } from '~/types';

const API = new RESTManager();

export const userPlayer = defineStore({
    id: 'userPlayer',

    state: (): TUserPlayer => ({
        playerData: [],
        playersDataProcessing: false,
        linkPlayerProcessing: false,
        removePlayerProcessing: false
    }),

    getters: {
        getPlayerData: (state) => (playerTag: string) => {
            if (!state.playerData.length) return null;
            state.playerData.forEach((item) => {
                if (item.tag === playerTag) return item;
            });
        }
    },

    actions: {
        async fetchPlayersData() {
            const notification = notifications();
            this.playersDataProcessing = true;
            try {
                const response = await API.players();
                if (response.status === 200) this.playerData = response.data;
            } catch (error) {
                if (error instanceof HTTPError) notification.error(error.message);
            } finally {
                this.playersDataProcessing = false;
            }
        },

        async linkPlayer(playerTag: string, apiToken: string) {
            const notification = notifications();
            this.linkPlayerProcessing = true;
            const data: TUserPlayerLink = { playerTag, apiToken };
            try {
                const response = await API.addPlayer(data);
                if (response.status === 200) notification.success('Linked player successfully!');
            } catch (error) {
                if (error instanceof HTTPError) notification.error(error.message);
            } finally {
                this.linkPlayerProcessing = false;
            }
        },

        async removePlayer(playerTag: string) {
            const notification = notifications();
            this.removePlayerProcessing = true;
            try {
                const response = await API.removePlayer(playerTag);
                if (response.status === 200) {
                    notification.success('Removed player successfully!');
                    this.playerData.splice(this.playerData.findIndex((data: TPlayerData) => data.tag === playerTag));
                }
            } catch (error) {
                if (error instanceof HTTPError) notification.error(error.message);
            } finally {
                this.removePlayerProcessing = false;
            }
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(userPlayer, import.meta.hot));
}
