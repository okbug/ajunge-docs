# 性能的提升

- 打包大小减少 按需加载 tree shake
- 初次渲染加快 重写虚拟 dom
- 内存使用减小 Proxy 代替 Object.defineProperty

# 解决的痛点

多行代码组件难维护
原来是一个功能在 data 在 computer 在 methods 中等等地方分开
现在是一个功能就是放在一个地方来开发
正所谓鸡蛋不能放在一个篮子里面
所有的 data， prop method 等数据都在一个篮子里面， 包死

# Composition API

- ref, reactive
- computed, watch
- 新的生命周期函数
- 自定义 Hooks 像 React
- Teleport
- Suspense
- 全局 API 的优化和修改
- 更好的 TS 支持

# API 的区别

原来是 options API 现在是 Composition API

```js
// options API
data() {},
methods: {},
computed: {},
mounted() {},
xxx: {}



```

composition API

### ref

使用

```js

<div>
    <h1>Count is :{{count}}</h1>
    <h2>Double is {{double}}</h2>
    <button @click="increase" >Click To Add Count</button>
    <button @click="clearCount" >Click To Clear Count</button>
</div>


import { ref, computed } from 'vue'

export default {
    name: "TestAdd",
    setup() {
        const count = ref(0)
        const double = computed(() => count.value * 2)
        const increase = () => {
            count.value++
        }
        const clearCount = () => {
            count.value = 0 // 在其他地方读取数据，需要在原数据中加一个 value属性
        }
        return {
            count,
            increase,
            clearCount,
            double
        }
    }
}
</script>

```

### reactive

```js
setup() {
    const data = reactive({
        count: 0,
        increase: () => data.count++,
        double: computed(() => data.count*2) // 这里double中computed回调使用了data的count，类型推论不了 在ts中加一个接口也可以
    })
    return {
        data // 这里如果用 xx = data.xx 是不可以的。看下面的解释
        // 在template中要 使用 data.count 等属性 不方便
    }
}
```

### toRefs

Vue3 使用 Proxy 之后，许多解构的东西都变得不响应式了，比如上面的 data 中，如果使用扩展运算符或者直接赋值，都是不可以用的

```js

interface DataProps {
    count: number;
    increase: () => void;
    double: number;
    clearCount: () => void;
}
setup() {
    const data: DataProps = reactive({
        count: 0,
        increase: ()=> data.count++,
        double: computed(() => data.count * 2),
        clearCount: () => {data.count = 0}
    })
    const refData = toRefs(data)
    return {
        ...refData   // 在template中可以不加data了
    }
}
```

# Object.defineProperty VS Proxy

```js
Object,defineProperty(data, 'keyName', {
    get() {},
    ser() {}
})

new Proxy(data, {
    get(keyName) {},
    set(keyName, value) {}
})

```

# 生命周期差异

![周期函数图](https://www.cxwht.cn/usr/uploads/2020/09/314894607.png)


// Vue2 到 Vue3 的变化

beforeCreated -> use setup()

created -> use setup()

beforeMount -> onBeforeMount

mounted -> onMounted

beforeUpdate -> onbeforeUpdate

updated -> onUpdated

destroyed -> onUnmounted

activated -> onActivated

deactivated -> onDeactivated

errorCaptured -> onErrorCaptured

// 新增

onRenderTracked

onRenderTriggered

用法:
```js
setup() {
    // ...
    mounted(() => {
        // ...actions
    })
    //  首先要导入，然后调用周期函数，传入回调，回调会被执行
    //  这里有一点注意的是 ，不知道哪些是不在setup函数内的（仅我不知道） 
}
```
# onRenderTriggered
在渲染的时候 调试



# Watch
Wacth和上面的生命周期 都是在setup函数中使用的
如果watch多个值，第一个参数传一个数组 [xxx, aaaa] 这样的
函数内有两个参数，第一个是监听的 ref或reactive函数生成的值 然后第二个是个回调 参数分别是新值和旧值

```js
setup() {
    const a = ref('')
    watch(a, (newV,oldV) => {
        // ...
    })
}

```
在这里有一点 ，如果watch中的参数（不管是数组还是单个值） 都必须是响应式的 
```js
const daat = reactive({
    count:0
})
```
上述data是响应式的，可以直接作为Watch的参数，但是data中的count是一个静态的数字类型，并不能响应式，如果想要响应式，可以这样

```js
watch([a, () => data.count], (newV, oldV)=> {
    // actions
})
// 可以做一个匿名函数来将它返回，这样，这个值也会变成响应式的了 （就是不知道为啥）

```


# teleport
在template中使用 teleport标签
```html
<teleport to="#model"></teleport>
```
然后在public中的index.html中 id为app的div下面，增加一个id为model的div

some 傻逼思考
```js
// shared function
const isPromise = <T = any>(val: unknown): val is Promise<T> => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

// resolveData function
if (__DEV__ && isPromise(data)) {
    warn(
        `data() returned a Promise - note data() cannot be async; If you ` +
        `intend to perform data fetching before component renders, use ` +
        `async setup() + <Suspense>.`
    )
}

在Vue3源码中随便翻到的片段，让我不禁想到，如果在data函数中加入then和catch函数，是不是就会被判断成是一个Promise呢?
尝试了，不可以
因为data在ts中类型被定义好了，不可以有这些东西，
还挺牛逼

```

# emit
首先 命名不能是驼峰，得是kebab-case
父节点的templa中 @emit-name 发布一个函数
然后子组件订阅的时候就会触发父组件中发布的函数
```js
// parent.vue
html
    button @emit-name="someFunc"
script
    methods or setup function
    setup() {
        const someFunc  = () {
            // ... some action  这里的函数名字要和template中的名字一样
        }
        return {
            someFunc
        }
    }

// child.vue
script
    setup(props, context) {
        ChildFunc() {
            context.emit('emit-name') // 当触发了ChildFunc的时候，父组件的someFunc会被触发，执行someFunc的动作
        }
    }
```
与vue2的区别
快忘记了。。 先捋一捋

# Suspense
要使用Suspense，就得返回一个Promise
```js
// 异步组件
setup() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({data:{xx:1,aa:2}})
        }, 3000)
    }
}
template
    可以直接通过{{data.xx}} 的方式来显示结果


```
父组件中需要Suspense标签，标签中给予多个插槽
```html
<Suspense>
    <template #default>
      <AsyncShow></AsyncShow>
    </template>
    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
  <!-- 其中fallback是默认显示的结果，当异步结果还没被处理的时候显示，否则显示其他插槽的内容 -->
```


自己对生命周期函数的理解
我们在setup函数中使用某些生命周期函数的时候，用法是
```js
setup() {
    onMounted(() => {
        console.log('onMounted 执行了')
    })
}
```
对于Vue2的生命周期我还是比较理解执行过程
就是在initState（props data props 等options 的过程前后嵌入这些周期函数）
但是Vue3在setup函数中执行的函数好像并没有一个顺序也可以，而且是执行这个函数，然后执行传入的函数
所以就clone了一份源码
看了看，好像有点收获，又好像没有

所以记录一下，把一些关键代码抽离出来查看。并且做一个笔记
```js
// runtime-core/src/apiLifecycle.ts
export const onMounted = createHook(LifecycleHooks.MOUNTED)
export const enum LifecycleHooks {
    MOUNTED = 'm',
    UPDATED = 'u',
    BEFORE_UNMOUNT = 'bum',
    // ... othen enums
}
```
相当于 onMounted = createHook('m')
onMounted既然是一个函数，说明createHook会返回一个函数，并且返回的函数会接收一个参数（cb）也会执行
```js
export const createHook = <T extends Function = () => any>(
  lifecycle: LifecycleHooks
) => (hook: T, target: ComponentInternalInstance | null = currentInstance) =>
  // post-create lifecycle registrations are noops during SSR
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target)
function createHook('m') {
    return injectHook('m' /* onMounted的enum */, hook /* ? */, target /*组件实例*/)
}
```
然后看injectHook函数
源码中很长，这里放入简化版的
```js
function injectHook(type, hook, target, prepend = false) {
    if(target) {
        const hooks = target[type] || (target[type] = [])
        const warppedHook = hook.__weh || (hook.__weh = (...arge) => { // "__weh" stands for "with error handling".
        // 这里可以看到 这个hook里的__weh是一个 接收了参数的函数
        // 代码在下面：
            if (target.isUnmounted) {
                return // 如果是卸载的周期，就不执行了（应该是吧？）
            }
            // 这里还有一步全局的操作 不细讲
            const res = callWithAsyncErrorHandling(hook, target, type, args) // 最后return了这个res，说明这个函数最后也返回了一个函数
            return res
        })
        if (prepend) {
            hooks.unshift(wrappedHook)
        } else {
        hooks.push(wrappedHook)
        }
    }
    
    return wrappedHook
}
function callWithAsyncErrorHandling(fn /* hook */, instance, type, args) {
    if(fn is a function) {
        const res = callWithErrorHandling(fn, instance, type, args) // 这里又调用了另外一个函数，看函数名字，和这个函数很相似
        if (res && res is a Promise) {
            res.catch(err => {
                handleError(err, instance, type) // 这个函数不管它
            })
        }
        return res // 函数的执行结果
    }
}
function callWithErrorHandling(fn, instance, type, args) {
    let res;
    res = arge ? fn(...args) : fn()
    return res
}
```

我们再跳出来，看看setup是怎么执行的
```js
// runtime-core/src/components.ts
// 下面的注释是源码中的注释
  // 0. create render proxy property access cache
  instance.accessCache = {}
  // 1. create public instance / render proxy
  // also mark it raw so it's never observed
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers)
  if (__DEV__) {
    exposePropsOnRenderContext(instance)
  }
  // 2. call setup()
  const { setup } = Component
  if (setup) {
      const setupContext = (instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null) // 我觉得这一行代码解释了，setup可以有好几个
    //   ...
    const setupResult = callWithErrorHandling(setup,instance,ErrorCodes.SETUP_FUNCTION,[__DEV__ ? shallowReadonly(instance.props))
    // 这个 setupResult就是 setup中return出来的对象了，并且下面对async setup做了处理

  }
//   最后有一个 finishComponentSetup 的函数执行

```

