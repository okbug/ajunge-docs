let obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: function () {
        let index = 0;
        let next = () => {
            return {
                value: this[index],
                done: this.length === index++
            }
        }
        return {
            next
        }
    }
}
//有Symbol.iterator属性的含义是执行它可以返回一个迭代器
/* let it = obj[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
 */
 for(let p of obj){
    console.log(p) //"a"  "b"
} 