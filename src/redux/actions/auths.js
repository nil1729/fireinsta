import { LOAD_USER, LOG_OUT, AUTH_ALERTS, CLEAR_ALERTS } from './types';
import firebase from '../../firebase/firebaseApp';

const loadUser = () => async dispatch => {
	try {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				return dispatch({
					type: LOAD_USER,
					payload: user.providerData[0],
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

export { loadUser, signOut, setAuthAlert, clearAuthAlerts };
