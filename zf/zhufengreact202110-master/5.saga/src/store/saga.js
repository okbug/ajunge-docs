/* eslint-disable require-yield */
import { put, take, fork, cancel } from '../redux-saga/effects';
import * as actionTypes from './action-types';
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
function* add() {
    while (true) {
        yield delay(1000);
        yield put({ type: actionTypes.ADD });
    }
}
function* addWatcher() {
    const task = yield fork(add);
    console.log(task);
    yield take(actionTypes.STOP);

    yield cancel(task);
}
function* rootSaga() {
    yield addWatcher();
}

export default rootSaga;

/**
saga分为三种
worker saga 做具体的工作，如调用API，进行异步请求，获取异步封装结果
watcher saga 监听被dispatch的actions,当接受到action或者知道其被触发时，调用worker执行任务
root saga 立即启动saga的唯一入口
 */