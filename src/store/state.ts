import { MainState } from './main/state';
import { UserState } from './user/state';

export interface State {
	main: MainState;
	signUp: UserState;
}
