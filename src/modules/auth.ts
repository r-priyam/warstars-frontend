import type { UserModule } from '~/types';
import { RESTManager } from '~/api';
import { leagueManagement } from '~/stores/leagueManagement';
import { userStore } from '~/stores/user';

export const install: UserModule = ({ isClient, router }) => {
    if (isClient) {
        router.beforeEach(async (to) => {
            const API = new RESTManager();
            const user = userStore();
            const league = leagueManagement();

            try {
                const checkAuthenticated = await API.checkAuthenticated();
                if (checkAuthenticated.status === 200) {
                    if (user.userData.discordId === '') await user.setUserData();
                    await league.syncPermissions();
                    await league.syncLeaguesData();
                }
            } catch (error) {
                user.loggedIn = false;
                if (!to.fullPath.includes('/dashboard')) return true;
                await router.push({ name: 'Home' });
            }
        });
    }
};
