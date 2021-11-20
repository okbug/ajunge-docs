const core = require('@babel/core');
// const { types, template } = core;
const types = require('babel-types')
const template = require('@babel/template')
let code = `
function a(x, y) {
    console.log(x, y);
    return x + y
}
`

function parseCodeStringToStatement(str) {
    let arr = str.split('\n').filter(i => i !== '');
    // console.log(arr)
    return arr.map(s => template.statement(s)())
}


const error = 'error'

let customeCode = `
console.log(${error});
`

let parseResult = parseCodeStringToStatement(customeCode);
let plugin = {
    visitor: {
        FunctionDeclaration(nodePath) {
            let {node} = nodePath;
            let {id} = node.id;
            let blockStatement = node.body;
            if (blockStatement.body && types.isTryStatement(blockStatement.body[0])) return;
            
            // let catchStatement = template.statement(`
            //     console.log(error, 1);
            // `)();

            //  // [catchStatement, template.statement('console.log(\'hello world\')')()]
            let catchClause = types.catchClause(types.identifier(error), types.blockStatement(parseResult));

            let tryStatement = types.tryStatement(blockStatement, catchClause);
            let func = types.functionExpression(id, node.params, types.blockStatement([tryStatement]), node.generator, node.async);
            nodePath.replaceWith(func)
        }
    }
}


// let res = core.transform(code, {
//     plugins: [plugin]
// });

// console.log(res.code)

function parse(code, errorName, errorBody) {
    const parseResult = parseCodeStringToStatement(errorBody)
    let plugin = {
        visitor: {
            FunctionDeclaration(nodePath) {
                let {node} = nodePath;
                let {id} = node.id;
                let blockStatement = node.body;
                if (blockStatement.body && types.isTryStatement(blockStatement.body[0])) return;
                
                // let catchStatement = template.statement(`
                //     console.log(error, 1);
                // `)();
    
                //  // [catchStatement, template.statement('console.log(\'hello world\')')()]
                let catchClause = types.catchClause(types.identifier(errorName), types.blockStatement(parseResult));
    
                let tryStatement = types.tryStatement(blockStatement, catchClause);
                let func = types.functionExpression(id, node.params, types.blockStatement([tryStatement]), node.generator, node.async);
                nodePath.replaceWith(func)
            }
        }
    }
    return core.transform(code, {
        plugins: [plugin]
    }).code;
}

// console.log(parse(`
// function add(x, y) {
//     console.log(x, y);
//     return x + y;
// }
// `, 'error', `console.log(error)`))

let rt = JSON.stringify(core.parse(`let a = 1`).program, null ,2)
console.log(rt);
module.exports = parse;