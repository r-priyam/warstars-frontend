interface discordUserData {
	user_name: string;
	discord_id: string;
	avatar_id: string;
	email: string;
}

export interface UserProfileProperties {
	discord_data: string;
	expires_on: string;
}

export interface UserStateProperties {
	authToken: string;
	userData: discordUserData;
	avatarUrl: string;
	permissions: string;
	loggedIn: boolean | false;
}
