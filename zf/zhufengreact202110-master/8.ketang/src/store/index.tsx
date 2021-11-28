import { createStore, applyMiddleware } from 'redux';
import combinedReducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { routerMiddleware } from 'connected-react-router';
import history from '@/history';
import { persistStore, persistReducer } from 'redux-persist';
//存储持久化数据的方式有很多，这里指的localStorage
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',//localStorage.setItem('root',对应的数据);
    storage,//指定存储的方式，这里的storage指的就是localStorage
    whitelist: ['cart']//store仓库中的状态对象的cart属性
}
const persistedReducer = persistReducer(persistConfig, combinedReducer);
let store = applyMiddleware(routerMiddleware(history), thunk, promise, logger)(createStore)(persistedReducer);
let persistor = persistStore(store);
export { store, persistor };
/**
 * persist双向的
 * 当仓库中的状态发生修改后会向localStorage存一份
 * 当你重新刷新页面后，会从localStorage取出来 ，合并到你仓库 状态树中
 */