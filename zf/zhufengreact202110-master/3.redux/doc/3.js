function add1(str) {
    return '1' + str;
}
function add2(str) {
    return '2' + str;
}
function add3(str) {
    return '3' + str;
}
/**
 * 把多个函数组合成一个函数
 * @param  {...any} funcs
 * @returns 
 */
/* function compose(...funcs) {
    if (funcs.length === 0) {
        return args => args;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return function (args) {
        for (let i = funcs.length - 1; i >= 0; i--) {
            args = funcs[i](args);
        }
        return args;
    }
} */
/* function compose(...funcs) {
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
} */
function compose(...funcs) {
    return funcs.reduce(function (a, b) {
        return function () {
            return a(b.apply(void 0, arguments));
        };
    });
}
/**
 * funcs=[add3, add2, add1]
 * 第1次执行 a =add3,b=add2 返回 (...args)=>add3(add2(...args))
 * 第2次执行 a=(...args)=>add3(add2(...args)),b=add1 返回  (...args) => add3(add2((add1(...args)))
 */
let composeFN = compose(add3, add2, add1);
let result = composeFN('zhufeng');
console.log(result);