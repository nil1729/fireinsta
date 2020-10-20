import {
	LOAD_USER,
	LOG_OUT,
	AUTH_ALERTS,
	CLEAR_ALERTS,
	UPDATE_PROFILE,
} from './types';
import firebase from '../../firebase/firebaseApp';
import cryptoJS from 'crypto-js';

const loadUser = () => async dispatch => {
	try {
		firebase.auth().onAuthStateChanged(async function (user) {
			if (user) {
				const uid = cryptoJS.AES.encrypt(
					JSON.stringify(user.uid),
					'Nilanjan Deb'
				).toString();
				const callFetch = firebase.functions().httpsCallable('fetchProfile');
				const res = await callFetch();

				const friendSnap = await firebase
					.firestore()
					.collection('friends')
					.doc(user.uid)
					.get();
				const friends = friendSnap.data();
				return dispatch({
					type: LOAD_USER,
					payload: {
						user: { ...user.providerData[0], authID: uid },
						details: { ...res.data, friends },
					},
				});
			} else {
				return dispatch({
					type: LOG_OUT,
				});
			}
		});
	} catch (e) {
		console.log(e);
	}
};

const signOut = () => async dispatch => {
	try {
		await firebase.auth().signOut();
	} catch (e) {
		console.log(e);
	}
};

const setAuthAlert = ev => {
	return {
		type: AUTH_ALERTS,
		payload: ev,
	};
};

const clearAuthAlerts = () => {
	return {
		type: CLEAR_ALERTS,
	};
};

const updateProfile = ev => async dispatch => {
	try {
		const callUpdate = firebase.functions().httpsCallable('updateProfile');
		await callUpdate(ev);
		return dispatch({
			type: UPDATE_PROFILE,
			payload: ev,
		});
	} catch (e) {
		console.log(e);
	}
};

const sendUpdateReq = ev => async dispatch => {
	try {
		const callUpdate = firebase.functions().httpsCallable('updateProfile');
		const res = await callUpdate(ev);
		if (!res.data) {
			return dispatch({
				type: AUTH_ALERTS,
				payload: {
					type: 'warning',
					message: 'Duplicate Username Found. Please use another Username',
				},
			});
		}
		dispatch({
			type: UPDATE_PROFILE,
			payload: ev,
		});
		return dispatch({
			type: AUTH_ALERTS,
			payload: {
				type: 'success',
				message: 'Your Profile is Successfully Updated',
			},
		});
	} catch (e) {
		console.log(e);
	}
};

const updateAuthFriends = ev => async dispatch => {
	try {
		const authID = firebase.auth().currentUser.uid;
		const { userID, friends } = ev;
		let authFriends;
		if (friends.following.includes(userID)) {
			authFriends = friends.following.filter(f => f != userID);
		} else {
			authFriends = [...friends.following, userID];
		}
		await firebase.firestore().collection('friends').doc(authID).set(
			{
				following: authFriends,
			},
			{ merge: true }
		);
		return dispatch({
			type: 'UPDATE_AUTH_FRIEND_LIST',
			payload: { ...friends, following: authFriends },
		});
	} catch (e) {
		console.log(e);
	}
};

export {
	loadUser,
	signOut,
	setAuthAlert,
	clearAuthAlerts,
	updateProfile,
	sendUpdateReq,
	updateAuthFriends,
};
