export let a = 123;
export let b = 456;
export const c = 666

export default {
  // 默认导出  别的地方引入的时候名字可以随便起  但是即使导出的是一个对象也不能解构
  a, b
}


// export 声明关键字(let const var function class ...)  xxxxx 这种导出  可以通过结构获取