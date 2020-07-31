import { FETCH_PROFILE, SET_USER_LOADING } from '../actions/types';
const initialState = {
	loading: false,
	currentUser: null,
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
		default:
			return {
				...state,
			};
	}
};
