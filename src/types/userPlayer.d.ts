export interface TPlayerData {
	name: string;
	tag: string;
	trophies: number;
	versusTrophies: number;
	clan: { name: string; position: string; badge: string };
	labels: Record<string, string>;
	linkedAt: string;
}

export interface TUserPlayer {
	playerData: TPlayerData[] | [];
	playersDataProcessing: boolean;
	linkPlayerProcessing: boolean;
	removePlayerProcessing: boolean;
}

export interface TUserPlayerLink {
	playerTag: string;
	apiToken: string;
}
