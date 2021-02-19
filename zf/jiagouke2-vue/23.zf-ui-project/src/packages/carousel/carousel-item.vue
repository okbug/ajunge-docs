<template>
<!-- carousel-enter-acitve enter to... -->
  <transition name="carousel">
    <div class="zf-carousel-item" v-if="isVisible" :class="classs">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
import {computed, inject} from 'vue'
export default {
  name: "ZfCarouselItem",
  setup() {
    let { state, changeIndex } = inject("current");
    let currentIndex = state.currentIndex; // 这个是插槽对应的索引 carousel-item

    let isVisible = computed(()=>{
      // currentSelected 当前要显示哪一个
      return state.currentSelected == currentIndex
    });

    let classs = computed(()=>[
      state.reverse?'reverse':''
    ])

    changeIndex();

    return {
      isVisible,
      classs
    }

  },
};
</script>