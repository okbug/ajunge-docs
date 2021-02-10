
import {put,takeEvery,call,cps} from '../../redux-saga/effects';
import * as types from '../action-types';
const delay = ms=>new Promise((resolve,reject)=>{
   setTimeout(resolve,ms);
});
const delay2 = function(ms,callback){
    setTimeout(()=>{
        callback(null,ms+'结果');
    },ms);
}
/* const readFile = function(filename,callback){
   setTimeout(()=>{
    callback(null,filename+'的内容');
   },1000);
} */
const ajax = (url)=>{
    return fetch(url).then(res=>res.json());
}
function * worker_add(){
    //产出一个promise，我们需要让saga中间件等待这个promise完成，完成后才会继续向下执行
    //yield delay(1000);
    //yield ajax('/time');
    //yield call(delay,1000);//告诉saga中间件，请帮我调用delay方法，参数是1000
    yield cps(delay2,1000);//告诉saga中间，请帮我们调用delay2方法，参数是1000
    //向仓库派发一个动作
    yield put({type:types.ADD});
}
//watcherSaga负责 监听ASYNC_ADD,监听到之后会调用worker_add来进行具体的工作
function * watcher_add(){
    yield takeEvery(types.ASYNC_ADD,worker_add);
}
export default watcher_add;

/**
 * JS里实现异步最早是用回调callback fs.readFile('./1.txt')
 * 后面出现了promise
 */