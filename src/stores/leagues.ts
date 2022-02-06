import axios from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { APILeague } from '~/api/leagues';
import { TLeagueRegister } from '~/types/leagues';
import { APIError } from '~/types/user';
import { notifications } from './notifications';

export const leagues = defineStore({
	id: 'leagues',
	state: () => ({ registerProcessing: false }),
	actions: {
		async registerLeague(data: TLeagueRegister) {
			const notification = notifications();
			this.registerProcessing = true;
			try {
				const response = await APILeague.registerLeague(data);
				if (response.status === 200)
					notification.success('Registration application submitted');
			} catch (error) {
				if (axios.isAxiosError(error))
					return notification.error((error.response as APIError).data.detail);
				notification.error();
			} finally {
				this.registerProcessing = false;
			}
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(leagues, import.meta.hot));
}
