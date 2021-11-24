//babel核心模块
const core = require('@babel/core');
//用来生成或者判断节点的AST语法树的节点
const types = require("@babel/types");
const path = require('path');
const visitor = {
    CallExpression(nodePath, state) {
        const { node } = nodePath;
        if (types.isMemberExpression(node.callee)) {
            if (node.callee.object.name === 'console') {
                if (['log', 'info', 'warn', 'error', 'debug'].includes(node.callee.property.name)) {
                    const { line, column } = node.loc.start;
                    const relativeFileName = path.relative(__dirname, state.file.opts.filename).replace(/\\/g, '/');
                    node.arguments.unshift(types.stringLiteral(`${relativeFileName} ${line}:${column}`));
                }
            }
        }
    }
}
module.exports = function () {
    return {
        visitor
    }
}
/* {
    loc: {
        start: { line: 1, column: 1 }
    }
} */