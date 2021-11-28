import *  as effectTypes from './effectTypes';
//递归里调用runSaga我们可以近乎的认为是开始一个新的子进程，这个新的子进程会单独工作，跟当前的saga就无关
//在我们把saga全部执行完成会执行completeCallback
function runSaga(env,saga,completeCallback){
    let task = {cancel:()=>next('CANCEL_TASK')};
    let {getState,dispatch,channel} = env;
    let it = typeof saga === 'function'?saga():saga;
    function next(value,hasError){
        let result;
        if(hasError){
            result = it.throw(value);
        }else if(value === 'CANCEL_TASK'){
            result = it.return(value);
        }else{
            result=it.next(value);
        }
        let {done,value:effect} = result;
        if(!done){
            if(typeof effect[Symbol.iterator] === 'function'){
                runSaga(env,effect);
                next();//不会阻止当前saga继续向后走
            }else if(typeof effect.then === 'function'){
                effect.then(next);
            }else{
                switch(effect.type){
                    case effectTypes.TAKE:
                        channel.once(effect.actionType,next);
                        //不调用next就会阻塞在这里
                        break;
                    case effectTypes.PUT:
                        dispatch(effect.action);
                        next();//调用next就会直接向后面走
                        break;   
                    case effectTypes.SELECT:
                        let selectedState = effect.selector(getState());
                        next(selectedState);
                        break;     
                    case effectTypes.FORK:
                        let forkTask = runSaga(env,effect.saga)
                        next(forkTask);
                        break; 
                    case effectTypes.CALL:
                        effect.fn(...effect.args).then(next);
                        break; 
                    case effectTypes.CPS:
                        effect.fn(...effect.args,(err,data)=>{
                            if(err){
                                next(err,true);
                            }else{
                                next(data);
                            }
                        })
                        break;  
                    case effectTypes.ALL:
                        let effects = effect.effects;                   
                        let completeCount = 0;
                        if(Array.isArray(effects)){
                            let result=[];
                            effects.forEach((effect,index)=>{
                                runSaga(env,effect,(data)=>{
                                    result[index]=data;
                                    if(++completeCount===effects.length){
                                        next(result);
                                    }
                                });
                            }); 
                        }else{
                            let result={};
                            let keys = Object.keys(effects);
                            keys.forEach((key)=>{
                                runSaga(env,effects[key],(data)=>{
                                    result[key]=data;
                                    if(++completeCount===keys.length){
                                        next(result);
                                    }
                                });
                            });
                        }
                       break;
                    case effectTypes.CANCEL:
                        effect.task.cancel();
                        next();
                        break;   
                    default:
                        break;    
                }
            }
        }else{
            completeCallback&&completeCallback(effect);
        }
    }
    next();
    return task;
}
export default runSaga;