const fs = require('fs');
/**
 * 创建loader对象
 * @param {*} loader loader文件的绝对路径
 */
function createLoaderObject(loader) {
    let normal = require(loader);
    let pitch = normal.pitch;
    //loader是否需要原生的Buffer类型的数据
    //let raw = normal.raw || false;
    return {
        path: loader,
        normal,
        pitch,
        //raw,
        data: {},//每一个loader都可以有一个自己的data对象，用来放置自己loader的一些信息
        pitchExecuted: false,//表示当前的loader的pitch函数已经执行过了
        normalExecuted: false//表示当前的loader的normal函数已经执行过了
    }

}
function runLoaders(options, finalCallback) {
    // 解构参数获取 resource=要加载的模块 loaders=loader数组 loader执行时的this对象  readResource读取文件的方法
    let { resource, loaders = [], context = {}, readResource = fs.readFile } = options;
    //把一个loader的路径数组转成loader对象数组
    let loaderObjects = loaders.map(createLoaderObject);
    let loaderContext = context;
    loaderContext.resource = resource;//加载的模块
    loaderContext.readResource = readResource;//读取文件的方法
    loaderContext.loaders = loaderObjects;//loader对象数组
    loaderContext.loaderIndex = 0;//当前正在执行的loader的索引
    //loaderContext.request = loader1!loader2!loader3!./src/title.js
    Object.defineProperty(loaderContext, 'request', {
        get() {
            return loaderContext.loaders.map(loader => loader.path).concat(loaderContext.resource).join('!')
        }
    });
    //从当前的loader下一个开始剩下的 loader3!./src/title.js
    Object.defineProperty(loaderContext, 'remainingRequest', {
        get() {
            return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(loader => loader.path).concat(loaderContext.resource).join('!')
        }
    });
    //从当前loader开始剩下的 loader2!loader3!./src/title.js
    Object.defineProperty(loaderContext, 'currentRequest', {
        get() {
            return loaderContext.loaders.slice(loaderContext.loaderIndex).map(loader => loader.path).concat(loaderContext.resource).join('!')
        }
    });
    //从当有loader之前的 loader1
    Object.defineProperty(loaderContext, 'previousRequest', {
        get() {
            return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(loader => loader.path).concat(loaderContext.resource).join('!')
        }
    });
    Object.defineProperty(loaderContext, 'data', {
        get() {
            return loaderContext.loaders[loaderContext.loaderIndex].data;
        }
    });
    /**
     * 
     * @param {*} args 值
     * @param {*} raw loader想要二进制Buffer还是字符串
     */
    function convertArgs(args, raw) {
        //想要Buffer,但是参数不是Buffer
        if (raw && !Buffer.isBuffer(args[0])) {
            //把不是Buffer转成buffer
            args[0] = Buffer.from(args[0]);
            //想要字符串，但是传递的是Buffer
        } else if (!raw && Buffer.isBuffer(args[0])) {
            //把Buffer转成字符串
            args[0] = args[0].toString('utf8');
        }
    }
    /**
     * 迭代执行loader的normal函数
     * @param {*} processOptions 选项
     * @param {*} loaderContext 上下文对象
     * @param {*} args 参数
     * @param {*} pitchingCallback  pitching回调
     */
    function iterateNormalLoaders(processOptions, loaderContext, args, pitchingCallback) {
        if (loaderContext.loaderIndex < 0) {
            return pitchingCallback(null, ...args);
        }
        //获取当前索引对应的loader对象 post1-loader
        let currentLoader = loaderContext.loaders[loaderContext.loaderIndex];
        if (currentLoader.normalExecuted) {
            loaderContext.loaderIndex--;
            return iterateNormalLoaders(processOptions, loaderContext, args, pitchingCallback);
        }
        let normalFn = currentLoader.normal;
        currentLoader.normalExecuted = true;//表示当前的loader的normal函数已经执行过了,而normal肯定是有值的
        convertArgs(args, currentLoader.raw);
        runSyncOrAsync(normalFn, loaderContext, args, (err, ...returnArgs) => {
            if (err) return pitchingCallback(err);
            return iterateNormalLoaders(processOptions, loaderContext, returnArgs, pitchingCallback);
        });
    }
    /**
     * 以同步或者异步的方式调用fn
     * fn的this指针指向loaderContext
     * 参数args
     * 执行结束后调用runCallback
     * @param {*} fn 
     * @param {*} loaderContext 
     * @param {*} args 
     * @param {*} runCallback 
     */
    function runSyncOrAsync(fn, loaderContext, args, runCallback) {
        //此函数的执行默认是同步的
        let isSync = true;
        //动态的给loaderContext添加一个callback属性，调用这个callback,会自动执行下一个normal loader
        const callback = (...args) => {
            runCallback(...args);
        }
        loaderContext.callback = callback;
        loaderContext.async = () => {
            isSync = false;//把当前的loade执行从同步变成异步
            return callback;
        }
        //用loaderContext作为this,用args作为参数调用fn函数，获取返回值
        let result = fn.apply(loaderContext, args);
        //如果isSync为true,说明是同步执行，直接 自动调用callback向下执行
        if (isSync) {
            callback(null, result);
        }
        //如果它是异步的呢？什么都不做
    }
    /**
     * 读取源文件的内容
     * @param {*} processOptions  参数
     * @param {*} loaderContext loader执行的上下文对象
     * @param {*} pitchingCallback pitching 回调
     */
    function processResource(processOptions, loaderContext, pitchingCallback) {
        processOptions.readResource(loaderContext.resource, (err, resourceBuffer) => {
            processOptions.resourceBuffer = resourceBuffer;//把读到的文件的buffer对象传递给processOptions.resourceBuffer 
            loaderContext.loaderIndex--;//让 loaderContext.loaderIndex=7
            iterateNormalLoaders(processOptions, loaderContext, [resourceBuffer], pitchingCallback);
        });
    }
    function iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback) {
        if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
            return processResource(processOptions, loaderContext, pitchingCallback);
        }
        //获取当前索引对应的loader对象 post1-loader
        let currentLoader = loaderContext.loaders[loaderContext.loaderIndex];
        if (currentLoader.pitchExecuted) {
            loaderContext.loaderIndex++;
            return iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback);
        }
        let pitchFn = currentLoader.pitch;
        if (!pitchFn) {
            currentLoader.pitchExecuted = true;//表示当前的loader的pitch函数已经执行过了
            return iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback);
        }
        runSyncOrAsync(pitchFn, loaderContext, [
            loaderContext.remainingRequest,
            loaderContext.previousRequest,
            loaderContext.data
        ], (err, returnArgs) => {
            if (returnArgs.length > 0 && returnArgs.some(arg => arg)) {
                loaderContext.loaderIndex--;
                iterateNormalLoaders(processOptions, loaderContext, returnArgs, pitchingCallback);
            } else {
                return iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback);
            }
        });
    }
    let processOptions = {
        resourceBuffer: null,//当你真正读取源文件的时候会把源文件 Buffer 对象传递过来
        readResource
    }
    iteratePitchingLoaders(processOptions, loaderContext, (err, result) => {
        finalCallback(err, {
            result,
            resourceBuffer: processOptions.resourceBuffer
        });
    });
}

exports.runLoaders = runLoaders;