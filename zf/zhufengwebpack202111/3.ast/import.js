//babel核心模块
const core = require('@babel/core');
//用来生成或者判断节点的AST语法树的节点
let types = require("@babel/types");

const visitor = {
    ImportDeclaration(path, state) {
        const { node } = path;//获取节点
        const { specifiers } = node;//获取批量导入声明数组
        const { libraryName, libraryDirectory = 'lib' } = state.opts;//获取选项中的支持的库的名称
        //如果当前的节点的模块名称是我们需要的库的名称
        if (node.source.value === libraryName
            //并且导入不是默认导入才会进来
            && !types.isImportDefaultSpecifier(specifiers[0])) {
            //遍历批量导入声明数组
            const declarations = specifiers.map(specifier => {
                //返回一个importDeclaration节点
                return types.importDeclaration(
                    //导入声明importDefaultSpecifier flatten
                    [types.importDefaultSpecifier(specifier.local)],
                    //导入模块source lodash/flatten
                    types.stringLiteral(libraryDirectory ? `${libraryName}/${libraryDirectory}/${specifier.imported.name}` : `${libraryName}/${specifier.imported.name}`)
                );
            })
            path.replaceWithMultiple(declarations);//替换当前节点
        }
    }
}


module.exports = function () {
    return {
        visitor
    }
}