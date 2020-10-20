import React, { useEffect } from 'react';
import Login from './routes/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Home from './routes/Home';
import { connect } from 'react-redux';
import { loadUser } from './redux/actions/auths';
import Alerts from './components/Layouts/Alerts';
import Navbar from './components/Layouts/Navbar';
import './App.css';
import Settings from './components/pages/Settings';
import PageLoader from './components/Layouts/FullPageLoader';
import Profile from './components/pages/Profile';
import NotFound from './components/pages/NotFound';

const App = ({ loadUser }) => {
	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);
	return (
		<Router>
			<Navbar />
			<PageLoader />
			<Switch>
				<Route path='/login' exact component={Login} />
				<PrivateRoute path='/' exact component={Home} />
				<PrivateRoute path='/accounts/settings' exact component={Settings} />
				<PrivateRoute path='/:username' exact component={Profile} />
				<Route path='*' component={NotFound} />
			</Switch>
			<Alerts />
		</Router>
	);
};

export default connect(null, { loadUser })(App);
