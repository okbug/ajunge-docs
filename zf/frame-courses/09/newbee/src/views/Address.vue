<template>
  <div class='address_box'>
    <div class="h50">
      <my-tab-bar
        title="地址管理"
        left-arrow
        @click-left="onClickLeft"
      >
      </my-tab-bar>
    </div>

    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select='select'
    />
  </div>

</template>
<script>
// @ is an alias to /src
import { getAddress } from "../api/index";
export default {
  name: "addressCom",
  data() {
    return {
      chosenAddressId: "1",
      addressList: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
      ],
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号",
        },
      ],
    };
  },
  created() {
    this.getAddress();
  },
  methods: {
    onAdd() {
      this.$router.push("/addressedit");
    },
    select({ id }) {
      // console.log(item);
      this.$router.push({ path: "/create_order", query: { addressId: id } });
    },
    onEdit(item, index) {
      this.$router.push({
        path: "/addressedit",
        query: { addressId: item.id },
      });
    },
    getAddress() {
      getAddress().then((data) => {
        if (data.resultCode == 200) {
          this.addressList = data.data.map((item) => {
            return {
              id: item.addressId,
              name: item.userName,
              tel: item.userPhone,
              isDefault: item.defaultFlag,
              address:
                item.provinceName +
                item.cityName +
                item.regionName +
                item.detailAddress,
            };
          });
        }
      });
    },
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>
<style lang="less">
.address_box {
  .add_address_btn {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>