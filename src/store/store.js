import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from './reducers';

// eslint-disable-next-line no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middleware = [thunk, promise];
if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger];
}
export default createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)));
