<template>
  <div class="home">
    <!-- <my-tab-bar
      title="标题"
      qqq='qqq'
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >

    </my-tab-bar> -->
    <topnav />
    <banner :data="banner" />
    <van-grid :column-num="5">
      <van-grid-item
        v-for="value in 10"
        :key="value"
        icon="photo-o"
        text="文字"
      />
    </van-grid>
    <goodsList
      title='新品上线'
      :list='newGoods'
    />
    <goodsList
      title='热门商品'
      :list='hotGoods'
    />
    <goodsList
      title='最新推荐'
      :list='recommond'
    >
      <template #default='qqq'>
        <van-image :src="qqq.data.goodsCoverImg" />
        <h5>{{qqq.data.goodsName}}</h5>
      </template>
    </goodsList>
  </div>
</template>

<script>
// @ is an alias to /src
import { getBB, indexInfo } from "@/api/index.js";
import topnav from "../components/home/topnav";
import banner from "../components/home/banner";
import goodsList from "../components/home/goodsList";
export default {
  name: "Home",
  components: { topnav, banner, goodsList },
  data() {
    return {
      banner: [],
      newGoods: [],
      hotGoods: [],
      recommond: [],
    };
  },
  created() {
    // getBB();
    this.getData();
  },
  methods: {
    onClickLeft() {
      console.log("left");
    },
    onClickRight() {
      console.log("right");
    },
    getData() {
      indexInfo().then((data) => {
        console.log(data);
        if (data.resultCode == 200) {
          this.banner = Object.freeze(data.data.carousels);
          this.newGoods = Object.freeze(data.data.newGoodses);
          this.hotGoods = Object.freeze(data.data.hotGoodses);
          this.recommond = Object.freeze(data.data.recommendGoodses);
        }
      });
    },
  },
};
</script>
<style lang="less">
.home {
}
</style>
