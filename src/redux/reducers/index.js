import { combineReducers } from 'redux';
import auths from './auth';
import users from './users';

export default combineReducers({
	AUTHS: auths,
	USERS: users,
});
