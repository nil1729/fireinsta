const functions = require('firebase-functions');
const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require('./secret.json');
const cryptoJS = require('crypto-js');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: serviceAccount.databaseURL,
});

const firestore = admin.firestore();
const storage = admin.storage();

function createTimestamp() {
	return admin.firestore.Timestamp.now();
}

exports.newUserSignUp = functions.auth.user().onCreate(async user => {
	await firestore.collection('users').doc(user.uid).set({
		displayName: user.displayName,
		email: user.email,
		phoneNumber: user.phoneNumber,
		website: null,
		bio: null,
		username: null,
		photoURL: user.photoURL,
		createdAt: createTimestamp(),
		updatedAt: createTimestamp(),
	});
	await firestore.collection('friends').doc(user.uid).set({
		followers: [],
		following: [],
	});
	return null;
});

exports.userDelete = functions.auth.user().onDelete(async user => {
	try {
		await firestore.collection('users').doc(user.uid).delete();
		await storage.bucket(`/uploads/${user.uid}`).delete();
	} catch (e) {
		console.log(e);
	}
});

exports.postDelete = functions.storage.object().onDelete(async file => {
	try {
		const fileID = path.basename(file.name, path.extname(file.name));
		await firestore.collection('posts').doc(fileID).delete();
	} catch (e) {
		console.log(e);
	}
});

exports.updateProfile = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'Please Sign in to see the resources'
		);
	}
	try {
		let duplicate = false;
		const res = await firestore
			.collection('users')
			.where('username', '==', data.username)
			.get();
		if (!res.empty) {
			res.forEach(doc => {
				if (context.auth.uid !== doc.id) {
					duplicate = true;
				}
			});
		}
		if (duplicate) {
			return null;
		}
	} catch (e) {
		console.log(e);
	}
	const posts = await firestore
		.collection('posts')
		.where('authorID', '==', context.auth.uid)
		.get();
	posts.forEach(async doc => {
		await firestore
			.collection('posts')
			.doc(doc.id)
			.set(
				{
					author: {
						displayName: data.displayName,
						username: data.username,
					},
				},
				{ merge: true }
			);
	});

	return firestore
		.collection('users')
		.doc(context.auth.uid)
		.set(
			{
				displayName: data.displayName,
				phoneNumber: data.phoneNumber,
				website: data.website,
				bio: data.bio,
				username: data.username,
				updatedAt: createTimestamp(),
			},
			{ merge: true }
		)
		.then(docRef => {
			return docRef;
		})
		.catch(err => {
			console.log(err);
		});
});

exports.fetchProfile = functions.https.onCall(async (data, context) => {
	try {
		if (!context.auth) {
			throw new functions.https.HttpsError(
				'unauthenticated',
				'Please Sign in to see the resources'
			);
		}
		const userRes = await firestore
			.collection('users')
			.doc(context.auth.uid)
			.get();
		if (!userRes.exists) {
			return 'No Data Found With given Information';
		}
		const user = {
			displayName: userRes.data().displayName,
			email: userRes.data().email,
			phoneNumber: userRes.data().phoneNumber,
			website: userRes.data().website,
			bio: userRes.data().bio,
			username: userRes.data().username,
			photoURL: userRes.data().photoURL,
		};
		const postsRes = await firestore
			.collection('posts')
			.where('authorID', '==', context.auth.uid)
			.get();
		let posts = [];
		postsRes.forEach(doc => {
			posts.push({
				...({ downloadURL, likes } = doc.data()),
				id: doc.id,
			});
		});
		return {
			...user,
			posts,
		};
	} catch (e) {
		return e;
	}
});

exports.fetchViewProfile = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'Please Sign in to see the resources'
		);
	}

	const res = await firestore
		.collection('users')
		.where('username', '==', data.username)
		.get();
	if (res.empty) {
		return 'not-found';
	}
	let user, id;
	res.forEach(doc => {
		let data = doc.data();
		id = doc.id;
		user = {
			displayName: data.displayName,
			website: data.website,
			bio: data.bio,
			username: data.username,
			photoURL: data.photoURL,
			id: cryptoJS.AES.encrypt(
				JSON.stringify(doc.id),
				'Nilanjan Deb'
			).toString(),
		};
	});
	const postsRes = await firestore
		.collection('posts')
		.where('authorID', '==', id)
		.get();
	let posts = [];
	postsRes.forEach(doc => {
		posts.push({
			...({ downloadURL, likes } = doc.data()),
			id: doc.id,
		});
	});
	return { ...user, posts };
});

exports.fetchHomeUser = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'Please Sign in to see the resources'
		);
	}
	const users = [];
	const res = await firestore
		.collection('users')
		.limit(6)
		.orderBy('createdAt', 'desc')
		.get();
	let count = 5;
	res.forEach(doc => {
		if (doc.id !== context.auth.uid && count > 0) {
			count--;
			users.push({
				displayName: doc.data().displayName,
				username: doc.data().username,
				photoURL: doc.data().photoURL,
			});
		}
	});
	return users;
});

exports.uploadImageToStorage = functions.storage
	.object()
	.onFinalize(async file => {
		const downloadURL = `${file.mediaLink.replace(
			'https://www.googleapis.com/download/storage/v1',
			'https://firebasestorage.googleapis.com/v0'
		)}&token=${file.metadata.firebaseStorageDownloadTokens}`;
		const fileID = path.basename(file.name, path.extname(file.name));
		const userID = file.name.split('/')[1];
		const userSnap = await firestore.collection('users').doc(userID).get();
		const user = userSnap.data();
		return firestore
			.collection('posts')
			.doc(fileID)
			.set({
				downloadURL,
				authorID: userID,
				author: {
					displayName: user.displayName,
					username: user.username,
					photoURL: user.photoURL,
				},
				createdAt: createTimestamp(),
				postContent: file.metadata['Post Content'],
				likes: [],
				comments: [],
			});
	});

exports.fetchAllPosts = functions.https.onCall(async (data, context) => {
	try {
		if (!context.auth) {
			throw new functions.https.HttpsError(
				'unauthenticated',
				'Please Sign in to see the resources'
			);
		}
		const postSnaps = await firestore
			.collection('posts')
			.limit(10)
			.orderBy('createdAt', 'desc')
			.get();
		let posts = [];
		postSnaps.forEach(doc => {
			posts.push({ ...doc.data(), authorID: null, id: doc.id });
		});
		return posts;
	} catch (err) {
		console.log(err);
		return null;
	}
});

exports.addComment = functions.https.onCall(async (data, context) => {
	try {
		if (!context.auth) {
			throw new functions.https.HttpsError(
				'unauthenticated',
				'Please Sign in to see the resources'
			);
		}
		const postSnap = await firestore.collection('posts').doc(data.id).get();
		let comments = postSnap.data().comments;
		await firestore
			.collection('posts')
			.doc(data.id)
			.set(
				{
					comments: [data.comments, ...comments],
				},
				{ merge: true }
			);
		return true;
	} catch (e) {
		console.log(e);
		return e;
	}
});
