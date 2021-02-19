import { initState } from "./state";
import { compileToFunctions } from "./compiler/index";
import { mountComponent } from "./lifecycle";

export function initMixin(Vue){
    Vue.prototype._init = function (options) {
        const vm = this;
        vm.$options = options;
        // 初始化状态 （将数据做一个初始化的劫持 当我改变数据时应该更新视图）
        // vue组件中有很多状态 data props watch computed
        initState(vm);
        // vue里面核心特性 响应式数据原理 
        // Vue 是一个什么样的框架 MVVM

        // 数据变化视图会更新，视图变化数据会被影响 （MVVM）不能跳过数据去更新视图，$ref

        // 如果当前有el属性说明要渲染模板
        if(vm.$options.el){
            vm.$mount(vm.$options.el)
        }

    }
    Vue.prototype.$mount = function (el) {
        // 挂载操作
        const vm = this;
        const options = vm.$options;
        el = document.querySelector(el);
        vm.$el = el;
        
        if(!options.render){
            // 没render 将template转化成render方法
            let template = options.template;
            if(!template && el){
                template = el.outerHTML;
            }
            // 编译原理 将模板编译成render函数
            const render = compileToFunctions(template);
            options.render = render
        }
        // 渲染时用的都是这个render方法

        // 需要挂载这个组件
        mountComponent(vm,el);
    }
}