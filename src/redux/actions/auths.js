import { SIGN_IN_GOOGLE } from './types';
const signInGoogle = ev => {
	if (ev.errors) {
	} else {
		return {
			type: SIGN_IN_GOOGLE,
			payload: ev.data,
		};
	}
};
export { signInGoogle };
