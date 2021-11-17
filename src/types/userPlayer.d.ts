export interface TPlayeData {
	name: string;
	tag: string;
	trophies: number;
	versus_trophies: number;
	clan: { name: string; position: string; badge: string };
	labels: Record<string, string>;
	linked_at: string;
}

export interface TUserPlayer {
	playerData: TPlayeData[] | [];
	processing: boolean;
}

export interface TUserPlayerLink {
	player_tag: string;
	token: string;
}
