interface discordUserData {
	discordId: string;
	username: string;
	discriminator: string;
	avatar: string;
	createdAt: string;
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