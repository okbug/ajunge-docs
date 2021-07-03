<template>
  <div class='goods_list_box'>
    <h3>{{title}}</h3>
    <van-grid
      :column-num="2"
      :border='true'
      v-if='list.length'
    >
      <van-grid-item
        v-for='item in list'
        :key='item.goodsId'
      >
        <!-- <router-link :to="{name:'product',params:{goodsId:item.goodsId}}"> -->
        <router-link :to="'/product/'+item.goodsId">
          <slot :data='item'>
            <van-image :src="item.goodsCoverImg" />
            <h5>{{item.goodsName}}</h5>
            <div class="price_box">￥{{item.sellingPrice.toFixed(2)}}</div>
          </slot>
        </router-link>
      </van-grid-item>
    </van-grid>
    <van-grid
      :column-num="2"
      :border='true'
      v-else
    >
      <van-grid-item
        v-for="value in 6"
        :key="value"
      >
        <div class="gray_img_box"></div>
        <div class="gray_line"></div>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "goodsList",
  props: {
    title: {
      type: [String],
    },
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
};
</script>
<style lang="less">
.goods_list_box {
  text-align: center;
  > h3 {
  }
  > ul {
    display: flex;
    li {
      width: 48%;
    }
  }
  .gray_img_box {
    height: 150px;
    width: 100%;
    border-radius: 10px;
    background-color: #eee;
  }
  .gray_line {
    height: 20px;
    margin: 10px;
    border-radius: 2px;
    width: 100%;
    background-color: #eee;
  }
}
</style>