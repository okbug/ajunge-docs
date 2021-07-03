<template>
  <div class='address_edit_box'>
    <div class="h50">
      <my-tab-bar
        :title="isEdit ? '编辑地址' : '新增地址'"
        left-arrow
        @click-left="onClickLeft"
      >
      </my-tab-bar>
    </div>
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      :address-info='initData'
    />

  </div>
</template>
<script>
// @ is an alias to /src
/* 
addressId: "2307"
cityName: "北京市"
defaultFlag: 0
detailAddress: "sdfafafasd"
provinceName: "北京"
regionName: "东城区"
userName: "234143"
userPhone: "12341234234"
*/
import { areaList } from "../util/areaList";
import { addAddress, getAddressInfo, delAddressInfo } from "../api/index";
import { Dialog } from "vant";
// console.log(areaList);

function getAreaCode(str) {
  for (let k in areaList.county_list) {
    if (areaList.county_list[k] == str) {
      return k;
    }
  }
}
export default {
  name: "XXX",
  data() {
    return {
      areaList,
      initData: {},
    };
  },
  created() {
    if (this.isEdit) {
      this.getAddressInfo();
    }
  },
  methods: {
    getAddressInfo() {
      getAddressInfo(this.$route.query.addressId).then((data) => {
        if (data.resultCode == 200) {
          let res = data.data;
          let initData = {
            id: res.addressId,
            name: res.userName,
            tel: res.userPhone,
            province: res.provinceName,
            city: res.cityName,
            county: res.regionName,
            addressDetail: res.detailAddress,
            isDefault: res.defaultFlag == 1 ? true : false,
            areaCode: getAreaCode(res.regionName),
          };
          this.initData = initData;
          console.log(initData);
        }
      });
    },
    onSave(res) {
      console.log(res);
      let params = {
        userName: res.name,
        userPhone: res.tel,
        provinceName: res.province,
        cityName: res.city,
        regionName: res.county,
        detailAddress: res.addressDetail,
        defaultFlag: res.isDefault ? 1 : 0,
      };
      if (this.isEdit) {
        params.addressId = this.$route.query.addressId;
      }
      addAddress(params).then((data) => {
        console.log(data);
        if (data.resultCode == 200) {
          this.$router.replace("/address");
        }
      });
    },
    onDelete() {
      delAddressInfo(this.$route.query.addressId).then((data) => {
        if (data.resultCode == 200) {
          this.$router.replace("/address");
        }
      });
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    onClickLeft() {
      this.$router.back();
    },
  },
  computed: {
    isEdit() {
      return this.$route.query.addressId ? true : false;
    },
  },
};
</script>
<style lang="less">
</style>