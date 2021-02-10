import ReactDOM from 'react-dom';
import {Provider,connect} from 'react-redux';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import prefixNamespace from './prefixNamespace';
import * as sagaEffects from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import {createBrowserHistory} from 'history';
import {routerMiddleware,connectRouter,ConnectedRouter} from 'connected-react-router';
export {connect,ConnectedRouter}
let history = createBrowserHistory();
function dva(){
   const app = {
      _models:[],
      model,
      _router:null,
      router,
      start
   };
   const initialReducers = {router:connectRouter(history)};
   function model(model){
     let prefixedModel = prefixNamespace(model);
     app._models.push(prefixedModel);
     return prefixedModel;
   }
   function router(router){
     app._router=router;
   }
   function start(root){
    for(const model of app._models){
        initialReducers[model.namespace]=getReducer(model);
    }
    //合并后的根reducer,仓库接收到动作后  store.dispatch(action);
    //rootReducer(state,action); 内部每把state和action传递给每个子reducer
    let rootReducer = createReducer();
    let sagas = getSagas(app);
    let sagaMiddleware = createSagaMiddleware();
    //let store = createStore(rootReducer);
    let store = applyMiddleware(routerMiddleware(history),sagaMiddleware)(createStore)(rootReducer);
    sagas.forEach(sagaMiddleware.run);
    ReactDOM.render(
         <Provider store={store}>
             {app._router({history,app})}
         </Provider>,
         document.querySelector(root)
    );
    function createReducer(){
        return combineReducers(initialReducers);
    }
   }
   function getSagas(app){
      let sagas = [];
      for(const model of app._models){
        sagas.push(getSaga(model.effects,model.namespace));
      }
      return sagas;
   }
   return app;
}
function getSaga(effects,namespace){
  return function*(){
    for(const key in effects){
      const watcherSaga = getWatcherSaga(key,effects[key],namespace);
      yield sagaEffects.fork(watcherSaga);
    }
  }
}
function getWatcherSaga(key,effect,namespace){
  return function*(){
    //key "counter/asyncAdd" takeEvery的第二个参数是一个saga,第一个参数action ={type:"counter/asyncAdd"}
    yield sagaEffects.takeEvery(key,function*(action){
      yield effect(action,{...sagaEffects,put:(action)=>{
        return sagaEffects.put({...action,type:prefix(action.type,namespace)});
      }});
    });
  }
}
function prefix(actionType,namespace){
  if(!actionType.includes('/')){
    return `${namespace}/${actionType}`;
  }
  return actionType;
}
function getReducer(model){
    let {state:initialState,reducers} = model;
    //这就是每个子reducer
    let reducer = (state=initialState,action)=>{
        let reducer = reducers[action.type];//action.type = counter1/add reducers.key = add
        if(reducer) return reducer(state);
        return state;
    }
    return reducer;
}
/**
initialState={number:0}
reducers={
  add(state){
    return {number:state.number+1};
  }
}
 */
export default dva;