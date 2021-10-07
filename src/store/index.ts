import Vuex, { StoreOptions } from 'vuex';
import { mainModule } from './main';
import { State } from './state';
import { userModule } from './user';

const storeOptions: StoreOptions<State> = {
	modules: {
		main: mainModule,
		signUp: userModule,
	},
};

export const store = new Vuex.Store<State>(storeOptions);

export default store;
