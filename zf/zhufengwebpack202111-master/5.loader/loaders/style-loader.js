const loaderUtils = require('loader-utils');
/**
 * 1.不管什么样的模块，最左侧的loader一定要返回一个JS模块代码
 * 创建一个style标签，把CSS文本放在style标签里面，然后插入页面
 * @param {*} css 
 */
function loader(css) {
    this.data;
    /*  let moduleScript = `
         let style = document.createElement('style');
         style.innerHTML = ${JSON.stringify(css)};
         document.head.appendChild(style);
     `;
     return moduleScript; */
}
/**
 * 
 * @param {*} remainingRequest 剩下的请求 [less-loader,index.less]
 * @param {*} previousRequest 之前的请求 []
 * @param {*} data 当前loader的数据对象 {}
 */
loader.pitch = function (remainingRequest) {
    //字符串，less-loader绝对路径!index.les绝地路径
    //stringifyRequest ./loaders/less-loader.js!./src/index.less
    //C:\aproject\zhufengwebpack202111\5.loader\loaders\less-loader.js!C:\aproject\zhufengwebpack202111\5.loader\src\index.less
    console.log(remainingRequest);
    //把绝对路径变成可以在本模块内加载的相对路径
    //"!!../loaders/less-loader.js!./index.less"
    let request = JSON.stringify(
        this.utils.contextify(this.context, remainingRequest)
    );
    console.log(request);
    // require("!!../loaders/less-loader.js!./index.less");
    let moduleScript = `
         let style = document.createElement('style');
         style.innerHTML =  require(${request});
         document.head.appendChild(style);
     `;
    return moduleScript;
}

module.exports = loader;
/**

 * Turns a request into a string that can be used inside require() or import while avoiding absolute paths. Use it instead of JSON.stringify(...) if you're generating code inside a loader.
 * 转换一个请求为一个字符串  可以用于require方法里的或者import语句中，避免绝对路径
* {@link https://github.com/webpack/loader-utils#stringifyrequest}

export function stringifyRequest(loaderContext: loader.LoaderContext, resource: string): string;
 */