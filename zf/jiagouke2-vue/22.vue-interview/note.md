模板 -> ast -> codegen -> render -> 虚拟dom -> 渲染成真实dom

- 为什么给组件绑定属性 组件就可以获取到这些属性 <my a=1 b=2>
- <my @click="fn" @click="fn1" @mouseover>  my.$on('click',fn)  my.$emit('click')



