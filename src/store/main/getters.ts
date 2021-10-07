import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';
import { MainState } from './state';

export const getters = {
	// hasAdminAccess: (state: MainState) => {
	// 	return state.userProfile && state.userProfile.is_superuser && state.userProfile.is_active;
	// },
	loginError: (state: MainState) => state.logInError,
	processing: (state: MainState) => state.processing,
	userProfile: (state: MainState) => state.userProfile,
	token: (state: MainState) => state.token,
	isLoggedIn: (state: MainState) => state.isLoggedIn,
};

const { read } = getStoreAccessors<MainState, State>('');

// export const readHasAdminAccess = read(getters.hasAdminAccess);
export const readIsLoggedIn = read(getters.isLoggedIn);
export const readLoginError = read(getters.loginError);
export const readProcessing = read(getters.processing);
export const readToken = read(getters.token);
export const readUserProfile = read(getters.userProfile);
