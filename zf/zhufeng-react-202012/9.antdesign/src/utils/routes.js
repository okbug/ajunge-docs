import React from 'react';
import {Route,Redirect} from 'dva/router';
//import dynamic from 'dva/dynamic';
/**
 * 这是一个加载动态组件的方法，它会返回一个懒加载的组件
 * @param {*} app  dva()
 * @param {*} models 要懒加载的模型
 * @param {*} loadComponent  懒加载组件的方法
 */
function dynamic({app,models,lazyComponent}){
  class DynamicClass extends React.Component{
      //因为在React中类组件首字母需要大写
      state = {Component:null}// 就是对应真正的组件 User
      //在组件加载的时候加载模型和组件代码
      componentDidMount(){
          Promise.all(
              [
                  Promise.all(models()),
                  lazyComponent()
              ]
          ).then(([models,Component])=>{
            models=models.map(item=>item.default);
            this.models = models;
            //懒加载获取每个model,依次进行挂载
            this.models.forEach(model=>app.model(model));
            this.setState({Component});
          });
      }
      //在组件卸载的时候可以选择性的卸载模型和组件代码
      componentWillUnmount(){
        //this.models.forEach(model=>app.unmount(model));
      }
      render(){
          let {Component} = this.state;
          return Component&&<Component {...this.props}/>;
      }
  }
  return DynamicClass;
}
/**
 *routeConfig 路由配置的数组
 返回一个Route组件的路组
 const app = dva();
 react-router-config
 */
export function renderRoutes(routeConfig,app){
   return routeConfig.map(({path,loadComponent=()=>{},exact=false,routes=[],models=()=>[]})=>(
    <Route 
       path={path}
       key={path}
       exact={exact}
       component = {
        dynamic({
            app,
            models,
            lazyComponent:()=>{//这是一个函数，用来懒加载组件的代码的
                return loadComponent().then(result=>{
                    let RouteComponent = result.default||result;
                    //routeProps指的路由属性 routes 子路由配置对象
                    //Route routeProps={history location match}
                    return (routeProps)=> <RouteComponent {...routeProps} routes={routes} app={app}/>
                })
            }
        })
       }
       /* render={(routeProps)=>{
        return <RouteComponent {...routeProps} routes={routes}/>
       }} */
    />
   ));
}
/**
 * 渲染出来一个Redirect组件
 * @param {*} from 
 * @param {*} exact 
 * @param {*} routeConfig 
 * from=/
 * to=/home
 * /home
 * /xx 
 */
export function renderRedirect(from,exact,routeConfig){
    let {path} = routeConfig.find(item=>item.redirect)||routeConfig[0];
    return <Redirect exact={exact} from={from}  to={path}/>
}
//redirect 为啥一定要套在switch里面 
//一旦渲染Redirect就要跳转了
// /home /user /profile R