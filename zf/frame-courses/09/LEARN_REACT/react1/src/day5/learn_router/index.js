import React, { useState } from 'react';
import ReactDOM from 'react-dom';
/* 
  BrowserRouter 相当于vue的 history模式
  HashRouter    相当于vue的  hash模式
  Link 相当于 vue  的 router-link  有to属性
  Route 相当于 vue 的 router-view 但是上边必有有path和（component或者render）
  传参方式 query  params  state(目前谷歌刷新也不会丢失)

  只有通过 路由渲染的组件 props中才会有{history,location,match,...}
    不是路由渲染的组件 若也想使用这个属性 那么需要使用withRouter处理当前组件

  Switch 可以避免每一个Route都去验证是否能够匹配  
  <Redirect path='/home'  to='/home123'></Redirect> 
     重定向 一旦当前页面的路径是 /home的时候 那么就会重定向到/home123

  路由懒加载的几种方式   三方插件react-loadable  
      自己封装
      react自带 React.lazy+Suspense    
*/
import { BrowserRouter, HashRouter, Link, NavLink, Route, withRouter, Switch, Redirect } from 'react-router-dom'


// import List from './list'

function loadable(obj) {
  let { loader, loading } = obj;
  let Loading = loading;
  let Com;
  return function (props) {
    let [flag, setFlag] = useState(false);// 表示组件是都加载完成
    if (!flag) {
      loader().then(data => {
        // data.default 对应的是导出的哪个组件
        Com = data.default;
        setFlag(true)
      })
    }
    return <>
      {
        flag ? <Com {...props} /> : <Loading />
      }
    </>
  }

}

const Home = loadable({
  loader: () => import(/*webpackChunkName:"home"*/'./home'),
  loading() {
    return <h1>loading</h1>
  },
});
const List = loadable({
  loader: () => import(/*webpackChunkName:"list"*/'./list'),
  loading() {
    return <h1>loading</h1>
  },
});




class App extends React.Component {
  constructor() {
    super();

  }
  go = () => {
    this.props.history.push('/home', { q: 123, w: 234, e: 345 })
  }
  render() {
    return <div className=''>
      <Link to='/home?q=123&w=234'>首页</Link>
      <Link to='/list/1234'>列表页</Link>
      <NavLink to='/list/35'>列表页</NavLink>
      <button onClick={this.go}></button>
      <Switch>
        <Route path='/home' component={Home} />
        {/* <Route path='/home' render={(props) => {
          if (1 > 2) {
            return <Home />
          } else {
            // return <List></List>
            return <Redirect to='/list/333' />
          }
        }} /> */}

        <Route path='/list/:id' component={List} />
        <Route path='/*' render={() => <h2>404</h2>} />
      </Switch>
    </div>;
  }
}
App = withRouter(App)

ReactDOM.render(<BrowserRouter>
  <App />
</BrowserRouter>, document.getElementById('root'))