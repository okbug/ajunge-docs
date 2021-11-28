//ConnectedRouter监听路径变化，派发LOCATION_CHANGE动作，connectRouter监听 这个动作，保存location到仓库中
export { default as ConnectedRouter } from './ConnectedRouter';
export { default as connectRouter } from './connectRouter';

//push执行结果是一个action,routerMiddleware 可以拦截这个action,并且判断是否要跳转路径，history.push(path)
export { push } from './actions';
export { default as routerMiddleware } from './routerMiddleware';
//路由和仓库
//把路由存入仓库
//通过派发仓库动作跳转路由