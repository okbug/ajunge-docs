import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Link,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from './react-router-dom';

function Home() {
  return <div>Home</div>
}
function UserDetail(props) {
  console.log('props.match', props.match);
  console.log('props.match.params', props.match.params);
  // history location match{params}
  let params = useParams();//它会用当前组件的路径 进行匹配,不能传参
  console.log('params', params);//下去之后大家可以debug下源码，然后把useParams完善一下，可以给我接下一个PR
  let history = useHistory();
  console.log('history', history);
  let location = useLocation();
  console.log('location', location);
  //这个可以传递路径，想传什么路径就传什么路径
  let match = useRouteMatch({ path: '/user/detail/:id', strict: false, sensitive: false });
  console.log('useRouteMatch', match);
  console.log('useRouteMatch.params', match.params);
  return <div>UserDetail</div>
}
ReactDOM.render(
  <Router>
    <ul>
      <li><Link to="/" exact={true}>首页</Link></li>
      <li><Link to={{ pathname: '/user/detail/100', state: { id: 100, name: '张三' } }}>用户100详情</Link></li>
    </ul>
    <Route path="/" exact={true} component={Home} />
    <Route path="/user/detail/:id" component={UserDetail} />
  </Router>,
  document.getElementById('root')
);