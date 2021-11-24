let core = require('@babel/core');
let types = require('babel-types');
let  BabelPluginTransformClasses = require('@babel/plugin-transform-classes');
const sourceCode = `
class Person {
    constructor(name) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
}
`;

//babel插件其实是一个对象，它会有一个visitor访问器
/**
 *编写插件的一般步骤
 1. 仔细观察转换前和转换后的语法树，找到它们的相同点和不同点
 2. 想办法把转换前的转成转换后的，并且要尽可能和复用旧节点
 老的没有，新的有，就得创建新节点了，可以 babel-types可以创建新节点
 */
let BabelPluginTransformClasses2 = {
    //每个插件都会有自己的访问器
    visitor:{
        ClassDeclaration(nodePath){
            let {node}=nodePath;
            let {id} = node;//Person 标识符
            let classMethods = node.body.body;//获取 原来类的方法constructor getName
            let body = [];
            classMethods.forEach(method=>{
                if(method.kind === 'constructor'){//如果方法的类型是构建函数的话
                    //id Person params=[name] body = this.name= name
                    let constructorFunction = functionDeclaration(id,method.params,method.body,method.generator,method.async)
                    body.push(constructorFunction);
                }else{//普通的函数属于普通函数 是放在原型上的
                    //method.key=getName
                    //成员表达 Person.prototype.getName
                    let left = types.memberExpression(types.memberExpression(id,types.identifier('prototype')),method.key);
                    let right = functionExpression(null,method.params,method.body,method.generator,method.async)
                    let assignmentExpression = types.assignmentExpression('=',left,right);
                    body.push(assignmentExpression);
                }
            });
            //nodePath.replaceWith();//替换成单节点
            nodePath.replaceWithMultiple(body);//替换成多节点

        }
    }
}
function functionDeclaration(id,params,body,generator,async){
  return {
      type:'FunctionExpression',
      id,
      params,
      body,
      generator,async
  }
}
let targetCode = core.transform(sourceCode,{
    plugins:[BabelPluginTransformClasses2]
});
console.log(targetCode.code);

/* function Person(name){
    this.name = name;
}
Person.prototype.getName = function(){
    return this.name;
} */