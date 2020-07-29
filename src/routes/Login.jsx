import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase, { provider } from '../firebase/firebaseApp';
import { connect } from 'react-redux';
import { signInGoogle } from '../redux/actions/auths';

const Login = ({ signInGoogle, authState: { isAuthenticated } }) => {
	const history = useHistory();
	useEffect(() => {
		if (isAuthenticated) {
			history.push('/');
		}
	}, [isAuthenticated]);
	const handleClick = async () => {
		try {
			const res = await firebase.auth().signInWithPopup(provider);
			signInGoogle({ data: res.user.providerData[0] });
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

export default connect(mapStateToProps, { signInGoogle })(Login);
