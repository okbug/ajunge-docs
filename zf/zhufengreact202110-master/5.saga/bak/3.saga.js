/* eslint-disable require-yield */
import { put, take, fork, takeEvery, call, cps, all } from '../redux-saga/effects';
import * as actionTypes from './action-types';


function* add1() {
    for (let i = 0; i < 1; i++) {
        yield take(actionTypes.ASYNC_ADD);
        yield put({ type: actionTypes.ADD });
    }
    console.log('add1 done ');
    return 'add1Result';
}
function* add2() {
    for (let i = 0; i < 2; i++) {
        yield take(actionTypes.ASYNC_ADD);
        yield put({ type: actionTypes.ADD });
    }
    console.log('add2 done');
    return 'add2Result';
}

function* rootSaga() {
    let result = yield all([add1(), add2()]);
    console.log('all done', result);
}

export default rootSaga;

/**
saga分为三种
worker saga 做具体的工作，如调用API，进行异步请求，获取异步封装结果
watcher saga 监听被dispatch的actions,当接受到action或者知道其被触发时，调用worker执行任务
root saga 立即启动saga的唯一入口
 */