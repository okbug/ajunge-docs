- 能根据不同环境读取不同的.env环境变量吗？我记得cra里面有这个功能
  http://www.zhufengpeixun.com/grow/html/121.react-scripts.html#t165.1%20dotenv
.env
```js
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DB=test
MONGODB_URI=mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}
```

```
const dotenvFile = '.env';
require('dotenv-expand')(
    require('dotenv').config({
        path: dotenvFile,
    })
);
console.log(process.env.MONGODB_HOST);
console.log(process.env.MONGODB_PORT);
console.log(process.env.MONGODB_DB);
console.log(process.env.MONGODB_URI);
````

- 生产打包压缩是哪个啊
- cssModule

https://www.npmjs.com/package/css-loader

- importLoaders

要在后讲postcss我们一起讲

- 缓存按照什么计算的,size还是last-modifi￼ 后面手写loader和loader运行过程

以前每个模块会有两个依赖数组 
fileDependencies 依赖
contextDependencies 目录依赖
webpack 追踪了每个模块的 fileDependencies contextDependencies 以及 missingDependencies，并创建了文件系统快照。此快照会与真实文件系统进行比较，当检测到差异时，将触发对应模块的重新构建。

webpack 给 bundle.js 的缓存 entry 设置了一个 etag，它为所有贡献者的 hash 值。比较这个 etag，只有当它与缓存 entry 匹配时才能使用。
webpack5缓存的失效机制变的更多复杂
https://www.cnblogs.com/zhouyideboke/p/12058380.html


eval 包裹代码有啥用途？￼ 为了方便缓存的