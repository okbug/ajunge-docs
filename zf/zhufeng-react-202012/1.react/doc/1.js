/**
 * 在React17之前 React规定React元素是不可变的
 */
let element = {type:'h1'};
Object.freeze(element);
element.something = 'something';
console.log(element.something);

Object.defineProperty(Object,'freeze',{
    value:function(obj){
        var i;
        //遍历属性和方法
        for(i in obj){
            if(obj.hasOwnProperty(i)){
                Object.defineProperty(obj,i,{
                    //把所有的属性改为不可修改 只读
                    writable:false
                });
            }
        }
        //让此对象不能添加额外的属性
        Object.seal(obj);
    }
});
