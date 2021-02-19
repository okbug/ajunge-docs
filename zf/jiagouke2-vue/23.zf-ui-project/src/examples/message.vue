<template>
    <div>
        <button @click="show">点击按钮</button>
    </div>
</template>

<script>
import Message from '../packages/message'
export default {
    setup(){
        const show = ()=>{

            Message.success({message:'hello 我是帅哥'});
            // Message({message:'hello 美女',type:'warning'});
        }

        return {
            show
        }

    }


}
</script>