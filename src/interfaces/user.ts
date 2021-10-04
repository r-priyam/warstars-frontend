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
	current_password: string;
	new_password: string;
}
