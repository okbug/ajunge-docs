let esprima = require('esprima');//把源代码转成抽象语法树
let estraverse = require('estraverse');
let escodegen = require('escodegen');
//源代码就是ascii字符串
let sourceCode = `function ast(){}`;
let ast = esprima.parse(sourceCode);
//console.log(ast);
/**
 * 遍历语法树 遍历的方式采用的深度的方式
 * 遍历的时候只遍历有type属性的节点
 * 如果一个节点遍历完成，它同时有儿子和弟弟，如果先遍历弟弟，就是广度，如果先遍历儿子再遍历弟弟就是深度
 */
let indent = 0;//缩进几个空格
const padding = ()=>" ".repeat(indent);
estraverse.traverse(ast,{
    enter(node){
        //在遍历语法树的时候可以对它进行转换
        console.log(padding()+'进入'+node.type);
        if(node.type === 'FunctionDeclaration'){
            node.id.name = 'new'+node.id.name;
        }
        indent+=4;
    },
    leave(node){
        indent-=4;
        console.log(padding()+'离开'+node.type);
    }
});
/**
进入Program
  进入FunctionDeclaration
    进入Identifier
    离开Identifier
    进入BlockStatement
    离开BlockStatement
  离开FunctionDeclaration
离开Program
 */

let targetCode = escodegen.generate(ast);
console.log(targetCode);
