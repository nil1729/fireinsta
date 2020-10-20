import {
	FETCH_PROFILE,
	SET_USER_LOADING,
	SET_HOME_USER_LOADING,
	FETCH_HOME_USERS,
	CLEAR_USERS_STATE,
	SET_HOME_POST_LOADING,
	FETCH_HOME_POSTS,
	NEW_FILE_UPLOAD,
} from '../actions/types';
const initialState = {
	loading: false,
	currentUser: null,
	homeUserLoading: false,
	homeUsers: null,
	homePosts: null,
	homePostsLoading: false,
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
		case SET_HOME_POST_LOADING:
			return {
				...state,
				homePostsLoading: true,
			};
		case FETCH_HOME_POSTS:
			return {
				...state,
				homePostsLoading: false,
				homePosts: action.payload,
			};
		case NEW_FILE_UPLOAD:
			return {
				...state,
				homePosts: [action.payload, ...state.homePosts],
			};
		case 'NEW_LIKE_RESPONSE':
			return {
				...state,
				homePosts: state.homePosts.map(post => {
					if (post.id === action.payload.id) {
						return {
							...post,
							likes: action.payload.likes,
						};
					} else return post;
				}),
			};
		case 'NEW_COMMENT_ADD':
			return {
				...state,
				homePosts: state.homePosts.map(post => {
					if (post.id === action.payload.id) {
						return {
							...post,
							comments: [action.payload.comments, ...post.comments],
						};
					} else return post;
				}),
			};
		case 'UPDATE_FRIEND_LIST':
			return {
				...state,
				currentUser: {
					...state.currentUser,
					friends: action.payload,
				},
			};
		default:
			return {
				...state,
			};
	}
};
