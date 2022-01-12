import HTTP from '~/api';
import { discordUserData } from '~/types/user';

export const APIUser = {
	async user() {
		return HTTP.get<discordUserData>('/discord/user');
	},

	async checkAuthenticated() {
		return HTTP.get('/discord/check');
	},

	async logOut() {
		return HTTP.post('/discord/logout');
	},
};
