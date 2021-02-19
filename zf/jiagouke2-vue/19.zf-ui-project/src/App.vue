<template>
  <div id="app">
    <Button></Button>
    <br />
    <Icon></Icon>
    <br />
    <ButtonGroup></ButtonGroup>
  </div>
</template>

<script>
import Button from "./examples/button.vue";
import Icon from "./examples/icon.vue";
import ButtonGroup from "./examples/button-group.vue";
export default {
  components: {
    Button,
    Icon,
    ButtonGroup,
  },
};
</script>

<style lang="scss"></style>
