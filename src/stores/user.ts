import Cookies from 'js-cookie';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { APIUser } from '~/api/user';
import { domain } from '~/env';
import router from '~/router';
import { UserStateProperties } from '~/types/user';

export const userStore = defineStore({
	id: 'user',

	state: (): UserStateProperties => ({
		userData: { discordId: '', username: '', discriminator: '', avatar: '', createdAt: '' },
		avatarUrl: '',
		permissions: '',
		loggedIn: false,
	}),

	actions: {
		async setUserData() {
			this.loggedIn = true;
			try {
				this.userData = (await APIUser.user()).data;
				this.avatarUrl = `https://cdn.discordapp.com/avatars/${this.userData.discordId}/${this.userData.avatar}.png?size=1024`;
			} catch (error) {
				// user has played with the auth token here.
				await this.logOut();
			}
		},

		async logOut() {
			Cookies.remove('_league_permissions', { path: '', domain: domain });
			localStorage.removeItem('leagues-data');
			localStorage.removeItem('selected-league-config');
			this.loggedIn = false;
			await router.push({ name: 'Home' });
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot));
}
