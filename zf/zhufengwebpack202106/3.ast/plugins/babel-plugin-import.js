

let babelCore = require('@babel/core');
let types = require('babel-types');
/**
import { flatten,concat } from "lodash";
变成
import flatten from 'lodash/flatten';
import concat from 'lodash/concat';
 */
let babelPluginImport = {
    visitor:{
        ImportDeclaration:{
            enter(nodePath,state={}){
                const specifiers = nodePath.node.specifiers;//导入标识符
                const source = nodePath.node.source;//模块的名字lodash
                if(
                    state.opts.libraryName==='lodash'&&
                    !types.isImportDefaultSpecifier(specifiers[0])){
                    const importDeclarations = specifiers.map((specifier,index)=>{
                        return types.importDeclaration(
                            [types.importDefaultSpecifier(specifier.local)],
                            types.stringLiteral(`${source.value}/${specifier.local.name}`)// lodash/concat
                        )
                    });
                    nodePath.replaceWithMultiple(importDeclarations);
                }
            }
        }
        
    }   
}

module.exports = function(){
    return babelPluginImport;
}