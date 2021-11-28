
import {CALL_HISTORY_METHOD} from './push';
function routerMiddleware(history){
    return function(){
        return function(next){
            return function(action){
                if(action.type === CALL_HISTORY_METHOD){
                    const {payload:{method,path}} = action;
                    history[method](path);
                }else{
                    next(action);
                }
            }
        }
    }
}
export default routerMiddleware;