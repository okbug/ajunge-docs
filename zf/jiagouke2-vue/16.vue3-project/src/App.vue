<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="/">
          <router-link to="/">首页</router-link>
        </a-menu-item>
        <a-menu-item key="/plan">
          <router-link to="/plan">时间计划</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0"></a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <a-row>
          <a-col :span="6">
            <a-card title="计划总用时是:" style="width: 100%">
            <p>总共计划时长是:{{allTime}}</p>
        </a-card>

          </a-col>

          <a-col :span="16" :offset="2">
             <router-view></router-view>
          </a-col>
        </a-row>


      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">Ant Design ©2018 Created by Ant UED</a-layout-footer>
  </a-layout>
</template>
<script>
// compositionApi
import { reactive, toRefs, watch, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup(props, context) {
    // attr slots emit  0   {value:0}
    // 默认只执行一次
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      selectedKeys: computed(() => {
        return [route.path];
      }),
      allTime: ref(store.getters.allTime), // 导读将某个属性变成响应式的
    });

    return {
      ...toRefs(state), // 保证数据是响应式的 还有解构的功能
    };
  },
};

// watch 监控某个属性  computed
// watch(()=>route.path,(newValue)=>{
//     state.selectedKeys = [newValue]
// },{immediate:true})
</script>
<style>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>