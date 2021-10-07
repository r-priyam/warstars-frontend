import { IUserProfile } from '~/interfaces/user';

export interface MainState {
	token: string;
	isLoggedIn: boolean | null;
	logInError: boolean;
	processing: boolean;
	userProfile: IUserProfile | null;
}
