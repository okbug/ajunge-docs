import React from 'react';
import RouterContext from './RouterContext';
class Router extends React.Component{
    static computeRootMatch(pathname){
        return {path:'/',url:'/',params:{},isExact:pathname == '/'};
    }
    constructor(props){
        super(props);
        this.state = {
            location:props.history.location
        }
        //监听历史对象中的路径变化,当路径发生变化后执行回调函数,参数就是最新的路径对象
        //返回一个取消监听的函数，调用它可以取消监听
        this.unlisten= props.history.listen(location=>{
            this.setState({location});
        });
    }
    componentWillUnmount(){
        this.unlisten();
    }
    render(){
        let value ={
            location:this.state.location,//用来传递给Route用来判断路由是否匹配的
            history:this.props.history,//用来让组件来跳转路径的
            match:Router.computeRootMatch(this.state.location.pathname)
        }
        return (
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}
export default Router;