function dispatch(){
    console.log('dispatch');
}
function logger(){
    console.log('logger 前');
    dispatch();
    console.log('logger 后');
}
function thunk(){
    console.log('thunk 前');
    logger();
    console.log('thunk 后');
}
function promise(){
    console.log('promise 前');
    thunk();
    console.log('promise 后');
}
promise();




return function(middlewareAPI){//{getState,dispatch}  主要是提供一些帮助方法
    return function(next){//调用下一个中间件
        return function(action){//派发的动作
            
        }
    }
}