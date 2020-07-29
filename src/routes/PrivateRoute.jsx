import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, authState, ...rest }) => {
	const { isAuthenticated, loading } = authState;
	return (
		<Route
			{...rest}
			render={props =>
				!isAuthenticated && !loading ? (
					<Redirect to='/login' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

const mapStateToProps = state => ({
	authState: state.AUTHS,
});

export default connect(mapStateToProps)(PrivateRoute);
