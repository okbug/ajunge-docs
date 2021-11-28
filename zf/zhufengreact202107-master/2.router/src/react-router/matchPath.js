import pathToRegexp from 'path-to-regexp';

function compilePath(path,options){
    const keys = [];
    const regexp = pathToRegexp(path,keys,options);
    return {regexp,keys};
}
function matchPath(pathname,options = {}){
    const {path="/",exact=false,strict=false,sensitive=false} = options;
    const {regexp,keys} = compilePath(path,{end:exact,strict,sensitive});
    const match = regexp.exec(pathname);
    if(!match) return null;
    const [url,...values] = match;
    const isExact = pathname === url;//
    if(exact && !isExact) return null;//如果希望精确，但其实不精确返回确
    return {
        path,//Route里的path属性
        url,//正则匹配到的浏览器的pathname部分
        isExact,//是否实现了精确匹配
        params:keys.reduce((memo,key,index)=>{
            memo[key.name]=values[index]
            return memo;
        },{})
    }
}
/**
 * 浏览器的pathname  /user/1
 * path /user
 * match是能匹配上的
 * exact=true;
 * /user/1 不完全 相等/user  表示非精确匹配
 * 
 * 
 * 
 * 
 * Home   path = /
 * location.pathname /user
 * 匹配的部分就是 /
 * / === /user不相等就是false
 */
export default matchPath;