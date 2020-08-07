import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({ trace: true });

let store = createStore(
	rootReducer,
	initialState,
	composeEnhancers(applyMiddleware(...middleware))
);

if (process.env.NODE_ENV === 'production') {
	store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(...middleware)
	);
}

export default store;
