let activeEffect;
export function effect(fn){
    // 默认effect 需要先执行一次
    activeEffect = fn; // 存储fn方法  数据变化 需要再次调用这个方法
    fn();
    activeEffect = null; // 页面渲染完毕要情空effect
}
// 默认只代理第一层

// Reflect.defineProperty()
// Reflect.ownKeys()
// Reflect.setPrototypeOf()
export function reactive(target){
    return new Proxy(target,{ // proxy 不用重写每一个属性
        set(target,key,value,receiver){ // 拦截器 ，性能更高 兼容性差
            // target[key] = value; //给原来的值做处理
            const res = Reflect.set(target,key,value,receiver)
            trigger(target,key); // 触发更新
            return res;// proxy中set方法需要有返回值
        },
        get(target,key,receiver){
           const res = Reflect.get(target,key,receiver); // target[key]
           track(target,key); // 依赖收集  只有当我在页面中取值时 才会做依赖收集
           return res
        }
    })
    // p.a.b.c.d.e
}

// { map
//     {name:'zf',age:10}:{
// 	// map 
// 	name: [effect,effect]  set
//     }
// }

// Dep
const targetMap = new WeakMap();
function track(target,key){ // target key 多个effect
    let depsMap = targetMap.get(target);
    if(!depsMap){
        targetMap.set(target,(depsMap = new Map()));
    }
    let deps = depsMap.get(key);
    if(!deps){
        depsMap.set(key,(deps = new Set()));
    }
    if(activeEffect && !deps.has(activeEffect)){ // set中有get set  has
        deps.add(activeEffect);
    }
}
function trigger(target,key){
    const  depsMap = targetMap.get(target);
    if(!depsMap) return;
    const effects = depsMap.get(key);
    effects && effects.forEach(effect=>effect());
}

// 依赖收集要确定的是 某个属性变了 要更新，而不是整个对象 一个属性要收集对应的effect


