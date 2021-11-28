//events on emit

/* function stdChannel(){
    let currentTakers = [];//listeners 
    function take(actionType,taker){
        taker.actionType = actionType;
        currentTakers.push(taker);
    }
    function put(action){
        currentTakers.forEach(taker=>{
            if(taker.actionType === action.type){
                taker(action);
            }
        });
    }
    return {take,put};
}
 */

function createChannel(){
    let listeners=[];
    function on(type,listener){
        listener.type = type;
        listeners.push(listener);
    }
    function emit(action){
        listeners.forEach(listener=>{
            if(listener.type === action.type){
                listener(action);
            }
        });
    }
    return {on,emit}
}
export default createChannel;
//redux  dispatch(action)  全部的listeners都要执行
