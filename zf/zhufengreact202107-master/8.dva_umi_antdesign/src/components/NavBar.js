import React, { Component } from 'react'
import {Layout,Menu} from 'antd';
import styles from './NavBar.less';
import {Link,useLocation} from 'dva/router';
const {Header} = Layout;
let logo = require('../assets/logo.png');
function NavBar(props){
    //因为dva内部使用 connected-react-router react-router-redux
    //react-router-dom 5.0  react-router-dom4.1
    //let location = useLocation();
    return (
        <Header className={styles.header}>
          <img src={logo}/>    
          <Menu className={styles.menu} mode="horizontal" selectedKeys={[props.location.pathname]}>
              <Menu.Item key="/home"><Link to="/home">首页</Link></Menu.Item>
              <Menu.Item key="/user"><Link to="/user">用户管理</Link></Menu.Item>
              <Menu.Item key="/profile"><Link to="/profile">个人中心</Link></Menu.Item>
              <Menu.Item key="/login"><Link to="/login">登录</Link></Menu.Item>
              <Menu.Item key="/register"><Link to="/register">注册</Link></Menu.Item>
          </Menu>
        </Header>
    )
}
export default NavBar