<template>
  <div id="app">

    <transition name="slide">
      <router-view></router-view>
    </transition>

  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // width: 375px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.slide-enter-active {
  animation: slideInRight 0.5s;
}
.slide-leave-active {
  animation: slideOutLeft 0.5s;
}
@keyframes slideInRight {
  0% {
    opacity: 0;
    -webkit-transform: translateX(2000px);
    -ms-transform: translateX(2000px);
    transform: translateX(2000px);
  }

  100% {
    -webkit-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);
  }
}
@keyframes slideOutLeft {
  0% {
    -webkit-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);
  }

  100% {
    opacity: 0;
    -webkit-transform: translateX(-2000px);
    -ms-transform: translateX(-2000px);
    transform: translateX(-2000px);
  }
}
.h50 {
  height: 50px;
}
</style>
