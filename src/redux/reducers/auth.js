import { SIGN_IN_GOOGLE } from '../actions/types';
const initialState = {
	isAuthenticated: false,
	loading: false,
	user: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN_GOOGLE:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			};
		default: {
			return state;
		}
	}
};
