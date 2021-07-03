<template>
  <div>
    hello world
    {{name}}
    <input
      type="text"
      v-model='name'
    >
    <div v-html='str'></div>
    <div v-text='str'></div>
    <h2 v-for="(item123,index123) in ary">
      item123 是 {{item123}};
      index123 是 {{index123}}
    </h2>

    <div v-if='1 > 2'> v-if {{name}}</div>
    <div v-else>v-else {{name}}</div>

    <div v-show='1 > 2'> v-show {{name}}</div>

    <div
      :class="{box:1>2,box2:true,box3:name}"
      :style="{color:'red',fontSize:'28px'}"
    >qqq</div>

    <button v-on:click='fn'>按钮</button>
    <button v-on:click='fn(1,2,3,4,5,6)'>按钮</button>
    <button v-on:click='fn($event,1,2,3,$event,4,5,6,$event)'>按钮</button>
  </div>
</template>
<script>
/* 
  所有的  v-xxx的行内属性 我们都成为vue指令
  v-model 双向绑定的一个指令
  v-html    innerHTML
  v-text    innerText

  v-clock   配合csS 解决小胡子的现实问题
  v-pre  告诉vue 哪些标签 不用走 vue编译；

  v-for  循环指令
  v-if  条件不成立 结构不加载
  v-show  条件不成立  元素不显示

  v-bind  : 专门用来处理行内属性的一个指令 对class和style专门做了加强
  v-on  @ 专门用来处理事件




*/
export default {
  // 这里放置的都是vue规定的配置对象
  data() {
    // 组件当中 要求  data必须是一个函数返回对象的格式
    return {
      //  vue变量b
      name: "珠峰培训",
      str: "<img src='https://baidu.com'/>",
      ary: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      cln: "box",
    };
  },
  methods: {
    fn() {
      // this 就是当前组件
      console.log(arguments);
      console.log(666, this);
    },
  },
};
</script>
