import React from 'react';
import {Router} from '../react-router';
import {createHashHistory} from '../history';

class HashRouter extends React.Component{
    history = createHashHistory()
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
 * 创建一个hash history对象的方法,模拟一个自己的history对象，但是是用hash实现的
 */