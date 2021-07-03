// module.exports = function (source) {
//   // console.log(source)
//   source += `\n "hello this is my loader"`
//   return source
// }

// js 转成 ast语法树
let parser = require('@babel/parser')

// 遍历ast语法树
let traverse = require('@babel/traverse').default


// 操作节点的
let types = require('@babel/types')

// 把ast语法树在变回 字符串
let generator = require('@babel/generator').default

module.exports = function (source) {
  let ast = parser.parse(source, { sourceType: 'module' })
  traverse(ast, {
    CallExpression(path) {
      if (types.isMemberExpression(path.node.callee) && types.isIdentifier(path.node.callee.object, { name: "console" })) {
        path.remove()
      }
    }
  })
  let str = generator(ast, {}, source).code
  return str
}