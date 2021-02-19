<template>
    <svg class="zf-icon" aria-hidden="true">
        <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
</template>
<script>
import './font';
export default {
    name:'ZfIcon',
    props:{
        icon:String
    }
}
</script>