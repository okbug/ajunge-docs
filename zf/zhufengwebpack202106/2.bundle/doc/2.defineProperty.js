let obj = {};
let ageValue = 10;

Object.defineProperty(obj,'age',{
    //writable:true,//是否可以修改age属性
    //value:10,//指定具体属性值
    set(newValue){
        ageValue = newValue;
    },
    get(){
        return ageValue;
    },
    enumerable:true,//是否可枚举 for(key in obj)
    configurable:true//是否可以删除 delete 
});
//Object.defineProperty(obj,key,descriptor);
//Invalid property descriptor.
// Cannot both specify accessors and a value or writable attribute
console.log(obj.age);
obj.age = 20;
console.log(ageValue);
Object.defineProperty
Object.defineProperties;

Object.defineProperties(obj,{
    key1:{
        value:'key1',
        enumerable: true
    },
    key2:{
        value:'key2',
        enumerable: true
    }
})
console.log(obj);