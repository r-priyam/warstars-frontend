export interface SuperAdminInfo {
	league_id?: number;
	name: string;
	discord_id: string;
	permissions: string;
}

export interface AdminInfo extends SuperAdminInfo {
	sub_league_id: number;
}

export interface AdminAdd {}

export interface UpdatePermissions extends Omit<SuperAdminInfo, 'name' | 'league_id'> {
	name?: string;
	league_id?: number;
}

export interface RemoveAdmin {
	league_id: number;
	admin_id: string;
}
