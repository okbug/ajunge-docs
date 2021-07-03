import { useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import './nav.css'

let dom = <div className='bot_nav_boxbot_nav_box'>
  <ul>
    <li>
      <NavLink to='/' exact>首页</NavLink>
    </li>
    <li>
      <NavLink to='/list'>分类</NavLink>
    </li>
    <li>
      <NavLink to='/cart'>购物车</NavLink>
    </li>
    <li>
      <NavLink to='/user'>个人</NavLink>
    </li>
  </ul>
</div>;
function Nav(props: any) {
  // console.log('nav')
  // let [flag, setFlag] = useState(true)
  // useEffect(() => {
  //   window.onhashchange = function () {
  //     if (/login|cart/.test(window.location.hash)) {
  //       setFlag(false)
  //     } else {
  //       setFlag(true)
  //     }
  //   }
  // }, [])
  console.log(props)
  let flag = /login|cart/.test(props.location.pathname)
  return !flag ? dom : <></>
}

export default withRouter(Nav)