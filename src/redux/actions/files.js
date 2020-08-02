import { FILE_UPLOADED, FILE_UPLOAD_LOADING } from './types';
import crypto from 'crypto';
import path from 'path';
import firebase from '../../firebase/firebaseApp';

const uploadImageToStorage = ev => async dispatch => {
	try {
		dispatch({
			type: FILE_UPLOAD_LOADING,
		});
		const user = firebase.auth().currentUser;
		const storage = firebase.storage();
		const extName = path.extname(ev.file.name);
		const fileName = `${crypto
			.randomBytes(10)
			.toString('hex')
			.toUpperCase()}${extName}`;
		const storageRef = storage.ref(`uploads/${user.uid}/${fileName}`);
		const metadata = {
			contentType: `${ev.file.type}`,
			customMetadata: {
				'Post Content': `${ev.postTitle}`,
			},
		};
		await storageRef.put(ev.file, metadata);
		dispatch({
			type: 'AUTH_ALERTS',
			payload: {
				type: 'success',
				message: 'Image Uploaded Successfully',
			},
		});
		return dispatch({
			type: FILE_UPLOADED,
		});
	} catch (e) {
		console.log(e);
	}
};

export { uploadImageToStorage };
