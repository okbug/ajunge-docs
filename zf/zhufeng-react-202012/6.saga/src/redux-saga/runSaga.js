import * as effectTypes from './effectTypes';
import {TASK_CANCEL} from './symbols';
/**
 * 执行或者说启动saga的方法
 * 我们可以会获取 仓库状态 getState，有可能向仓库派 动作 dispatch ,还有可能监听动作 
 * @param {*} saga  可以传过来的是一个生成器，也可能是一个迭代器
 */
function runSaga(env,saga,doneCallback){
    let subTasks = [];
    //每当你执行runSaga的时候，会创建一个task任务对象
    let task = {cancel:()=>next(TASK_CANCEL)};
    let {getState,dispatch,channel} = env;
    //如果是函数，说明它是生成器，否则 就是迭代器
    let it = typeof saga === 'function'? saga():saga;//执行生成器，返回迭代器
    function next(value,isError){
        let result;
        if(isError){
            result = it.throw(value);
        }else if(value === TASK_CANCEL){//如果给next传入了TASK_CANCEL，说明我们要取消任务了
            //如果父saga取消，它的所有的子saga也得取消
            subTasks.forEach(subTask => subTask.cancel());
            result = it.return(value);//直接把任务取消掉
        }else{
            result = it.next(value);
        }
        let {value:effect,done} = result;//effect={type:TAKE,actionType:ASYNC_ADD};
        if(!done){
            //如果没有结束的话，判断effect的类型，如果是的话，说明是一个迭代器
            if(typeof effect[Symbol.iterator]==='function'){
                runSaga(env,effect);//就可以把它传给runSaga去单独执行
                next();//不会阻塞当前的saga继续next执行
            }else if(typeof effect.then === 'function'){//如果这个effect的then属性是一个函数，我们就认为它是一个promise
                //promise成功后会自动走next
                effect.then(next);
            }else{
                switch(effect.type){
                    case effectTypes.TAKE://我想等待有人向仓库派发ASYNC_ADD类型的动作
                       //如果有人向仓库派发动作了,就会执行channel.put(action);
                       //它会等待动作发生，如果等不到到，就卡在这里了
                        channel.take(effect.actionType,next); 
                        break; 
                     case effectTypes.PUT://put这个effect不会阻塞当前的saga执行，派发完成后，会立刻向下执行
                        dispatch(effect.action);
                        //派发命令后会自动执行next 
                        next();   
                        break;
                     case effectTypes.FORK:
                         const forkTask = runSaga(env,effect.saga);//开启一个新的子进程去运行saga
                         subTasks.push(forkTask);
                         next(forkTask);//它不会阻塞当前的saga继续执行
                         break; 
                    case effectTypes.CALL:
                        effect.fn(...effect.args).then(next);
                        break;   
                    case effectTypes.CPS:
                        effect.fn(...effect.args,(err,data)=>{
                            if(err){//如果error不为null,说明有错误了，next第一个参数就是错误对象
                                next(err,true);
                            }else{//如果说error为null，说明正常成功了，next第一个参数就是正常的值
                                next(data);
                            }
                        });
                        break;  
                    case effectTypes.ALL:
                        let effects = effect.effects;
                        let result = [];
                        let completedCount = 0;
                        effects.forEach((effect,index)=>{
                            let subTask = runSaga(env,effect,(res)=>{
                                result[index]=res;//先给result赋值
                                //判断完成的数量和总的数量是否相等
                               //promise.all原理是一样的
                                if(++completedCount === effects.length){
                                    next(result);//如果相等，相当 于任务全部结束 ，就可以让当前的saga继续next执行了
                                }
                            });
                            subTasks.push(subTask);
                        });  
                        break;
                      case effectTypes.CANCEL:
                            effect.task.cancel();//调用task的cancel方法取消掉这个任务
                            next();//当前的saga继续执行，不会阻塞
                            break;
                      case effectTypes.SELECT:
                            let state = effect.selector(getState());
                            next(state);
                            break;       
                    default:
                        break;        
                 }
            }
        }else{
            //如果done已经 为true了，说明整个saga就结束了
            doneCallback&& doneCallback(effect);
        }
    }
    next();
    return task;
}
export default runSaga
/**
 * 取消子saga
 * 父saga继续向前？ 
 */