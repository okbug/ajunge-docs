<template>
  <zf-tree :data="treeData" ref="tree" :load="loadFn" draggable>
    <template v-slot="{name,id}">{{name}}({{id}})</template>
  </zf-tree>
  <br>
  <br>
  <zf-button @click="getCheckNodes">点击获取选中内容</zf-button>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
export default {
  setup() {
    const tree = ref(null);
    const state = reactive({
      treeData: [
        {
          id: "1",
          name: "菜单1",
          children: [],
        },
        {
          id: "2",
          name: "菜单2",
          children: [
            {
              id: "2-1",
              name: "菜单2-1",
              children: [{ id: "2-1-1", name: "菜单2-1-1" }],
            },
            {
              id: "2-2",
              name: "菜单2-2",
              children: [{ id: "2-2-1", name: "菜单2-2-1" }],
            },
          ],
        },
      ],
    });
    function getCheckNodes() {
      console.log(tree.value.getCheckNodes()); // 获取当前组件的实例
    }
    function loadFn(data, cb) {
      if (data.id == 1) {
        setTimeout(() => {
          cb([
            {
              id: "1-1",
              name: "菜单1-1",
              children: [],
            },
          ]);
        }, 1000);
      } else if (data.id == "1-1") {
        setTimeout(() => {
          cb([{ id: "1-1-1", name: "菜单1-1-1" }]);
        }, 1000);
      }
    }
    return {
      ...toRefs(state),
      tree,
      getCheckNodes,
      loadFn,
    };
  },
};
</script>