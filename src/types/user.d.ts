interface discordUserData {
	discordId: string;
	username: string;
	discriminator: string;
	avatar: string;
	createdAt: string;
}

export interface UserStateProperties {
	userData: discordUserData;
	avatarUrl: string;
	permissions: string;
	loggedIn: boolean | false;
}
