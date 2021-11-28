
import * as effectTypes from './effectTypes';
const CANCEL_TASK = 'CANCEL_TASK';
function runSaga(env, saga, callback) {
    let task = { cancel: () => next(CANCEL_TASK) };
    let { channel, dispatch } = env;
    //如果saga是一个生成器函数，执行它得到迭代器，如果不是生成器，就直接使用此迭代器
    let it = typeof saga === 'function' ? saga() : saga;
    function next(value, isError) {
        let result;
        if (isError) {
            result = it.throw(value);
        } else if (value === CANCEL_TASK) {
            //直接让saga结束掉
            result = it.return();
        } else {
            result = it.next(value);
        }
        let { value: effect, done } = result;
        if (!done) {//如果没有完成，继续执行
            if (typeof effect[Symbol.iterator] === 'function') {
                runSaga(env, effect);//如果发现产出的是一个迭代器，那就会运行这个迭代器
                next();//运行的时候不会阻塞当前saga,当前的saga会继续向下执行
                //else if (typeof effect.then === 'function') {//它的then属性如果是一个function,认为它是一个Promise
            } else if (effect instanceof Promise) {
                effect.then(next);
            } else {
                switch (effect.type) {
                    case effectTypes.TAKE:
                        //如果effect类型是TAKE,则会暂停当前saga的执行，等待某个动作类型的派发
                        //等到之后才会继续向下执行saga
                        //eventEmitter.once(effect.actionType, next);
                        channel.once(effect.actionType, next);
                        break;
                    case effectTypes.PUT:
                        //如果effect的类型是PUT的话，则需要向仓库派发这个动作
                        dispatch(effect.action);
                        next();//然后当前的saga可以继续向下执行
                        break;
                    case effectTypes.FORK:
                        let forkTask = runSaga(env, effect.saga.bind(null, ...effect.args));
                        next(forkTask);//然后当前的saga可以继续向下执行
                        break;
                    case effectTypes.CALL:
                        effect.fn(...effect.args).then(next);
                        break;
                    case effectTypes.CPS:
                        effect.fn(...effect.args, (err, data) => {
                            if (err) {
                                next(err, true);
                            } else {
                                next(data);
                            }
                        });
                        break;
                    case effectTypes.ALL:
                        let { iterators } = effect;
                        let result = [];
                        let completeCount = 0;
                        iterators.forEach((iterator, index) => {
                            runSaga(env, iterator, (data) => {
                                result[index] = data;
                                if (++completeCount === iterators.length) {
                                    next(result);
                                }
                            });
                        });
                        break;
                    case effectTypes.CANCEL:
                        effect.task.cancel();
                        next();
                        break;
                    default:
                        break;
                }
            }
        } else {
            callback && callback(effect);
        }
    }
    next();
    return task;
}
export default runSaga;