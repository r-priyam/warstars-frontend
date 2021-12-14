export interface TLeagueRegister {
	name: string;
	abbreviation: string;
	head_admin: string;
	discord_id: string;
	discord_invite?: string;
	twitter_handle?: string;
	website?: string;
	rules?: string;
}

export interface TUserLeaguePermissions {
	leagues_permission: string;
}

export interface TUserChildLeagueDivisions {
	id: number;
	child_id: number;
	season_id: number;
	name: string;
	abbreviation: string;
	icon_url: string | null;
	clans_count: number;
}

export interface TUserChildLeague {
	id: number;
	league_id: number;
	name: string;
	abbreviation: string;
	icon_url: string;
	season_id: number | null;
	league_season_id: number | null;
	specific_id: number | null;
	start_time: string | null;
	end_time: string | null;
	season_active: boolean | null;
	clans_count: number;
	divisions: TUserChildLeagueDivisions[] | [];
}

export interface TUserLeagueData {
	league_id: number;
	name: string;
	abbreviation: string;
	head_admin: string;
	discord_id: string;
	discord_invite: string | null;
	twitter_handle: string | null;
	website: string | null;
	rules: string | null;
	description: string;
	icon_url: string;
	is_verified: boolean;
	registerd_on: string;
	season_id: number | null;
	specific_id: number | null;
	start_time: string | null;
	end_time: string | null;
	season_active: boolean | null;
	total_admins: number;
	child_leagues: TUserChildLeague[] | [];
}

export interface TSelectedLeague {
	league_id: number;
	name: string;
	abbreviation: string;
	season_id: number | null;
	icon_url: string;
	season_active: boolean | null;
}

export interface TSelectedChild {
	id: number;
	name: string;
	abbreviation: string;
	icon_url: string;
	season_id: number | null;
	season_active: boolean | null;
}

export interface TLocalLeagueConfig {
	league: TSelectedLeague;
	child: TSelectedChild;
	division: TUserChildLeagueDivisions;
}

export interface TRegisterChild {
	league_id: number;
	name: string;
	abbreviation: string;
	icon_url: string;
}

export interface TRegisterDivision {
	league_id: number;
	child_id: number;
	season_id: number;
	name: string;
	abbreviation: string;
}

export interface TNewSeason {
	league_id: number;
	start_time: string;
	end_time: string;
	child_data?: number[];
}

export interface TNewChildSeason {
	league_id: number;
	child_league_id: number;
	start_time: string;
	end_time: string;
}
export interface TEndLeagueSeason {
	season_id: number;
	league_id: number;
}

export interface TEndChildSeason extends TEndLeagueSeason {
	child_league_id: number;
}
