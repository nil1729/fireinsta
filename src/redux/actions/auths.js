import { LOAD_USER, LOG_OUT } from './types';
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
export { loadUser, signOut };
