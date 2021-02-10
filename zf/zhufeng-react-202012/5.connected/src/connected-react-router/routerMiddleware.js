
import {CALL_HISTORY_METHOD} from './action-types';
//引入中间件routerMiddleware 能够识别这个 action，进行路径跳转
function routerMiddleware(history){
    return function(middlewareAPI){//{getState,dispatch} 
        return function(next){//调用下一个中间件
            return function(action){//派发的动作
                //如果不是要跳转路径，那就直接下一步
                if(action.type !== CALL_HISTORY_METHOD){
                    return next(action);
                }
                const {payload:{method,args}} = action;
                history[method](...args);
            }
        }
    }
}
export default routerMiddleware;