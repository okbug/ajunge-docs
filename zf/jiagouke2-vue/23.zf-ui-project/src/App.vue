<template>
  <div id="app">
    <Button></Button>
    <br />
    <Icon></Icon>
    <br />
    <ButtonGroup></ButtonGroup>
    <br>
    <!-- react lazy + suspense = loading -->
    <Suspense>
      <template #default>
        <Carousel></Carousel>
      </template>
      <template #fallback>
        轮播图正在加载中...
      </template>
    </Suspense>
    <br>
    <br>
    <br>
    <br>
    <Message></Message>
    <br>
    <br>
    <Tree></Tree>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import Button from "./examples/button.vue";
import Icon from "./examples/icon.vue";
import ButtonGroup from "./examples/button-group.vue";
import Carousel from './examples/carousel';
import Message from './examples/message';
import Tree from './examples/tree'
export default {
  components: {
    Button,
    Icon,
    ButtonGroup,
    Carousel,
    Message,
    Tree
  },
};
</script>

<style lang="scss"></style>
