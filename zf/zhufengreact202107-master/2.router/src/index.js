import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,
useParams,useHistory,useRouteMatch,useLocation
} from './react-router-dom';
function Home(){
  return <div>Home</div>
}
function UserDetail(props){
  let params = useParams();
  console.log('params',params);
  let location = useLocation();
  console.log('location',location);
  let history = useHistory();
  console.log('history',history);
  return (
    <div>
      id:{params.id}
      name:{location.state.name}
    </div>
  )
}
function Post(){
  //使用当前浏览器地址栏中的路径和此path路径以及对应的配置信息进行匹配
  let match = useRouteMatch({
    path:'/post/:id',
    strict:true,
    sensitive:true
  });
  console.log('match',match);
  return match?<div>id:{match.params.id}</div>:<div>Not Found</div>

}
ReactDOM.render(
  <Router>
    <ul>
      <li><Link to="/">首页</Link></li>
      <li><Link to={{pathname:`/user/detail/1`,state:{id:1,name:'张三'}}}>张三</Link></li>
      <li><Link to={{pathname:`/post/1`}}>文章</Link></li>
    </ul>
    <Route path="/" component={Home}/>
    <Route path="/user/detail/:id" component={UserDetail}/>
    <Route path="/post/:id" component={Post}/>
  </Router>,
  document.getElementById('root')
);

