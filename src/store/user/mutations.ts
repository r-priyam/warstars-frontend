import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';
import { UserState } from './state';

export const mutations = {
	setError(state: UserState, payload: { error: boolean; message: string }) {
		state.error = payload;
	},

	setProcessing(state: UserState, payload: boolean) {
		state.userProcessing = payload;
	},

	setSuccess(state: UserState, payload: boolean) {
		state.success = payload;
	},
};

const { commit } = getStoreAccessors<UserState | any, State>('');

export const commitSetError = commit(mutations.setError);
export const commitSetProcessing = commit(mutations.setProcessing);
export const commitSetSuccess = commit(mutations.setSuccess);
