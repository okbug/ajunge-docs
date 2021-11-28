import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as  sagaEffects from 'redux-saga/effects';
import { createHashHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
export { connect }
function dva(opts) {
    const app = {
        _models: [],
        model,
        _router: null,
        router,
        start,
        createAction,
        history: createHashHistory()
    }
    if (opts.history)
        app.history = opts.history;

    function model(modelConfig) {
        const prefixedModel = prefixNamespace(modelConfig);
        app._models.push(prefixedModel);
    }
    function router(routerConfig) {
        app._router = routerConfig;
    }
    //dva并没有此功能
    function createAction() {
        let actionCreators = {};
        for (const model of app._models) {
            let { reducers } = model;
            for (let key in reducers) {
                // counter/add =>  action {type:'counter/add'}
                actionCreators[key] = () => ({ type: key })
            }
        }
        return actionCreators;
    }
    function start(root) {
        let reducers = { router: connectRouter(app.history) };
        for (const model of app._models) {
            let reducer = getReducer(model);
            //reducers.counter = reducer;
            reducers[model.namespace] = reducer;
        }
        //把reducers进行合成成一个根reducer
        let combinedReducer = combineReducers(reducers);
        //从app中获取saga的数组
        const sagas = getSagas(app);
        let sagaMiddleware = createSagaMiddleware();
        let store = applyMiddleware(sagaMiddleware, routerMiddleware(app.history))(createStore)(combinedReducer);
        window.store = store;
        //全部启动
        sagas.forEach(saga => sagaMiddleware.run(saga));
        //let store = createStore(combinedReducer);
        //store.dispatch(action);
        ReactDOM.render(
            <Provider store={store}>
                {app._router({ history: app.history })}
            </Provider>, document.querySelector(root));
    }
    function getSagas(app) {
        let sagas = [];
        for (const model of app._models) {
            let saga = getSaga(model);
            sagas.push(saga);
        }
        return sagas;
    }
    return app;
}
function getSaga(model) {
    const { effects } = model;
    return function* () {
        for (const key in effects) {//key=asyncAdd
            yield sagaEffects.takeEvery(key, function* (action) {
                yield effects[key](action, {
                    ...sagaEffects, put: action => sagaEffects.put(
                        { ...action, type: prefixType(action.type, model.namespace) })
                });
            });
        }
    }
}
function prefixType(type, namespace) {
    if (type.indexOf('/') === -1) {//如果没有命名空间，就加上自己的命名空间前缀 
        return namespace + '/' + type;
    } else if (type.split('/')[0] === namespace) {
        console.warn(`Warning: [sagaEffects.put] ${type} should not be prefixed with namespace ${namespace}`);
    }
    return type;
}
//Warning: [sagaEffects.put] counter/add should not be prefixed with namespace counter
//把model里的reducers对象转成一个reducer函数
function getReducer(model) {
    const { state: initialState, reducers } = model;
    let reducer = (state = initialState, action) => {
        let reducer = reducers[action.type];
        if (reducer) {
            return reducer(state, action);
        }
        return state;
    }
    return reducer;
}

function prefix(obj, namespace) {
    let newObj = {};
    for (let key in obj) {
        newObj[namespace + '/' + key] = obj[key];
    }
    return newObj;
}
function prefixNamespace(model) {
    if (model.reducers) {
        model.reducers = prefix(model.reducers, model.namespace);
    }
    if (model.effects) {
        model.effects = prefix(model.effects, model.namespace);
    }
    return model;
}

export default dva;