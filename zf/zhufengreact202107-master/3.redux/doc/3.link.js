/**
 * 如何链式调用3个中间件
 */
const getState  = ()=>0;
const dispatch = (action)=>{
    console.log('原始的store.dispatch',action);
}
debugger
let store = { getState, dispatch };
//function promise(store) {
    return function promise(next){//add1
        return function(action){//这个才是真正改造后store.dispatch
            console.log('promise');
            next(action);
        }
    }
//}   
//function thunk(store) {
    return function thunk(next){//add2
        return function(action){
            console.log('thunk');
            next(action);
        }
    }
//} 
//function logger(store) {
    return function logger(next){//add3      
        return function(action){
            console.log('logger');
            next(action);
        }
    }
//} 
let middlewares = [promise,thunk,logger];
let chain = middlewares.map(middleware=>middleware(store));
let composedFn = compose(...chain);
debugger
let newDispatch = composedFn(store.dispatch);
newDispatch({type:'ADD'});
 function compose(...funcs){
    return funcs.reduce((a,b)=>(...args)=>a(b(...args)));
}

//newDispatch
function composedFn(store_dispatch){
    return promise(thunk(logger(store_dispatch)));
}
