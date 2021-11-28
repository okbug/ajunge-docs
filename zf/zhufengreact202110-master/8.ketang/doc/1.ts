

/* function add(a: number, b: number): number {
    return a + b;
} */
interface ADD {
    (a: number, b: number): number
}
const add: ADD = (a: number, b: number): number => {
    return a + b;
}
type T = ReturnType<ADD>;
let t: T = 1

let obj = {};
//类型“{}”不满足约束“(...args: any) => any”。
//type K = ReturnType<typeof obj>;
