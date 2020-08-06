import {
	FETCH_PROFILE,
	SET_USER_LOADING,
	SET_HOME_USER_LOADING,
	FETCH_HOME_USERS,
	CLEAR_USERS_STATE,
	SET_HOME_POST_LOADING,
	FETCH_HOME_POSTS,
	NEW_FILE_UPLOAD,
} from './types';

import firebase from '../../firebase/firebaseApp';

const fetchProfile = ev => async dispatch => {
	try {
		dispatch({
			type: SET_USER_LOADING,
			payload: true,
		});
		const callFectchProfile = firebase
			.functions()
			.httpsCallable('fetchViewProfile');
		const res = await callFectchProfile({
			username: ev,
		});
		return dispatch({
			type: FETCH_PROFILE,
			payload: { data: res.data, username: ev },
		});
	} catch (e) {
		console.log(e);
	}
};

const fetchHomeUsers = () => async dispatch => {
	try {
		dispatch({
			type: SET_HOME_USER_LOADING,
		});
		const callFetchHomeUsers = firebase
			.functions()
			.httpsCallable('fetchHomeUser');
		const res = await callFetchHomeUsers();
		return dispatch({
			type: FETCH_HOME_USERS,
			payload: res.data,
		});
	} catch (e) {
		console.log(e);
	}
};

const clearUsersState = () => {
	return {
		type: CLEAR_USERS_STATE,
	};
};

const fetchHomePosts = () => async dispatch => {
	try {
		dispatch({
			type: SET_HOME_POST_LOADING,
		});
		const callFetchAllPosts = firebase
			.functions()
			.httpsCallable('fetchAllPosts');
		const res = await callFetchAllPosts();
		return dispatch({
			type: FETCH_HOME_POSTS,
			payload: res.data,
		});
	} catch (e) {
		console.log(e);
	}
};

const newFileUpload = ev => {
	return {
		type: NEW_FILE_UPLOAD,
		payload: ev,
	};
};

const likePost = ev => async dispatch => {
	try {
		const authID = firebase.auth().currentUser.uid;
		if (ev.likes.includes(authID)) {
			ev.likes.filter(id => id !== authID);
		} else {
			ev.likes.push(authID);
		}
		await firebase
			.firestore()
			.collection('posts')
			.doc(ev.id)
			.set(
				{
					likes: [...ev.likes],
				},
				{ merge: true }
			);
		console.log('Updated');
	} catch (e) {
		console.log(e);
	}
};

export {
	fetchProfile,
	fetchHomeUsers,
	clearUsersState,
	fetchHomePosts,
	newFileUpload,
	likePost,
};
