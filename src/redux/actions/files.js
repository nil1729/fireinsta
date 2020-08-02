import { FILE_UPLOAD, FILE_UPLOAD_LOADING } from './types';

import firebase from '../../firebase/firebaseApp';

const uploadImageToStorage = ev => async dispatch => {
	const storage = firebase.storage();
	try {
		dispatch({
			type: FILE_UPLOAD_LOADING,
		});
	} catch (e) {
		console.log(e);
	}
};

export { uploadImageToStorage };
