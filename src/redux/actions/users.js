import { FETCH_PROFILE, SET_USER_LOADING } from './types';

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

export { fetchProfile };
