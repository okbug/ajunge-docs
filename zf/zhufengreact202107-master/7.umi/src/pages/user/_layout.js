import React, { Component } from 'react'
import {Link} from 'umi';
export default class _layout extends Component {
    render() {
        return (
            <div>
                <ul>
                    <Link to="/user/list">用户列表</Link>
                    <Link to="/user/add">新增用户</Link>
                </ul>
            <div>
                {this.props.children}
            </div>
        </div>
        )
    }
}
