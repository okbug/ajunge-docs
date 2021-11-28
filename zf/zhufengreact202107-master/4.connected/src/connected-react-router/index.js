//这二个是用来跳路径的 切换路由的
export {default as push} from './push';//actionCreator
export {default as routerMiddleware} from './routerMiddleware';//路由中间件



//是用来实现路径信息同步到仓库中的
export {default as ConnectedRouter} from './ConnectedRouter';//路由容器
export {default as connectRouter} from './connectRouter';//reducer state.router里={action,location}

