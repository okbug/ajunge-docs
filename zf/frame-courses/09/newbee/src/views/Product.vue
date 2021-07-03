<template>
  <div class='product_box'>
    <div class="h50">
      <my-tab-bar
        title="商品详情"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
      >
      </my-tab-bar>
    </div>
    <div class="img_box">
      <img
        v-lazy="info.goodsCoverImg"
        alt=""
      >
    </div>
    <h4>{{info.goodsName}}</h4>
    <div class="price_box">
      <template v-if='info.originalPrice !== info.sellingPrice'>
        <span style='color:#ccc;text-decoration-line: line-through;'>{{info.originalPrice}}</span>
        <span>{{info.sellingPrice}}</span>
      </template>
      <template v-else>
        <span>{{info.sellingPrice}}</span>
      </template>
    </div>

    <p
      class='p_box'
      v-html='info.goodsDetailContent'
    ></p>
    <div class="h50">
      <van-goods-action>
        <van-goods-action-icon
          icon="chat-o"
          text="客服"
          dot
          @click='chat'
        />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :badge="cartNum"
          @click='cart'
        />
        <van-goods-action-icon
          icon="shop-o"
          text="店铺"
          badge="12"
          @click='shop'
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click='addCart'
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click='buy'
          color='linear-gradient(to right,yellow,green)'
        />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { getGoodsInfo, addCart } from "../api/index";
export default {
  name: "productInfo",
  data() {
    return {
      info: {},
    };
  },
  created() {
    this.getData();
    this.$store.dispatch("updateCartNum");
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    getData() {
      // console.log(this.$route.params);
      let id = this.$route.params.goodsId;
      getGoodsInfo(id).then((data) => {
        console.log(data);
        this.info = Object.freeze(data.data);
      });
    },
    chat() {
      console.log("点解了客服");
    },
    cart() {
      console.log("点击了购物车");
      this.$router.push("/cart");
    },
    shop() {
      console.log("点击了商铺");
    },
    addCart() {
      // console.log("点击了加入购物车");
      addCart({
        goodsCount: 1,
        goodsId: this.$route.params.goodsId,
      }).then((data) => {
        if (data.resultCode == 200) {
          this.$store.dispatch("updateCartNum");
        }
      });
    },
    buy() {
      console.log("点击了立即购买");
    },
  },
  computed: {
    cartNum() {
      return this.$store.state.cartNum;
    },
  },
  components: {},
};
</script>
<style lang="less">
.product_box {
  .img_box {
    width: 100%;
    height: auto;
    img {
      width: 100%;
    }
  }
  .p_box {
    width: 100%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
</style>