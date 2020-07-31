import {
	LOAD_USER,
	LOG_OUT,
	AUTH_ALERTS,
	CLEAR_ALERTS,
	UPDATE_PROFILE,
} from './types';
import firebase from '../../firebase/firebaseApp';

const loadUser = () => async dispatch => {
	try {
		firebase.auth().onAuthStateChanged(async function (user) {
			if (user) {
				const callFetch = firebase.functions().httpsCallable('fetchProfile');
				const res = await callFetch();
				return dispatch({
					type: LOAD_USER,
					payload: {
						user: user.providerData[0],
						details: res.data,
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

export { loadUser, signOut, setAuthAlert, clearAuthAlerts, updateProfile };
