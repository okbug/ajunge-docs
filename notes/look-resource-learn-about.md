
# 新旧生命周期的合并与区别

我们知道 新生命周期的使用是这样的
```js
export default defineComponent({
    setup() {
        onMounted(() => {
            // do something ...
        })
    }
})
```
那么我们就可以知道，这个新的写法，是在该函数中传入一个回调函数并执行的

而原来的Options API则是下面的使用方法
```js
export default {
    mounted() {
        // do somethings
    }
}
```

```js
// vue-next/packages/runtime-core/src/componentOptions.ts
// 44行
import {
    obBeforeMount,
    onMounted,
    ...,
    ErrorCapturedHook
} from './apiLifecycle'
// ... 
// 667行
if (beforeMount) {
  onBeforeMount(beforeMount.bind(publicThis))
}
if (mounted) {
  onMounted(mounted.bind(publicThis))
}
...
if (beforeUnmount) {
onBeforeUnmount(beforeUnmount.bind(publicThis))
}
```

不难看出 在使用了Vue3的项目中，使用了Options API时，也会将其合并



# shared文件夹中对各种类型的判断
这里我们可以学习到 对各种类型的判断
来挑选几个不那么常见的
```js
// vue-next/packages/shared/src/index.ts

// 判断是否是对象
isObject = val => val !== null && typeof val === 'object'

// 判断是否为Map
isMap = val => toTypeString(val) === '[object Map]'

// 判断是否为Set
export const isSet = val => toTypeString(val) === '[object Set]'

// 判断是否为Promise实例
export const isPromise = val => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
```
其中，`toTypeString(val)` 其实等价于 `Object.prototype.toString.call(val)`