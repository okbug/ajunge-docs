import React from 'react';
import {Router} from '../react-router';
import {createHashHistory} from '../history';
class HashRouter extends React.Component{
    history = createHashHistory()//HashRouter的history实例属性会指向用hash实现的历史对象
    render(){
        return (
            <Router history={this.history}>
                {this.props.children}
            </Router>
        )
    }
}
export default HashRouter;
/**
 * createHashHistory和createBrowserHistory
 * 都 会反回一个history对象，对象的方法和API是完全 相同 的，只是内闻的实现原理不一样
 */