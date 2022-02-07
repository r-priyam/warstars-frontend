import router from '~/router';
import { leagueManagement } from '~/stores/leagueManagement';
import { notifications } from '~/stores/notifications';

export async function checkLeague() {
	const league = leagueManagement();
	if (league.getLeagueLocalConfig?.league.leagueId === 0 || !league.getLeagueLocalConfig) {
		notifications().info('Please select a league to continue');
		await router.push({ name: 'League Selector' });
	}
}
