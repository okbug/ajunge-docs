import Vue from 'vue';
import Router from './vue-router'; // Router是一个插件
import Home from './views/Home';
import About from './views/About';
Vue.use(Router); // 使用这个插件  内部会提供给你两个全局组件 router-link router-view  并且还会提供两个原型上的属性 $router $route

// 路由： 不同的路径 渲染不同的组件 

// 路由导出后 需要被注册到实例中

let router =  new Router({
    mode: 'hash',
    routes: [{
            path: '/',
            component: Home
        },
        {
            path: '/about',
            component: About,
            children: [{
                path: 'a', // 这里有/ 就是根路径了，不是子路径
                component: {
                    render:(h)=><h1>about A</h1>  
                }
            },
            {
                path: 'b',
                component: {
                    render:(h)=><h1>about B</h1>  
                }
            }]
        }
    ]
})

// 导航被触发。
// 在失活的组件里调用 beforeRouteLeave 守卫。
// 调用全局的 beforeEach 守卫。
// 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
// 在路由配置里调用 beforeEnter。
// 解析异步路由组件。
// 在被激活的组件里调用 beforeRouteEnter。
// 调用全局的 beforeResolve 守卫 (2.5+)。
// 导航被确认。
// 调用全局的 afterEach 钩子。
// 触发 DOM 更新。
// 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

// 当导航变化时 会依次执行这两个方法
router.beforeEach((from,to,next)=>{ 
    console.log(1);
    setTimeout(() => {
        next();
    }, 1000);
})
router.beforeEach((from,to,next)=>{ 
    console.log(2);
    setTimeout(() => {
        next();
    }, 1000);
})

export default router