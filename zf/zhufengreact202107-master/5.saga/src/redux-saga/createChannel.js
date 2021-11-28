function createChannel(){
    let listeners=[];
    function once(type,listener){
        listener.type = type;
        listener.cancel = ()=>listeners = listeners.filter(item=>item!== listener)
        listeners.push(listener);
    }
    function emit(action){
        listeners.forEach(listener=>{
            if(listener.type === action.type){
                listener.cancel();
                listener(action);
            }
        });
    }
    return {once,emit}
}
export default createChannel;
/* let channel = createChannel();
channel.once('ASYNC_ADD',function(){
    console.log('ASYNC_ADD');
});
channel.emit({type:'ASYNC_ADD'});
channel.emit({type:'ASYNC_ADD'}); */