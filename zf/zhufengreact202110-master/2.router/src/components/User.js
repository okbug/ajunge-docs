import React, { Component } from 'react'
import { Link, Route } from '../react-router-dom';
import UserList from './UserList';
import UserAdd from './UserAdd';
import UserDetail from './UserDetail';
export default class User extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/user/list">用户列表</Link></li>
                    <li><Link to="/user/add">添加用户</Link></li>
                </ul>
                <div>
                    <Route path="/user/list" component={UserList} />
                    <Route path="/user/add" component={UserAdd} />
                    <Route path="/user/detail/:id" component={UserDetail} />
                </div>
            </div>
        )
    }
}
