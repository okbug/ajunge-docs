import {Redirect} from 'umi';//react-router-dom

function Auth(props){
  const isLogin = localStorage.getItem('isLogin');
  if(isLogin){
      return props.children;
  }else{
      return <Redirect to={{pathname:'/login',state:{from:props.location.pathname}}}/>
  }
}
export default Auth;
/**
 * 为什么会为props.location
 * 只要说一个组件是路由渲染的，就肯定有三个属性
 * Route渲染的时候 routeProps = {
 *    location,
 *    history,
 *    match
 * }
 */