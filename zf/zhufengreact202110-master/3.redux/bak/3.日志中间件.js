import { createStore } from './../redux';
import combinedReducer from './reducers';
let store = createStore(combinedReducer);
//先缓存老的dispatch方法
let originDispatch = store.dispatch;
//中间件的核心 原理是重写store.dispatch方法
store.dispatch = function (action) {
    console.log('prev state', store.getState());
    originDispatch(action);//这个代码执行之后
    console.log('next state', store.getState());
}

export default store;

/**
 * 我现有有一个需要
 * 我希望在状态变更前后进行打印，打印老状态和新状态
 * prevState
 * nextState
 */