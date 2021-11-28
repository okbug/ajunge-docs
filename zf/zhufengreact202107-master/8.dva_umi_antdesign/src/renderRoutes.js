import {Route} from 'dva/router';
/**
 * 把一个路由配置的JSON数组变成一个Route组件数组
 * @param {*} routeConfig 
 */
function renderRoutes(routeConfig){
    return routeConfig.map(({path,exact=false,component:RouteComponent,routes=[]},index)=>{
        return (
            <Route key={index} path={path} exact={exact} render={
                (routeProps)=><RouteComponent {...routeProps} routes={routes}/>
            }/>
        )
    });
}
export default renderRoutes;