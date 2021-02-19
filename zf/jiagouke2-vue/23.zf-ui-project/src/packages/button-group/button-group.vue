<template>
    <div class="zf-button-group">
        <slot></slot>
    </div>
</template>

<script>
import { onMounted, getCurrentInstance } from 'vue'
export default {
    name:'ZfButtonGroup',
    setup(props){
        onMounted(()=>{
            let context = getCurrentInstance(); // 获取实例 this
            let ele = context.ctx.$el; // context.ctx 中有$el属性
            let children = ele.children;
            for(let i = 0; i < children.length;i++){
                console.assert(children[i].tagName == 'BUTTON',"包裹的元素必须是button")
            }
        })
    }
}
</script>