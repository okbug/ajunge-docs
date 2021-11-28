import * as actionTypes from '../action-types';
const actionCreators = {
    add1() {
        return { type: actionTypes.ADD1 };
    },
    minus1() {
        return { type: actionTypes.MINUS1 };
    },
    thunkAdd() {
        return function (dispatch, getState) {
            setTimeout(() => {
                dispatch({ type: actionTypes.ADD1 });
            }, 2000);
        }
    },
    promiseAdd() {
        //promise中间件其实两种方式，第一种试是派发一个Promise
        //直接派发的方式只能处理成功的情况
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ type: actionTypes.ADD1 });
            }, 2000);
        });
    },
    promise2Add() {
        return {
            type: actionTypes.ADD1,
            //可以处理成功和失败
            payload: new Promise((resolve, reject) => {
                setTimeout(() => {
                    let result = Math.floor(Math.random() * 10);
                    console.log('result', result);
                    if (result > 5) {//如果成功了就加这个值
                        resolve(result);
                    } else {
                        reject(result)///如果失败了就减这个值
                    }
                }, 2000);
            })
        }
    }
};

export default actionCreators;
/**
默认情况下store.dispatch接收的action只能是纯对象
Actions must be plain objects
{} new Object
function

You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions

 */