import { leagueManagement } from '~/stores/leagueManagement';
import { notifications } from '~/stores/notifications';

export async function checkLeague() {
    const router = useRouter();
    const league = leagueManagement();

    if (league.getLeagueLocalConfig?.league.leagueId === 0 || !league.getLeagueLocalConfig) {
        notifications().info('Please select a league to continue');
        await router.push({ name: 'League Selector' });
    }
}

export const RawLeagueData = useStorage('leagues-data', '{}');
export const RawSelectedLeague = useStorage('selected-league-config', {
    league: {
        leagueId: 0,
        name: '',
        abbreviation: '',
        seasonId: null,
        iconUrl: '',
        seasonActive: null
    },
    child: { id: 0, name: '', abbreviation: '', iconUrl: '', seasonId: null, seasonActive: null },
    division: {
        id: 0,
        childId: 0,
        seasonId: 0,
        name: '',
        abbreviation: '',
        iconUrl: null,
        clansCount: 0
    }
});
