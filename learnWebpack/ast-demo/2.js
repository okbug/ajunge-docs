const core = require('@babel/core');
const types = require('babel-types');
const plugin1 = require('babel-plugin-transform-es2015-arrow-functions');
const plugin2 = require('@babel/plugin-transform-classes');

const code = `
const sum = (a, b) => a + b;
`
// babel/core 本身只有 生成、遍历、生成 代码的功能，和上面的三个工具一样
// 它本身不会在代码遍历的时候做一个处理，除了用插件等方法
let target = core.transform(code, {
    plugins: [plugin1]
})
// console.log(target.code);

// babel插件其实就是一个对象，它有一个 visitor(访问器)

let myPlugin = {
    visitor: {
        /**
         * 函数名称就是在遍历语法树时遇到的类型，意味着给这个类型做转换
         * @param {*} path 节点的数据
         */
        ArrowFunctionExpression(path) {
            path.node.type = 'FunctionExpression';
            // 只是添加这个的话 会转成 function (a, b) a + b 普通函数没有隐式返回
            // 并且在箭头函数中的this没有办法取到

            // 处理this指针
            const thisBinding = hoistFunctionEnvironmen(path)
        }
    }
}
function hoistFunctionEnvironmen(fnPath) {
    const thisEventFn = fnPath.findParent(p => {
        return p.isFunction() && !p.isArrowFunctionExpression() || p.isProgram()
    })
}

let target2 = core.transform(code, {
    plugins: [myPlugin]
})

// console.log(target2.code)

