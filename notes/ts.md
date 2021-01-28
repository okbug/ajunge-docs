元组可以用push等方法加入新的东西，但是新加的类型只能是原有元组中有的

# 注意：
interface中的每一项都要用分号隔开
# TS中函数的表达
```js
interface IFunc {
    (x: number, y: number, z?: number): number
}
let add = (x: number, y: number, z?: number): number => {
    return x + y
}
let add2: (x: number, y: number, z?: number) => number = add
let add3: IFunc = add
```

另外 一个对象的申明，也是使用Interface
```js
interface IObject {
    name: string;
    age: number;
    habby?: string // 可有可不有
    readonly wife: string
}
let obj :IObject = {
    name: "ajun",
    age: 88,
    wife: "xinzhu"
}
obj.name = "linjun" // 没问题
obj.wife = "Teacher Zhu" // 报错 readonly类似const定义，但是这个是在一个对象中实现的
```
## 可选
一般在一个接口中的普通类型可选 是 `xxx?: type` 如果是方法的话 那么是 `method?(): type` 这样的形式

# 类型断言
```js
let str: number | string = 'aaaaa'
const s = str as string
const n = str as number // 这里的 as 后面是一个类型
断言只能断言联合类型(str)中有的
```
类型guard
如果使用if或者switch中有typeof instanceof 等关键字，ts就会给你推断类型。

```js
function foo(n: string | number): number {
    if(typeof n === 'string') {
        return n.length
    }else {
        return n.toString().length; // 这里的else，ts会猜你的类型是个啥
    }
}
```



# TS中的类 Class

```js
interface Some {
    someFunc1(args: Array<string>, args2: string[]): void
}
interface isA {
    NotB(): void
}
interface ASon extends Some {
    NotB(): void
}
class A implements Radio,isA { //多个接口
    someFunc1(args: string[], args: string[]) { }
    NotB() { }
}
class B implements Radio {
    someFunc1(args: string[], args: string[]) { }
}
class C implelements ASon { // 类的继承
    someFunc1(args: string[], args: string[]) { }
    NotB() { }
}
```


# 枚举
如果给枚举中的第一项赋值，那么接下来的每一项都是第一项的后面
```js
enum Colors {
    Red = 1, // 默认为0 给了值，那么下一个就是2 以此类推
    Green,
    Yellow,
    Blue,
    Pink,
    Black
}
console.log(Colors.Red, Colors[1]) // 1 , Red
```
> 枚举类似哈希表


# 泛型
**☆☆☆☆☆**

```js
function foo<T>(args: T):T {
    return args
}

```

泛型互换
```js
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}
const result = swap(['abc', 123])

```


泛型的约束
T[] 可以表示成一个数组 比如 string[], number[] 这样的形式
只是说 T，U等字母，可以代替那些类型罢了


```js
interface IHavaLength {
    length: number
}
function foo<T extends IHavaLength>(arr: T): T {
    console.log(arr.length)
    return arr
}

```

# 鸭子类型
**只要你叫起来像鸭子 那你就是鸭子**


# 类型别名
```js
let sum: (x: number, y: number) => number
type FType = (x: number, y: number) => number
let sum2: FType
type Types = string | number | 1
const number1: 1 = 1 // 只能等于1 同样可以用 | 来写多个常量值
type Color = 'Red' | 'Green' | 'Pink' | 'Black'
let LoveColor = 'Red' // 只能是上面这些

interface IName {
    name: string
}
type IPerson = IName & { age: number }
let jun: IPerson = {
    name:'jun',
    age:18
}
```


# 声明
```js
// xxx.d.ts 文件
declare var jQuery: (selector: string) => any;
jQuery('#app')
```

只是一个方法的声明类型， **并没有代码逻辑在内**  

# Partial
Partial 传入一个接口，返回的接口中所有属性都变成可选
```js
interface SomeType {
    name: string
    id: number
    title: string
}
let a: SomeType = {name:'a', id: 1, title:'Hello World'}
type PSomeType = Partial<SomeType> // 在这里传入的类型，会变成一个和原来一样的类型，只是全部都是可选 ?: 的形式
let b: PSomeType = {name:'b' /* 这里没有其他两个属性也可以, 甚至可以是空对象 */}
```

# Omit
Omit传入一个接口, 返回一个接口，将其中的某一个属性忽略
```js
interface OmitMan {
    name: string
    id: number
}
type IOmit = Omit<OmitMan, 'name'> // 那么这个IOmit只剩下了 id属性

```







