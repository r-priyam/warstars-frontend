import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { UserState } from './state';

const defaultState: UserState = {
	userProcessing: false,
	error: { error: false, message: '' },
	success: false,
};

export const userModule = {
	state: defaultState,
	mutations,
	actions,
	getters,
};
