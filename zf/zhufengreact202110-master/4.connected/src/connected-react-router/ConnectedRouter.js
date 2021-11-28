import React, { Component } from 'react'
import { ReactReduxContext } from 'react-redux';
import { onLocationChange } from './actions';
import { Router } from 'react-router-dom';

/**
 * 这个组件用来替代我们原来的Router容器组件，负责监听路径变化，然后派发动作
 */
export default class ConnectedRouter extends Component {
    static contextType = ReactReduxContext;
    constructor(props, context) {
        super(props);
        debugger
        //当路径发生变化后，会调用回调函数，传入最新的location和action
        this.unlisten = this.props.history.listen((location, action) => {
            context.store.dispatch(onLocationChange(location, action));
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }
    render() {
        return (
            <Router history={this.props.history}>
                {this.props.children}
            </Router>
        )
    }
}
