import { SIGN_IN_GOOGLE, LOAD_USER, LOG_OUT } from '../actions/types';
const initialState = {
	isAuthenticated: false,
	loading: true,
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
		case LOAD_USER:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				user: action.payload,
			};
		case LOG_OUT:
			return {
				...initialState,
				loading: false,
			};
		default: {
			return state;
		}
	}
};
