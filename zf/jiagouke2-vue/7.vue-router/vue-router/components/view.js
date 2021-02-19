export default {
    name: 'routerView',
    functional: true, // 函数式组件，函数式组件的特点 性能高，不用创建实例 = react函数组件   new Ctor().$mount() 
    render(h, { parent, data }) { // 调用render方法 说明他一定是一个routerView组件
        // 获取 当前对应要渲染的记录 
        let route = parent.$route; // this.current;
        let depth = 0;
        data.routerView = true; // 自定义属性

        // App.vue 中渲染组件时  默认会调用render函数，父亲中没有 data.routerView属性
        // 渲染第一层，并且标识当前routerView为true
        while (parent) { // router-view的父标签
            //  $vnode 代表的是占位符vnode 组件的标签名的虚拟节点
            //  _vnode 组件内部渲染的虚拟节点 
            if (parent.$vnode && parent.$vnode.data.routerView) {
                depth++;
            }
            parent = parent.$parent; // 不停的找父组件
        }
        // 第一层router-view 渲染第一个record 第二个router-view渲染第二个
        let record = route.matched[depth]; // 获取对应层级的记录
        if (!record) {
            return h(); // 空的虚拟节点 empty-vnode  注释节点
        }
        // components
        return h(record.component, data)
    }
}
