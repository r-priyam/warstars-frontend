import jwt_decode from 'jwt-decode';
import { acceptHMRUpdate, defineStore } from 'pinia';
import router from '~/router';
import { UserProfileProperties, UserStateProperties } from '~/types/user';
import { deleteCookie } from '~/utils/cookie';

export const userStore = defineStore({
	id: 'user',

	state: (): UserStateProperties => ({
		authToken: '',
		userData: { user_name: '', discord_id: '', avatar_id: '', email: '' },
		leagues: {},
		avatarUrl: '',
		permissions: '',
		loggedIn: false,
	}),

	actions: {
		setTokenData(token: string) {
			this.authToken = token;
			this.loggedIn = true;
			const payload: UserProfileProperties = jwt_decode(token);
			this.userData = JSON.parse(payload.discord_data.replace(/'/g, '"'));
			this.leagues = payload.leagues;
			this.avatarUrl = `https://cdn.discordapp.com/avatars/${BigInt(this.userData.discord_id)}/${
				this.userData.avatar_id
			}.png?size=1024`;
		},

		async logOut() {
			deleteCookie('_auth_token');
			this.loggedIn = false;
			await router.push({ name: 'Home' });
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot));
}
