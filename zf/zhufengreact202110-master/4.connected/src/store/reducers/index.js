import { combineReducers } from 'redux';
import { connectRouter } from '../../connected-react-router'
import counter from './counter';
import history from '../../history';
let reducers = {
    router: connectRouter(history),
    counter
}
const combinedReducer = combineReducers(reducers);
export default combinedReducer;
/**
 * state = {
 *   router:{action:'PUSH/POP',location:{pathname:'/counter'}},
 *   counter:{number:0}
 * }
 */
/**
 * connectRouter(history)执行结果是一个reducer,
 * ConnectedRouter监听路径变化，路径发生变化后会发送动作给仓库
 * router会响应这个动作，并且把最新的路径保存到仓库中
 *
 * connect-react-router这个库有四个文件，这四个文件分成两组
 * 每个完成一个功能
 * 1.把最新的路径信息同步到仓库中
 * ConnectedRouter 监听路径变化，路由变化后向仓库派发动作
 * connectRouter 这个reducer会响应这个动作，把传递过来的路径信息写入仓库 state.counter={action,location}
 */