describe('查看常见的匹配器',function () { // 分类 如果不写默认相当于都在最外层使用这个describe
    
    it('相等条件',()=>{
        expect(1+1).toBe(2); // ===
        expect({}).toEqual({}); // 比较值是否相等

        // 上面两个比较常用
        expect(null).toBeNull();
        expect('ok').toBeTruthy(); // 如果这个值存在就是真的
    })

    it('不相等关系',()=>{
        expect(1+1).not.toBe(3);  // !=
        expect(1+1).toBeLessThan(3); // <
        expect(1+1).toBeGreaterThanOrEqual(1); // 不相等逻辑  >=
    })

    it('判断包含关系',()=>{
        expect('zfpx').toContain('zf');
        expect('zfpx').toMatch('zf')
        expect('zfpx').toMatch(/zfpx/); // 可以写正则
    })
})

// jest 可以进行配置 哪些文件变化 我只测试变化的文件
// 只监控变化的文件