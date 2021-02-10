import {createStore,applyMiddleware} from 'redux';
import history from '../history';
import {routerMiddleware} from '../connected-react-router';
import rootReducer from './reducers';
const store = applyMiddleware(routerMiddleware(history))(createStore)(rootReducer);
window.store = store;
export default store;
/**
 * routerMiddleware作用是拦截跳转路径的action
 * store.dispatch 会判断你是否要转路径，如果是的话用history.push来跳，如果不是的话next
 * connect-redux store to react-router
 * 把redux仓库和react路由进行关联
 * 1.可以通过派发仓库动作的方式跳转路由/路径
 * 2.路径改变后可以最新的路径信息写入仓库，可以通过仓库获取最新的路径信息
 */
