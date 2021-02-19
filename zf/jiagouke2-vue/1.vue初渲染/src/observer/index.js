import { arrayMethods } from "./array";
import { defineProperty } from "../util";
class Observer{
    constructor(value){
        // 使用defineProperty 重新定义属性

        // 判断一个对象是否被观测过看他有没有 __ob__这个属性
        defineProperty(value,'__ob__',this);
        if(Array.isArray(value)){
            // 我希望调用push shift unshift splice sort reverse pop
            // 函数劫持 、 切片编程
            value.__proto__ = arrayMethods;
            // 观测数组中的对象类型，对象变化也要做一些事
            this.observeArray(value);
        }else{
            this.walk(value);
        }

    }
    observeArray(value){
        value.forEach(item=>{
            observe(item); // 观测数组中的对象类型
        })
    }
    walk(data){
        let keys = Object.keys(data); // 获取对象的key
        keys.forEach(key=>{
            defineReactive(data,key,data[key]); // Vue.util.defineReactive
        });
    }
}
// 封装 继承
function defineReactive(data,key,value){
    observe(value); // 如果值是对象类型在进行观测
    Object.defineProperty(data,key,{
        get(){
            return value
        },
        set(newValue){
            if(newValue === value) return;
            observe(newValue); // 如果用户将值改为对象继续监控
            value = newValue
        }
    });
}

export function observe(data){
    // typeof null 也是object
    // 不能不是对象 并且不是null
    if(typeof data !== 'object' || data == null){
        return data;
    }
    if(data.__ob__){
        return data;
    }
    return new Observer(data)
}