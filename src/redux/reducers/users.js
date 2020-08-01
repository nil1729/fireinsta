import {
	FETCH_PROFILE,
	SET_USER_LOADING,
	SET_HOME_USER_LOADING,
	FETCH_HOME_USERS,
	CLEAR_USERS_STATE,
} from '../actions/types';
const initialState = {
	loading: false,
	currentUser: null,
	homeUserLoading: false,
	homeUsers: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case FETCH_PROFILE:
			return {
				...state,
				loading: false,
				currentUser: action.payload.data,
				username: action.payload.username,
			};
		case SET_HOME_USER_LOADING:
			return {
				...state,
				homeUserLoading: true,
			};
		case FETCH_HOME_USERS:
			return {
				...state,
				homeUserLoading: false,
				homeUsers: action.payload,
			};
		case CLEAR_USERS_STATE:
			return {
				...initialState,
			};
		default:
			return {
				...state,
			};
	}
};
