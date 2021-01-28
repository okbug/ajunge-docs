/**
 * generator 会生成遍历器 有一个next方法 
 */

const likeArray = {
    0: 'aaa',
    1: 'b',
    2: 'cc',
    3: 'd',
    length: 4
}
let larr = {...likeArray }
likeArray[Symbol.iterator] = function() {
    let i = 0
    return {
        next: () => {
            return {
                value: this[i],
                done: i++ === this.length
            }
        }
    }
}
console.log([...likeArray])

larr[Symbol.iterator] = function*() {
    let i = 0;
    while (i !== this.length) {
        yield this[i++]
    }
}
console.log([...larr])


// 在迭代器中 除了第一次的next方法，后面的next方法中的参数都是传给上一个yield 的返回结果
function* foo() {
    let a = yield 1;
    console.log('aa', a)
    let b = yield 2;
    console.log('b===b', b);
    let c = yield 3;
    console.log('cccc<', c, '>ccccc')
    let d = yield 4;
    console.log('d', d);
    return 30000
}
let f = foo()
f.next()
f.next('a的值')
f.next('这里是b的值')
f.next('这个呢？')
f.next('asas')


const co = it => {
    return new Promise((resolve, reject) => {
        function next() {
            let { value, done } = it.next(data)
            if (!done) {
                Promise.resolve(value).then(next, reject)
            } else {
                // 如果这个迭代器完成了就成功
                resolve(value)
            }
        }
        next()
    })
}

/**
 * async await = generator + co
 * async函数默认返回的就是一个Promise
 */