class Layer{
    constructor(path,method,callback){
        this.path = path;
        this.method = method;
        this.callback = callback;
    }
    match(path,method){
        return this.path == path && this.method == method.toLowerCase()
    }
}
class Router{
    constructor(){
        this.stack = [];
    }
    compose(layers,ctx,next){
        let dispatch = (i)=>{
            if(i == layers.length) return next();
            let callback = layers[i].callback;
            return Promise.resolve(callback(ctx,()=>dispatch(i +1)))
        }
        return dispatch(0);
    }
    routes(){
        return async (ctx,next)=>{ // app.routes()
            let path = ctx.path;
            let method = ctx.method;
            let layers = this.stack.filter(layer=>layer.match(path,method));
            this.compose(layers,ctx,next)
        }
    }
};
['get','post'].forEach(method=>[
    Router.prototype[method] = function(path,callback){
        let layer = new Layer(path,method,callback);
        this.stack.push(layer);
    }
])

module.exports = Router