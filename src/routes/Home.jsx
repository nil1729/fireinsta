import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../redux/actions/auths';
const Home = ({ signOut }) => {
	return <></>;
};

export default connect(null, { signOut })(Home);
