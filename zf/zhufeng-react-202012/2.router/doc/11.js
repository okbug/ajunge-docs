import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch,Redirect,NavLink} from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import Protected from  './components/Protected';
import Login from './components/Login';
import NavBar from './components/NavBar';
ReactDOM.render(
  <BrowserRouter>
    <NavBar title="返回首页"/>
    <ul>
      <li><NavLink 
      className="baseClass"
      style={{textDecoration:'line-through'}}
      activeStyle={{color:'red'}}
      activeClassName="strong"
      exact={true}
      to="/" >首页</NavLink></li>
      <li><NavLink className="baseClass"
      style={{textDecoration:'line-through'}}
      activeStyle={{color:'red'}}
      activeClassName="strong"
      exact={true} to="/user">用户管理</NavLink></li>
      <li><NavLink className="baseClass"
      style={{textDecoration:'line-through'}}
      activeStyle={{color:'red'}}
      activeClassName="strong"
      exact={true} to="/profile">个人中心</NavLink></li>
    </ul>
    <Switch>
      <Route exact={true} path="/" component={Home}/>
      <Route path="/user" component={User}/>
      <Route path="/login" component={Login}/>
      <Protected path="/profile" component={Profile}/>
      <Redirect to="/"/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
/**
 * 路由容器的 Router
 * 路由规则/路由配置 Route
 */