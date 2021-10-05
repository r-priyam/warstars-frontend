import { getStoreAccessors } from 'typesafe-vuex';
import { auth } from '~/api/authenticate';
import { ActionContext } from 'vuex';
import { State } from '../state';
import { MainState } from './state';
import { commitSetLogInError, commitSetToken } from './mutations';
import { getCookie } from '~/utils/cookie';

type MainContext = ActionContext<MainState, State>;

export const actions = {
	async actionLogIn(context: MainContext, payload: { email: string; password: string }) {
		try {
			const response = await auth.logIn(payload.email, payload.password);
			if (response.status === 200) {
				const token = getCookie('_auth_token');
				commitSetToken(context, token);
			}
		} catch (err) {
			commitSetLogInError(context, true);
		}
	},
};

const { dispatch } = getStoreAccessors<MainState | any, State>('');
export const dispatchLogIn = dispatch(actions.actionLogIn);
