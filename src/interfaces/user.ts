export interface IUserProfileCreate {
	full_name: string;
	email: boolean;
	is_active: boolean;
	country: string;
	password: number;
}

export interface IUserProfile {
	full_name: string;
	email: boolean;
	is_active: boolean;
	country: string;
	password: number;
}

export interface IUserProfileUpdate {
	email?: string;
	full_name?: string;
	password?: string;
	is_active?: boolean;
	is_superuser?: boolean;
}
