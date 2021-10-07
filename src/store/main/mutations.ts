import { getStoreAccessors } from 'typesafe-vuex';
import { IUserProfile } from '~/interfaces/user';
import { State } from '../state';
import { MainState } from './state';

export const mutations = {
	setToken(state: MainState, payload: string) {
		state.token = payload;
	},

	setLoggedIn(state: MainState, payload: boolean) {
		state.isLoggedIn = payload;
	},

	setLogInError(state: MainState, payload: boolean) {
		state.logInError = payload;
	},

	setProcessing(state: MainState, payload: boolean) {
		state.processing = payload;
	},

	setUserProfile(state: MainState, payload: IUserProfile) {
		state.userProfile = payload;
	},
};

const { commit } = getStoreAccessors<MainState | any, State>('');

export const commitSetLoggedIn = commit(mutations.setLoggedIn);
export const commitSetLogInError = commit(mutations.setLogInError);
export const commitSetProcessing = commit(mutations.setProcessing);
export const commitSetToken = commit(mutations.setToken);
export const commitSetUserProfile = commit(mutations.setUserProfile);
