import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../redux/actions/auths';
const Home = ({ signOut }) => {
	return (
		<>
			<p>Home</p>
			<button onClick={signOut}>Sign Out</button>
		</>
	);
};

export default connect(null, { signOut })(Home);
