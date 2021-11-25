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
	season_id: number | null;
	specific_id: number | null;
	start_time: string | null;
	end_time: string | null;
	is_active: boolean | null;
	child_leagues: TUserChildLeague[] | [];
}

export interface TSelectedLeague {
	league_id: number;
	name: string;
	abbreviation: string;
	season_id: number | null;
	icon_url: string;
}

export interface TSelectedChild {
	id: number;
	name: string;
	abbreviation: string;
	icon_url: string;
	season_id: number | null;
}

export interface TLocalLeagueConfig {
	league: TSelectedLeague;
	child: TSelectedChild;
	division: TUserChildLeagueDivisions;
}
