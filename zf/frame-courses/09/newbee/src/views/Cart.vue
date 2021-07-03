<template>
  <div class='cart_box'>
    <div class="h50">
      <my-tab-bar
        title="购物车"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
      >
      </my-tab-bar>
    </div>

    <ul class="cart_list_box">
      <li
        v-for='item in list '
        :key='item.goodsId'
      >
        <van-checkbox
          class='check_box'
          v-model="item.checked"
        ></van-checkbox>
        <van-card
          :title="item.goodsName"
          :thumb="item.goodsCoverImg"
        >
          <template #price>
            <span>￥{{item.sellingPrice.toFixed(2)}}</span>
          </template>
          <template #num>
            <!-- <van-stepper v-model="item.goodsCount" /> -->
            <van-stepper
              :value="item.goodsCount"
              @change="changeCount(item,$event)"
            />
          </template>
        </van-card>
      </li>

    </ul>

    <van-submit-bar
      :price="total*100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll">全选</van-checkbox>
      <!-- <template #tip>
        你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
      </template> -->
    </van-submit-bar>
  </div>
</template>
<script>
// @ is an alias to /src
import { getCart, addGoodsCount } from "../api/index";
import { Toast } from "vant";
export default {
  name: "Cart",
  data() {
    return {
      list: [],
      timer: null,
    };
  },
  created() {
    this.getData();
    this.$store.dispatch("updateCartNum");
  },
  computed: {
    // checkedAll() {
    //   return this.list.every((item) => item.checked);
    // },
    checkedAll: {
      get() {
        // 每当用户修改 选中的状态的时候 我们都需要更新 选中的ID
        let temp = this.list
          .filter((item) => item.checked)
          .map((item) => item.cartItemId);
        this.$store.commit("updateCartItemIds", temp.join(","));
        return this.list.every((item) => item.checked);
      },
      set(val) {
        this.list.forEach((item) => {
          item.checked = val;
        });
      },
    },
    total() {
      return this.list.reduce((prev, cur) => {
        return prev + (cur.checked ? cur.sellingPrice * cur.goodsCount : 0);
      }, 0);
    },
  },
  methods: {
    onSubmit() {
      console.log();
      if (this.$store.state.cartItemIds) {
        this.$router.push("/address");
      } else {
        Toast.fail("请选择购买的商品");
      }
    },
    changeCount(item, n) {
      // item.goodsCount = n;
      // console.log(n);
      Toast.loading({ forbidClick: true });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        // Toast.loading({ forbidClick: true });
        addGoodsCount({
          goodsCount: n,
          cartItemId: item.cartItemId,
        }).then((data) => {
          Toast.clear();
          if (data.resultCode == 200) {
            item.goodsCount = n;
          }
        });
      }, 1000);
    },
    getData() {
      getCart().then((data) => {
        // console.log(data);
        this.list = data.data.map((item) => {
          item.checked = true;
          return item;
        });
      });
    },
    onClickLeft() {
      this.$router.back();
    },
    // onClickEditAddress() {},
  },
  components: {},
};
</script>
<style lang="less">
.cart_box {
  .cart_list_box {
    text-align: left;
    li {
      position: relative;
      .check_box {
        position: absolute;
        left: 0;
        top: 50%;
        z-index: 20;
      }
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>