import React from 'react';
import {Link} from 'umi';//react-router-dom umi
class Layout extends React.Component{
  render(){
      return (
          <div>
              <ul>
                  <li><Link to="/">首页</Link></li>
                  <li><Link to="/user/list">用户管理</Link></li>
                  <li><Link to="/profile">个人设置</Link></li>
              </ul>
              <div>
                  {this.props.children}
              </div>
          </div>
      )
  }
}

export default Layout;