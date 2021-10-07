export interface UserState {
	userProcessing: boolean;
	success: boolean;
	error: { error: boolean; message: string };
}
