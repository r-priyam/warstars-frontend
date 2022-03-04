import { RESTManager } from '~/api';
import { leagueManagement } from '~/stores/leagueManagement';
import { userStore } from '~/stores/user';
import type { UserModule } from '~/types';

export const install: UserModule = ({ isClient, router }) => {
    if (isClient) {
        router.beforeResolve(async (to, _from, next) => {
            const API = new RESTManager();
            const user = userStore();
            const league = leagueManagement();

            if (user.loggedIn) {
                if (user.userData.discordId === '') await user.setUserData();
                await league.syncPermissions();
                await league.syncLeaguesData();
                next();
            } else {
                try {
                    const checkAuthenticated = await API.checkAuthenticated();
                    if (checkAuthenticated.status === 200) {
                        if (user.userData.discordId === '') await user.setUserData();
                        await league.syncPermissions();
                        await league.syncLeaguesData();
                        next();
                    }
                } catch (error) {
                    user.loggedIn = false;
                    if (!to.fullPath.includes('/dashboard')) return next();
                    next({ name: 'Home' });
                }
            }
        });
    }
};
