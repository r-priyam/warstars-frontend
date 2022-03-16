import { acceptHMRUpdate, defineStore } from 'pinia';

import { HTTPError, RESTManager } from '~/api';
import type {
    TChildClans,
    TEndChildSeason,
    TEndLeagueSeason,
    TLeagueManagement,
    TLocalLeagueConfig,
    TLocalLeagueData,
    TNewChildSeason,
    TNewSeason,
    TRegisterChild,
    TRegisterDivision,
    TSeasonClanAdd
} from '~/types';
import { RawLeagueData, RawSelectedLeague } from '~/utils/leagueUtils';

import { notifications } from './notifications';
import { userStore } from './user';

const API = new RESTManager();

export const leagueManagement = defineStore({
    id: 'leagueManagement',

    state: (): TLeagueManagement => ({
        leagueAdmins: [],
        childClans: {},
        fetchingLeagueAdmins: false,
        childRegisterProcess: false,
        divisionRegisterProcess: false,
        newSeasonProcess: false,
        childSeasonProcess: false,
        seasonClanAddProcess: false,
        leagueDataRefreshProcess: false,
        fetchingChildClans: false,
        clanRemoveProcess: false
    }),

    getters: {
        getLeagueLocalConfig: (_state) => {
            const user = userStore();
            if (user.userData.showLeague) {
                const data = JSON.parse(RawSelectedLeague.value);
                const dataToReturn: TLocalLeagueConfig = {
                    league: data.league,
                    child: data.child,
                    division: data.division
                };
                return dataToReturn;
            }
            RawSelectedLeague.value = null;
            return null;
        }
    },

    actions: {
        async getLeagueAdmins(leagueId: number) {
            this.fetchingLeagueAdmins = true;
            try {
                const response = await API.getAdmins(leagueId);
                if (response.ok) {
                    this.leagueAdmins = response.data;
                }
            } catch (error) {
                if (error instanceof HTTPError) {
                    notifications().error(error.message);
                }
            } finally {
                this.fetchingLeagueAdmins = false;
            }
        },

        async refreshLeaguesData() {
            const notification = notifications();
            this.leagueDataRefreshProcess = true;
            try {
                const request = await API.getUserLeagueData();
                if (!request.data) {
                    return (RawLeagueData.value = null);
                }
                RawLeagueData.value = JSON.stringify({ epoch: Date.now(), value: request.data });
            } catch (error) {
                if (error instanceof HTTPError) {
                    notification.error(error.message);
                }
            } finally {
                this.leagueDataRefreshProcess = false;
            }
        },

        async syncLeaguesData() {
            const localLeaguesData: TLocalLeagueData = JSON.parse(RawLeagueData.value) as TLocalLeagueData;
            if (Object.keys(localLeaguesData).length === 0) {
                await this.refreshLeaguesData();
            } else {
                if (!localLeaguesData.epoch) {
                    await this.refreshLeaguesData();
                }
                const checkFiveMins = Date.now() - Number(localLeaguesData.epoch);
                // check for league data change per 5 minutes
                if (checkFiveMins > 300000) {
                    await this.refreshLeaguesData();
                }
            }
        },

        async registerChild(data: TRegisterChild) {
            const notification = notifications();
            this.childRegisterProcess = true;
            try {
                const response = await API.registerChildLeague(data);
                if (response.status === 200) {
                    notification.success('Registered child league');
                }
            } catch (error) {
                if (error instanceof HTTPError) {
                    notification.error(error.message);
                }
            } finally {
                this.childRegisterProcess = false;
            }
        },

        async registerDivision(data: TRegisterDivision) {
            const notification = notifications();
            this.divisionRegisterProcess = true;
            try {
                const response = await API.registerChildDivision(data);
                if (response.status === 200) {
                    notification.success('Registered division');
                }
            } catch (error) {
                if (error instanceof HTTPError) {
                    notification.error(error.message);
                }
            } finally {
                this.divisionRegisterProcess = false;
            }
        },

        async newSeason(data: TNewSeason) {
            const notification = notifications();
            this.newSeasonProcess = true;
            try {
                const response = await API.startNewSeason(data);
                if (response.status === 200) {
                    notification.success('Season created');
                }
            } catch (error) {
                if (error instanceof HTTPError) {
                    notification.error(error.message);
                }
            } finally {
                this.newSeasonProcess = false;
            }
        },

        async newChildSeason(data: TNewChildSeason) {
            const notification = notifications();
            this.childSeasonProcess = true;
            try {
                const response = await API.startNewChildSeason(data);
                if (response.status === 200) {
                    notification.success('Season created');
                }
            } catch (error) {
                if (error instanceof HTTPError) {
                    notification.error(error.message);
                }
            } finally {
                this.childSeasonProcess = false;
            }
        },

        async endSeason(data: TEndLeagueSeason) {
            const notification = notifications();
            try {
                const response = await API.endSeason(data);
                if (response.status === 200) {
                    notification.success('Season ended');
                }
            } catch (error) {
                if (error instanceof HTTPError) {
                    notification.error(error.message);
                }
            }
        },

        async endChildSeason(data: TEndChildSeason) {
            const notification = notifications();
            try {
                const response = await API.endChildSeason(data);
                if (response.status === 200) {
                    notification.success('Season ended');
                }
            } catch (error) {
                if (error instanceof HTTPError) {
                    notification.error(error.message);
                }
            }
        },

        async seasonClanAdd(data: TSeasonClanAdd) {
            const notification = notifications();
            this.seasonClanAddProcess = true;
            try {
                const response = await API.addSeasonClans(data);
                if (response.status === 200) {
                    notification.success('Clans Added Successfully!');
                }
            } catch (error) {
                if (error instanceof HTTPError) {
                    notification.error(error.message);
                }
            } finally {
                this.seasonClanAddProcess = false;
            }
        },

        async seasonChildClans(childId: number, seasonId: number) {
            const notification = notifications();
            // eslint-disable-next-line no-prototype-builtins
            if (this.childClans.hasOwnProperty(childId)) {
                return;
            }
            this.fetchingChildClans = true;
            try {
                const response = await API.getLeagueChildClans(childId, seasonId);
                if (response.status === 200) {
                    this.childClans[childId] = response.data;
                }
            } catch (error) {
                if (error instanceof HTTPError) {
                    notification.error(error.message);
                }
            } finally {
                this.fetchingChildClans = false;
            }
        },

        async seasonRemoveClan(data: TChildClans) {
            const notification = notifications();
            this.clanRemoveProcess = true;
            try {
                const response = await API.removeSeasonClan(data);
                if (response.status === 200) {
                    notification.success('Clan Removed Successfully!');
                }
            } catch (error) {
                if (error instanceof HTTPError) {
                    notification.error(error.message);
                }
            } finally {
                this.clanRemoveProcess = false;
            }
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(leagueManagement, import.meta.hot));
}
