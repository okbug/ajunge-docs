import { getData, getDataPromise } from '../3.async';

// 真函数不靠谱 我用假函数

jest.useFakeTimers(); // 我创建出来了一个模拟的timer

describe('测试异步获取数据的方法', () => {
    it('测试get Data', () => {
        // 自己mock一个函数传入
        getData((data)=>{
            expect(data).toEqual({name:'jw'})
        });
        // jest.runAllTimers(); // 运行所有的定时器
        // jest.advanceTimersByTime(4000);
        jest.runOnlyPendingTimers(); // 只运行当前等待的timer
    });
    // promise 可以采用done的方式 也可以采用async + await
    // it('测试getDataPromise',async () => {
    //     let data =  await getDataPromise();
    //     expect(data).toEqual({ name: 'jw' });
    // });
})

// Vue.extend().$mount() 

// 到底接口要不要测试 