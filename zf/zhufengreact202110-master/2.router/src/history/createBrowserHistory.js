
function createBrowserHistory(props) {
    const globalHistory = window.history;
    let state;
    let listeners = [];
    let message = null;
    let confirm = props.getUserConfirmation ? props.getUserConfirmation : window.confirm;
    /**
     * 添加一个路由条目，并移动指针指向栈顶
     * @param {*} pathname 路径名
     * @param {*} nextState 新状态
     */
    function push(pathname, nextState) {
        //处理参数
        const action = 'PUSH';// push PUSH pop POP replace REPLACE
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
        //调用原生的pushState方法跳转路径
        globalHistory.pushState(state, null, pathname);
        let location = { pathname, state };
        notify({ action, location });
    }
    function notify(newHistory) {
        Object.assign(history, newHistory);
        //history.action = action;
        //history.location = location;
        listeners.forEach(listener => listener(history.location));
    }
    function listen(listener) {
        listeners.push(listener);
        //监听 方法会返回一个取消此监听函数的方法
        return () => listeners = listeners.filter(l => l !== listener)
    }
    window.addEventListener('popstate', () => {
        let location = { pathname: window.location.pathname, state: window.location.state };
        notify({ action: 'POP', location });
    });
    function go(n) {
        globalHistory.go(n);
    }
    function goBack() {
        globalHistory.go(-1);
    }
    function goForward() {
        globalHistory.go(1);
    }
    function block(newMessageFn) {
        message = newMessageFn;
        return () => { message = null };
    }
    const history = {
        action: "POP",//pushState PUSH, POP,replaceState REPLACE
        push,
        listen,
        go,
        goBack,
        goForward,
        block,
        location: { pathname: window.location.pathname, state: window.location.state }
    }
    return history;
}


export default createBrowserHistory;

/**
action: "POP"
    block: ƒ block(prompt)
    createHref: ƒ createHref(location)
go: ƒ go(n)
goBack: ƒ goBack()
goForward: ƒ goForward()
    length: 45
listen: ƒ listen(listener)
location: {pathname: "/user", search: "", hash: "", state: undefined}
push: ƒ push(path, state)
replace: ƒ replace(path, state)

当给push传参数的时候
push('/user',{id:1,name:'张三'});
push({pathname:'/user',state:{id:1,name:'张三'}});
 */