import React, { Component } from 'react'
import { Link } from 'umi';
export default class Layout extends Component {
    render() {
        return (
            <>
                <ul>
                    <li><Link to="/user/list">用户列表</Link></li>
                    <li><Link to="/user/add">新增用户</Link></li>
                </ul>
                {this.props.children}
            </>
        )
    }
}
