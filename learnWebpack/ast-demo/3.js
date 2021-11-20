const core = require('@babel/core');
// const types = require('babel-types');
const {types} = core
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

let res3 = core.transform(code2, {
    plugins: [myClassTransformPlugin]
})
console.log(res3.code)