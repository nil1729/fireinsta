import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase, { provider } from '../firebase/firebaseApp';
import { connect } from 'react-redux';

const Login = ({ authState: { isAuthenticated } }) => {
	const history = useHistory();
	useEffect(() => {
		if (isAuthenticated) {
			history.push('/');
		}
	}, [isAuthenticated]);
	const handleClick = async () => {
		try {
			await firebase.auth().signInWithPopup(provider);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<>
			<button onClick={handleClick}>Google Sign In</button>
		</>
	);
};

const mapStateToProps = state => ({
	authState: state.AUTHS,
});

export default connect(mapStateToProps)(Login);
