let core = require('@babel/core');
let types = require('babel-types');
let  BabelPluginTransformEs2015ArrowFunctions = require('babel-plugin-transform-es2015-arrow-functions');
const sourceCode = `
const sum = (a,b)=>{
    console.log(this);
    return a+b;
}
`;
//babel插件其实是一个对象，它会有一个visitor访问器
let BabelPluginTransformEs2015ArrowFunctions2 = {
    //每个插件都会有自己的访问器
    visitor:{
        //属性就是节点的类型，babel在遍历到对应类型的节点的时候会调用此函数
        ArrowFunctionExpression(nodePath){//参数是节点的数据
            let node = nodePath.node;//获取 当前路径上的节点
            //处理this指针的问题
            hoistFunctionEnvironment(nodePath);
            node.type = 'FunctionExpression';
        }
    }
}

function hoistFunctionEnvironment(fnPath){
   //thisEnvFn=Program节点
     const thisEnvFn = fnPath.findParent(p => {
        //如果是函数则不能是箭头函数，或者是Promise或者是类的属性
        return (p.isFunction() && !p.isArrowFunctionExpression()) || p.isProgram();
    });
    const thisEnvFn = findParent(fnPath);
     //thisPaths就放着哪些地方用到this   
    let thisPaths = getScopeInfoInformation(fnPath);
    let thisBinding='_this';//把this变量重定向的变量名
    //如果有地方用到了，则需要在thisEnvFn环境上添加一个语句 let _this = this;
    if(thisPaths.length>0){
        //表示在this函数环境中添加一个变量id_this=初始值 this thisExpression
        thisEnvFn.scope.push({
            id:types.identifier(thisBinding),
            init:types.thisExpression()
        });
        //遍历所有的使用到this的路径节点，把所有 thisExpression会变成_this标识符
        thisPaths.forEach(thisChild=>{
            let thisRef = types.identifier(thisBinding);
            debugger
            thisChild.replaceWith(thisRef);
        });
    }
}
function getScopeInfoInformation(fnPath){
    let thisPaths = [];
    fnPath.traverse({//遍历当前的path的所有的子节点为，看看谁的类型是ThisExpression
        ThisExpression(thisPath){
            thisPaths.push(thisPath);
        }
    });
    return thisPaths;
}
/**
 * babel-core本身只是用来生成语法树，遍历语法树，生成新代码的
 * 它本身并不负责转换语法树
 */
let targetCode = core.transform(sourceCode,{
    plugins:[BabelPluginTransformEs2015ArrowFunctions2]
});
console.log(targetCode.code);

function findParent(fnPath){
    do{
        if((fnPath.isFunction() && !fnPath.isArrowFunctionExpression()) || fnPath.isProgram()){
            return fnPath;
        }
    }while(fnPath=fnPath.parentPath);
}