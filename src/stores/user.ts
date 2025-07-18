import { acceptHMRUpdate, defineStore } from 'pinia';

import { HTTPError } from '~/api/HTTPError';
import { RESTManager } from '~/api/RESTManager';

import { notifications } from './notifications';

const API = new RESTManager();

export const userStore = defineStore({
    id: 'user',

    state: () => ({
        userData: { discordId: '', username: '', discriminator: '', avatar: '', createdAt: '', showLeague: false },
        loggedIn: false
    }),

    actions: {
        async setUserData() {
            const notification = notifications();
            this.loggedIn = true;
            try {
                this.userData = (await API.user()).data;
            } catch (error) {
                if (error instanceof HTTPError) {
                    notification.error(error.message);
                }
            }
        },

        async logOut() {
            const notification = notifications();
            try {
                await API.logOut();
            } catch (error) {
                notification.error();
            } finally {
                localStorage.removeItem('leagues-data');
                localStorage.removeItem('selected-league');
                this.loggedIn = false;
                await this.router.push('/');
            }
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot));
}
