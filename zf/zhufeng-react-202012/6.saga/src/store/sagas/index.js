import {take,put,takeEvery,all,fork,cancel,delay} from '../../redux-saga/effects';
//import * as effects from '../../redux-saga/effects';
//import {take,put,takeEvery,all,fork,cancel} from 'redux-saga/effects';
import * as types from '../action-types';

function * add(){
    while(true){
        yield delay(1000);
        yield put({type:types.ADD});//调用store.dispatch 派发命令 并不会
        //store.dispatch({type:types.ADD});
    }
}
function * addWatcher(){
    //开启一个新的子进程去执行add,返回一个task任务对象
    const task = yield fork(add);
    //等待有个向仓库派发STOP_ADD这个动作，如果有人派发了，就继续 向下执行
    yield take(types.STOP_ADD);
    //取消任务执行
    yield cancel(task);//task.cancel()
    console.log('====================================');
    console.log('父saga继续向前');
    console.log('====================================');
}

function *rootSaga(){
    yield addWatcher();
}

export default rootSaga;
//那如果父saga取消 子saga什么状态？ 现在这个版本里保持原状
//但其实，应该是你把父saga取消，所有的子 saga也应该取消