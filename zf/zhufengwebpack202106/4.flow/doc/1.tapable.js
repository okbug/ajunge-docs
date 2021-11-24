//let {SyncHook} = require('tapable');
class SyncHook{
    constructor(){
        this.taps = [];
    }
    tap(name,fn){
        this.taps.push(fn);
    }
    call(...args){
        this.taps.forEach(tap=>tap(...args));
    }
}
let syncHook = new SyncHook();
syncHook.tap('name1',(name)=>{//events on
    console.log('name1',name);
});
syncHook.tap('name2',(name)=>{
    console.log('name2',name);
});

class MyPlugin{
    apply(){
        syncHook.tap('MyPlugin',()=>{
            console.log('MyPlugin');
        });
    }
}
let myPlugin = new MyPlugin();
myPlugin.apply();
syncHook.call('name');//触发