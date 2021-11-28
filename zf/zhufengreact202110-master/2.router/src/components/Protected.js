import React from 'react'
import { Route, Redirect } from '../react-router-dom';
export default function Protected(props) {
    const { path, component: RouteComponent } = props;
    return (
        <Route
            path={path}
            render={
                (routeProps) => (
                    localStorage.getItem('login') ? <RouteComponent {...routeProps} /> :
                        <Redirect to={{ pathname: '/login', state: { from: path } }} />
                )
            }
        />
    )
}
/**
 * path匹配当前地址栏中的location,渲染，否则就什么都不做,也就是不渲染任何组件
 * 指定一个Route渲染的内容有三种方式
 * component={RouteComponent} 直接指定一个组件 优点简单，缺点就是不能写任何的逻辑
 * render render可以指定一个渲染的方法，决定决定 的结果  优点是可以编写逻辑，不同的情况可以渲染不同的内容
 *    routeProps是什么?里面有什么属性？{ history, location }
 * component和render都有一个共同点，当路径path匹配的时候才能渲染，不匹配不能渲染
 * children 不管是否匹配都渲染,但是是否匹配会有一个不同点？就是是否属性会有match属性
 *
 */