import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthAlert } from '../redux/actions/auths';

const Home = ({ authState, setAuthAlert }) => {
	const history = useHistory();
	useEffect(() => {
		if (!authState.loading && !authState.details.username) {
			setAuthAlert({
				type: 'warning',
				message: 'Please add a username to Continue with Fireinsta',
			});
			history.push('/accounts/settings');
		}
		// eslint-disable-next-line
	}, [authState.details]);
	return <></>;
};

const mapStateToProps = state => ({
	authState: state.AUTHS,
});

export default connect(mapStateToProps, { setAuthAlert })(Home);
