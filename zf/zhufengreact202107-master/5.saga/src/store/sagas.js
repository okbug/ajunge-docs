import { put, take, select, takeEvery, call, cps,all, fork,cancel,delay } from '../redux-saga/effects';
import * as actionTypes from './action-types';
//如何取消一已经开始的任务

function * workerAdd(){
  while(true){
    yield delay(1000);
    yield put({type:actionTypes.ADD});
  }
}
function * watcherAdd(){
  const task = yield fork(workerAdd);
  console.log(task);//{cancel} cancel();
  yield take(actionTypes.STOP_ADD);
  yield cancel(task);
}

export default function* rootSaga() {
  yield watcherAdd();
  yield loginFlow();
}


function * loginFlow(){
  let loginData = yield login();
  yield logout();
}

function *  buy(){
  //saga可以把很复杂的流程集中管理 ，业务逻辑比较清晰
  //thunk很分散 
  let stock = yield minusStock();//减少库存
  let money = yield minusUserMoney(stock);//修改用户余额
  yield increaseSaleAmount(money);// 增加商家 的销售额
  //.......
}