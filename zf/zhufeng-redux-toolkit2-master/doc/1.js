

//compose
function add1(str){
    return str+1;
}
function add2(str){
    return str+2;
}
//把多个函数组件成一个函数
function compose(add1,add2){
    return function(str){
        return add1(add2(str));
    }
}
let result = compose(add1,add2)('zhufeng');
console.log(result);