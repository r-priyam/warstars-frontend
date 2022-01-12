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

interface Error {
	statusCode: number;
	timestamp: string;
	detail: string;
	path: string;
}

export interface APIError {
	data: Error;
}