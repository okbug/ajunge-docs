<template>
  <div>
    <zf-button type="primary" icon="edit" @click="handleClick">主要的</zf-button>
    <zf-button type="danger" :loading="true">危险的</zf-button>
    <zf-button type="warning">警告</zf-button>
    <zf-button type="success">成功</zf-button>
    <zf-button type="info">信息</zf-button>
  </div>
</template>


<script>
export default {
  setup() {
    const handleClick = () => {
      alert(1);
    };
    return {
      handleClick,
    };
  },
};
</script>
