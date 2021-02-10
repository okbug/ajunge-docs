import { createStore } from 'redux';
import rootReducer from './reducers';
/**
 * 实现一个真正的日志中间件
 */
function applyMiddleware(...middlewares){
    return function(createStore){
        return function(reducer){
            let store = createStore(reducer);//先创建老仓库
            let dispatch;//指向改造后的dispatch方法
            let middlewareAPI= {
                getState:store.getState,
                dispatch:(action)=>{
                    dispatch(action)
                }//永远指向undefined
            }
            let chain = middlewares.map(middleware=>middleware(middlewareAPI));
            //let [promise,thunk,logger] = chain;
            //dispatch=promise(thunk(logger(store.dispatch)));
            dispatch=compose(...chain)(store.dispatch);
            //dispatch = middleware(middlewareAPI)(store.dispatch);
            return {
                ...store,
                dispatch
            };
        }
    }
}
//不完善??
function compose(...fns){
    return function(args){
        return fns.reduceRight((args,fn)=>{
            return fn(args);
        },args);
    }
}
/* 
如果项目有一100个中间件的逻辑，都写在一个中间件里，复杂而难以维护
function middleware({getState,dispatch}){
    return function(next){
        //next指向最原始的store.dispatch 只能接收普通对象那个dispatch方法
        //store.dispatch已经变成了function(action)
        return function(action){
            console.log('prev state',getState());
            if(typeof action.then === 'function'){
                return action.then(newAction=>dispatch(newAction));
            }else  if(typeof action === 'function'){//如果派发的action是一个函数，那么就让函数执行
                return action(dispatch,getState);
           }else{
                 next(action);
           }
          console.log('next state',getState());
        }
    }
} */
//在真实的项目中，中间件每个逻辑都是单独编写的，但是可以向applyMiddleware传递多个中间件
let store = applyMiddleware(promise,thunk,logger)(createStore)(rootReducer);
//let store = createStore(rootReducer);
export default store;

function promise({getState,dispatch}){
    return function promiseNext(next){
        //此函数就是改造后的store.dispatch方法
        return function promiseDispatch(action){
          if(typeof action.then === 'function'){
            return action.then(newAction=>dispatch(newAction));
          }
          return next(action);
        }
    }
}

//只要是中间件，格式是定死的
function thunk({getState,dispatch}){
    return function thunkNext(next){
        return function thunkDispatch(action){
           if(typeof action === 'function'){//如果派发的action是一个函数，那么就让函数执行
                return action(dispatch,getState);
           }//如果不是函数，则不需要自己处理，直接调有和下一个dispatch方法就可以 
           return next(action);
        }
    }
}
//这是日志中间件的真正实现
function logger({getState,dispatch}){
    return function loggerNext(next){
        return function loggerDispatch(action){
            console.log('prev state',getState());
            next(action);
            console.log('next state',getState());
        }
    }
}





/**
 * 实现一个日志中间件 状态改变前和改变后打印一些日志


let dispatch = store.dispatch;
 //获取原生的或者 说老的dispatch方法
store.dispatch = function(action){
    console.log('prev state',store.getState());
    dispatch(action);
    console.log('next state',store.getState());
    return action;
} 
store.dispatch = function(action){
    setTimeout(()=>{
        dispatch(action);
    },3000);
    return action;
}
*/