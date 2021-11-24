
const babel = require('@babel/core');
/**
 * babel-loader只是一个转换JS源代码的函数
 * @param {*} source 接收一个source参数
 * 返回一个新的内容
 */
function loader(source) {
    let options = this.getOptions({});//loader-context
    let { code } = babel.transform(source, options);
    return code;//转换成ES5的内容
}
module.exports = loader;
/**
 * babel-loader
 * @babel/core 真正要转换代码从ES6到ES5需要靠 @babel/core
 *      babel/core本身只能提供从源代码转成语法树，遍历语法树，从新的语法树重新生成源代码的功能
 * babel plugin
 *     转换箭头函数的插件 plugin-babel-transform-arrow-functions
 *     插件知识如何转换语法树
 * babel preset
 *    单个配置插件太多太繁琐，所以可以把常用的插件打个包，起个名字进行配置比较方便
 *
 * 插件  保存的时候 reuqire => require
 */