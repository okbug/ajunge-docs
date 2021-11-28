import { createStore, applyMiddleware } from './../redux';
import combinedReducer from './reducers';
import thunk from './redux-thunk';
import promise from './redux-promise';
import logger from './redux-logger';
//中间件中的middlewareAPI.dispatch 是改造后的dispatch,因为有些时候我们希望能够 嵌套或者说重新派发
//let store = createStore(combinedReducer);
const store = applyMiddleware(promise, thunk, logger)
    (createStore)
    (combinedReducer, { counter1: { number: 0 }, counter2: { number: 0 } });


export default store;

/**
 * 我现有有一个需要
 * 我希望在状态变更前后进行打印，打印老状态和新状态
 * prevState
 * nextState
 * 应用有我们一定要时刻搞清楚dispatch到底是原始的 还是改造后的
 */