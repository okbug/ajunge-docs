<template>
  <div class='order_box'>
    <div class="h50">
      <my-tab-bar
        title="我的的订单"
        left-arrow
        @click-left="onClickLeft"
      >
      </my-tab-bar>
    </div>

    <van-tabs v-model='tabId'>
      <van-tab
        v-for="(item,index) in tabs"
        :title="item.text"
        :name="item.status"
        :key='item.id'
      >
        <myList
          :list='list'
          :loading='loading'
        />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
// @ is an alias to /src
import myList from "../components/order/list";
import { getOrderList } from "@/api/index";
export default {
  name: "XXX",
  data() {
    return {
      loading: true,
      tabId: 1,
      list: [],
      tabs: [
        {
          text: "全部",
          status: "",
          id: 0,
        },
        {
          text: "待付款",
          status: 0,
          id: 1,
        },

        {
          text: "待确认",
          status: 1,
          id: 2,
        },
        {
          text: "代发货",
          status: 2,
          id: 3,
        },
        {
          text: "已发货",
          status: 3,
          id: 4,
        },
        {
          text: "交易完成",
          status: 4,
          id: 5,
        },
      ],
    };
  },
  created() {
    this.getOrderList("");
  },
  methods: {
    onClickLeft() {},
    getOrderList(n) {
      this.loading = true;
      getOrderList({
        pageNumber: 1,
        status: n,
      }).then((data) => {
        this.loading = false;
        console.log(data);
        this.list = data.data.list;
      });
    },
  },
  watch: {
    tabId(val) {
      this.getOrderList(val);
    },
  },
  components: {
    myList,
  },
};
</script>
<style lang="less">
</style>