import {createStore,applyMiddleware} from 'redux'
import rootReducer from './reducers';
import createSagaMiddleware from '../redux-saga';
//import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
//引saga中间件
let sagaMiddleware = createSagaMiddleware();
//应用saga中间件
//一旦你使用了这个中间件之后，那么以后store.dispatch都会指向sagaMiddleware提供 dispatch方法
let store = applyMiddleware(sagaMiddleware)(createStore)(rootReducer);
window.store = store;
//让根saga开始启动执行
sagaMiddleware.run(rootSaga);
export default store;