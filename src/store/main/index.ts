import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { MainState } from './state';

const defaultState: MainState = {
	isLoggedIn: null,
	token: '',
	logInError: false,
	processing: false,
	userProfile: null,
};

export const mainModule = {
	state: defaultState,
	mutations,
	actions,
	getters,
};
