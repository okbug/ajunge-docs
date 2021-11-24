//babel核心模块
const core = require('@babel/core');
//用来生成或者判断节点的AST语法树的节点
let types = require("@babel/types");
//let arrowFunctionPlugin = require('babel-plugin-transform-es2015-arrow-functions');
let arrowFunctionPlugin = {
    visitor: {
        //如果是箭头函数，那么就会进来此函数，参数是箭头函数的节点路径对象
        ArrowFunctionExpression(path) {
            let node = path.node;
            hostFunctionEnvironment(path);
            node.type = 'FunctionExpression';
        }
    }
}
/**
 * 1.要在函数的外面声明一个_this变量，值是this
 * 2.在函数的内容，换this 变成_this
 * @param {*} path 
 */
function hostFunctionEnvironment(path) {
    //确定我的this变量在哪个环境里生成，向上查找 是普通函数或者是根节点 Program
    const thisEnvFn = path.findParent(parent => {
        return (parent.isFunction() && !path.isArrowFunctionExpression()) || parent.isProgram();
    });
    let thisBindings = '_this';
    //var _this = this;
    if (!thisEnvFn.scope.hasBinding(thisBindings)) {
        thisEnvFn.scope.push({
            id: types.identifier(thisBindings),//_this
            init: types.thisExpression()//this
        });
    }
    //替换this
    let thisPaths = getScopeInfo(path);
    thisPaths.forEach(thisPath => {
        //把this替换成_this
        thisPath.replaceWith(types.identifier(thisBindings));
    })
}
function getScopeInfo(path) {
    let thisPaths = [];
    path.traverse({
        ThisExpression(path) {
            thisPaths.push(path);
        }
    })
    return thisPaths;
}
let sourceCode = `
const sum = (a, b) => {
    console.log(this);
    const minus = (c,d)=>{
          console.log(this);
        return c-d;
    }
    return a + b;
}
`;
let targetSource = core.transform(sourceCode, {
    plugins: [arrowFunctionPlugin]
});

console.log(targetSource.code);
