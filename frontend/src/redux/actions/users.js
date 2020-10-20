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
import crypto from 'crypto';
import cryptoJS from 'crypto-js';

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
		const bytes = cryptoJS.AES.decrypt(res.data.id, 'Nilanjan Deb');
		const userID = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
		const friendSnap = await firebase
			.firestore()
			.collection('friends')
			.doc(userID)
			.get();
		const friends = friendSnap.data();
		return dispatch({
			type: FETCH_PROFILE,
			payload: { data: { ...res.data, friends }, username: ev },
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
			ev.likes = ev.likes.filter(id => id !== authID);
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
		return dispatch({
			type: 'NEW_LIKE_RESPONSE',
			payload: { id: ev.id, likes: ev.likes },
		});
	} catch (e) {
		console.log(e);
	}
};

const addComment = ev => async dispatch => {
	try {
		const callAddComment = firebase.functions().httpsCallable('addComment');
		const data = {
			id: ev.id,
			comments: {
				id: crypto.randomBytes(10).toString('hex'),
				text: ev.text,
				author: ev.author,
			},
		};
		await callAddComment(data);
		return dispatch({
			type: 'NEW_COMMENT_ADD',
			payload: data,
		});
	} catch (e) {
		console.log(e);
	}
};

const updateUserFriends = ev => async dispatch => {
	try {
		const authID = firebase.auth().currentUser.uid;
		const { userID, friends } = ev;
		let userFriends;
		if (friends.followers.includes(authID)) {
			userFriends = friends.followers.filter(f => f !== authID);
		} else {
			userFriends = [...friends.followers, authID];
		}
		await firebase.firestore().collection('friends').doc(userID).set(
			{
				followers: userFriends,
			},
			{ merge: true }
		);
		return dispatch({
			type: 'UPDATE_FRIEND_LIST',
			payload: { ...friends, followers: userFriends },
		});
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
	addComment,
	updateUserFriends,
};
