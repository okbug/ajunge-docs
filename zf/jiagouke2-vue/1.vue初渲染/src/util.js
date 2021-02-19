export function proxy(vm,data,key){
    Object.defineProperty(vm,key,{ // vm.a
        get(){
            return vm[data][key]; // vm._data.a
        },
        set(newValue){ // vm.a = 100;
            vm[data][key] = newValue// vm._data.a = 100;
        }
    })
}

export function defineProperty(target,key,value){
    Object.defineProperty(target,key,{
        enumerable:false, // 不能被枚举，不能被循环出来
        configurable:false,
        value
    });
}