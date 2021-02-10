
//副作用
//纯函数
//1.相同的输入会产生相同的输出
//2.不能修改本函数作用域之外的变量
var obj= {age:10};

function sum(a,b){
    obj.age = 100;//副作用
    return a+b+Math.random();
}
let r1 = sum(1,2);
let r2 = sum(1,2);
console.log(r1,r2);
