//js jsx ts tsx
//import Login from './login';
/* export function patchRoutes({routes}){
   routes.unshift({
      path:'/login',
      exact:true,
      component:require('./components/login').default
   });
} */
//webpack在打包的时候，会把es modules和commonl都会变成common
//export default 导出的话  require导入的，就是得

//有些时候路由是后台通过权限配置或者返回的， 动态的
let extraRoutes;
export function modifyClientRenderOpts(opts){
   //渲染页页前会把路由进行合并
   console.log('合并前',JSON.parse(JSON.stringify(opts.routes)));
   opts.routes.unshift(...extraRoutes);
   console.log('合并后',JSON.parse(JSON.stringify(opts.routes)));
   return opts;
}
export function render(oldRender){
   fetch('/api/routes').then(res=>res.json())
   .then(res=>{
      extraRoutes=res.map(item=>{
         let component = item.component;// login.js
         component=require(`./components/${component}`).default;
         return {...item,component};
      });
      console.log(extraRoutes);
      oldRender();
   })
}
//路由数组变成路由组件