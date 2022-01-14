import axios from 'axios';
import Cookies from 'js-cookie';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { APIUser } from '~/api/user';
import { domain } from '~/env';
import router from '~/router';
import { APIError } from '~/types/user';
import { notifications } from './notifications';

export const userStore = defineStore({
	id: 'user',

	state: () => ({
		userData: { discordId: '', username: '', discriminator: '', avatar: '', createdAt: '' },
		avatarUrl: '',
		loggedIn: false,
	}),

	actions: {
		async setUserData() {
			const notification = notifications();
			this.loggedIn = true;
			try {
				this.userData = (await APIUser.user()).data;
				this.avatarUrl = `https://cdn.discordapp.com/avatars/${this.userData.discordId}/${this.userData.avatar}.png?size=1024`;
			} catch (error) {
				if (axios.isAxiosError(error))
					return notification.notify({ title: 'Error', text: (error.response as APIError).data.detail });
				notification.notify({ title: 'Error', text: 'Something went wrong while fetching user data!' });
			}
		},

		async logOut() {
			const notification = notifications();
			try {
				await APIUser.logOut();
			} catch (error) {
				notification.notify({ title: 'Error', text: 'Something went wrong!' });
			} finally {
				Cookies.remove('_league_permissions', { path: '', domain: domain });
				localStorage.removeItem('leagues-data');
				localStorage.removeItem('selected-league-config');
				this.loggedIn = false;
				await router.push({ name: 'Home' });
			}
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot));
}
