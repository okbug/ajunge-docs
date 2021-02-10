
import {Route,Redirect} from '../react-router-dom';
const Protected = (props)=>{
    //path是要匹配的路径 RouteComponent 本来要渲染的组件
    let {path,component:RouteComponent}= props;
    return (
        <Route path={path} render={
            (routeProps)=>(//路由属性{history,location,match}
                localStorage.getItem('login')?
                <RouteComponent {...routeProps}/>:
                <Redirect to={{pathname:'/login',state:{from:path}}}/>
            )
        }/>
    )
}
export default Protected;
/**
 * 指定一个Route组件要渲染的内容
 * 有三种方式
 * 1.component属性 值是一个组件的类型 它不能写定义的逻辑
 * 2.render属性 它是一个函数，如果路径匹配的话，就要渲染它这个函数的返回值
 * 3.children属性 ，它也是一个函数？？下个例子讲children
 * 
 * render匹配才渲染，不匹配不渲染
 * children不管匹配不匹配都渲染
 */