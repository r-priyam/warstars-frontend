import { getStoreAccessors } from 'typesafe-vuex';
import { ActionContext } from 'vuex';
import { user as Api } from '~/api/user';
import { IUserProfileCreate, IUserProfileUpdate } from '~/interfaces/user';
import { dispatchLogOut } from '../main/actions';
import { State } from '../state';
import { commitSetError, commitSetProcessing, commitSetSuccess } from './mutations';
import { UserState } from './state';

type MainContext = ActionContext<UserState, State>;

export const actions = {
	async actionSignUp(context: MainContext, payload: IUserProfileCreate) {
		try {
			commitSetProcessing(context, true);
			(
				await Promise.all([
					await Api.createUser(payload),
					await new Promise<void>((resolve, reject) => setTimeout(() => resolve(), 500)),
				])
			)[0];
			commitSetProcessing(context, false);
			commitSetSuccess(context, true);
		} catch (error: any) {
			commitSetError(context, {
				error: true,
				message: error.response ? error.response.data.detail : 'Something went wrong!',
			});
			commitSetProcessing(context, false);
		}
	},

	async actionUpdateUser(context: MainContext, payload: IUserProfileUpdate) {
		try {
			(
				await Promise.all([
					await Api.updateUser(context.rootState.main.token, payload),
					await new Promise<void>((resolve, reject) => setTimeout(() => resolve(), 500)),
				])
			)[0];
		} catch (error: any) {
			commitSetError(context, { error: true, message: error.response.data.detail });
		}
	},

	async actionDeleteUser(context: MainContext) {
		try {
			(
				await Promise.all([
					await Api.deleteUser(context.rootState.main.token),
					await new Promise<void>((resolve, reject) => setTimeout(() => resolve(), 500)),
				])
			)[0];
			await dispatchLogOut(context);
		} catch (error: any) {
			commitSetError(context, { error: true, message: error.response.data.detail });
		}
	},
};

const { dispatch } = getStoreAccessors<UserState, State>('');

export const dispatchSignUp = dispatch(actions.actionSignUp);
export const dispatchUserUpdate = dispatch(actions.actionUpdateUser);
export const dispatchUserDelete = dispatch(actions.actionDeleteUser);
