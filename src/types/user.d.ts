interface discordUserData {
	user_name: string;
	discord_id: string;
	avatar_id: string;
	email: string;
}

export interface UserStateProperties {
	authToken: string;
	userData: discordUserData;
	leagues: any;
	avatarUrl: string;
	permissions: string;
	loggedIn: boolean | false;
}
