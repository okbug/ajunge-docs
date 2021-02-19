<template>
    <div id="app">
       <Bar></Bar>
       <Foo></Foo>
    </div>
</template>

<script>
import Bar from './components/Bar';
import Foo from './components/Foo'
export default {
    components:{
        Foo,
        Bar
    }
}
</script>