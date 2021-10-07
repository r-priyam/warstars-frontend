import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';
import { UserState } from './state';

export const getters = {
	signUpError: (state: UserState) => state.error,
	userProcessing: (state: UserState) => state.userProcessing,
	success: (state: UserState) => state.success,
};

const { read } = getStoreAccessors<UserState, State>('');

export const readSignUpError = read(getters.signUpError);
export const readUserProcessing = read(getters.userProcessing);
export const readSuccess = read(getters.success);
