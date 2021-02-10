import React from 'react';
import {Link} from 'umi';
class UserList extends React.Component{
    render(){
        return (
            <ul>
                <li><Link to="/user/detail/1">张三</Link></li>
                <li><Link to="/user/detail/2">李四</Link></li>
            </ul>
        )
    }
}
export default UserList;