//把源代码转成AST语法树
let esprima = require('esprima');
//遍历语法树 
let estraverse = require('estraverse');
//把转换后的语法树,重新生成源码
let escodegen = require('escodegen');
//工作作 老代码=>老语法树=>遍历语法树=>对语法树进行转换 =>根据新的语法树重新生成新的源代码
//      ES6   =>ES语法树=> 遍历箭头函数节点=>把箭头函数转成普通函数=>重新生成ES5代码

let sourceCode = `function ast(){}`;
let astTree = esprima.parse(sourceCode);
let indent = 0;
const padding = ()=>" ".repeat(indent);
estraverse.traverse(astTree,{
    enter(node){
        console.log(padding()+node.type+'进入');
        if(node.type === 'FunctionDeclaration'){
            node.id.name = 'newAst';
        }
        indent+=2;
    },
    leave(node){
        indent-=2;
        console.log(padding()+node.type+'离开');
        
    }
});
let result = escodegen.generate(astTree);
console.log(result);

