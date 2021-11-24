
class DonePlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        //在编译 完成后再打印
        //	done: new AsyncSeriesHook(["stats"]),
        compiler.hooks.done.tapAsync('DonePlugin', (stats, callback) => {
            setTimeout(() => {
                console.log('DonePlugin');
                callback();
            }, 0);
        });


    }
}
module.exports = DonePlugin;