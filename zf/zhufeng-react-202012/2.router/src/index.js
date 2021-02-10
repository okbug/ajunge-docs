import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Link,
useParams,useLocation,useHistory,useRouteMatch} from './react-router-dom';
const Home = ()=><div>Home</div>;
function UserDetail(){
  let params = useParams();//{id:1}  获取 路径参数
  console.log('params',params);
  let location = useLocation();//{pathname,state} 获取路径对象 
  console.log('location',location);
  let history = useHistory();//{pathname,state} 获取历史对象
  console.log('history',history);
  return (
    <div>id:{params.id} name:{location.state.name}</div>
  )
}
function Post(props){
  console.log(props);
  let match = useRouteMatch({
    path:'/post/:id',//匹配的路径
    strict:true,//是否严格匹配
    sensitive:true//是否匹配的时候大小写敏感
  });
   return match?<div>id:{match.params.id}</div>:<div>Not Found</div>
}
ReactDOM.render(
  <BrowserRouter>
    <ul>
      <li><Link to="/">首页</Link></li>
      <li><Link to={{pathname:`/user/detail/1`,state:{id:1,name:"张三"}}}>用户详情</Link></li>
      <li><Link to="/post/1">帖子</Link></li>
    </ul>
    <Route path="/" component={Home}/>
    <Route path="/user/detail/:id" component={UserDetail}/>
    <Route path="/post/:id" component={Post}/>
  </BrowserRouter>,document.getElementById('root')
);
