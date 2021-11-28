function add1(str){
    return str+1;
}
function add2(str){
    return str+2;
}
function add3(a,b){
    return a+b;
}

let r1 = add1(add2(add3('hello')));
console.log(r1);//hello321

function compose(...funcs){
    if(funcs.length==0)
        return (args)=>args;
    else if(funcs.length==1){
        return funcs[0];
    }    
    return funcs.reduce((a,b)=>(...args)=>a(b(...args)));
}
/**
 * 第1次 a=add1 b=add2  返回 (...args)=>add1(add2(...args))
 * 第2次 a=(...args)=>add1(add2(...args)) b=add3 返回 (...args)=>(add1(add2(add3(...args))))
 */
let r2 = compose(add1,add2,add3)(1,2);
console.log(r2);//hello321



  /*   return function(...args){
        for(let i=funcs.length-1;i>=0;i--){
            args=funcs[i](args);
        }
        return args;
    } */