const ejs = require('ejs');
const path = require('path');
const fs = require('fs').promises


// 模板引擎的实现原理  with + new Function,  WEBPACK loader 最终原理都是字符串拼接
 async function renderFile(filePath,data){
    let tmplStr =await fs.readFile(filePath,'utf8');
    let myTemplate = `let str = ''\r\n`;
    myTemplate += 'with(obj){'
    myTemplate += 'str+=`'
    tmplStr = tmplStr.replace(/<%=(.*?)%>/g,function(){
        return '${' +  arguments[1] + '}'
     })
    myTemplate += tmplStr.replace(/<%(.*?)%>/g,function(){
       return '`\r\n' +  arguments[1] + '\r\nstr+=`'
    })
    myTemplate += '`\r\n return str \r\n}'
    let fn = new Function('obj',myTemplate);
    return fn(data);
}
async function render(tmplStr,data){
    let myTemplate = `let str = ''\r\n`;
    myTemplate += 'with(obj){'
    myTemplate += 'str+=`'
    tmplStr = tmplStr.replace(/<%=(.*?)%>/g,function(){
        return '${' +  arguments[1] + '}'
     })
    myTemplate += tmplStr.replace(/<%(.*?)%>/g,function(){
       return '`\r\n' +  arguments[1] + '\r\nstr+=`'
    })
    myTemplate += '`\r\n return str \r\n}'
    let fn = new Function('obj',myTemplate);
    return fn(data);

}
exports.renderFile = renderFile;
exports.render = render;
