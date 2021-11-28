
import *  as actionTypes from '../action-types';
let actions = {
    add1(){
        return {type:actionTypes.ADD1};
    },
    minus1(){
        return {type:actionTypes.MINUS1};
    },
    changeColor(color){
        return {type:actionTypes.CHANGE_COLOR,payload:color};
    },
    thunkAdd(){
        return function(dispatch,getState){
            setTimeout(()=>{
                dispatch(new Promise((resolve,reject)=>{
                      setTimeout(()=>{
                           let number = Math.random();
                           if(number>=.5){
                               resolve({type:actionTypes.ADD1});
                           }else{
                               resolve({type:actionTypes.ADD1});
                           }
                       },1000);
                   }));
            },1000);
        }
    },
    promiseAdd(){
        return new Promise((resolve,reject)=>{
         /*    fetch('/user.json').then(res=>res.json()).then(res=>{
                resolve({type:actionTypes.ADD1});
            });; */
           setTimeout(()=>{
                let number = Math.random();
                if(number>=.5){
                    resolve({type:actionTypes.ADD1});
                }else{
                    resolve({type:actionTypes.ADD1});
                }
            },1000);
        });
    },
    promise2Add(){
        return {
            type:actionTypes.ADD1,
            payload:new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    let number = Math.random();
                    if(number>=.5){
                        resolve(1);
                    }else{
                        reject('失败了');
                    }
                },1000);
            })
        } 
    }
}

export default actions;