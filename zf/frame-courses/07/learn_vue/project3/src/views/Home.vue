<template>
  <div class="home">
    <el-container class='layout_box'>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <myAside />
        </el-aside>
        <el-main>
          <myBread />
          <router-view />
        </el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import myAside from "@/components/home/myAside";
import myBread from "@/components/home/myBread2";
export default {
  name: "Home",
  components: { myAside, myBread },
};
</script>
<style lang="less">
.home {
  height: 100%;
  .layout_box {
    height: 100%;
  }
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
