/* eslint-disable require-yield */
import { put, fork, takeEvery, call, cps } from '../redux-saga/effects';
import * as actionTypes from './action-types';
/* function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
} */
function delay(ms, callback) {
    setTimeout(() => {
        callback(null, ms);
    }, ms);
}
function* add() {
    //yield delay(1000);
    //yield call(delay, 1000);
    let data = yield cps(delay, 1000);
    console.log('data', data);
    yield put({ type: actionTypes.ADD })
}

function* rootSaga() {
    //开始一个新的子进程运行add这个saga
    //这个所谓的子过程只是一个比喻，add会立刻单独执行 不会阻塞当前的saga向下执行
    //yield fork(add);
    //console.log('f');
    //监听每一次的ASYNC_ADD动作派发，执行对应的saga
    yield takeEvery(actionTypes.ASYNC_ADD, add);
}

export default rootSaga;

/**
saga分为三种
worker saga 做具体的工作，如调用API，进行异步请求，获取异步封装结果
watcher saga 监听被dispatch的actions,当接受到action或者知道其被触发时，调用worker执行任务
root saga 立即启动saga的唯一入口
 */