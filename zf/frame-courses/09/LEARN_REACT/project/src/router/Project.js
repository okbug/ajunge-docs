import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

function Project(props) {
  console.log(props)
  let { isLogin } = props;
  console.log(isLogin)
  if (isLogin) {
    if (props.level && props.level > props.userLevel) {
      // 用户没有这个路由的权限
      return <Redirect to='/404'></Redirect>
    }
    return <Route {...props}></Route>
  } else {
    return <Redirect to='/login'></Redirect>
  }
}
Project = connect((state) => {
  return {
    isLogin: state.userInfo.token ? true : false,
    userLevel: state.userInfo.userLevel
  }
})(Project)

export default Project