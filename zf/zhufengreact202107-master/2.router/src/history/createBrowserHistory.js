function createBrowserHistory(){
    const globalHistory = window.history;
    let listeners = [];//存放所有的监听函数
    let state;
    let message;
    function listen(listener){
        listeners.push(listener);
        return ()=>{
            listeners = listeners.filter(item=>item!==listener);
        }
    }
    function go(n){
        globalHistory.go(n);
    }
    window.addEventListener('popstate',()=>{//TODO
        let location = {state:globalHistory.state,pathname:window.location.pathname};
        //当路径改变之后应该让history的监听函数执行，重新刷新组件
        notify({action:"POP",location});
    });
    function goBack(){
        go(-1);
    }
    function goForward(){
        go(1);
    }
    function notify(newState){
        //把newState上的属性赋值到history对象上
        Object.assign(history,newState);
        history.length = globalHistory.length;//路由历史栈中历史条目的长度
        listeners.forEach(listener=>listener(history.location));//通知监听函数执行,参数是新的location
    }
    function push(pathname,nextState){//TODO
        const action = 'PUSH';//action表示是由于什么样的动作引起了路径的变更
        if(typeof pathname === 'object'){
            state = pathname.state;
            pathname = pathname.pathname;
        }else{
            state=nextState;//TODO 
        }
        if(message){
            let confirmMessage = message({pathname});
            let allow = window.confirm(confirmMessage);
            if(!allow)
                return;
        }
        globalHistory.pushState(state,null,pathname);//我们已经 跳转路径
        let location = {state,pathname};
        notify({action,location});
    }
    function block(newMessage){
        message = newMessage;
        return ()=>message=null;
    }
    const history = {
        action:'POP',
        go,
        goBack,
        goForward,
        push,
        listen,
        block,
        location:{pathname:window.location.pathname,state:window.location.state}
    }
    return history;
}
export default createBrowserHistory;