
// jest.mock('../4.ajax.js'); // 相当于在这里使用了__mocks__中的文件

jest.mock('axios') // mock掉axios方法
import {getList,getData,getUrl} from '../4.ajax'



describe('测试能否正常获取数据',()=>{
    it('测试getList',async ()=>{
       let list =  await getList();
       expect(list).toEqual([1,2,3,4]);
    })

    it('测试getData',async ()=>{
        let list =  await getData();
        expect(list).toEqual(['香蕉']);
     })
})