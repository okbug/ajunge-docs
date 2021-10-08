const context = {
    // get query(){
    //     return 
    // },
    // get path(){
    //     return this.request.path
    // }
}
function defineGetter(target,key){ // 
    context.__defineGetter__(key,function(){
        return this[target][key]
    })
}
function defineSetter(target,key){ // 

    console.log(target,key)
    context.__defineSetter__(key,function(val){
       this[target][key] = val; 
    })
}
defineGetter('request','query')
defineGetter('request','path')
// ctx.body   ctx.response.body
defineGetter('response','body')

// ctx.body = 'xxx' ctx.response.body='xxx'
defineSetter('response','body')
// proxy
// Object.defineProperty(context,'query',{
//     get(){

//     }
// })

module.exports = context;