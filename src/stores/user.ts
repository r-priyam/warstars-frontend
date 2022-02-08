import Cookies from 'js-cookie';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { notifications } from './notifications';
import { HTTPError } from '~/api/HTTPError';
import { RESTManager } from '~/api/RESTManager';
import { domain } from '~/env';
import router from '~/router';

const API = new RESTManager();

export const userStore = defineStore({
	id: 'user',

	state: () => ({
		userData: { discordId: '', username: '', discriminator: '', avatar: '', createdAt: '' },
		loggedIn: false
	}),

	actions: {
		async setUserData() {
			const notification = notifications();
			this.loggedIn = true;
			try {
				this.userData = (await API.user()).data;
			} catch (error) {
				if (error instanceof HTTPError) notification.error(error.message);
			}
		},

		async logOut() {
			const notification = notifications();
			try {
				await API.logOut();
			} catch (error) {
				notification.error();
			} finally {
				Cookies.remove('_league_permissions', { path: '', domain });
				localStorage.removeItem('leagues-data');
				localStorage.removeItem('selected-league-config');
				this.loggedIn = false;
				await router.push({ name: 'Home' });
			}
		}
	}
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot));
}
