import router from '~/router';
import { leagueManagement } from '~/stores/leagueManagement';
import { notifications } from '~/stores/notifications';

const league = leagueManagement();

export const checkLeague = async () => {
	if (league.getLeagueLocalConfig?.league.leagueId === 0 || !league.getLeagueLocalConfig) {
		notifications().notify({ title: 'Warning', text: 'Please select a league to continue!' });
		await router.push({ name: 'League Selector' });
	}
};
