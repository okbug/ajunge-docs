全局安装single-spa的脚手架 `npm install create-single-spa -g`

然后新建一个目录
在目录中输入 `create-single-spa`
然后就会有类似vue-cli或cra的一个终端选择器
首先让你选择应用的文件夹，默认是 `.` 也就是当前文件夹
这里输入container 这样就会在文件夹下创建一个叫做container的文件夹
然后第二个选项选择 `single-spa root config` 这是创建容器应用的意思
然后其他的随意

最后切换到container文件夹下，输入 `npm start` 这样就会在 http://localhost:9000/ 有项目出现了

Chrome 有个插件叫做 single-spa Inspector 可以用来调试


----

# 创建一个没任何库的微前端应用


新建文件夹并且初始化
```bash
mkdir pure-app
cd pure-app
npm init -y
```

安装所需依赖
```bash
npm install @babel/core@7.12.10 single-spa@5.9.0 webpack@5.8.0 webpack-cli@4.2.0 webpack-config-single-spa@2.0.0 webpack-merge@5.4.0
```

新建webpack.config.js文件 将配置写入


```js
const singleSpaDefaults = require("webpack-config-single-app")
const { merge } = require("webpack-merge")

module.exports = () => {
  const defaultConfig = singleSpaDefaults({
    orgName: "okbug",
    projectName: "pure-app" // 注意这里的组织名字和项目名字
  })
  return merge(defaultConfig, {
    devServer: 9001
  })
}
```

新建src目录，新建一个js文件，注意：这个文件的名字一定是 'orgName + projectName.js'
根据上面的描述，那么我们新建一个叫做 `okbug-pure-app.js` 的文件

single-spa规定，在这个入口文件中，一定要导出三个生命周期函数
分别是：启动(bootstrap)、挂载(mount)和卸载(unmount)

**注意** 

生命周期函数要是async的写法或者是return一个Promise实例



# 创建基于React的微前端应用
命令行输入 create-single-spa
然后根据提示 创建目录，和选择react
Select type to generate single-spa application / parcel
选择项目和组织的名称


##### 前面创建的容器和app有什么区别？
容器中可以放置多个application

容器就是微应用最后的集合点
在容器的imports中将这些子应用全部注册并且启动即可




----


占坑


----



# 模块联邦

这个是webpack5新出的一个特性
可以通过这个特性来使不同应用数据共享，达到实现微前端的目的


在webpack的包中 有有一个函数，这样使用它

```js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

new ModuleFederationPlugin({
  filename:"",
  name: "",
  exposes: {
    "./index": "./src/index"
  }
})
```