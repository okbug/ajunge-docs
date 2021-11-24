const sum = (a, b) => {
    return a + b;
}
function minis(a, b) {
    return a - b;
}

let multiply = new Function("a,b", "return a*b");
let result = multiply(2, 3);
console.log(result);

console.log(Object.getPrototypeOf(sum) === Function.prototype);
console.log(Object.getPrototypeOf(multiply) === Function.prototype);