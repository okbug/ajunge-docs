import {createStore,applyMiddleware} from 'redux';
import {routerMiddleware} from '../connected-react-router'
import rootReducer from './reducers';
import history from '../history';
//routerMiddleware识别或者说拦截push action,根据参数跳转路由
let store = applyMiddleware(routerMiddleware(history))(createStore)(rootReducer);
export default store;
window.store = store;