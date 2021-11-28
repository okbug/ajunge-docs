/* eslint-disable require-yield */
import { put, take, takeEvery } from '../redux-saga/effects';
import * as actionTypes from './action-types';
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
function* workerSaga() {
    //如果产出的是一个promise,此saga会等待此promise完成
    yield delay(1000);
    //告诉 saga中间件，请帮我向仓库 派发一个action { type: actionTypes.ADD }
    yield put({ type: actionTypes.ADD });
}
/**
 * watcherSaga 是用来监听向仓库派发的对象的，，如果有人向仓库派发关心的对象，则会调有对应的workerSaga
 */
function* watcherSaga() {
    //监听有人向仓库派发的ASYNC_ADD的动作，如果没有等到，此SAGA会卡这里或者说暂停在这里，
    //如果有人向仓库派发，会继续向下执行
    //take只会监听一次,如果监听到了，执行后续代码，以后再派发，就不再响应
    const action = yield take(actionTypes.ASYNC_ADD);
    console.log('action', action);
    yield workerSaga();
    console.log('watcherSaga结束');
}
function* rootSaga() {
    yield watcherSaga();
    console.log('rootSaga结束');
}

export default rootSaga;

/**
saga分为三种
worker saga 做具体的工作，如调用API，进行异步请求，获取异步封装结果
watcher saga 监听被dispatch的actions,当接受到action或者知道其被触发时，调用worker执行任务
root saga 立即启动saga的唯一入口
 */