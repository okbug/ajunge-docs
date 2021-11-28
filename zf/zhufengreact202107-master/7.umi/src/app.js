//运行时配置
//给路由配置对象打补丁
/* export function patchRoutes({routes}){
    routes.unshift({
        path:'/foo',
        exact:true,
        component:require('./foo').default
    });
    console.log('routes',routes);
} */
//希望路由是后端返回的
let extraRoutes ;//定义一个变量 额外的路由配置
export function modifyClientRenderOpts(opts){
    console.log('before',opts.routes.length);
    opts.routes.unshift(...extraRoutes);
    console.log('after',opts.routes.length);
    return opts;
}
export function render(oldRender){
    fetch('/api/routes').then(res=>res.json()).then(routesConfig=>{
        extraRoutes=routesConfig.map(item=>{
            let {component,path} = item;
            component = require('./'+component).default;
            return {component,path};
        });
        oldRender();
    });
}
