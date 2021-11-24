let babelCore = require('@babel/core');
let types = require('babel-types');
let PluginTransformClasses = require('@babel/plugin-transform-classes');
let sourceCode = `
class Person{
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
}
`;
let PluginTransformClasses2 = {
    visitor:{
        ClassDeclaration(nodePath){
            let {node} = nodePath;
            let id = node.id;//{type:Identifier,name:Person} 类的名字
            let classMethods = node.body.body;
            let nodes = [];
            classMethods.forEach(classMethod =>{
                if(classMethod.kind === 'constructor'){//如果这这个方法是构造函数
                    let constructor = types.functionDeclaration(id,classMethod.params,classMethod.body);
                    nodes.push(constructor);
                }else{//如果是普通函数的话
                    //创建赋值语句右侧的函数表达式
                    let functionExpression = types.functionExpression(null,classMethod.params,classMethod.body)
                    //Person.prototype
                    let prototypeMemberExpression = types.memberExpression(id,types.identifier('prototype'));
                    //Person.prototype.getName
                    let memberExpression =  types.memberExpression(prototypeMemberExpression,classMethod.key);
                    let assignmentExpression = types.assignmentExpression('=',memberExpression,functionExpression);
                    nodes.push(assignmentExpression);
                }
            });
            if(nodes.length===1){
                nodePath.replaceWith(nodes[0]);//替换成一个节点replaceWith
            }else{
                nodePath.replaceWithMultiple(nodes);//如果要替换成多节点 replaceWithMultiple
            }
        }
    }
}
let targetCode = babelCore.transform(sourceCode,{
    //presets:["@babel/preset-env"]
    plugins:[PluginTransformClasses2]
});
console.log(targetCode.code);
/* 
function Person(name){
    this.name = name;
}
Person.prototype.getName = function (){
    return this.name;
}
               赋值语句
      成员表达式    =      函数表达式
   成员表达式     属性(getName)
Object property
Person prototype 
*/
