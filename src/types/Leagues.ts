export interface TLeagueRegister {
    name: string;
    abbreviation: string;
    headAdmin: string;
    discordId: string;
    discordInvite?: string;
    twitterHandle?: string;
    website?: string;
    rules?: string;
}

export interface TUserLeaguePermissions {
    leaguesPermission: string;
}

export interface TUserChildLeagueDivisions {
    id: number;
    childId: number;
    seasonId: number;
    name: string;
    abbreviation: string;
    iconUrl: string | null;
    clansCount: number;
}

export interface TUserChildLeague {
    id: number;
    leagueId: number;
    name: string;
    abbreviation: string;
    iconUrl: string;
    seasonId: number | null;
    leagueSeasonId: number | null;
    specificId: number | null;
    startTime: string | null;
    endTime: string | null;
    seasonActive: boolean | null;
    clansCount: number;
    divisions: TUserChildLeagueDivisions[] | [];
}

export interface TUserLeagueData {
    leagueId: number;
    name: string;
    abbreviation: string;
    headAdmin: string;
    discordId: string;
    discordInvite: string | null;
    twitterHandle: string | null;
    website: string | null;
    rules: string | null;
    description: string;
    iconUrl: string;
    isVerified: boolean;
    registerdOn: string;
    seasonId: number | null;
    specificId: number | null;
    startTime: string | null;
    endTime: string | null;
    seasonActive: boolean | null;
    totalAdmins: number;
    childLeagues: TUserChildLeague[] | [];
}

export interface TSelectedLeague {
    leagueId: number;
    name: string;
    abbreviation: string;
    seasonId: number | null;
    iconUrl: string;
    seasonActive: boolean | null;
}

export interface TSelectedChild {
    id: number;
    name: string;
    abbreviation: string;
    iconUrl: string;
    seasonId: number | null;
    seasonActive: boolean | null;
}

export interface TLocalLeagueConfig {
    league: TSelectedLeague;
    child: TSelectedChild;
    division: TUserChildLeagueDivisions;
}

export interface TRegisterChild {
    leagueId: number;
    name: string;
    abbreviation: string;
    iconUrl: string;
}

export interface TRegisterDivision {
    leagueId: number;
    childId: number;
    seasonId: number;
    name: string;
    abbreviation: string;
}

export interface TNewSeason {
    leagueId: number;
    startTime: string;
    endTime: string;
    childData?: number[];
}

export interface TNewChildSeason {
    leagueId: number;
    childLeagueId: number;
    startTime: string;
    endTime: string;
}
export interface TEndLeagueSeason {
    seasonId: number;
    leagueId: number;
}

export interface TEndChildSeason extends TEndLeagueSeason {
    childLeagueId: number;
}

export interface TSeasoncClanAdd {
    leagueId: number;
    childId: number;
    divisionId: number;
    leagueSeasonId: number;
    childSeasonId: number;
    clanTags: string[];
}

export interface TChildClans {
    leagueIid: number;
    childId: number;
    divisionId: number;
    leagueSeasonId: number;
    childSeasonId: number;
    name: string;
    tag: string;
}

export interface TLocalLeagueData {
    epoch?: string;
    value?: TUserLeagueData[];
}

export interface TLeagueAdmin {
    id: number;
    discordId: string;
    leagueId: number;
    permissions: number;
    headAdmin: boolean;
    addedAt: string;
    username: string;
    discriminator: string;
    avatar: string;
}

export interface TLeagueManagement {
    permissions: Record<string, unknown>;
    leagueAdmins?: TLeagueAdmin[];
    childClans: Record<number, TChildClans[]>;
    fetchingLeagueAdmins: boolean;
    childRegisterProcess: boolean;
    divisionRegisterProcess: boolean;
    newSeasonProcess: boolean;
    childSeasonProcess: boolean;
    seasonClanAddProcess: boolean;
    leagueDataRefreshProcess: boolean;
    fetchingChildClans: boolean;
    clanRemoveProcess: boolean;
}

export interface TAddAdmin {
    discordId: string;
    leagueId: number;
    permissions: number;
}

export interface TUpdateAdminPermission {
    leagueId: number;
    adminId: number;
    permissions: number;
}

export interface TRemoveAdmin {
    adminId: number;
    leagueId: number;
}

export const PermissionsConstant: Record<string, number> = {
    'Manage Child Divisions': 2,
    'Manage Child Leagues': 4,
    'Administrator': 8,
    'Manage Clans': 16,
    'Manage War Data': 32,
    'Manage Season': 64,
    'Manage League': 128
};
