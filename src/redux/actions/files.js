import { FILE_UPLOAD, FILE_UPLOAD_LOADING } from './types';
import crypto from 'crypto';
import path from 'path';
import firebase from '../../firebase/firebaseApp';

const uploadImageToStorage = ev => async dispatch => {
	const storage = firebase.storage();
	const extName = path.extname(ev.file.name);
	const fileName = `${crypto
		.randomBytes(15)
		.toString('hex')
		.toUpperCase()}${extName}`;
	try {
		dispatch({
			type: FILE_UPLOAD_LOADING,
		});
		const storageRef = storage.ref(`uploads/${fileName}`);
		const snapshot = await storageRef.put(ev.file);
		console.log(snapshot);
	} catch (e) {
		console.log(e);
	}
};

export { uploadImageToStorage };
