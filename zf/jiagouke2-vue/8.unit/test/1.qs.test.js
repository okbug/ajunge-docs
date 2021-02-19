// 默认jest 会查找 当前目录下的以test.js结尾的文件进行测试

// 做一个测试   两个案例
import {parser,stringify} from '../1.qs'; // es6-> es5

// node不支持es6 =》 babel来转义
// @babel/core  @babel/preset-env

describe('测试qs库是否符合规范',function () { // 分类 如果不写默认相当于都在最外层使用这个describe
    //  断言
    it('测试parser是否合法',()=>{
        expect(parser(`a=1&b=2`)).toEqual({a:1,b:2}); // false
    });

    it('测试stringify是否合法',()=>{
        expect(stringify({a:1,b:2})).toBe('a=1&b=2')
    })
})


// 匹配器 ： 方法   not.(相等 不相等 包含) 测试的方法有N种写法 都可以达到效果
