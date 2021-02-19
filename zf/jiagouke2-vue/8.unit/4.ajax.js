import axios from 'axios';
export function getList() {
    return axios.get('/list')
}
export function getData() {
    return axios.post('/data')
}
export function getUrl() {
    return axios({ url: '/url' })
}
export function sum(a,b){
    return a+b
}
// 我们做单元测试 是不测试 接口的 直接mock掉接口


// 1。匹配器  断言
// 2。describe it 怎么分配  describe可以嵌套
// 3.异步测试 done 方法 async+await
// 4.fake timer  mock接口  mock方法 jest.fn 模拟假方法

// 5.覆盖率 测试代码的覆盖范围

// 产生一个jest的配置文件