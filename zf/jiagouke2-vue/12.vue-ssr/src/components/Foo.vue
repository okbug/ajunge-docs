<template>
  <div id="foo">foo
    {{this.$store.state.name}}
  </div>
</template>



<style >
#foo{
    color:red
}
</style>

<script>
export default {

  // 希望有些数据更新操作是在后端执行
  // asyncData(store){ // 只有页面级别组件才有  在服务端调取接口或者数据
  //   // 服务端执行的

    

  //    return store.dispatch('changeName','zf');

  //    // 服务端执行完毕后 渲染的是正常的，但是前端的vuex是老数据
  //    // 需要将后端的数据同步在前端的vuex中
  // },
  mounted(){ // 默认页面一加载  这个方法后端不会走
      this.$store.dispatch('changeName','zf')
  },
}
</script>