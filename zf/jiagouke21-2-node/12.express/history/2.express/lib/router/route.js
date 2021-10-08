const Layer = require('./layer');
function Route(){
    this.stack = [];
}
Route.prototype.dispatch = function(){

}
Route.prototype.get = function(handlers){
    handlers.forEach(handler=>{
       let layer =  new Layer('/',handler);
       layer.method = 'get';// 给每一层都添加一个方法
       this.stack.push(layer);
    })
}
module.exports = Route;