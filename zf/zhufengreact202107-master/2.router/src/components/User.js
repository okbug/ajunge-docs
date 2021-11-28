import React from "react";
import UserList from './UserList';
import UserAdd from './UserAdd';
import UserDetail from './UserDetail';
import { Route,Link } from "../react-router-dom";
export default class User extends React.Component{
    render(){
        console.log(this.props.location.state);
        return (
            <div>
                <ul>
                  <li><Link to="/user/list" >用户列表</Link></li>
                  <li><Link to="/user/add">添加用户</Link></li>
                </ul>
               <Route path="/user/list" component={UserList}/>
               <Route path="/user/add" component={UserAdd}/>
               <Route path="/user/detail/:id" component={UserDetail}/>
            </div>
        )
    }
}