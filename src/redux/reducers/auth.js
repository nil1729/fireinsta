import {
	SIGN_IN_GOOGLE,
	LOAD_USER,
	LOG_OUT,
	CLEAR_ALERTS,
	AUTH_ALERTS,
	UPDATE_PROFILE,
} from '../actions/types';
const initialState = {
	isAuthenticated: false,
	loading: true,
	user: null,
	alerts: {},
	details: null,
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
				user: action.payload.user,
				details: action.payload.details,
			};
		case UPDATE_PROFILE:
			return {
				...state,
				details: action.payload,
			};
		case LOG_OUT:
			return {
				...initialState,
				loading: false,
			};
		case AUTH_ALERTS:
			return {
				...state,
				alerts: action.payload,
			};
		case CLEAR_ALERTS:
			return {
				...state,
				alerts: {},
			};
		default: {
			return state;
		}
	}
};
