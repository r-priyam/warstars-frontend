export interface TClanData {
	name: string;
	tag: string;
	members: number;
	badge: string | null;
	leader: string;
	level: number;
	location: string;
	trophies: number;
	versus_trophies: number;
	labels: Record<string, string>;
	linked_at: string;
}

export interface TUserClan {
	clanData: TClanData[] | [];
	clansDataProcessing: boolean;
	linkClanProcessing: boolean;
	removeClanProcessing: boolean;
}
