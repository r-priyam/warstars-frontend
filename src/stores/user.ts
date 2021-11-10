import router from '~/router';
import jwt_decode from 'jwt-decode';
import { deleteCookie } from '~/utils/cookie';
import { IUserProfile } from '~/interfaces/user';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { UserStateProperties } from './interfaces/user.i';

export const userStore = defineStore({
	id: 'user',
	state: () =>
		({
			authToken: '',
			userData: {},
			leagues: {},
			id: '',
			avatarUrl: '',
			permissions: '',
			loggedIn: false,
		} as UserStateProperties),
	actions: {
		setTokenData(token: string) {
			this.authToken = token;
			this.loggedIn = true;
			const payload: IUserProfile = jwt_decode(token);
			this.id = `'${new RegExp('[0-9]{15,19}', 'gm').exec(payload.discord_data)}'`;
			this.userData = JSON.parse(payload.discord_data.replace(/'/g, '"'));
			this.leagues = payload.leagues;
			this.avatarUrl = `https://cdn.discordapp.com/avatars/${this.id}/${this.userData.avatar_id}.png?size=1024`.replace(
				/["']/g,
				'',
			);
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
