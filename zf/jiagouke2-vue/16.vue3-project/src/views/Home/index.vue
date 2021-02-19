<template>
  <div>
    <a-list item-layout="horizontal" :data-source="planList">
      <template v-slot:renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.time">
            <template v-slot:title>
              <a>{{formatDate(item.date)}}</a>
            </template>
            <template v-slot:avatar>{{item.content}}</template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script>
import {
  reactive,
  toRefs,
  onMounted,
  onUpdated,
  compile,
  computed,
  watch,
} from "vue";
import moment from "moment";
import { useStore } from "vuex";
import * as types from "@/store/action-types";
   const formatDate = (value) => {
      return moment(value).format("YYYY-MM-DD");
    };
export default {
  setup(props, context) {
    const store = useStore();
    onMounted(() => {
      store.dispatch(types.SET_PLAN_LIST);
    });
    
    return {
      ...toRefs(store.state),
      formatDate,
    };
  },
};
</script>