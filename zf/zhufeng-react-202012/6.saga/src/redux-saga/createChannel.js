

function createChannel(){
    let currentTakers = [];//当前的监听者
    /**
     * 开始监听某个动作
     * @param {*} actionType 动作类型 ASYNC_ADD
     * @param {*} taker 
     */
    function take(actionType,taker){
        taker.actionType = actionType;
        //调用cancel方法可以把自己从数组中干掉
        taker.cancel = ()=>{
            currentTakers=currentTakers.filter(item=>item!==taker);
        }
        currentTakers.push(taker);
    }
    /**
     * 触发takers数组中的函数执行,但是要配置动作类型
     * @param {*} action 动作对象 {type:ASYNC_ADD}
     * put effect里的那个put没有关系 
     */
    function channelPut(action){
        currentTakers.forEach(taker=>{
            //taker就是我们的next函数
            if(taker.actionType === action.type){
                //taker默认只执行一次，可以要取消掉
                taker.cancel();//taker就next
                taker(action);//next函数
            }
        });
    }
    return {take,channelPut};
}
export default createChannel;