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


## 使用babel转换ES6的class

安装插件
`npm install @babel/plugin-transform-classes -D`


注意事项：
编写插件，要去看下转前和转后的AST结构
找出各自的区别，并且根据AST结构转换
能复用就复用

代码

```js
const core = require('@babel/core');
const types = require('babel-types');
const plugin2 = require('@babel/plugin-transform-classes');


let code2 = `
class A {
    constructor(name) {
        this.name = name
    }

    getName() {
        return this.name
    }
}
`


let res2 = core.transform(code2, {
    plugins: [plugin2]
})

console.log(res2.code)
```

结果:

```js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

let A = /*#__PURE__*/function () {
  function A(name) {
    // 这个是检查类有没有被直接调用的，暂时先注释掉
    // _classCallCheck(this, A);

    this.name = name;
  }

  // 给A的prototype加上getName方法
  _createClass(A, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }]);

  return A;
}();
```


实现：
```js
const myClassTransformPlugin = {
    visitor: {
        ClassDeclaration(nodePath) {
            // console.log(nodePath)
            let {node} = nodePath;
            let {id} = node;
            let body = []
            let classMethods = node.body.body; // 方法： constructor, getName
            classMethods.forEach(method => {
                if (method.kind === 'construcotr') { // 构造函数的话，就创建一个函数
                    let ctorFunc = types.functionDeclaration(id, method.params, method.body, method.generator, method.async);
                    body.push(ctorFunc);
                } else { // 类上的方法
                    let left = types.memberExpression(types.memberExpression(id, types.identifier('prototype')), method.key)
                    let right = types.functionExpression(method.key /* 函数的名字 这里传null就是匿名函数 */, method.params, method.body, method.generator, method.async);

                    let func = types.assignmentExpression('=', left, right)
                    body.push(func)
                }
            });
            nodePath.replaceWithMultiple(body)
        }
    }
}
```

> babel-types 不用安装，core里面其实也有

```js
// const types = require('babel-types');
const {types} = core
```