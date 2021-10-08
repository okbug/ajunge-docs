const url = require('url');
function Router(){
    this.stack =  [];
}
Router.prototype.get = function(path,handler){
    this.stack.push({
        path,
        method:'get',
        handler
    })
}
Router.prototype.handle = function (req,res,done) {
    let { pathname, query } = url.parse(req.url, true);
    let requestMethod = req.method.toLowerCase();
    for(let i = 0 ; i < this.stack.length;i++){
        let {path,method,handler } = this.stack[i];
        if(pathname === path && method === requestMethod){
            return handler(req,res);
        }
    }
    done()
}

module.exports = Router