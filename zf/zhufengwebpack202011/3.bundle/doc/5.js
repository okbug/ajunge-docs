

function fn(){
    let getValue = ()=>value;//getValue是个函数，并没有执行，也没有尝试去获取value的值
    console.log('value',value);
    let value = 'hello';
    return getValue;
}
let getValue = fn();
console.log(getValue());
