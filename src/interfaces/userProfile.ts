export interface clanAdd {
	clan_tag: string;
}

export interface clanRemove {
	clan_tag: string;
}

export interface playerAdd {
	player_tag: string;
	token: string;
}

export interface playerRemove {
	player_tag: string;
}

export interface clanAdded {
	clan_name: string;
	clan_tag: string;
	clan_badge: string;
}

export interface playerAdded {
	player_name: string;
	player_tag: string;
	town_hall: string;
}

export interface clanRemoved extends clanAdded {}
export interface playerRemoved extends playerAdded {}
