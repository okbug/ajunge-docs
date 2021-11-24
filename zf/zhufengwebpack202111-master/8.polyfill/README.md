- 默认情况下@babel/preset-env只能转换ES6语法
- //babel-polyfill是通过向Array.prototype上添加方法来实现polyfill
//优点就是方便，快速，缺点就是全污染全局变量

- entry 会考虑配置的浏览器配置，会自动引入这些浏览器需要的polyfill
- 如果useBuiltIns: 'entry',则必须指定corejs版本号，当前默认是2.x ,2.x基本快废弃了，以后推荐 3.x

- corejs其实就是 polyfill方法的实现

- 兼容的chrome版本号越大，chrome版本越高，需要提供的polyfill越少
- 兼容的chrome版本号越小，chrome版本越低，需要提供的polyfill越多


- 只考虑你兼容的浏览器的版本，不考虑你的使用情况
- 如果 useBuiltIns: 'usage',在编译 的时候 
- webpack会判断你是否用到了某个新的API，并且会考虑你配置的浏览器兼容性，来确定单个引个此API对应的polyfill

- 污染全局变量
Array.prototype.find = corejs自己提供的find方法
如果你写的是项目还好
如果你写的是类库

因为@babel/preset-env提供的polyfill会污染全局环境
所以我现在不再需要@babel/preset-env提供polyfill


var Promise = require("./node_modules/@babel/runtime-corejs3/core-js-stable/promise.js");
var find = require("./node_modules/@babel/runtime-corejs3/core-js-stable/instance/find.js");
let promise = Promise.resolve();
console.log(promise);
console.log([1, 2, 3].find(item => item === 2));
console.log(find.call([1, 2, 3], item => item === 2));





var _marked = /*#__PURE__*/regeneratorRuntime.mark(gen);


- 项目开发 是自己业务代码，只要自己开发测试能跑通，直接上线了，未来不会有别人来调用你的代码
- 由@babel/preset-env提供polyfill  3.x
- 由@babel/plugin-transform-runtime提供helper文体体积
- 可能会污染全局伤作用域，但是污染了全局文件体积会少

Array.prototype.find= ();
[].find()


```js
 {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        targets: {
                            "browsers": ["IE 10"]
                        },
                        presets: [
                            ["@babel/preset-env", {
                                useBuiltIns: 'usage',
                                corejs: { version: 3 }
                            }]
                        ],
                        plugins: [
                            ["@babel/plugin-transform-runtime", {
                                corejs: false,
                                helpers: true,
                                regenerator: false
                            }]
                        ]
                    }
                }
            }
```