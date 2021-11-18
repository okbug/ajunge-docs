> 相关网站
> https://www.astexplorer.net
> SpiderMonkey (MDN)




## 基本使用
安装依赖

`npm install esprima estraverse escodegen -S`
### 解析语法树

代码:

```js
let esprima = require('esprima');
let estraverse = require('estraverse');
let escodegen = require('escodegen');

let code = `
function ast() {};
`

let res = esprima.parse(code);

console.log(res)
```

运行后的结果:

```js
Script {
  type: 'Program',
  body: [
    FunctionDeclaration {
      type: 'FunctionDeclaration',
      id: [Identifier],
      params: [],
      body: [BlockStatement],
      generator: false,
      expression: false,
      async: false
    },
    EmptyStatement { type: 'EmptyStatement' }
  ],
  sourceType: 'script'
}
```

### 遍历语法树
代码:
```js
// 遍历语法树 (DFS)

let indent = 0;
const padding = () => " ".repeat(indent);
estraverse.traverse(res, {
    enter(node) {
        console.log(padding() + '进入' + node.type);
        indent += 2;
    },
    leave(node) {
        indent -= 2;
        console.log(padding() + 'leave' + node.type);
    }
})
```

结果:
```txt
进入Program
  进入FunctionDeclaration
    进入Identifier
    离开Identifier
    进入BlockStatement
    离开BlockStatement
  离开FunctionDeclaration
  进入EmptyStatement
  离开EmptyStatement
离开Program
```

### 生成语法树

代码:
```js
let target = escodegen.generate(res);
console.log(target)
```

结果:
```js
function ast() {
}
```

我们可以在第二步生成的时候，对生成的代码做一些自己的转换。

## 使用babel解析箭头函数

安装依赖
`npm install @babel/core babel-types babel-plugin-transform-es2015-arrow-functions -D`


代码:
```js
const core = require('@babel/core');
const types = require('babel-types');
const plugin = require('babel-plugin-transform-es2015-arrow-functions');

const code = `
const sum = (a, b) => a + b;
`；

// babel/core 本身只有 生成、遍历、生成 代码的功能，和上面的三个工具一样
// 它本身不会在代码遍历的时候做一个处理，除了用插件等方法
let target = core.transform(code, {
    plugins: [plugin] // 这里如果不加plugin的话，生成的code就是源代码
})
console.log(target.code);
```

结果:

```js
const sum = function (a, b) {
  return a + b;
};
```

### 实现插件

```js

```