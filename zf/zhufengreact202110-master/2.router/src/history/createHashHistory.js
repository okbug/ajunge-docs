
function createHashHistory(props) {
    let historyStack = [];     //类似于历史栈 location={pathname,state}
    let current = -1;          //代表当前的栈顶指针
    let action = 'POP';         //代表当前的动作
    let state;                  //代表当前的状态
    let listeners = [];        //监听 函数组成的数组
    let message = null;
    let confirm = props.getUserConfirmation ? props.getUserConfirmation : window.confirm;
    function listen(listener) {
        listeners.push(listener);
        //监听 方法会返回一个取消此监听函数的方法
        return () => listeners = listeners.filter(l => l !== listener)
    }
    function hashChangeHandler(event) {
        let pathname = window.location.hash.slice(1);
        let location = { pathname, state };
        Object.assign(history, { action, location });
        if (action === 'PUSH') {
            historyStack[++current] = location;
        }
        listeners.forEach(listener => listener(history.location));
    }
    window.addEventListener('hashchange', hashChangeHandler);
    function go(n) {
        action = 'POP';
        current += n;
        let nextLocation = historyStack[current];
        state = nextLocation.state;
        window.location.hash = nextLocation.pathname;
    }
    function goBack() {
        go(-1);
    }
    function goForward() {
        go(1);
    }
    function push(pathname, nextState) {
        //处理参数
        action = 'PUSH';// push PUSH pop POP replace REPLACE
        if (typeof pathname === 'object') {
            state = pathname.state;
            pathname = pathname.pathname;
        } else {
            state = nextState;
        }
        if (message) {
            let showMessage = message({ pathname });
            let allow = confirm(showMessage);
            if (!allow) return;
        }
        window.location.hash = pathname;// /user
    }
    function block(newMessageFn) {
        message = newMessageFn;
        return () => message = null;
    }
    let history = {
        action: 'POP', //当前的动作
        go,
        goBack,
        goForward,
        push,
        listen,
        location: { pathname: '/', state: undefined },
        block
    }
    if (window.location.hash) {
        action = 'PUSH';
        hashChangeHandler();
    } else {
        window.location.hash = '/';
    }
    return history;
}

export default createHashHistory;