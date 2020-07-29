import React, { useEffect, useState } from 'react';
import firebase, { provider } from '../firebase/firebaseApp';
import { connect } from 'react-redux';

const Login = () => {
	const handleClick = () => {
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function (result) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				// ...
				console.log(token, user);
			})
			.catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
				console.log(error);
			});
	};
	return (
		<>
			<button onClick={handleClick}>Google Sign In</button>
		</>
	);
};

export default connect(null)(Login);
