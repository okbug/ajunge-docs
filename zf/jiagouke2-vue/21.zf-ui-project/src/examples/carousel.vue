<template>
  <zf-carousel
    style="width:400px"
    height="200px"
    :autoplay="true"
    :delay="2000"
    :initialIndex="0"
    :loop="true"
  >
    <zf-carousel-item v-for="slide in sliderList" :key="slide._id">
        <img :src="slide.url" style="max-width:100%;height:100%">
    </zf-carousel-item>
  </zf-carousel>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
export default {
  async setup(props) {
    const state = reactive({
      sliderList: [],
    });
    let r = await fetch(
      "http://www.fullstackjavascript.cn:8888/public/getSlider"
    );
    let { data } = await r.json();
    state.sliderList = data;
    return {
      ...toRefs(state),
    };
  },
};
</script>