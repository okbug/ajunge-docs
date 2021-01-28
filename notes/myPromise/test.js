let jPromise = require('./promise');
const { resolve } = require('./promise');
/**
 * 

let p1 = new jPromise((a, b) => {
    setTimeout(() => {
        b('wuwuwu')
    })
})
p1.then((e) => console.log(1, e), (e) => { console.log(2, e) })
p1.then((e) => console.log(1, e), (e) => { console.log(24, e) })
p1.then((e) => console.log(1, e), (e) => { console.log(23, e) })
let p2 = new jPromise((success, error) => {
    error(200)
}).then((e) => {
    console.log(3, e)
}, (f) => {
    console.log(f, 'cw', 3);
    return 3 //这里的reject函数 返回了一个普通的数字 
}).then((e) => {
    console.log(3, 'cg2', e) //执行的是这一行代码。 说明执行了下一个  resolve函数  并且传入了return的值。
}, (f) => {
    console.log(f, 'cw', 3);
    return 3
})

let p2 = new jPromise((resolve, reject) => {
    resolve(100)
})
let p3 = p2.then((e) => { console.log(e); return 3 })
p3.then(e => console.log(e))



let p = new jPromise((resolve, reject) => {
    console.log('begin')
    resolve(1)
})
let promise2 = p.then(data => {
    return new jPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('cw')
        }, 1000);
    })
})
promise2.then((e) => {
    console.log('======', e)
}, e => {
    console.log('eeeeeeeeee', e)
})

let obj = {
    a: 'haha',
    b() {
        setTimeout(() => {
            console.log(this.a)
            console.log(`1`)
            console.log(this) //obj
        }, 1000);
    },
    c() {
        setTimeout(function() {
            console.log(this.a)
            console.log(`====`)
            console.log(this)
        }, 1000)
    }
}
obj.b()
obj.c()

let p = new Promise((resolve, reject) => {
    resolve(1)
})
p.then().then().then(e => { console.log(e) })

let p2 = new jPromise((resolve, reject) => {
    resolve(1)
})
p2.then().then().then(e => { console.log(e) })


jPromise.resolve(new jPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
    }, 1000);
})).then(data => {
    console.log(data)
})


let promise = new Promsie((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 10000);
})
promise.then(e => console.log(e), e => {
    console.log('shibai')
})

setTimeout(() => {
    promise.abort('超时了')
}, 2000);

const wrap = promise => {
    let abort;
    let myp = new Promise((resolve, reject) => {
        abort = reject
    })
    let p = Promise.race([promise, myp]) // 这里 如果myp的reject被p调用，那么race就会停止，所以可以拦截
    p.abort = abort;
    return p;
} {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => { resolve('success') }, 10000)
    })
    let p = wrap(promise)
    p.then(data => console.log(data), e => console.log(e, 'cuowu')) //这里的错误会走 说明promise变成reject了
    setTimeout(() => {
        p.abort('promise超时了')
    }, 2000);
}
 
{
    Promise.resolve(1).then().then().then(data => { console.log(data) }) // 输出1
    Promise.resolve(1).then().then(() => {
        return new Promise((resolve, reject) => {
            //只要在中间来一个什么都不做的Promise就可以中断这个promise
        })
    }).then(data => { console.log(data) })
}

let p1 = new Promise((resolve,reject)=>{
    throw new Error('123')
}).catch(e=>console.log(e))

*/