import React, { Component } from 'react'
import {Link} from 'umi';
export default class index extends Component {
    render() {
        return (
            <div>
                <ul>
                    <Link to="/">首页</Link>
                    <Link to="/user">用户管理</Link>
                    <Link to="/profile">个人设置</Link>
                </ul>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
