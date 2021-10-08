const Layer = require('./layer');
const methods = require('methods')
function Route(){
    this.stack = [];
    this.methods = {}; // 用来标识route上包含哪些方法
}
Route.prototype.dispatch = function(req,res,out){
    let i = 0;
    let next = () =>{
        if(i === this.stack.length) return out();
        let layer = this.stack[i++];
        if(layer.method === req.method.toLowerCase()){
            layer.handler(req,res,next); // 用户注册的回调
        }else{
            next();
        }
    }
    next();
}
methods.forEach(method=>{
    Route.prototype[method] = function(handlers){
        handlers.forEach(handler=>{
           let layer =  new Layer('/',handler);
           layer.method = method;// 给每一层都添加一个方法
           this.methods[method] = true;
           this.stack.push(layer);
        })
    }
})

module.exports = Route;