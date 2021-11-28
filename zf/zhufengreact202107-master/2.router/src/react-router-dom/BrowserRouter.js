import React from 'react';
import {Router} from '../react-router';
import {createBrowserHistory} from '../history';
class BrowserRouter extends React.Component{
    history = createBrowserHistory()//HashRouter的history实例属性会指向用hash实现的历史对象
    render(){
        return (
            <Router history={this.history}>
                {this.props.children}
            </Router>
        )
    }
}
export default BrowserRouter;