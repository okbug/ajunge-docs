<template>
    <div>
        <router-link to="/" >首页</router-link>
        <router-link to="/about">关于页面</router-link>
        <router-view a="1" b="2"></router-view>
    </div>
</template>


<script>
export default {
    name:'app',
    mounted(){
        console.log(this._routerRoot._router)
    }
}


</script>
