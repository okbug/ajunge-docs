import React from 'react';
import { connect } from 'dva';
import {Layout} from 'antd';
import NavBar from '../components/NavBar';
import {Route,Link,Redirect} from 'dva/router';
import Home from './Home';
import User from './User';
import Profile from './Profile';
import Login from './Login';
import Register from './Register';
import renderRoutes from '../renderRoutes';
import {Switch} from 'dva/router'
//import { renderRoutes } from "react-router-config";
const {Content} = Layout;
function IndexPage(props) {
  return (
    <Layout >
      <NavBar {...props}/>
      <Content>
        <Switch>
           {renderRoutes(props.routes)}
        </Switch>
       {/*  <Route path="/home" component={Home}/>
        <Route path="/user" component={User}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/> */}
      </Content>
    </Layout>
  );
}

export default connect()(IndexPage);
