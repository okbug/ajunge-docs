import React, { Component } from 'react'
import {UserAPI} from '../utils';
import {Link} from '../react-router-dom';
export default class UserList extends Component {
    state = {users:[]}
    componentDidMount(){
        let users = UserAPI.list();
        this.setState({users});
    }
    render() {
        return (
            <ul>
                {
                    this.state.users.map((user)=>(
                        <li key={user.id}>
                            <Link to={{pathname:`/user/detail/${user.id}`,state:user}}>{user.name}</Link>
                        </li>
                    ))
                }
            </ul>
        )
    }
}
