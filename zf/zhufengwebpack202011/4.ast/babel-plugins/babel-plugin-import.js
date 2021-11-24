//babel-types是一个用来构建AST节点的类库工具库
const t = require('babel-types');
/**
 * 把那些importSpecifier变成importDefaultSpecifier
 * visitor.ImportDeclaration={enter,leave}
 * 如果直接给了一个函数，就等同于给ImportDeclaration.enter赋值
 */
const visitor = {
    //捕获ImportDeclaration节点
            //当进入这个这个节点的时候，执行此函数 节点的路径path,state代表节点的状态
    ImportDeclaration(path,state={opts:{}}){
            let {opts}=state;
            const {node} = path;//ImportDeclaration
            const specifiers = node.specifiers;
            const source = node.source;//lodash
            //只处理lodash模块，别的不管, 并且不是默认导入的话才需要处理，否则 绕过去
            if(opts.libraryName === source.value&& !t.isImportDefaultSpecifier(specifiers[0])){
                let defaultImportDeclaration= specifiers.map(specifier=>{
                    let importDefaultSpecifier= t.importDefaultSpecifier(specifier.local);
                    //node.source.value=lodash  opts.libraryDirectory=fp specifier.imported.name=flatten  lodash/fp/flatten
                    return t.importDeclaration([importDefaultSpecifier], t.stringLiteral(
                        `${node.source.value}/${opts.libraryDirectory}/${specifier.imported.name}`))
                });
                path.replaceWithMultiple(defaultImportDeclaration);
            }
    }
}
module.exports = function(babel){
    return {
        visitor
    }
}