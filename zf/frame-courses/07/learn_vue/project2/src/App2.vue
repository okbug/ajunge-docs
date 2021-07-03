<template>
  <div>
    <haha />
    <h1 :ref='el=>qq=el'>{{type+type2}}:{{count}}</h1>
    {{c}}
    <button
      @click='change'
      ref='haha'
    >按钮</button>
    <button @click='add'>+</button>
    <button @click='minus'>-</button>
    <ul v-for='item in list'>
      <!-- <li :ref='fn'>{{item}}</li> -->
      <li ref='hahaha'>{{item}}</li>
    </ul>
    <router-view></router-view>
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
  </div>
</template>
<script>
// @ is an alias to /src
import {
  ref,
  reactive,
  toRef,
  isReactive,
  toRaw,
  toRefs,
  onBeforeUpdate,
  computed,
  watch,
  watchEffect,
  getCurrentInstance,
} from "vue";
/* 
  ref 可以把值类型转成响应式
  reactive 可以把一个引用数据类型转成响应式的
  isReactive 检查是否是一个响应式的对象
  toRef 把一个响应式的对象的某个属性转成响应式
  toRefs 把一个响应式的对象转成普通对象 但是里边每一个属性还是响应式的
  toRaw 获取代理对象的原始对象
  shallowReactive 只监听一层

  怎么获取元素？
  先去创造一个响应式的值类型 qqq
  然后给想获取的元素上添加 :ref='(el)=>qqq=el'

  通过v-for循环 获取 ref的时候  3和2是不同的

  v-for 和 v-if同时使用的时候  2.0for的优先级高； 3.0if的优先级高

  混入  3的混入只会合并一层，2的混入是深层合并
  {a:1,b:{q:12}}
  b:{w:123}}
  2的混入结果是 {a:1,b:{q:12,w:123}}
  3的混入结果是 {a:1,b:{w:123}}


  3的创造全局组件  app.component('name',{})
  3移除了过滤器
  3setup怎么获取全局属性?? 通过getCurrentInstance获取当前的实例
  3把自定义指令的钩子函数换成了跟组件类似的API

  v-model的原理  :value和@input的合体  props:[value],this.$emit('input')
                :modelValue @update:modelValue  props:[modelValue],this.$emit('update:modelValue')

*/
import { useRoute, useRouter } from "vue-router";
import { useStore, mapActions } from "vuex";
export default {
  props: ["$http"],
  setup(props, ctx) {
    let route = useRoute();
    let router = useRouter();
    console.log(route, router); // this.$route this.$router

    let store = useStore(); // this.$store
    console.log(store);

    console.log(ctx);
    let count = ref(100);
    let addNum = 0,
      minusNum = 0;
    let list = reactive([1, 2, 3, 4]);
    let obj = reactive({ a: 12, b: { q: 123 }, c: 666 });
    console.log(obj.b);
    console.log(toRaw(obj));
    let a = toRef(obj, "a");

    // console.log(isReactive(count));
    // console.log(isReactive(list));

    function add() {
      // console.log("+");
      count.value++;
      addNum++;
      list.push(`加了${addNum}次`);
      // console.log(count);
    }
    function minus() {
      count.value--;
      minusNum++;
      list.push(`减了${minusNum}次`);
      // list[0] = "哈哈哈";
      // console.log(list);
    }
    function change() {
      a.value = 666;
      obj.c = 999;
      console.log(ctx, props);
      console.log(liList);
      type2.value = 100;
    }
    console.log(getCurrentInstance());
    console.log(toRefs(obj));

    let qq = ref(null);
    let liList = [];
    onBeforeUpdate(() => {
      liList = [];
    });

    function fn(el) {
      console.log(el);
      liList.push(el);
    }
    let type = computed(() => {
      return count.value % 2 ? "奇数" : "偶数";
    });
    /* 
      computed:{
        type(){
          return count.value % 2 ? "奇数" : "偶数";
        }
      }
    */
    let type2 = computed({
      get: () => (count.value % 2 ? "奇数" : "偶数"),
      set: (val) => {
        console.log(val);
      },
    });
    /* 
      computed:{
        type2:{
          get(){return count.value % 2 ? "奇数" : "偶数";},
          set(val){console.log(val)}
        }
      }
    */
    watch(count, (newV, oldV) => {
      console.log(newV, oldV);
    });
    watch(
      () => {
        return obj.c;
      },
      (newV, oldV) => {
        console.log(newV, oldV);
      }
    );
    watch([count, type], ([newC, newT], [oldC, oldT]) => {
      console.log(newC, newT);
      console.log(oldC, oldT);
    });
    watchEffect(() => {
      // 再这个函数中使用哪些变量 那么当那些变量修改的时候 这个回调函数就会触发
      console.log("watchEffect", count.value);
    });
    return {
      count,
      type,
      type2,
      add,
      minus,
      list,
      ...toRefs(obj),
      change,
      a,
      qq,
      fn,
    };
  },
  mounted() {
    console.log(this);
  },
};
</script>
<style lang="less">
</style>