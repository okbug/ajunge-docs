<template>
  <div class='create_order_box'>
    <div class="h50">
      <my-tab-bar
        title="生成订单"
        left-arrow
        @click-left="onClickLeft"
      >
      </my-tab-bar>
    </div>

    <van-contact-card
      type="edit"
      :name="address.name"
      :tel="address.tel"
      @click="onEdit"
    />

    <!-- <div class="van-contact-card">
      {{address}}
    </div> -->

    <van-card
      v-for='item in list'
      :key='item.cartItemId'
      :num="item.goodsCount"
      :price="item.sellingPrice.toFixed(2)"
      :title="item.goodsName"
      :thumb="item.goodsCoverImg"
    />

    <van-submit-bar
      :price="total*100"
      button-text="生成订单"
      @submit="onSubmit"
    />

    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>
<script>
// @ is an alias to /src
import { mapState } from "vuex";
import {
  getAddressInfo,
  getSelectCart,
  makeSureOrder,
  paySuccess,
} from "@/api/index";
import { Toast } from "vant";
export default {
  name: "create_order_box",
  data() {
    return {
      address: {
        name: "张三",
        tel: "13000000000",
      },
      list: [],
      show: false,
      actions: [
        { id: 0, name: "支付宝" },
        { id: 1, name: "微信" },
      ],
    };
  },
  created() {
    // console.log(this.$route.query.addressId);
    // console.log(this.cartItemIds);
    this.getAddress();
    this.getSelectCart();
  },
  computed: {
    ...mapState(["cartItemIds"]),
    total() {
      return this.list.reduce((prev, cur) => {
        return prev + cur.goodsCount * cur.sellingPrice;
      }, 0);
    },
  },
  methods: {
    onSubmit() {
      this.show = true;
    },
    onSelect(item) {
      this.show = false;
      Toast.loading({ forbidClick: true });
      makeSureOrder({
        addressId: this.$route.query.addressId,
        cartItemIds: this.cartItemIds.split(","),
      }).then((data) => {
        Toast.clear();
        paySuccess({
          orderNo: data.data,
          payType: item.id,
        }).then(() => {
          this.$router.push("/order");
        });
      });
    },
    onEdit() {
      this.$router.push("/address");
    },
    getAddress() {
      getAddressInfo(this.$route.query.addressId).then((data) => {
        let res = data.data;
        this.address.name = res.userName + " " + res.userPhone;
        this.address.tel =
          res.provinceName + res.cityName + res.regionName + res.detailAddress;
      });
    },
    getSelectCart() {
      getSelectCart(this.cartItemIds).then((data) => {
        this.list = data.data;
      });
    },
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>
<style lang="less">
.van-contact-card {
  position: relative;
}
</style>