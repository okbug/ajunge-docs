import React, { Component } from 'react'
import { Link } from 'umi';
export default class Layout extends Component {
    render() {
        return (
            <>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/user">用户管理</Link></li>
                    <li><Link to="/profile">个人中心</Link></li>
                    <li><Link to="/foo">foo</Link></li>
                </ul>
                {this.props.children}
            </>
        )
    }
}
