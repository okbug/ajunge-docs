
let history = {
    listeners:[],
    listen(listener){
        history.listeners.push(listener);
        return ()=>{
            history.listeners = history.listeners.filter(item=>item!==listener);
        }
    }
}
let unListen1 = history.listen(()=>{console.log('listener1');});
let unListen2 = history.listen(()=>{console.log('listener2');});
unListen2();
console.log(history.listeners);