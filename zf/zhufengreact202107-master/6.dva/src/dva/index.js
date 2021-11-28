import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as sagaEffects from 'redux-saga/effects';
import {NAMESPACE_SEP} from './constants';
import { Provider, connect } from 'react-redux';
import prefixNamespace from './prefixNamespace';
import {createHashHistory} from 'history';
import {ConnectedRouter,connectRouter,routerMiddleware} from 'connected-react-router';
let history = createHashHistory();
export { connect }
function dva() {
    const app = {
        _models: [],//存放model的数组
        model,//函数用来往 model数组中添加model元素
        router,//定义路由的函数
        _router: null,//存放路由函数的变量
        start//开启渲染
    }
    function model(modelObject) {
        const prefixedModel = prefixNamespace(modelObject);
        app._models.push(prefixedModel);
        return prefixedModel
    }
    function router(routerConfig) {
        app._router = routerConfig;
    }
    //合并conenctRouter这个reducer
    let initialReducers = {router:connectRouter(history)};
    function start(selector) {
        for (const model of app._models) {
            initialReducers[model.namespace] = getReducer(model);
        }
        let rootReducer = createReducer();
        const sagas  = getSagas(app);
        let sagaMiddleware = createSagaMiddleware();
        let store = applyMiddleware(sagaMiddleware,routerMiddleware(history))(createStore)(rootReducer);
        sagas.forEach(saga=>sagaMiddleware.run(saga));
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                   {app._router({history})}
                </ConnectedRouter>
            </Provider>,document.querySelector(selector)
        );
    }
    //把每个model中的effects变成一个saga,最后同意交给run来执行
    function getSagas(app){
        let sagas = [];
        for(let model of app._models){
            sagas.push(getSaga(model.effects,model));
        }
        return sagas;
    }
    function createReducer(){
        return combineReducers(initialReducers);
    }
    return app;
}
function getSaga(effects,model){
    return function*(){
        for(const key in effects){
            //每个key转换成一个watcherSaga,然后开启一个新的子进程去执行
            const watcherSaga  = getWatcher(key,model.effects[key],model);
            yield sagaEffects.fork(watcherSaga);
        }
    }
}
function getWatcher(key,effect,model){
    return function*(){
        //监听每次的store.dispatch({type:'counter/asyncAdd'}) 等到之后执行effct
        yield sagaEffects.takeEvery(key,function*(action){
           yield effect(action,{
               ...sagaEffects,
               put:action=>sagaEffects.put({...action,type:prefixType(action.type,model)})
           });
        });
    }
}
function prefixType(type,model){
    if(type.indexOf('/')===-1){
        return `${model.namespace}${NAMESPACE_SEP}${type}`;//counter/add
    }else{
        console.warn(`Warning: [sagaEffects.put] ${type} should not be prefixed with namespace ${model.namespace}`);
        return type;
    }
}
function getReducer(model) {
    let { state: initialState, reducers } = model;
    return (state = initialState, action) => {
        let reducer = reducers[action.type];
        if (reducer) return reducer(state, action);
        return state;
    }
}
export default dva;
/**
 * connect => Provider
 * Provider => store
 * store => reducer
 * 获取每个model的reducers对象，把每个对象变成一个函数
 * 然后再通过combineReducers合并成一个reducer
 */