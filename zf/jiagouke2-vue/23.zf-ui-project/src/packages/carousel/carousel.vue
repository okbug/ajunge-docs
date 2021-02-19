<template>
  <div
    class="zf-carousel"
    :style="styles"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="view-port">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        v-for="item in len"
        :key="item"
        :class="{active:item-1 == currentSelected}"
        @click="go(item-1)"
      >{{item}}</span>
    </div>

    <zf-button-group>
      <zf-button icon="prev" @click="go(currentSelected-1,true)"></zf-button>
      <zf-button icon="next" @click="go(currentSelected+1,true)"></zf-button>
    </zf-button-group>
  </div>
</template>
<script>
import { computed, nextTick, onMounted, provide, reactive, toRefs } from "vue";
import props from "./carousel-props";
export default {
  // $children
  name: "ZfCarousel",
  props,
  setup(props) {
    const state = reactive({
      currentIndex: 0, // 当前用于标记子节点的索引
      len: 0, // 默认没有孩子,
      currentSelected: props.initialIndex, // 核心需要控制的值
      reverse: false, // 是否正向动画
    });
    const changeIndex = () => {
      state.currentIndex++;
    };
    provide("current", { state, changeIndex }); // provide 经常在插件中使用
    let styles = computed(() => {
      return {
        height: props.height,
      };
    });
    // -------------------数据------------------------
    let timer;
    const methods = {
      handleMouseEnter() {
        clearInterval(timer);
        timer = null;
      },
      handleMouseLeave() {
        methods.run();
      },
      go(newIndex,flag) {
        // 临界条件 到了最后一张的下一张是第一张 第一张的前一张是最后一张
        let index = state.currentSelected;
        if (newIndex == state.len) newIndex = 0;
        if (newIndex == -1) newIndex = state.len - 1;
        // 根据上一次的值和当前值 做一个运算 判断是正向还是反向
        state.reverse = index > newIndex ? true : false;

        // 3 => 0 正   0=》3 反
        if ((timer || flag) && props.loop) {
          // 如果是自动轮播 处理最后的边界条件
          if (index == 0 && newIndex == state.len - 1) {
            state.reverse = true;
          }
          if (index == state.len - 1 && newIndex == 0) {
            state.reverse = false;
          }
        }
        nextTick(() => {
          // 保证样式的reverse 已经添加到dom上了 在去更新状态
          state.currentSelected = newIndex;
        });
      },
      run() {
        // 默认运行逻辑
        if (props.autoplay) {
          // 是否需要自动轮播
          timer = setInterval(() => {
            let index = state.currentSelected;
            let newIndex = index - 1;

            methods.go(newIndex);
          }, props.delay);
        }
      },
    };
    onMounted(() => {
      state.len = state.currentIndex;
      methods.run();
    });

    return {
      styles,
      ...toRefs(state),
      ...methods,
    };
  },
};
</script>