
import store from '../store/index';
import * as types from '../store/action-types'
const whiteList = ['/reg'];
export default {
    // 名字是给用户看 
    'cancelToken':async function(to,from,next){ // beforeEach的方法在这里
        store.state.ajaxTokens.forEach(fn=>fn()); //  取消上一个页面发送的请求
        store.commit(types.SET_REQUEST_TOKEN,'clear')
        next();
    },
    'loginPermission':async function (to,from,next){
        // 返回的结果 还是要存放到vuex中
        // whiteList  白名单 

        if(whiteList.includes(to.path)){
            return next();
        }

        await store.dispatch(`user/${types.SET_USER_VALIDATE}`)
        if(store.state.user.hasPermission){
            if(to.path === '/login'){
                next('/'); // 如果去的页面是login 直接会到首页
            }else{
                next();
            }
        }else{
            // 看一下哪些接口允许没有权限访问
            // 导航鉴权
            let needLogin = to.matched.some(item=>item.meta.needLogin)
            if(needLogin){
                next('/login');
            }else{
                next();
            }
        }
    },
    'menuPermission':async function (to,from,next) {
        if(store.state.user.hasPermission){
            // 是否添加过路由了
            // 是否添加过路由了，如果已经添加过了 那应该也往下走
            if(!store.state.user.menuPermission){
                // 获取最新路由权限 根据用户权限来获取 
                store.dispatch(`user/${types.SET_ROUTE}`); // 添加路由
                next({...to,replace:true}); // hack
            }else{
                // 已经获取过了菜单权限了， 或者页面加载完毕后
                next();
            }
        }else{
            next();
        }
    }
}