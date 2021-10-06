import { IUserProfile } from '~/interfaces/user';

export interface AppNotification {
	content: string;
	color?: string;
	showProgress?: boolean;
}

export interface MainState {
	token: string;
	isLoggedIn: boolean | null;
	logInError: boolean;
	processing: boolean;
	userProfile: IUserProfile | null;
	dashboardMiniDrawer: boolean;
	dashboardShowDrawer: boolean;
	notifications: AppNotification[];
}
