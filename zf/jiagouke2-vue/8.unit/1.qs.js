// qs 可以转换字符串变成对象 ?a=1&b=2   =>  {a:1,b:2}

// {a:1,b:2} => a=1&b=2

// 解析字符串
export function parser(str){
    const obj = {};
    str.replace(/([^&=?]+)=([^&=?]+)/g,function(){
        let value = Number(arguments[2]);
        if(isNaN(value)){
            obj[arguments[1]] = arguments[2]
        }else{
            obj[arguments[1]] = value;
        }
       
    })
    return obj;
}

// 将对象转换成字符串
export function stringify(obj){
    const arr = [];
    for(let key in obj){
        arr.push(`${key}=${obj[key]}`)
    }
    return arr.join('&')
}
// 1.为什么要测试 可以保留测试的代码 ， 统一存放测试代码 ， 开发时可以直接看测试即可
// 2.代码会尽量的简洁

// console.log(parser('a=1&b=2'))   => {a:1,b:2}
// console.log(stringify({a:1,b:2})) => a=1&b=2


// jest来进行测试 0 配置