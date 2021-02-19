export function getList() {
    return new Promise((resolve,reject)=>{
        resolve([1,2,3,4])
    })
}

export function getData() {
    return new Promise((resolve,reject)=>{
        resolve(['香蕉'])
    })
}

export function getUrl() {
    return new Promise((resolve,reject)=>{
        resolve(['http://www.baidu.com'])
    })
}

// 我们做单元测试 是不测试 接口的 直接mock掉接口