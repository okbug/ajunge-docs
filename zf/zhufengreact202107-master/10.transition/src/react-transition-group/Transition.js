
import React,{useState,useEffect} from 'react';
/**
 * @param {*} in 进入或离开 boolean
 * @param {*} timeout 动画的执行时间 ms
 */
function Transition(props){
    //当前动画组件的状态 
    let [state,setState] = useState('exited');
    //in是一个JS的关键字
    let {children,in:propsIn,duration} = props;
    useEffect(()=>{
        if(propsIn){//in=true
            setState('exited');
            setTimeout(()=>{
                setState('entering');
            });
            setTimeout(()=>{
                setState('entered');
            },duration);
        }else{
            setState('entered');
            setTimeout(()=>{
                setState('exiting');
            });
            setTimeout(()=>{
                setState('exited');
            },duration);
        }
    },[propsIn]);
    //let {in,timeout,children} = props;

    return children(state);
}

export default Transition;

/**
state exited
 * 显示的时候 
立刻
state exited   0
state entering 1
一秒后
state entered 1
离开的时候 
立刻
state entered 1
state exiting 0
一秒后
state exited 0

单独开一次讲专门React动画

 */