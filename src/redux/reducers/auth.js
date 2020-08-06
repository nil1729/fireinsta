import {
	SIGN_IN_GOOGLE,
	LOAD_USER,
	LOG_OUT,
	CLEAR_ALERTS,
	AUTH_ALERTS,
	UPDATE_PROFILE,
	FILE_UPLOADED,
	FILE_UPLOAD_LOADING,
} from '../actions/types';
const initialState = {
	isAuthenticated: false,
	loading: true,
	user: null,
	alerts: {},
	details: null,
	fileState: {
		fileUploading: false,
		status: false,
	},
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
				details: state.details.photoURL
					? {
							...state.details,
							...action.payload,
					  }
					: { photoURL: state.user.photoURL, ...action.payload },
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
		case FILE_UPLOAD_LOADING:
			return {
				...state,
				fileState: {
					...state.fileState,
					fileUploading: true,
					file: null,
				},
			};
		case FILE_UPLOADED:
			return {
				...state,
				fileState: {
					...state.fileState,
					fileUploading: false,
					status: true,
					file: action.payload,
				},
				details: {
					...state.details,
					posts: [action.payload, ...state.details.posts],
				},
			};
		case 'CLEAR_FILE_STATE':
			return {
				...state,
				fileState: {
					fileUploading: false,
					status: false,
				},
			};
		default: {
			return state;
		}
	}
};
