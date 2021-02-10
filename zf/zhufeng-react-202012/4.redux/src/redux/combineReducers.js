

/**
 * 把一个reducers对象变成一个reducer函数
 * @param {*} reducers 
 * let reducers = {counter1,counter2}
 * let state = {counter1:{number:5},counter2:{number:10}}
 */
function combineReducers(reducers){
    //这个返回的函数就是我们最终的根reducer
    let rootReducer = (state={},action)=>{
        let nextState = {};//声明一个空对象，用来保存最终的状态
        let changed = false;
        for(let key in reducers){
            //key counter1 counter2
            const reducer = reducers[key];//分reducer
            const previousStateForKey = state[key];//老的分状态
            const nextStateForKey = reducer(previousStateForKey,action);//计算新的分状态
            if(previousStateForKey !== nextStateForKey){
                changed=true;
            }
            nextState[key]=nextStateForKey;
        }
        //最终的状态就是长的样子就跟reducers是一样的
        return changed?nextState:state;
    }
    return rootReducer;
}
export default combineReducers;

/**

H
可以理解为reducers执行后的结果就是
nextState = {counter1:Counter1State,counter2:counter2State}？ 
136****2778
返回一个函数 这个函数返回值是一个对象？ 
Vc
不同组件会把所有的reducer都跑一遍?  
//向仓库不管派发什么样的动作，都要跑所有的reducer
state怎么闯进来的？ 
H

分别让每个组件的reducer都执行一遍而已吧 
136****2778
11行的state怎么传进来的？ 
开心麻花
这样是把action 分发给所有的分reducer？ 是的
Caption
每次dispatch都会把所有的reducer都执行一次 是的
136****2778
那合并后的action是一样的 岂不是各个reducer都是一样的action？  是的
针对每次的派发，action是一样的
古德猫宁
会触发所有组件的render？ 其实是的，只要订阅了

不会执行一样的action，每个组件的action 都被导入到每个组件的reducer里面函数里面了 
开心麻花
会不会出现两个分reducer都有ADD1 类型？ 
罗畅
action必须是唯一的 
不同的reducer可以处理自己感 兴趣的action type

写的肯定不要重名
主题色
语言包
如果不同的组件的action的type是一样，那不是乱了 
罗畅
action的type最好是唯一的吧 
所以得actions 都放在action-type文件维护，
可能避免重名的问题，分开写的话，出现重名就不容易发觉了 
1 
开心麻花
多个reducer时，组件里怎么获取自己对应的state 

 */