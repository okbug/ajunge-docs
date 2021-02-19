// 用来创建路由的

// 可以用异步组件来加载 （靠的是webpack中的代码分割功能 import()）

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Foo = () => import('./components/Foo');
const Bar = () => import('./components/Bar');

export default ()=>{
    const router = new VueRouter({
        mode:'history',
        routes:[
            {path:'/',component:Foo},
            {path:'/bar',component:Bar}
        ]
    })

    return router; // 每次调用此方法都可以返回一个路由实例
}
