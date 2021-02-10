/**
 * 1.state的处理 自己维护state
 * 2.历史栈的维护 自己维护一个栈
 */
function createHashHistory(){
    let action;
    let listeners = [];
    let historyStack = [];//历史栈
    let historyIndex = -1;//栈指针
    let state;
    function listen(listener){
        listeners.push(listener);
        return ()=>{
            //let idx = listeners.indexOf(listener);
            //listeners.splice(idx,1);// 从找到的位置删除一个
            listeners=listeners.filter(item=>item!==listener);
        }
    }
    //如果本来就是/user，修改为/user，hash没有变，所以也不会触发hashChange事件
    const hashChange = ()=>{
        let pathname = window.location.hash.slice(1);//user
        //把新的action和pathname赋值给history.action history.location
        Object.assign(history,{action,location:{pathname,state}});
        if(!action ||action === 'PUSH'){
            // page1 page2 page3 page4
            historyStack[++historyIndex] = history.location;
        }else if(action === 'REPLACE'){
            historyStack[historyIndex] = history.location;
        }
        listeners.forEach(listener=>listener(history.location));
    };
    window.addEventListener('hashchange',hashChange);
    function push(pathname,nextState){
        action='PUSH';
        if(typeof pathname === 'object'){
            state = pathname.state;
            pathname = pathname.pathname;
        }else{
            state=nextState;
        }
        //给hash赋值的是不需要加#，取的是带#
        window.location.hash = pathname;
    }
    function replace(pathname,nextState){
        action='REPLACE';
        if(typeof pathname === 'object'){
            state = pathname.state;
            pathname = pathname.pathname;
        }else{
            state=nextState;
        }
        //给hash赋值的是不需要加#，取的是带#
        window.location.hash = pathname;
    }
    function go(n){
        action = 'POP';
        historyIndex +=n;
        let nextLocation = historyStack[historyIndex];
        state = nextLocation.state;
        window.location.hash = nextLocation.pathname;
    }
    function goBack(){
        go(-1);
    }
    function goForward(){
        go(1);
    }
    //在这里我们这个history 跟window.history没有关系
    //window.history是一个html5 api.有兼容 性问题。但是hash是全兼容的
    const history = {
       action:'POP',//当前最后一个动作是什么动作 push PUSH  goBack POP
       location:{pathname:'/',state:undefined},
       go,
       goBack,
       goForward,
       push,
       replace,
       listen,
    }
    action = 'PUSH';
    if(window.location.hash){
        hashChange();
    }else{
        window.location.hash="/";
    }
    return history;
}

export default createHashHistory;