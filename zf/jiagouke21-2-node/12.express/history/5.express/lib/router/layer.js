const pathToRegExp = require('path-to-regexp'); // 第三方模块
function Layer(path,handler){
    this.path = path;
    this.regexp = pathToRegExp(this.path,( this.keys = []) );
    this.handler = handler;
}
Layer.prototype.match = function(pathname){
    const matches = pathname.match(this.regexp); // [1] id  [2] name
    if(matches){
        this.params = this.keys.reduce((memo,key,index)=>(memo[key.name]=matches[index+1],memo),{});
        return true;
    }
    if(this.path == pathname){// 无论中间件layer 还是路由layer  只要一样肯定匹配到
         return true;
    }
    // 如果是中间件 我们开头匹配就可以
    if(!this.route){
        if(this.path == '/'){ // 中间件路径是/ 表示可以匹配到
            return true;
        }
        // /user/admin  /user/
        return pathname.startsWith(this.path + '/'); // 匹配到前缀即可
    }
    return false;
}
Layer.prototype.handle_request = function(req,res,next){
    return this.handler(req,res,next)
}

module.exports = Layer;
