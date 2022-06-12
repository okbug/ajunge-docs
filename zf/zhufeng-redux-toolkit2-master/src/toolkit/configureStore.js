import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
function isPlainObject(value){
    if(typeof value !== 'object' || value === null)
        return false;
    //let obj = new Object(); let obj = {}    
    return Object.getPrototypeOf(value) === Object.prototype;    
}
function configureStore(options={}){
    let {reducer,middleware=[thunk],preloadedState}= options;
    let rootReducer;
    if(typeof reducer === 'function'){
        rootReducer=reducer;
    }else if(isPlainObject(reducer)){//这个分支我们后面讲
        rootReducer=combineReducers(reducer);
    }
    middleware = typeof middleware === 'function'?middleware(()=>[thunk]):middleware;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
    return createStore(rootReducer,preloadedState,composeEnhancers(applyMiddleware(...middleware)));
}
export default configureStore;