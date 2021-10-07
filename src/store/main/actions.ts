import { getStoreAccessors } from 'typesafe-vuex';
import { ActionContext } from 'vuex';
import { auth } from '~/api/authenticate';
import { getCookie } from '~/utils/cookie';
import { State } from '../state';
import { commitSetLogInError, commitSetProcessing, commitSetToken } from './mutations';
import { MainState } from './state';

type MainContext = ActionContext<MainState, State>;

export const actions = {
	async actionLogIn(context: MainContext, payload: { email: string; password: string }) {
		try {
			commitSetProcessing(context, true);
			const response = await auth.logIn(payload.email, payload.password);
			if (response.status === 200) {
				const token = getCookie('_auth_token');
				commitSetToken(context, token);
			}
		} catch (err) {
			commitSetLogInError(context, true);
		}
		commitSetProcessing(context, false);
	},
};

const { dispatch } = getStoreAccessors<MainState | any, State>('');
export const dispatchLogIn = dispatch(actions.actionLogIn);
