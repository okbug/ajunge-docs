<template>
  <button :class="classs" :disabled="loading">
    <!-- 默认插槽 -->
    <zf-icon :icon="icon" v-if="icon && !loading" class="icon"></zf-icon>
     <zf-icon icon="loading" v-if="loading" class="icon loading"></zf-icon>
    <span v-if="$slots.default">
        <slot></slot>
    </span> 
  </button>
</template>
<script>
import { computed } from "vue";
export default {
  name: "ZfButton",
  props: {
    type: {
      type: String,
      default: "primary",
      validator(type) {
        if (
          !["warning", "danger", "success", "info", "primary"].includes(type)
        ) {
          throw new Error(
            `button的type只能是` +
              ["warning", "danger", "success", "info", "primary"].join("、")
          );
        }
        return true;
      },
    },
    icon:String,
    loading:{
      type:Boolean,
      default:false
    },
    position:{
      type:String,
      default:'left'
    }
  },
  setup(props) {
    const classs = computed(() => [
        'zf-button',
        `zf-button-${props.type}`,
        `zf-button-${props.position}`

    ]);
    return {
      classs,
    };
  },
};
</script>