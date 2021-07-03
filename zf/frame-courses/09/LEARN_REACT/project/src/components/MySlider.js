import { Layout, Menu, Button } from 'antd';
import { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import menuAry from './menu'
const { SubMenu } = Menu;
const { Sider } = Layout;

const permissionFn = (ary, level) => {
  // ary = JSON.parse(JSON.stringify(ary))
  // console.log(ary)
  let temp = [];
  ary.map(item => {
    if (item.level && item.level > level) {
      // 用户没有权限
      console.log(item.level, level)
    } else {
      if (item.children) {
        item.children = permissionFn(item.children, level)
      }
      temp.push(item)
    }
  })
  return temp
}

const getTreeFromAry = (ary) => {


  return ary.map(item => {
    let Icon = item.icon
    if (item.children) {
      return <SubMenu
        key={item.key}
        icon={Icon ? <Icon /> : <></>}
        title={item.title}>
        {getTreeFromAry(item.children)}
      </SubMenu>
    } else {
      // 没有children
      return <Menu.Item
        key={item.key}
        icon={Icon ? <Icon /> : <></>}>
        <Link to={item.key}>
          {item.title}
        </Link>
      </Menu.Item>
    }
  })
}
const getOpenKeys = (ary) => {
  let temp = [];
  ary.forEach(item => {
    if (item.children) {
      temp.push(item.key)
    }
  })
  return temp
}

function MySlider(props) {
  // console.log(props.location.pathname)
  let [collapsed, setCollapsed] = useState(false)
  let renderAry = permissionFn(menuAry, props.level)
  console.log(renderAry)
  return <Sider collapsed={collapsed}>
    <h1 style={{ color: '#fff' }} onClick={() => { setCollapsed(!collapsed) }}>信奉商城后台管理</h1>
    <Menu
      defaultOpenKeys={getOpenKeys(renderAry)}
      selectedKeys={[props.location.pathname]}
      mode="inline"
      theme="dark"
    >
      {
        getTreeFromAry(renderAry)
      }
    </Menu>
  </Sider>
}
MySlider = withRouter(MySlider)
MySlider = connect(state => {
  return {
    level: state.userInfo.userLevel
  }
})(MySlider)
export default MySlider