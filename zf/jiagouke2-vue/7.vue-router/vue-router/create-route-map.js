export default function createRouteMap(routes,oldPathMap){
    let pathMap = oldPathMap || Object.create(null); // 默认没有传递就是直接创建映射关系
    routes.forEach(route => {
        addRouteRecord(route,pathMap);
    });
    return {
        pathMap
    }
}
// 先序深度
function addRouteRecord(route,pathMap,parent){ // parent就是父亲
    // 当访问/ 时 应该渲染home组件   /  => {Home}
    let path =parent? (parent.path + '/' + route.path) :route.path
    let record = {
        path,
        component:route.component,
        parent //  这个属性用来标识当前组件的父亲是谁
    }
    if(!pathMap[path]){ // 不能定义重复的路由 否则值生效第一个
        pathMap[path] = record;
    }
    if(route.children){
        route.children.forEach(childRoute=>{
            // 在遍历儿子时 将父亲的记录传入进去
            addRouteRecord(childRoute,pathMap,record);
        })
    }
}