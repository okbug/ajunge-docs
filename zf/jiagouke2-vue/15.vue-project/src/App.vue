<template>
  <div id="app">
    <el-container>
      <el-header>
        <PageHeader></PageHeader>
      </el-header>
      <el-main>
          <router-view></router-view>
      </el-main>
      <el-footer>
        <PageFooter></PageFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
export default {
  components:{
    PageHeader,
    PageFooter
  }
};
</script>

<style lang="scss">
*{margin: 0;padding: 0;}
.el-header,.el-footer{
  background: #2a2a2a;
}
.el-main{
  min-height: calc(100vh - 120px);
}
</style>
