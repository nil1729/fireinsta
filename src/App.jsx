import React, { useEffect } from 'react';
import Login from './routes/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Home from './routes/Home';
import { connect } from 'react-redux';
import { loadUser } from './redux/actions/auths';
import Alerts from './components/Layouts/Alerts';

const App = ({ loadUser }) => {
	useEffect(() => {
		loadUser();
		console.log('root');
		// eslint-disable-next-line
	}, []);
	return (
		<Router>
			<Switch>
				<Route path='/login' exact component={Login} />
				<PrivateRoute path='/' exact component={Home} />
			</Switch>
			<Alerts />
		</Router>
	);
};

export default connect(null, { loadUser })(App);
