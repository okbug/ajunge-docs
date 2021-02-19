<template>
    <div>
        管理页面
        <MangerMenu></MangerMenu>

        <router-view></router-view>
    </div>
</template>
<script>
import MangerMenu from '@/components/ManagerMenu.jsx'
export default {
    components:{
        MangerMenu
    }
}
</script>