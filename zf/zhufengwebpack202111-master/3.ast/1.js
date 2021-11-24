//它可以把源代转成抽象语法树
let esprima = require('esprima');
//它可遍历语法权树，修改树上的语法节点
let estraverse = require('estraverse');
let escodegen = require('escodegen');
let sourceCode = 'function ast(){}';
let ast = esprima.parse(sourceCode);
let indent = 0;
const padding = () => ` `.repeat(indent);
let visitor = {
    enter(node, parent) {
        console.log(padding() + node.type);
        if (node.type === 'FunctionDeclaration') {
            node.id.name = 'newFunction';
        }
        indent++;
    },
    leave(node, parent) {
        indent--;
        console.log(padding() + node.type);
    }
}
estraverse.traverse(ast,visitor)
//重新生成源代码
let newSourceCode = escodegen.generate(ast);
console.log(newSourceCode);