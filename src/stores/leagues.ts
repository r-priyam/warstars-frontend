import { acceptHMRUpdate, defineStore } from 'pinia';

import { HTTPError, RESTManager } from '~/api';
import type { TLeagueRegister } from '~/types';

import { notifications } from './notifications';

const API = new RESTManager();

export const leagues = defineStore({
    id: 'leagues',
    state: () => ({ registerProcessing: false }),
    actions: {
        async registerLeague(data: TLeagueRegister) {
            const notification = notifications();
            this.registerProcessing = true;
            try {
                const response = await API.registerLeague(data);
                if (response.status === 200) notification.success('Registration application submitted');
            } catch (error) {
                if (error instanceof HTTPError) notification.error(error.message);
            } finally {
                this.registerProcessing = false;
            }
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(leagues, import.meta.hot));
}
