import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {routerMiddleware} from 'connected-react-router';
import history from './history';
import rootReducer from './reducers';
let store = applyMiddleware(thunk,routerMiddleware(history),promise,logger)(createStore)(rootReducer);
export default store;