import { getStoreAccessors } from 'typesafe-vuex';
import { ActionContext } from 'vuex';
import { auth } from '~/api/authenticate';
import router from '~/router';
import { deleteCookie, getCookie } from '~/utils/cookie';
import { State } from '../state';
import { commitSetLoggedIn, commitSetLogInError, commitSetProcessing, commitSetToken } from './mutations';
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
				commitSetLoggedIn(context, true);
			}
		} catch (err) {
			commitSetLogInError(context, true);
		}
		commitSetProcessing(context, false);
	},

	actionRemoveLogIn(context: MainContext) {
		deleteCookie('_auth_token');
		commitSetToken(context, '');
		commitSetLoggedIn(context, false);
	},

	async actionLogOut(context: MainContext) {
		await dispatchRemoveLogIn(context);
		await dispatchRouteLogOut(context);
	},

	async actionUserLogOut(context: MainContext) {
		await dispatchLogOut(context);
	},

	actionRouteLogOut(context: MainContext) {
		if (router.currentRoute.value.path !== '/login') {
			void router.push('/login');
		}
	},
};

const { dispatch } = getStoreAccessors<MainState | any, State>('');
export const dispatchLogIn = dispatch(actions.actionLogIn);
export const dispatchLogOut = dispatch(actions.actionLogOut);
export const dispatchUserLogOut = dispatch(actions.actionUserLogOut);
export const dispatchRemoveLogIn = dispatch(actions.actionRemoveLogIn);
export const dispatchRouteLogOut = dispatch(actions.actionRouteLogOut);
