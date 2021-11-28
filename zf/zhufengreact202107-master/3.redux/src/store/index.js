import { createStore,applyMiddleware} from '../redux';
import rootReducer from './reducers';
import promise from '../redux-promise';
import logger from '../redux-logger';
import thunk from '../redux-thunk';
let store = applyMiddleware(thunk,promise,logger)(createStore)(rootReducer);


//let store = createStore(rootReducer);
//中间件，不管是什么功能，格式是固定
//getState=store.getState  dispatch=store.dispatch
//store => next => action => { /* todo */ }￼


/**
 * 希望 在状态变化前后打印状态
 * store.disptch(action)状态会变化
 */
let oldDispatch = store.dispatch;
//日志功能
/* 
store.dispatch  =  function(action){
    console.log('prev state',store.getState());
    oldDispatch(action);
    console.log('next state',store.getState());
    return action;
} */
//异步操作
/* store.dispatch = function (action) {
    setTimeout(() => {
        oldDispatch(action);
    }, 1000);
    return action;
} */
//发送请求，异步请求数据
/* store.dispatch = function (action) {
   fetch('/user.json').then(res=>res.json()).then(res=>{
       console.log(res);
       oldDispatch(action);
   });
} */
export default store;


/**
 * 我只要一个地方用到dispatch返回值  React SSR
 * 中间件可以实现
 * 1.打日志
 * 2.实现异步
 * 
 * 多个是这样么 applyMiddleware(md1,md2,md3)(createStore)(rootReducer)￼
 * create-react-app 生成的
 * 
 */