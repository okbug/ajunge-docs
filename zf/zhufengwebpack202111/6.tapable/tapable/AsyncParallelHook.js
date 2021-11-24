const Hook = require("./Hook");
const HookCodeFactory = require('./HookCodeFactory');
class AsyncParallelHookCodeFactory extends HookCodeFactory {
    //获取事件函数执行的代码需要动态的创建
    content({ onDone }) {
        return this.callTapsParallel({ onDone });
    }
}
const factory = new AsyncParallelHookCodeFactory();
class AsyncParallelHook extends Hook {
    compile(options) {
        //就是给hook._x赋值为事件函数的数组
        factory.setup(this, options);
        //开始根据options{taps,args,type}创建call函数  new Function
        return factory.create(options);
    }
}
module.exports = AsyncParallelHook;