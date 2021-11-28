function thunk({getState,dispatch}){
    return function(next){//调用下一个中间件 next=store.原始的dispatch方法
        return function(action){//这个就是改造后的dispatch
            debugger
           if(typeof action === 'function'){
              return action(dispatch,getState);
           }
           return next(action);//next=store.dispatch
        }
    }
}
export default thunk;