let esprima = require('esprima');
let estraverse = require('estraverse');
let escodegen = require('escodegen');

let code = `
function ast() {};
`

// 生成语法树
let res = esprima.parse(code);

// console.log(res)

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
        console.log(padding() + '离开' + node.type);
    }
})

// 生成语法树
let target = escodegen.generate(res);
console.log(target)