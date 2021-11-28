
import pathToRegexp from 'path-to-regexp';
/**
 * 可以把路径转换成正则表达式
 * @param {*} path  路径
 * @param {*} options 选项
 * @returns 
 */
function compilePath(path, options) {
    let keys = [];//用来存在路径参数的参数名的数组
    let regexp = pathToRegexp(path, keys, options);
    return { keys, regexp };
}
/**
 * 计算路径是否匹配
 * pathname 当前地址栏中的路径
 * sensitive 是否大小写敏感 (默认值: false) 默认值是不敏感
 * end 是否匹配整个字符串 (默认值: true) 也就是说后面是否还可以跟别的内容 end:true 不能跟  end:false 能跟
 * strict 是否允许结尾有一个可选的/ (默认值: false)
 */
function matchPath(pathname, options = {}) {
    //path=此Route对应的路径 exact是否精确匹配 strict是否严格匹配 sensitive是否大小写敏感
    // path=/user
    let { path = '/', exact = false, strict = false, sensitive = false } = options;
    //先把路径path编译成正则
    let { keys, regexp } = compilePath(path, { end: exact, strict, sensitive });
    //pathname = /user/id
    const match = regexp.exec(pathname);//用路径path转成的正则和当前浏览器中的路径名进行匹配
    if (!match) return null;
    const [url, ...values] = match;//url=/user
    //是否精确匹配
    const isExact = pathname === url;//pathname=/user/id  !== url=/user
    if (exact && !isExact) return null;
    return {
        path,//Route的路径
        url,//Route路径转成的正则表达式匹配的路径部分
        isExact,//是否精确匹配
        params: keys.reduce((memo, key, index) => {
            //路径参数的名字 = 路径参数的值
            memo[key.name] = values[index];
            return memo;
        }, {})
    }

}

export default matchPath;